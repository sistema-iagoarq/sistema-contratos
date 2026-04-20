export type EventType =
  | 'e-meeting'
  | 'e-visit'
  | 'e-delivery'
  | 'e-deadline'
  | 'e-call'
  | 'e-internal'
  | 'e-personal'

export type CalEvent = { t: string; title: string; type: EventType }

export const monthEvents: Record<number, CalEvent[]> = {
  2: [{ t: '09:00', title: 'Entrega v1 · Noma', type: 'e-delivery' }],
  3: [{ t: '14:00', title: 'Reunião Paula Andrade', type: 'e-meeting' }],
  6: [
    { t: '10:00', title: 'Visita obra Noma', type: 'e-visit' },
    { t: '15:00', title: 'Call Helena · estrutural', type: 'e-call' },
  ],
  7: [{ t: '11:00', title: 'Briefing Clínica Vertex', type: 'e-meeting' }],
  8: [{ t: '09:00', title: 'Entrega P-2026-040', type: 'e-delivery' }],
  9: [{ t: '14:30', title: 'Review equipe', type: 'e-internal' }],
  10: [
    { t: '10:00', title: 'Entrega alvará · Alphaville', type: 'e-delivery' },
    { t: '16:00', title: 'Visita Hotel Mirante', type: 'e-visit' },
  ],
  13: [{ t: '09:00', title: 'Reunião comitê equipe', type: 'e-internal' }],
  14: [{ t: '14:00', title: 'Marina · revisão 3D', type: 'e-meeting' }],
  15: [{ t: '14:30', title: 'Reunião v2 · Mirante', type: 'e-meeting' }],
  16: [{ t: '10:00', title: 'Visita técnica Transvale', type: 'e-visit' }],
  17: [
    { t: '11:00', title: 'Call · Studio Lume', type: 'e-call' },
    { t: '15:00', title: 'Deadline P-2026-035', type: 'e-deadline' },
  ],
  20: [
    { t: '09:30', title: 'Briefing Fernanda Lima', type: 'e-meeting' },
    { t: '11:00', title: 'Visita Galpão Transvale', type: 'e-visit' },
    { t: '14:00', title: 'Marina · Alphaville', type: 'e-meeting' },
    { t: '17:00', title: 'Review semanal', type: 'e-internal' },
  ],
  21: [
    { t: '08:00', title: 'Entrega planta forros', type: 'e-delivery' },
    { t: '15:00', title: 'Visita obra Noma', type: 'e-visit' },
  ],
  22: [
    { t: '10:00', title: 'Detalhamento adega', type: 'e-internal' },
    { t: '14:00', title: 'Aprovação paginação', type: 'e-meeting' },
  ],
  23: [
    { t: '10:00', title: 'Entrega Executivo v2', type: 'e-delivery' },
    { t: '16:00', title: 'Deadline Alphaville', type: 'e-deadline' },
  ],
  24: [{ t: '14:00', title: 'Reunião fornecedores', type: 'e-meeting' }],
  27: [{ t: '09:00', title: 'Kick-off Casa Jardins', type: 'e-meeting' }],
  28: [
    { t: '11:00', title: 'Visita técnica Mirante', type: 'e-visit' },
    { t: '15:00', title: 'Call cliente Vertex', type: 'e-call' },
  ],
  29: [{ t: '10:00', title: 'Entrega estrutural', type: 'e-delivery' }],
  30: [{ t: '14:00', title: 'Encerramento mensal', type: 'e-internal' }],
}

export type DayEvent = {
  time: string
  altTime?: string
  typeLabel: string
  title: string
  meta: string
  type: EventType
}

export const todayEvents: DayEvent[] = [
  {
    time: '09:30',
    altTime: '10:30',
    typeLabel: 'Reunião',
    title: 'Briefing com Fernanda Lima',
    meta: 'Nova cliente · Residencial 180m²\nEscritório IS · Laura Mendonça',
    type: 'e-meeting',
  },
  {
    time: '11:00',
    altTime: '12:30',
    typeLabel: 'Visita',
    title: 'Visita técnica · Galpão Transvale',
    meta: 'Levantamento cadastral\nAv. Anhanguera, 8420',
    type: 'e-visit',
  },
  {
    time: '14:00',
    altTime: '15:40',
    typeLabel: 'Reunião',
    title: 'Marina Costa · Executivo Alphaville',
    meta: 'Aprovação de paginação de pisos\nPresencial · Escritório IS',
    type: 'e-meeting',
  },
  {
    time: '17:00',
    altTime: '18:00',
    typeLabel: 'Interno',
    title: 'Review semanal da equipe',
    meta: 'Sala de reuniões',
    type: 'e-internal',
  },
]

export const tomorrowEvents: DayEvent[] = [
  {
    time: '08:00 · dia todo',
    typeLabel: 'Entrega',
    title: 'Entrega da planta de forros · Alphaville',
    meta: 'Fase 5 · Projeto Executivo',
    type: 'e-delivery',
  },
  {
    time: '10:30',
    altTime: '11:00',
    typeLabel: 'Ligação',
    title: 'Retorno · Eng. Helena Martins',
    meta: 'Compatibilização estrutural',
    type: 'e-call',
  },
  {
    time: '15:00',
    altTime: '17:00',
    typeLabel: 'Visita',
    title: 'Obra Atelier Noma',
    meta: 'Acompanhamento · visita 12 de 16',
    type: 'e-visit',
  },
]

export type WeekEvent = {
  day: number
  start: number
  end: number
  title: string
  type: EventType
}

export const weekEvents: WeekEvent[] = [
  { day: 0, start: 9.5, end: 10.5, title: 'Briefing Fernanda Lima', type: 'e-meeting' },
  { day: 0, start: 11, end: 12.5, title: 'Visita Transvale', type: 'e-visit' },
  { day: 0, start: 14, end: 15.66, title: 'Marina · Alphaville', type: 'e-meeting' },
  { day: 0, start: 17, end: 18, title: 'Review semanal', type: 'e-internal' },
  { day: 1, start: 8, end: 9, title: 'Entrega planta forros', type: 'e-delivery' },
  { day: 1, start: 10.5, end: 11, title: 'Call Helena · estrutural', type: 'e-call' },
  { day: 1, start: 15, end: 17, title: 'Visita obra Noma', type: 'e-visit' },
  { day: 2, start: 10, end: 11.5, title: 'Detalhamento adega', type: 'e-internal' },
  { day: 2, start: 14, end: 15.5, title: 'Aprovação paginação', type: 'e-meeting' },
  { day: 3, start: 10, end: 11, title: 'Entrega Executivo v2', type: 'e-delivery' },
  { day: 3, start: 16, end: 17, title: 'Deadline P-2026-040', type: 'e-deadline' },
  { day: 4, start: 14, end: 16, title: 'Reunião fornecedores', type: 'e-meeting' },
]

export const dayViewEvents: Array<{
  start: number
  end: number
  title: string
  type: EventType
  meta: string
}> = [
  {
    start: 9.5,
    end: 10.5,
    title: 'Briefing com Fernanda Lima',
    type: 'e-meeting',
    meta: 'Nova cliente · Residencial 180m² · Escritório IS',
  },
  {
    start: 11,
    end: 12.5,
    title: 'Visita técnica · Galpão Transvale',
    type: 'e-visit',
    meta: 'Levantamento cadastral · Av. Anhanguera 8420',
  },
  {
    start: 14,
    end: 15.66,
    title: 'Reunião · Marina Costa (Alphaville)',
    type: 'e-meeting',
    meta: 'Aprovação de paginação de pisos · Presencial',
  },
  {
    start: 17,
    end: 18,
    title: 'Review semanal da equipe',
    type: 'e-internal',
    meta: 'Sala de reuniões',
  },
]

export const legendEntries: Array<{ type: EventType; label: string }> = [
  { type: 'e-meeting', label: 'Reunião' },
  { type: 'e-visit', label: 'Visita técnica' },
  { type: 'e-delivery', label: 'Entrega de projeto' },
  { type: 'e-deadline', label: 'Deadline crítico' },
  { type: 'e-call', label: 'Ligação agendada' },
  { type: 'e-internal', label: 'Interno / escritório' },
  { type: 'e-personal', label: 'Pessoal' },
]

export function formatTime(decimal: number): string {
  const h = Math.floor(decimal)
  const m = Math.round((decimal - h) * 60)
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}
