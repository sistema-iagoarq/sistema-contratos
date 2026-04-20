-- ============================================================
--  Módulo Projetos — schema inicial
--  Escopo: projeto (contrato em execução), fases (1..6),
--  cronograma de tarefas (Gantt) e entregas/marcos.
-- ============================================================

-- ============================================================
-- ENUMS
-- ============================================================

create type project_status as enum (
  'active',
  'paused',
  'on_hold',
  'completed',
  'cancelled'
);

create type project_phase_status as enum (
  'planning',
  'in_progress',
  'completed',
  'delayed'
);

create type project_task_status as enum (
  'pending',
  'in_progress',
  'completed',
  'on_hold',
  'delayed'
);

create type project_task_priority as enum ('low', 'normal', 'high', 'critical');

create type project_deliverable_status as enum (
  'pending',
  'on_track',
  'at_risk',
  'completed',
  'delayed'
);

-- ============================================================
-- TABELA: projects
-- ============================================================

create table projects (
  id uuid primary key default uuid_generate_v4(),
  code text not null unique,                   -- Ex.: PRJ-2026-018
  client_id   uuid references clients(id)   on delete set null,
  proposal_id uuid references proposals(id) on delete set null,
  owner_id    uuid references auth.users(id) on delete set null,

  name             text not null,
  client_snapshot  text not null,

  -- Fase atual: 1..6 (Levantamento, Estudo Prel., Anteprojeto,
  -- Projeto Legal, Executivo, Acompanhamento de Obra)
  current_phase    smallint not null default 1
                    check (current_phase between 1 and 6),
  current_phase_name text,

  progress_pct     integer  not null default 0
                    check (progress_pct between 0 and 100),
  not_started      boolean  not null default false,

  start_date       date,
  end_date         date,

  estimated_hours  integer  not null default 0,
  used_hours       integer  not null default 0,

  contract_value   numeric(12, 2) not null default 0,
  currency         text not null default 'BRL',

  status           project_status not null default 'active',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index idx_projects_status on projects (status) where deleted_at is null;
create index idx_projects_client on projects (client_id);
create index idx_projects_phase  on projects (current_phase);
create index idx_projects_code_trgm on projects using gin (code gin_trgm_ops);
create index idx_projects_name_trgm on projects using gin (name gin_trgm_ops);

create trigger trg_projects_updated_at
  before update on projects
  for each row execute function set_updated_at();

-- ============================================================
-- TABELA: project_phases (detalhamento de cada fase 1..6)
-- ============================================================

create table project_phases (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid not null references projects(id) on delete cascade,

  phase        smallint not null check (phase between 1 and 6),
  phase_name   text not null,
  description  text,

  start_date       date,
  end_date         date,
  estimated_hours  integer not null default 0,
  actual_hours     integer not null default 0,
  progress_pct     integer not null default 0
                     check (progress_pct between 0 and 100),
  status           project_phase_status not null default 'planning',
  sort_order       integer not null default 0,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (project_id, phase)
);

create index idx_project_phases_project on project_phases (project_id, sort_order);

create trigger trg_project_phases_updated_at
  before update on project_phases
  for each row execute function set_updated_at();

-- ============================================================
-- TABELA: project_tasks (cronograma / Gantt)
-- ============================================================

create table project_tasks (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid not null references projects(id) on delete cascade,
  phase      smallint check (phase between 1 and 6),

  title          text not null,
  description    text,
  start_date     date,
  end_date       date,
  duration_days  integer,               -- cache opcional (pode ser derivado)

  assigned_to    text,
  status         project_task_status   not null default 'pending',
  priority       project_task_priority not null default 'normal',
  progress_pct   integer not null default 0
                  check (progress_pct between 0 and 100),

  estimated_hours integer not null default 0,
  actual_hours    integer not null default 0,

  dependencies   uuid[] not null default '{}',   -- IDs de tarefas predecessoras
  sort_order     integer not null default 0,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_project_tasks_project on project_tasks (project_id, sort_order);
create index idx_project_tasks_phase   on project_tasks (project_id, phase);
create index idx_project_tasks_status  on project_tasks (status);
create index idx_project_tasks_dates   on project_tasks (start_date, end_date);

create trigger trg_project_tasks_updated_at
  before update on project_tasks
  for each row execute function set_updated_at();

-- ============================================================
-- TABELA: project_deliverables (marcos/entregas)
-- ============================================================

create table project_deliverables (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid not null references projects(id) on delete cascade,

  title           text not null,
  description     text,
  phase           smallint check (phase between 1 and 6),
  due_date        date,
  delivered_date  date,
  status          project_deliverable_status not null default 'pending',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_project_deliverables_project on project_deliverables (project_id);
create index idx_project_deliverables_due     on project_deliverables (due_date);

create trigger trg_project_deliverables_updated_at
  before update on project_deliverables
  for each row execute function set_updated_at();

-- ============================================================
-- RLS
-- ============================================================

alter table projects              enable row level security;
alter table project_phases        enable row level security;
alter table project_tasks         enable row level security;
alter table project_deliverables  enable row level security;

create policy "projects_auth_all" on projects
  for all to authenticated using (true) with check (true);

create policy "project_phases_auth_all" on project_phases
  for all to authenticated using (true) with check (true);

create policy "project_tasks_auth_all" on project_tasks
  for all to authenticated using (true) with check (true);

create policy "project_deliverables_auth_all" on project_deliverables
  for all to authenticated using (true) with check (true);
