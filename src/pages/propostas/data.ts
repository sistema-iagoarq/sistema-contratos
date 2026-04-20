export type ProposalStatus =
  | 'draft'
  | 'sent'
  | 'analysis'
  | 'negotiation'
  | 'approved'
  | 'rejected'
  | 'expired'

export type SlaState = 'ok' | 'warn' | 'late'

export type Proposal = {
  id: string
  client: string
  scope: string
  value: string
  status: ProposalStatus
  sent: string
  expires: string
  sla: { days: number; total: number; state: SlaState; label: string }
}

export const statusClassMap: Record<ProposalStatus, string> = {
  draft: 'status-draft',
  sent: 'status-sent',
  analysis: 'status-analysis',
  negotiation: 'status-negotiation',
  approved: 'status-approved',
  rejected: 'status-rejected',
  expired: 'status-expired',
}

export const statusLabelMap: Record<ProposalStatus, string> = {
  draft: 'Rascunho',
  sent: 'Enviada',
  analysis: 'Em Análise',
  negotiation: 'Em Negociação',
  approved: 'Aprovada',
  rejected: 'Recusada',
  expired: 'Expirada',
}

export const proposals: Proposal[] = [
  {
    id: 'P-2026-041',
    client: 'Marina Andrade Costa',
    scope: 'Projeto Executivo Residencial',
    value: 'R$ 68.400',
    status: 'approved',
    sent: '10/04',
    expires: '25/04',
    sla: { days: 0, total: 15, state: 'ok', label: 'Aprovada' },
  },
  {
    id: 'P-2026-040',
    client: 'Hotel Mirante',
    scope: 'Retrofit + Interiores',
    value: 'R$ 456.000',
    status: 'negotiation',
    sent: '08/04',
    expires: '23/04',
    sla: { days: 12, total: 15, state: 'warn', label: '3 dias restantes' },
  },
  {
    id: 'P-2026-039',
    client: 'Paula Andrade',
    scope: 'Casa · Projeto Completo',
    value: 'R$ 210.000',
    status: 'analysis',
    sent: '05/04',
    expires: '20/04',
    sla: { days: 15, total: 15, state: 'late', label: 'Vence hoje' },
  },
  {
    id: 'P-2026-038',
    client: 'Transvale Logística',
    scope: 'Galpão Industrial',
    value: 'R$ 340.000',
    status: 'negotiation',
    sent: '02/04',
    expires: '17/04',
    sla: { days: 18, total: 15, state: 'late', label: 'Atrasada 3 dias' },
  },
  {
    id: 'P-2026-037',
    client: 'Giovana Alencar',
    scope: 'Residência Cond. Aldeia',
    value: 'R$ 98.000',
    status: 'approved',
    sent: '30/03',
    expires: '14/04',
    sla: { days: 0, total: 15, state: 'ok', label: 'Aprovada' },
  },
  {
    id: 'P-2026-036',
    client: 'Clínica Nova Era',
    scope: 'Interiores Clínica',
    value: 'R$ 54.000',
    status: 'rejected',
    sent: '28/03',
    expires: '12/04',
    sla: { days: 0, total: 15, state: 'ok', label: 'Finalizada' },
  },
  {
    id: 'P-2026-035',
    client: 'Ricardo Vaz',
    scope: 'Escritório Setor Bueno',
    value: 'R$ 62.000',
    status: 'approved',
    sent: '25/03',
    expires: '10/04',
    sla: { days: 0, total: 15, state: 'ok', label: 'Aprovada' },
  },
  {
    id: 'P-2026-034',
    client: 'Atelier Noma',
    scope: 'Loja Conceito 90m²',
    value: 'R$ 54.000',
    status: 'approved',
    sent: '22/03',
    expires: '06/04',
    sla: { days: 0, total: 15, state: 'ok', label: 'Aprovada' },
  },
  {
    id: 'P-2026-033',
    client: 'Fernanda Lima',
    scope: 'Residência 180m²',
    value: 'R$ 76.000',
    status: 'draft',
    sent: '—',
    expires: '—',
    sla: { days: 0, total: 0, state: 'ok', label: 'Não enviada' },
  },
  {
    id: 'P-2026-032',
    client: 'Studio Arq+',
    scope: 'Consultoria · 3 meses',
    value: 'R$ 28.000',
    status: 'expired',
    sent: '20/03',
    expires: '04/04',
    sla: { days: 30, total: 15, state: 'late', label: 'Expirada' },
  },
]

export const statusFilters: Array<{
  key: ProposalStatus | 'all'
  label: string
  count: number
  color?: string
}> = [
  { key: 'all', label: 'Todas', count: 24 },
  { key: 'draft', label: 'Rascunho', count: 1, color: 'var(--s-draft)' },
  { key: 'sent', label: 'Enviada', count: 2, color: 'var(--s-sent)' },
  { key: 'analysis', label: 'Análise', count: 3, color: 'var(--s-analysis)' },
  { key: 'negotiation', label: 'Negociação', count: 2, color: 'var(--s-negotiation)' },
  { key: 'approved', label: 'Aprovada', count: 14, color: 'var(--s-approved)' },
  { key: 'rejected', label: 'Recusada', count: 1, color: 'var(--s-rejected)' },
  { key: 'expired', label: 'Expirada', count: 1, color: 'var(--s-expired)' },
]
