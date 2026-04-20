export type ClientType = 'PF' | 'PJ'
export type ClientStage =
  | 'Prospecção'
  | 'Briefing'
  | 'Proposta'
  | 'Negociação'
  | 'Ativo'
  | 'Concluído'
  | 'Perdido'

export type Client = {
  name: string
  type: ClientType
  doc: string
  city: string
  stage: ClientStage
  origin: string
  project: string
  budget: string
  lastContact: string
  tags: string[]
}

export const clients: Client[] = [
  {
    name: 'Marina Andrade Costa',
    type: 'PF',
    doc: '042.xxx.xxx-18',
    city: 'Goiânia · GO',
    stage: 'Ativo',
    origin: 'Indicação',
    project: 'Residencial · 420m²',
    budget: 'R$ 145.000',
    lastContact: 'há 2h',
    tags: ['Alto Padrão', 'VIP'],
  },
  {
    name: 'Ricardo Vaz Empreendimentos',
    type: 'PJ',
    doc: '32.xxx.xxx/0001-92',
    city: 'Goiânia · GO',
    stage: 'Ativo',
    origin: 'Google Ads',
    project: 'Comercial · 240m²',
    budget: 'R$ 62.000',
    lastContact: 'há 5h',
    tags: ['Escritório'],
  },
  {
    name: 'Atelier Noma',
    type: 'PJ',
    doc: '18.xxx.xxx/0001-47',
    city: 'Goiânia · GO',
    stage: 'Ativo',
    origin: 'Instagram',
    project: 'Loja Conceito · 90m²',
    budget: 'R$ 54.000',
    lastContact: 'ontem',
    tags: ['Varejo', 'Conceito'],
  },
  {
    name: 'Paula Andrade',
    type: 'PF',
    doc: '018.xxx.xxx-44',
    city: 'Goiânia · GO',
    stage: 'Proposta',
    origin: 'Indicação',
    project: 'Casa · 420m²',
    budget: 'R$ 210.000',
    lastContact: 'há 3 dias',
    tags: ['Alto Padrão'],
  },
  {
    name: 'Hotel Mirante',
    type: 'PJ',
    doc: '22.xxx.xxx/0001-10',
    city: 'Caldas Novas · GO',
    stage: 'Proposta',
    origin: 'Site',
    project: 'Retrofit · 2.400m²',
    budget: 'R$ 480.000',
    lastContact: 'há 5 dias',
    tags: ['Estratégico', 'Hotelaria'],
  },
  {
    name: 'Giovana Alencar',
    type: 'PF',
    doc: '055.xxx.xxx-02',
    city: 'Anápolis · GO',
    stage: 'Negociação',
    origin: 'Instagram',
    project: 'Residência · Cond. Aldeia',
    budget: 'R$ 98.000',
    lastContact: 'há 1 dia',
    tags: ['Médio Padrão'],
  },
  {
    name: 'Transvale Logística',
    type: 'PJ',
    doc: '14.xxx.xxx/0001-88',
    city: 'Goiânia · GO',
    stage: 'Negociação',
    origin: 'LinkedIn',
    project: 'Galpão · 3.200m²',
    budget: 'R$ 340.000',
    lastContact: 'há 2 dias',
    tags: ['Industrial'],
  },
  {
    name: 'Fernanda Lima',
    type: 'PF',
    doc: '091.xxx.xxx-37',
    city: 'Goiânia · GO',
    stage: 'Prospecção',
    origin: 'Instagram',
    project: 'Residência · 180m²',
    budget: '—',
    lastContact: 'ontem',
    tags: ['Novo'],
  },
  {
    name: 'Clínica Vertex',
    type: 'PJ',
    doc: '28.xxx.xxx/0001-25',
    city: 'Goiânia · GO',
    stage: 'Prospecção',
    origin: 'Google',
    project: 'Interiores · 240m²',
    budget: '—',
    lastContact: 'há 4 dias',
    tags: ['Saúde'],
  },
  {
    name: 'Bruno Santana',
    type: 'PF',
    doc: '118.xxx.xxx-90',
    city: 'Brasília · DF',
    stage: 'Prospecção',
    origin: 'Site',
    project: 'Reforma · 120m²',
    budget: '—',
    lastContact: 'há 1 semana',
    tags: ['Reforma'],
  },
]

export function initials(name: string): string {
  return name
    .split(' ')
    .filter((w) => w[0] && w[0] === w[0].toUpperCase())
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
}

export function stageBadgeClass(stage: ClientStage): string {
  if (stage === 'Ativo' || stage === 'Concluído') return 'badge badge-dark'
  if (stage === 'Perdido') return 'badge badge-outline'
  return 'badge'
}
