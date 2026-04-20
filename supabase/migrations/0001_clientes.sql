-- ============================================================
--  Módulo Clientes — schema inicial
--  Escopo de dados baseado no cadastro multi-step (identificação,
--  contatos, endereço, projeto de interesse, relacionamento,
--  observações) + ficha detalhada (contatos, comunicações,
--  materiais, documentos, anotações).
-- ============================================================

create extension if not exists "uuid-ossp";
create extension if not exists pg_trgm;

-- ============================================================
-- ENUMS
-- ============================================================

create type client_type as enum ('PF', 'PJ');

create type client_stage as enum (
  'Prospeccao',
  'Briefing',
  'Proposta',
  'Negociacao',
  'Ativo',
  'Concluido',
  'Perdido'
);

create type client_priority as enum ('Baixa', 'Normal', 'Alta', 'Estrategica');

create type decision_role as enum (
  'DecisorPrincipal',
  'DecisorCompartilhado',
  'Influenciador',
  'UsuarioTecnico',
  'Financeiro'
);

create type note_kind as enum ('Geral', 'Importante', 'Lembrete');

create type comm_kind as enum (
  'WhatsApp',
  'Email',
  'Ligacao',
  'ReuniaoPresencial',
  'Videoconferencia',
  'VisitaTecnica',
  'Material'
);

create type comm_direction as enum ('Entrada', 'Saida');

create type material_status as enum (
  'Rascunho',
  'Programado',
  'Enviado',
  'Visualizado',
  'Clicou',
  'Aguardando',
  'Assinada'
);

-- ============================================================
-- FUNÇÃO: updated_at automático
-- ============================================================

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================
-- TABELA: clients
-- ============================================================

create table clients (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid references auth.users(id) on delete set null,

  -- Tipo e etapa de funil
  client_type      client_type     not null default 'PF',
  stage            client_stage    not null default 'Prospeccao',
  priority         client_priority not null default 'Normal',

  -- Pessoa física
  full_name        text,
  nickname         text,
  cpf              text,
  rg               text,
  birth_date       date,
  profession       text,
  marital_status   text,
  gender           text,
  spouse_name      text,
  dependents       text,

  -- Pessoa jurídica
  legal_name             text,
  trade_name             text,
  cnpj                   text,
  state_registration     text,
  municipal_registration text,
  business_sector        text,
  company_size           text,
  founding_date          date,

  -- Contatos principais
  email              text,
  email_secondary    text,
  mobile             text,
  mobile_is_whatsapp boolean not null default false,
  phone              text,
  preferred_channel  text,
  instagram          text,
  linkedin           text,
  website            text,

  -- Endereço do cliente
  address_zip          text,
  address_street       text,
  address_number       text,
  address_complement   text,
  address_neighborhood text,
  address_city         text,
  address_state        text,

  -- Endereço da obra (opcional)
  site_different        boolean not null default false,
  site_zip              text,
  site_street           text,
  site_number           text,
  site_complement       text,
  site_neighborhood     text,
  site_city             text,
  site_state            text,

  -- Projeto de interesse
  project_type            text,
  service_scope           text,
  estimated_area_m2       numeric(10, 2),
  desired_deadline        text,
  budget_range            text,
  construction_start_month date,
  preferred_styles        text[] not null default '{}',
  visual_references       text,
  initial_briefing        text,

  -- Relacionamento comercial
  origin                text,
  campaign              text,
  referred_by           text,
  responsible           text,
  first_contact_date    date,
  next_followup_date    date,
  contact_frequency     text,
  best_contact_time     text,

  -- Tags e consentimentos
  tags                        text[] not null default '{}',
  consent_email_marketing     boolean not null default false,
  consent_whatsapp            boolean not null default false,
  consent_portfolio           boolean not null default false,
  consent_lgpd                boolean not null default false,

  -- Observações e datas de relacionamento
  general_notes      text,
  pets               text,
  previous_projects  text,
  birthday           date,
  important_dates    text,

  -- Timestamps
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

-- Check: CPF para PF, CNPJ para PJ (apenas formato — validação real na aplicação)
alter table clients
  add constraint clients_pf_requires_name
  check (client_type <> 'PF' or full_name is not null);

alter table clients
  add constraint clients_pj_requires_legal_name
  check (client_type <> 'PJ' or legal_name is not null);

create index idx_clients_stage    on clients (stage) where deleted_at is null;
create index idx_clients_type     on clients (client_type) where deleted_at is null;
create index idx_clients_owner    on clients (owner_id);
create index idx_clients_tags_gin on clients using gin (tags);
create index idx_clients_name_trgm on clients using gin (
  (coalesce(full_name, legal_name)) gin_trgm_ops
);

create trigger trg_clients_updated_at
  before update on clients
  for each row execute function set_updated_at();

-- ============================================================
-- TABELA: client_contacts (pontos de contato adicionais)
-- ============================================================

create table client_contacts (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references clients(id) on delete cascade,

  name        text not null,
  position    text,
  email       text,
  phone       text,
  role        decision_role,
  is_primary  boolean not null default false,
  notes       text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_client_contacts_client on client_contacts (client_id);

create trigger trg_client_contacts_updated_at
  before update on client_contacts
  for each row execute function set_updated_at();

-- ============================================================
-- TABELA: client_notes (anotações internas da equipe)
-- ============================================================

create table client_notes (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references clients(id) on delete cascade,

  author      text not null,
  kind        note_kind not null default 'Geral',
  body        text not null,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_client_notes_client    on client_notes (client_id);
create index idx_client_notes_created   on client_notes (created_at desc);

create trigger trg_client_notes_updated_at
  before update on client_notes
  for each row execute function set_updated_at();

-- ============================================================
-- TABELA: client_communications (timeline de interações)
-- ============================================================

create table client_communications (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references clients(id) on delete cascade,

  kind              comm_kind not null,
  direction         comm_direction not null default 'Saida',
  title             text not null,
  description       text,
  occurred_at       timestamptz not null default now(),
  duration_minutes  integer,

  created_at timestamptz not null default now()
);

create index idx_client_comms_client    on client_communications (client_id);
create index idx_client_comms_occurred  on client_communications (occurred_at desc);

-- ============================================================
-- TABELA: client_materials (envios personalizados por cliente)
-- ============================================================

create table client_materials (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references clients(id) on delete cascade,

  title       text not null,
  category    text,
  channel     text,
  tags        text[] not null default '{}',
  status      material_status not null default 'Programado',
  sent_at     timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_client_materials_client on client_materials (client_id);
create index idx_client_materials_status on client_materials (status);

create trigger trg_client_materials_updated_at
  before update on client_materials
  for each row execute function set_updated_at();

-- ============================================================
-- TABELA: client_documents (arquivos vinculados)
-- Observação: o binário vive em supabase.storage; esta tabela
-- apenas rastreia metadata + caminho do objeto.
-- ============================================================

create table client_documents (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references clients(id) on delete cascade,

  name          text not null,
  storage_path  text,
  mime_type     text,
  size_bytes    bigint,
  version       integer not null default 1,
  signed        boolean not null default false,
  signed_at     timestamptz,
  uploaded_by   text,

  created_at timestamptz not null default now()
);

create index idx_client_documents_client on client_documents (client_id);

-- ============================================================
-- RLS: libera para usuários autenticados (escritório único)
-- Ajuste quando/se houver multi-tenant real.
-- ============================================================

alter table clients              enable row level security;
alter table client_contacts      enable row level security;
alter table client_notes         enable row level security;
alter table client_communications enable row level security;
alter table client_materials     enable row level security;
alter table client_documents     enable row level security;

create policy "clients_auth_all" on clients
  for all to authenticated
  using (true) with check (true);

create policy "client_contacts_auth_all" on client_contacts
  for all to authenticated
  using (true) with check (true);

create policy "client_notes_auth_all" on client_notes
  for all to authenticated
  using (true) with check (true);

create policy "client_communications_auth_all" on client_communications
  for all to authenticated
  using (true) with check (true);

create policy "client_materials_auth_all" on client_materials
  for all to authenticated
  using (true) with check (true);

create policy "client_documents_auth_all" on client_documents
  for all to authenticated
  using (true) with check (true);
