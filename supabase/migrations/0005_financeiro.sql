-- ============================================================
--  Módulo Financeiro — schema inicial
--  Movimentações (entradas/saídas), contas bancárias, impostos
--  e view de lucro por projeto.
-- ============================================================

-- ============================================================
-- ENUMS
-- ============================================================

create type movement_type as enum ('in', 'out');

create type movement_status as enum ('paid', 'pending', 'late');

create type expense_category as enum (
  'payroll',     -- Pró-labore & Folha
  'fixed',       -- Aluguel, energia, internet
  'software',    -- Adobe, Figma, Autodesk
  'marketing',   -- Meta Ads, Google Ads
  'services',    -- Contador, consultorias
  'taxes',       -- DAS, ISS, FGTS, INSS
  'office',      -- Material de escritório
  'travel',      -- Viagens a clientes
  'other'
);

create type tax_payment_status as enum ('pending', 'paid', 'late', 'exempted');

-- ============================================================
-- TABELA: bank_accounts (contas que recebem/pagam)
-- ============================================================

create table bank_accounts (
  id uuid primary key default uuid_generate_v4(),

  name        text not null,           -- "Inter", "Sicoob"
  bank        text,
  agency      text,
  number      text,
  initial_balance numeric(14, 2) not null default 0,
  is_active   boolean not null default true,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger trg_bank_accounts_updated_at
  before update on bank_accounts
  for each row execute function set_updated_at();

-- ============================================================
-- TABELA: financial_movements (entradas e saídas)
-- ============================================================

create table financial_movements (
  id uuid primary key default uuid_generate_v4(),

  type        movement_type   not null,
  movement_date date          not null,
  description text            not null,
  reference   text,                          -- pagador ou favorecido

  -- Categorização (obrigatória para saídas; nula para entradas)
  category     expense_category,
  category_label text,

  -- Vínculos opcionais
  project_id   uuid references projects(id)   on delete set null,
  proposal_id  uuid references proposals(id)  on delete set null,
  client_id    uuid references clients(id)    on delete set null,
  bank_account_id uuid references bank_accounts(id) on delete set null,

  -- Se entrada vier de uma parcela de proposta
  proposal_installment_id uuid references proposal_installments(id) on delete set null,

  payment_method text,                       -- PIX, Transf., Boleto, Cartão, DARF
  status       movement_status not null default 'pending',
  amount       numeric(12, 2)  not null,
  currency     text not null default 'BRL',

  notes       text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,

  constraint fm_amount_positive check (amount >= 0),
  constraint fm_out_requires_category
    check (type <> 'out' or category is not null)
);

create index idx_fm_type_date on financial_movements (type, movement_date desc);
create index idx_fm_status    on financial_movements (status);
create index idx_fm_project   on financial_movements (project_id);
create index idx_fm_category  on financial_movements (category) where type = 'out';

create trigger trg_fm_updated_at
  before update on financial_movements
  for each row execute function set_updated_at();

-- ============================================================
-- TABELA: tax_obligations (obrigações tributárias)
-- ============================================================

create table tax_obligations (
  id uuid primary key default uuid_generate_v4(),

  code        text not null,        -- DAS, ISS, IR, PIS, FGTS
  name        text not null,
  description text,
  reference_period text,            -- "Abril 2026", "Q2 2026"

  due_date     date not null,
  amount       numeric(12, 2) not null,
  payment_date date,
  payment_status tax_payment_status not null default 'pending',
  payment_movement_id uuid references financial_movements(id) on delete set null,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_tax_due    on tax_obligations (due_date);
create index idx_tax_status on tax_obligations (payment_status);

create trigger trg_tax_updated_at
  before update on tax_obligations
  for each row execute function set_updated_at();

-- ============================================================
-- VIEW: project_financials (lucro por projeto)
-- Derivado de projects + financial_movements.
-- ============================================================

create or replace view project_financials as
  select
    p.id                                             as project_id,
    p.code                                           as project_code,
    p.name                                           as project_name,
    p.client_snapshot                                as client,
    p.status,
    p.progress_pct,
    p.estimated_hours,
    p.used_hours,
    p.contract_value                                 as revenue,
    coalesce(sum(fm.amount) filter (
      where fm.type = 'out' and fm.deleted_at is null
    ), 0)                                            as cost,
    p.contract_value - coalesce(sum(fm.amount) filter (
      where fm.type = 'out' and fm.deleted_at is null
    ), 0)                                            as profit,
    case when p.contract_value > 0 then
      round(
        ((p.contract_value - coalesce(sum(fm.amount) filter (
          where fm.type = 'out' and fm.deleted_at is null
        ), 0)) / p.contract_value) * 100,
        2
      )
    else 0 end                                       as margin_pct
  from projects p
  left join financial_movements fm on fm.project_id = p.id
  where p.deleted_at is null
  group by p.id;

-- ============================================================
-- RLS
-- ============================================================

alter table bank_accounts        enable row level security;
alter table financial_movements  enable row level security;
alter table tax_obligations      enable row level security;

create policy "bank_accounts_auth_all" on bank_accounts
  for all to authenticated using (true) with check (true);

create policy "financial_movements_auth_all" on financial_movements
  for all to authenticated using (true) with check (true);

create policy "tax_obligations_auth_all" on tax_obligations
  for all to authenticated using (true) with check (true);
