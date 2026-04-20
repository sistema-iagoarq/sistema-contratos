import { useState } from 'react'
import { progressClass, type Phase } from './data'

type Scale = 'month' | 'quarter' | 'year'

type Bar = { phase: Phase; label: string; start: number; w: number }
type Row = { name: string; client: string; progress?: number; bars: Bar[] }

const yearProjects: Row[] = [
  {
    name: 'Residência Alphaville',
    client: 'Marina Costa',
    progress: 62,
    bars: [
      { phase: 1, label: 'Levant.', start: 0, w: 8.33 },
      { phase: 2, label: 'Est.Prel', start: 8.33, w: 8.33 },
      { phase: 3, label: 'Anteproj.', start: 16.66, w: 8.33 },
      { phase: 4, label: 'Legal', start: 25.0, w: 4.16 },
      { phase: 5, label: 'Executivo', start: 29.16, w: 20.0 },
    ],
  },
  {
    name: 'Loja Conceito Noma',
    client: 'Atelier Noma',
    progress: 85,
    bars: [
      { phase: 1, label: 'Lev.', start: 0, w: 4.16 },
      { phase: 2, label: 'Est', start: 4.16, w: 4.16 },
      { phase: 3, label: 'Anteproj.', start: 8.33, w: 8.33 },
      { phase: 5, label: 'Exec', start: 16.66, w: 12.5 },
      { phase: 6, label: 'Obra', start: 29.16, w: 12.5 },
    ],
  },
  {
    name: 'Escritório Setor Bueno',
    client: 'Ricardo Vaz',
    progress: 40,
    bars: [
      { phase: 1, label: 'Lev.', start: 8.33, w: 4.16 },
      { phase: 2, label: 'Est.Prel.', start: 12.5, w: 8.33 },
      { phase: 3, label: 'Anteprojeto', start: 20.83, w: 12.5 },
      { phase: 5, label: 'Executivo', start: 33.33, w: 16.66 },
    ],
  },
  {
    name: 'Galpão Transvale',
    client: 'Transvale',
    progress: 18,
    bars: [
      { phase: 1, label: 'Levant.', start: 16.66, w: 8.33 },
      { phase: 2, label: 'Estudo', start: 25.0, w: 16.66 },
      { phase: 5, label: 'Executivo', start: 41.66, w: 33.33 },
    ],
  },
  {
    name: 'Casa Jardins',
    client: 'Paula Andrade',
    progress: 25,
    bars: [
      { phase: 1, label: 'Lev', start: 16.66, w: 4.16 },
      { phase: 2, label: 'Estudo Prel.', start: 20.83, w: 12.5 },
      { phase: 3, label: 'Anteprojeto', start: 33.33, w: 16.66 },
      { phase: 5, label: 'Executivo', start: 50.0, w: 25.0 },
    ],
  },
  {
    name: 'Retrofit Hotel Mirante',
    client: 'Hotel Mirante',
    progress: 10,
    bars: [
      { phase: 1, label: 'Levantamento', start: 25.0, w: 16.66 },
      { phase: 2, label: 'Estudo', start: 41.66, w: 8.33 },
      { phase: 3, label: 'Antepr.', start: 50.0, w: 12.5 },
      { phase: 5, label: 'Executivo', start: 62.5, w: 25.0 },
      { phase: 6, label: 'Obra', start: 87.5, w: 12.5 },
    ],
  },
  {
    name: 'Clínica Vertex',
    client: 'Clínica Vertex',
    progress: 78,
    bars: [
      { phase: 2, label: 'Est', start: 0, w: 4.16 },
      { phase: 3, label: 'Antepr.', start: 4.16, w: 12.5 },
      { phase: 5, label: 'Executivo', start: 16.66, w: 20.83 },
    ],
  },
  {
    name: 'Cobertura Marista',
    client: 'Fabio Mourão',
    progress: 100,
    bars: [
      { phase: 3, label: 'Antepr.', start: 0, w: 8.33 },
      { phase: 5, label: 'Executivo', start: 8.33, w: 25.0 },
    ],
  },
]

const quarterProjects: Row[] = [
  {
    name: 'Residência Alphaville',
    client: 'Marina Costa',
    progress: 62,
    bars: [{ phase: 5, label: 'Projeto Executivo', start: 16.66, w: 66.66 }],
  },
  {
    name: 'Loja Conceito Noma',
    client: 'Atelier Noma',
    progress: 85,
    bars: [
      { phase: 5, label: 'Exec.', start: 0, w: 25 },
      { phase: 6, label: 'Acompanhamento Obra', start: 25, w: 50 },
    ],
  },
  {
    name: 'Escritório Setor Bueno',
    client: 'Ricardo Vaz',
    progress: 40,
    bars: [
      { phase: 3, label: 'Anteprojeto', start: 0, w: 50 },
      { phase: 5, label: 'Início Executivo', start: 50, w: 50 },
    ],
  },
  {
    name: 'Clínica Vertex',
    client: 'Clínica Vertex',
    progress: 78,
    bars: [{ phase: 5, label: 'Projeto Executivo · Entrega', start: 0, w: 33 }],
  },
  {
    name: 'Casa Jardins',
    client: 'Paula Andrade',
    progress: 25,
    bars: [
      { phase: 2, label: 'Estudo', start: 0, w: 25 },
      { phase: 3, label: 'Anteprojeto', start: 25, w: 50 },
    ],
  },
  {
    name: 'Hotel Mirante',
    client: 'Hotel Mirante',
    progress: 10,
    bars: [
      { phase: 1, label: 'Levantamento', start: 0, w: 50 },
      { phase: 2, label: 'Est. Prel.', start: 50, w: 25 },
    ],
  },
]

const monthProjects: Row[] = [
  {
    name: 'Residência Alphaville',
    client: 'Marina Costa · Executivo · 62%',
    bars: [{ phase: 5, label: 'Detalhamentos • Planta de forros', start: 0, w: 100 }],
  },
  {
    name: 'Escritório Setor Bueno',
    client: 'Ricardo Vaz · Anteprojeto · 40%',
    bars: [{ phase: 3, label: 'Anteprojeto · renderizações', start: 0, w: 100 }],
  },
  {
    name: 'Loja Conceito Noma',
    client: 'Atelier Noma · Obra · 85%',
    bars: [{ phase: 6, label: 'Visitas técnicas (3)', start: 15, w: 60 }],
  },
  {
    name: 'Clínica Vertex',
    client: 'Clínica Vertex · Executivo · 78%',
    bars: [{ phase: 5, label: 'Memorial + especificações', start: 0, w: 70 }],
  },
  {
    name: 'Casa Jardins',
    client: 'Paula Andrade · Estudo · 25%',
    bars: [{ phase: 2, label: 'Estudo Preliminar', start: 10, w: 60 }],
  },
  {
    name: 'Galpão Transvale',
    client: 'Transvale · Estudo · 18%',
    bars: [{ phase: 2, label: 'Estudo Preliminar · volumetria', start: 20, w: 80 }],
  },
]

const monthDays = Array.from({ length: 30 }, (_, i) => String(i + 1))
const quarterWeeks = [
  'Abr · S1', 'Abr · S2', 'Abr · S3', 'Abr · S4',
  'Mai · S1', 'Mai · S2', 'Mai · S3', 'Mai · S4',
  'Jun · S1', 'Jun · S2', 'Jun · S3', 'Jun · S4',
]
const yearMonths = [
  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
]

export function GanttView() {
  const [scale, setScale] = useState<Scale>('year')

  const periods =
    scale === 'month' ? monthDays : scale === 'quarter' ? quarterWeeks : yearMonths
  const rows =
    scale === 'month' ? monthProjects : scale === 'quarter' ? quarterProjects : yearProjects
  const todayLeft = scale === 'month' ? '63.33%' : scale === 'quarter' ? '16.66%' : '31.25%'
  const colSize = `calc(100% / ${periods.length})`

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '4px 0 12px',
        }}
      >
        <div style={{ fontSize: 13, color: 'var(--gray-500)' }}>
          Cronograma 2026 ·{' '}
          <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic' }}>
            {scale === 'month'
              ? 'abril · dia a dia'
              : scale === 'quarter'
                ? 'abr–jun · por semana'
                : 'jan–dez · visão anual'}
          </span>
        </div>
        <div className="view-toggle">
          <button
            className={`vt-btn${scale === 'month' ? ' active' : ''}`}
            onClick={() => setScale('month')}
          >
            Mês
          </button>
          <button
            className={`vt-btn${scale === 'quarter' ? ' active' : ''}`}
            onClick={() => setScale('quarter')}
          >
            Trimestre
          </button>
          <button
            className={`vt-btn${scale === 'year' ? ' active' : ''}`}
            onClick={() => setScale('year')}
          >
            Ano
          </button>
        </div>
      </div>

      <div className="gantt-wrap">
        <div className="gantt-header">
          <div className="gantt-head-cell">Projeto</div>
          <div
            className="gantt-periods"
            style={{ gridTemplateColumns: `repeat(${periods.length}, 1fr)` }}
          >
            {periods.map((p, i) => (
              <div key={i}>{p}</div>
            ))}
          </div>
        </div>

        {rows.map((row) => (
          <div
            className="gantt-row"
            key={row.name}
            style={{ ['--col-size' as string]: colSize }}
          >
            <div className="gantt-info">
              {scale === 'year' && row.progress !== undefined && (
                <MiniRing progress={row.progress} />
              )}
              <div className="gantt-info-text">
                <div className="gantt-proj-name">{row.name}</div>
                <div className="gantt-proj-client">
                  {row.client}
                  {scale !== 'month' && row.progress !== undefined
                    ? ` · ${row.progress}%`
                    : ''}
                </div>
              </div>
            </div>
            <div
              className="gantt-track"
              style={{ ['--col-size' as string]: colSize }}
            >
              {row.bars.map((b, i) => (
                <div
                  key={i}
                  className={`gantt-bar phase-${b.phase}`}
                  style={{ left: `${b.start}%`, width: `${b.w}%` }}
                  title={b.label}
                >
                  {b.label}
                </div>
              ))}
              <div className="gantt-bar-today" style={{ left: todayLeft }} />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

function MiniRing({ progress }: { progress: number }) {
  const r = 13
  const c = 2 * Math.PI * r
  const offset = c - (progress / 100) * c
  const klass = progressClass(progress)
  return (
    <div className="gantt-mini-ring">
      <svg viewBox="0 0 32 32">
        <circle cx="16" cy="16" r={r} className="bg" />
        <circle
          cx="16"
          cy="16"
          r={r}
          className="fg"
          stroke={`var(--p-${klass})`}
          strokeDasharray={c.toFixed(2)}
          strokeDashoffset={offset.toFixed(2)}
        />
      </svg>
    </div>
  )
}
