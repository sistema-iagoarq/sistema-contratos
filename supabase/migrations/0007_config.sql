-- ============================================================
--  Módulo Configurações — schema inicial
--  Dados do escritório, preferências fiscais, integrações
--  externas e identidade da marca.
-- ============================================================

-- ============================================================
-- ENUMS
-- ============================================================

create type tax_regime as enum ('simples', 'presumido', 'real');

create type integration_status as enum ('connected', 'disconnected', 'error');

-- ============================================================
-- TABELA: company_settings (linha única por escritório)
-- ============================================================

create table company_settings (
  id uuid primary key default uuid_generate_v4(),

  -- Identificação
  legal_name              text not null,
  trade_name              text,
  cnpj                    text,
  technical_responsible   text,
  cau_number              text,

  -- Endereço
  address_street        text,
  address_number        text,
  address_complement    text,
  address_neighborhood  text,
  address_city          text,
  address_state         text,
  address_zip           text,

  -- Contatos institucionais
  email     text,
  phone     text,
  website   text,

  -- Preferências fiscais
  tax_regime     tax_regime     not null default 'simples',
  tax_regime_detail text,                      -- "Anexo IV", etc
  iss_rate_pct   numeric(5, 2),
  nfe_series     text,
  nfe_next_number integer not null default 1,

  -- Faturamento padrão
  default_currency text not null default 'BRL',
  default_payment_terms text,                  -- "50% entrada / 50% entrega"

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger trg_company_settings_updated_at
  before update on company_settings
  for each row execute function set_updated_at();

-- ============================================================
-- TABELA: integrations (serviços externos conectados)
-- ============================================================

create table integrations (
  id uuid primary key default uuid_generate_v4(),

  service_key    text not null unique,          -- "meta_business", "google_ads", "sigiss", "bank_inter"
  service_name   text not null,                 -- rótulo exibido
  category       text,                          -- "ads", "fiscal", "banking"
  description    text,

  status         integration_status not null default 'disconnected',

  -- Credenciais (tokens preferencialmente cifrados / Vault)
  access_token   text,
  refresh_token  text,
  token_expires_at timestamptz,
  scope          text[] not null default '{}',
  account_id     text,                          -- ID da conta externa conectada

  sync_enabled   boolean not null default false,
  sync_interval_minutes integer,
  last_sync_at   timestamptz,
  last_error     text,

  config         jsonb not null default '{}'::jsonb,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_integrations_status on integrations (status);

create trigger trg_integrations_updated_at
  before update on integrations
  for each row execute function set_updated_at();

-- ============================================================
-- TABELA: brand_identity (paleta, logotipo e tipografia)
-- ============================================================

create table brand_identity (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references company_settings(id) on delete cascade,

  primary_color   text,                         -- hex
  secondary_color text,
  accent_color    text,
  neutral_light   text not null default '#FFFFFF',
  neutral_mid     text not null default '#737373',
  neutral_dark    text not null default '#000000',
  extra_palette   jsonb not null default '[]'::jsonb,    -- cores adicionais [{hex, label}]

  logo_url         text,
  logo_dark_url    text,
  favicon_url      text,

  display_font     text not null default 'Instrument Serif',
  body_font        text not null default 'Geist',
  mono_font        text,

  tagline          text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger trg_brand_identity_updated_at
  before update on brand_identity
  for each row execute function set_updated_at();

-- ============================================================
-- TABELA: user_preferences (preferências por usuário)
-- ============================================================

create table user_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,

  theme           text not null default 'light',        -- light, dark, system
  language        text not null default 'pt-BR',
  timezone        text not null default 'America/Sao_Paulo',
  date_format     text not null default 'DD/MM/YYYY',
  number_format   text not null default 'pt-BR',

  default_landing text not null default 'dashboard',    -- chave da rota inicial

  notifications   jsonb not null default '{}'::jsonb,   -- { email:true, whatsapp:false, ... }

  updated_at timestamptz not null default now()
);

create trigger trg_user_preferences_updated_at
  before update on user_preferences
  for each row execute function set_updated_at();

-- ============================================================
-- RLS
-- ============================================================

alter table company_settings  enable row level security;
alter table integrations      enable row level security;
alter table brand_identity    enable row level security;
alter table user_preferences  enable row level security;

create policy "company_settings_auth_all" on company_settings
  for all to authenticated using (true) with check (true);

create policy "integrations_auth_all" on integrations
  for all to authenticated using (true) with check (true);

create policy "brand_identity_auth_all" on brand_identity
  for all to authenticated using (true) with check (true);

create policy "user_preferences_auth_owner" on user_preferences
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());
