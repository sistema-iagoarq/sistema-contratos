-- ============================================================
--  Módulo Agenda — schema inicial
--  Eventos de calendário (reuniões, visitas, entregas, deadlines,
--  ligações, internos, pessoais) com vínculo opcional a clientes,
--  propostas e projetos.
-- ============================================================

-- ============================================================
-- ENUMS
-- ============================================================

create type calendar_event_type as enum (
  'e-meeting',
  'e-visit',
  'e-delivery',
  'e-deadline',
  'e-call',
  'e-internal',
  'e-personal'
);

-- ============================================================
-- TABELA: calendar_events
-- ============================================================

create table calendar_events (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid references auth.users(id) on delete set null,

  title       text not null,
  type        calendar_event_type not null default 'e-meeting',
  type_label  text,                      -- override opcional de exibição

  -- Quando
  event_date  date not null,
  start_time  time,                      -- null quando all_day = true
  end_time    time,
  all_day     boolean not null default false,
  duration_minutes integer,              -- cache opcional (derivável)
  alt_time    time,                      -- horário alternativo exibido na UI

  -- Onde e detalhes
  location    text,
  description text,
  meta        text,                      -- metadados livres (linhas extras na UI)
  attendees   text[] not null default '{}',

  -- Vínculos
  client_id   uuid references clients(id)   on delete set null,
  project_id  uuid references projects(id)  on delete set null,
  proposal_id uuid references proposals(id) on delete set null,

  -- Status e lembretes
  is_tentative boolean not null default false,
  reminders_at timestamptz[] not null default '{}',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,

  constraint calendar_events_time_range
    check (
      all_day
      or start_time is null
      or end_time is null
      or end_time > start_time
    )
);

create index idx_cal_events_owner   on calendar_events (owner_id);
create index idx_cal_events_date    on calendar_events (event_date);
create index idx_cal_events_type    on calendar_events (type);
create index idx_cal_events_project on calendar_events (project_id);
create index idx_cal_events_client  on calendar_events (client_id);
create index idx_cal_events_active  on calendar_events (event_date) where deleted_at is null;

create trigger trg_cal_events_updated_at
  before update on calendar_events
  for each row execute function set_updated_at();

-- ============================================================
-- RLS
-- ============================================================

alter table calendar_events enable row level security;

create policy "calendar_events_auth_all" on calendar_events
  for all to authenticated using (true) with check (true);
