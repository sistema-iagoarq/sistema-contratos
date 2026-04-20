export type Phase = 1 | 2 | 3 | 4 | 5 | 6

export type Project = {
  id: string
  name: string
  client: string
  phase: Phase
  phaseName: string
  progress: number
  start: string
  end: string
  hours: string
  value: string
  notStarted?: boolean
}

export const projects: Project[] = [
  {
    id: 'PRJ-2026-018',
    name: 'Residência Alphaville Flamboyant',
    client: 'Marina Costa',
    phase: 5,
    phaseName: 'Projeto Executivo',
    progress: 62,
    start: '15/01/26',
    end: '28/06/26',
    hours: '284/460',
    value: 'R$ 145.000',
  },
  {
    id: 'PRJ-2026-017',
    name: 'Loja Conceito Atelier Noma',
    client: 'Atelier Noma',
    phase: 6,
    phaseName: 'Acompanhamento Obra',
    progress: 85,
    start: '08/01/26',
    end: '20/05/26',
    hours: '312/380',
    value: 'R$ 54.000',
  },
  {
    id: 'PRJ-2026-015',
    name: 'Escritório Setor Bueno',
    client: 'Ricardo Vaz',
    phase: 3,
    phaseName: 'Anteprojeto',
    progress: 40,
    start: '20/02/26',
    end: '30/07/26',
    hours: '96/240',
    value: 'R$ 62.000',
  },
  {
    id: 'PRJ-2026-014',
    name: 'Galpão Industrial Transvale',
    client: 'Transvale Logística',
    phase: 2,
    phaseName: 'Estudo Preliminar',
    progress: 18,
    start: '10/03/26',
    end: '15/12/26',
    hours: '42/520',
    value: 'R$ 340.000',
  },
  {
    id: 'PRJ-2026-013',
    name: 'Casa Jardins',
    client: 'Paula Andrade',
    phase: 2,
    phaseName: 'Estudo Preliminar',
    progress: 25,
    start: '05/03/26',
    end: '10/11/26',
    hours: '58/420',
    value: 'R$ 210.000',
  },
  {
    id: 'PRJ-2026-012',
    name: 'Retrofit Hotel Mirante',
    client: 'Hotel Mirante',
    phase: 1,
    phaseName: 'Levantamento',
    progress: 10,
    start: '01/04/26',
    end: '15/01/27',
    hours: '22/880',
    value: 'R$ 456.000',
  },
  {
    id: 'PRJ-2026-011',
    name: 'Clínica Vertex — Interiores',
    client: 'Clínica Vertex',
    phase: 5,
    phaseName: 'Projeto Executivo',
    progress: 78,
    start: '20/11/25',
    end: '10/05/26',
    hours: '246/310',
    value: 'R$ 78.000',
  },
  {
    id: 'PRJ-2026-010',
    name: 'Cobertura Setor Marista',
    client: 'Fabio Mourão',
    phase: 5,
    phaseName: 'Projeto Executivo',
    progress: 100,
    start: '05/10/25',
    end: '20/04/26',
    hours: '380/380',
    value: 'R$ 128.000',
  },
  {
    id: 'PRJ-2026-009',
    name: 'Consultoria Casa Modelo',
    client: 'GV Construtora',
    phase: 4,
    phaseName: 'Projeto Legal',
    progress: 92,
    start: '15/12/25',
    end: '30/04/26',
    hours: '88/120',
    value: 'R$ 32.000',
  },
  {
    id: 'PRJ-2026-008',
    name: 'Residência Condomínio Aldeia',
    client: 'Giovana Alencar',
    phase: 3,
    phaseName: 'Anteprojeto',
    progress: 0,
    start: '25/04/26',
    end: '30/10/26',
    hours: '0/400',
    value: 'R$ 98.000',
    notStarted: true,
  },
]

export type ProgressClass = 'none' | 'start' | 'early' | 'mid' | 'late' | 'done'

export function progressClass(p: number): ProgressClass {
  if (p === 0) return 'none'
  if (p === 100) return 'done'
  if (p <= 25) return 'start'
  if (p <= 50) return 'early'
  if (p <= 75) return 'mid'
  return 'late'
}

export function progressLabel(c: ProgressClass): string {
  return (
    {
      none: 'Não iniciado',
      start: 'Início',
      early: 'Andamento',
      mid: 'Avançado',
      late: 'Finalização',
      done: 'Concluído',
    } as const
  )[c]
}

export const phaseLegend: Array<{ phase: Phase; label: string }> = [
  { phase: 1, label: '01 · Levantamento' },
  { phase: 2, label: '02 · Estudo Preliminar' },
  { phase: 3, label: '03 · Anteprojeto' },
  { phase: 4, label: '04 · Projeto Legal' },
  { phase: 5, label: '05 · Executivo' },
  { phase: 6, label: '06 · Acompanhamento de Obra' },
]
