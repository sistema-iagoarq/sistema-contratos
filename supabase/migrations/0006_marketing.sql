-- ============================================================
--  Módulo Marketing — schema inicial
--  Calendário editorial (Instagram) e anúncios pagos
--  (Instagram Ads, Meta Ads, Google Ads).
-- ============================================================

-- ============================================================
-- ENUMS
-- ============================================================

create type content_type as enum (
  'ct-post',
  'ct-reels',
  'ct-carousel',
  'ct-story'
);

create type content_status as enum ('draft', 'scheduled', 'published', 'archived');

create type content_approval as enum ('pending_approval', 'approved', 'rejected');

create type ad_platform as enum ('ad-instagram', 'ad-meta', 'ad-google');

create type ad_status as enum ('active', 'paused', 'ended');

-- ============================================================
-- TABELA: content_publications (calendário editorial)
-- ============================================================

create table content_publications (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid references auth.users(id) on delete set null,

  title       text not null,
  type        content_type not null,
  caption     text,
  assets      text[] not null default '{}',        -- paths/URLs dos assets
  hashtags    text[] not null default '{}',

  scheduled_date  date,
  scheduled_time  time,
  published_at    timestamptz,

  status      content_status   not null default 'draft',
  approval    content_approval not null default 'pending_approval',
  approved_by text,

  -- Vínculos (ex.: post sobre um projeto específico)
  project_id  uuid references projects(id) on delete set null,
  client_id   uuid references clients(id)  on delete set null,

  meta        text,                                -- nota livre exibida na UI

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index idx_content_scheduled on content_publications (scheduled_date, scheduled_time);
create index idx_content_status    on content_publications (status);
create index idx_content_type      on content_publications (type);
create index idx_content_project   on content_publications (project_id);

create trigger trg_content_updated_at
  before update on content_publications
  for each row execute function set_updated_at();

-- ============================================================
-- TABELA: ad_campaigns (campanhas pagas)
-- ============================================================

create table ad_campaigns (
  id uuid primary key default uuid_generate_v4(),

  name            text not null,
  meta            text,                            -- descrição curta exibida na UI
  platform        ad_platform not null,
  platform_label  text,                            -- "Instagram", "Meta Ads", "Google Ads"
  external_campaign_id text,                       -- ID nativo na plataforma

  status          ad_status not null default 'active',

  start_date      date,
  end_date        date,
  period_display  text,                            -- "01/04 → 30/04" (exibição)

  budget          numeric(12, 2) not null default 0,
  spent           numeric(12, 2) not null default 0,
  currency        text not null default 'BRL',

  -- Métricas (podem vir da API da plataforma)
  reach_label     text,                            -- "42.8k" — exibição
  reach           integer,
  impressions     integer,
  ctr_label       text,                            -- "3.1%"
  ctr             numeric(6, 3),
  cpc             numeric(10, 2),
  conversions     integer,
  leads           integer,

  notes           text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,

  constraint ad_budget_nonneg check (budget >= 0 and spent >= 0)
);

create index idx_ad_platform on ad_campaigns (platform);
create index idx_ad_status   on ad_campaigns (status);
create index idx_ad_period   on ad_campaigns (start_date, end_date);

create trigger trg_ad_campaigns_updated_at
  before update on ad_campaigns
  for each row execute function set_updated_at();

-- ============================================================
-- TABELA: ad_metric_snapshots (histórico diário das métricas)
-- Opcional — para gráficos de evolução de gasto/reach/CTR.
-- ============================================================

create table ad_metric_snapshots (
  id uuid primary key default uuid_generate_v4(),
  campaign_id uuid not null references ad_campaigns(id) on delete cascade,

  snapshot_date date not null,
  spent       numeric(12, 2) not null default 0,
  reach       integer,
  impressions integer,
  clicks      integer,
  ctr         numeric(6, 3),
  cpc         numeric(10, 2),
  conversions integer,
  leads       integer,

  created_at timestamptz not null default now(),
  unique (campaign_id, snapshot_date)
);

create index idx_ad_snap_campaign on ad_metric_snapshots (campaign_id, snapshot_date desc);

-- ============================================================
-- RLS
-- ============================================================

alter table content_publications enable row level security;
alter table ad_campaigns         enable row level security;
alter table ad_metric_snapshots  enable row level security;

create policy "content_publications_auth_all" on content_publications
  for all to authenticated using (true) with check (true);

create policy "ad_campaigns_auth_all" on ad_campaigns
  for all to authenticated using (true) with check (true);

create policy "ad_metric_snapshots_auth_all" on ad_metric_snapshots
  for all to authenticated using (true) with check (true);
