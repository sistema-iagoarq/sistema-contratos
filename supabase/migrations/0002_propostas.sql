-- ============================================================
--  Módulo Propostas — schema inicial
--  Escopo: cabeçalho da proposta (identificação, SLA, status),
--  itens/escopo, parcelas de pagamento, marcos de entrega.
-- ============================================================

-- ============================================================
-- ENUMS
-- ============================================================

create type proposal_status as enum (
  'draft',
  'sent',
  'analysis',
  'negotiation',
  'approved',
  'rejected',
  'expired'
);

create type proposal_sla_state as enum ('ok', 'warn', 'late');

create type proposal_project_type as enum (
  'Residencial',
  'Comercial',
  'Retrofit',
  'Interiores',
  'Industrial',
  'Hospitalar',
  'Paisagismo',
  'Consultoria'
);

create type proposal_modality as enum (
  'ProjetoCompleto',
  'ProjetoExecutivo',
  'Anteprojeto',
  'EstudoPreliminar',
  'InterioresMobiliario',
  'ProjetoLegal',
  'AcompanhamentoObra'
);

create type proposal_payment_form as enum (
  'AVista',
  'ParceladoVinculadoEntregas',
  'ParceladoMesesIguais',
  'EntradaMaisSaldoFinal',
  'Personalizado'
);

create type proposal_payment_method as enum (
  'PIX',
  'Transferencia',
  'Boleto',
  'Cartao',
  'BoletoMaisPIX'
);

create type proposal_adjustment_index as enum ('IGPM', 'IPCA', 'SemReajuste');

-- ============================================================
-- TABELA: proposals
-- ============================================================

create table proposals (
  id uuid primary key default uuid_generate_v4(),
  number text not null unique,                 -- Ex.: P-2026-041
  client_id uuid references clients(id) on delete set null,
  client_snapshot text not null,               -- nome preservado no momento da emissão
  owner_id uuid references auth.users(id) on delete set null,

  -- Identificação / escopo
  title text not null,
  scope text,
  project_type proposal_project_type,
  modality proposal_modality,
  area_m2 numeric(10, 2),

  -- Datas e prazo
  issued_at date,
  valid_days integer,
  expires_at date,
  start_date_planned date,
  estimated_duration_days integer,

  -- Responsável e status
  internal_responsible text,
  status proposal_status not null default 'draft',
  sent_at timestamptz,

  -- SLA (cache — também pode ser derivado)
  sla_days_consumed integer,
  sla_total_days integer,
  sla_state proposal_sla_state,
  sla_label text,

  -- Valores
  subtotal        numeric(12, 2) not null default 0,
  discount_pct    numeric(5, 2)  not null default 0,
  discount_amount numeric(12, 2) not null default 0,
  taxes_amount    numeric(12, 2) not null default 0,
  total_amount    numeric(12, 2) not null default 0,
  currency        text           not null default 'BRL',

  -- Pagamento
  payment_form       proposal_payment_form,
  installments_count integer,
  payment_method     proposal_payment_method,

  -- Canais de envio
  send_channel_email          boolean not null default false,
  send_channel_whatsapp       boolean not null default false,
  send_channel_signature_link boolean not null default false,

  -- Contrato
  contract_template text,
  adjustment_index  proposal_adjustment_index not null default 'SemReajuste',

  -- Observações
  internal_notes text,
  client_notes   text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index idx_proposals_status  on proposals (status) where deleted_at is null;
create index idx_proposals_client  on proposals (client_id);
create index idx_proposals_issued  on proposals (issued_at desc);
create index idx_proposals_expires on proposals (expires_at);
create index idx_proposals_number_trgm on proposals using gin (number gin_trgm_ops);

create trigger trg_proposals_updated_at
  before update on proposals
  for each row execute function set_updated_at();

-- ============================================================
-- TABELA: proposal_items (linhas de escopo/serviço)
-- ============================================================

create table proposal_items (
  id uuid primary key default uuid_generate_v4(),
  proposal_id uuid not null references proposals(id) on delete cascade,

  description text not null,
  quantity    numeric(10, 2) not null default 1,
  unit_price  numeric(12, 2) not null default 0,
  total_price numeric(12, 2) generated always as (quantity * unit_price) stored,
  sort_order  integer not null default 0,

  created_at timestamptz not null default now()
);

create index idx_proposal_items_prop on proposal_items (proposal_id, sort_order);

-- ============================================================
-- TABELA: proposal_installments (plano de parcelas)
-- ============================================================

create table proposal_installments (
  id uuid primary key default uuid_generate_v4(),
  proposal_id uuid not null references proposals(id) on delete cascade,

  number              integer not null,
  description         text,
  percentage          numeric(5, 2),
  amount              numeric(12, 2),
  due_date            date,
  triggered_by_event  text,             -- "Assinatura", "Entrega Anteprojeto", etc
  sort_order          integer not null default 0,

  created_at timestamptz not null default now(),
  unique (proposal_id, number)
);

create index idx_prop_inst_prop on proposal_installments (proposal_id, sort_order);

-- ============================================================
-- TABELA: proposal_milestones (marcos/entregas previstas)
-- ============================================================

create table proposal_milestones (
  id uuid primary key default uuid_generate_v4(),
  proposal_id uuid not null references proposals(id) on delete cascade,

  phase_name    text not null,          -- "Estudo Preliminar", "Anteprojeto + 3D"
  duration_days integer,
  delivery_date date,
  sort_order    integer not null default 0,

  created_at timestamptz not null default now()
);

create index idx_prop_milestones_prop on proposal_milestones (proposal_id, sort_order);

-- ============================================================
-- RLS
-- ============================================================

alter table proposals             enable row level security;
alter table proposal_items        enable row level security;
alter table proposal_installments enable row level security;
alter table proposal_milestones   enable row level security;

create policy "proposals_auth_all" on proposals
  for all to authenticated using (true) with check (true);

create policy "proposal_items_auth_all" on proposal_items
  for all to authenticated using (true) with check (true);

create policy "proposal_installments_auth_all" on proposal_installments
  for all to authenticated using (true) with check (true);

create policy "proposal_milestones_auth_all" on proposal_milestones
  for all to authenticated using (true) with check (true);
