import { useState } from 'react'
import {
  phaseLegend,
  progressClass,
  progressLabel,
  projects,
  type Phase,
  type Project,
} from './data'
import { GanttView } from './GanttView'

type ListMode = 'cards' | 'table' | 'gantt'

type Props = {
  onOpen: (id: string) => void
}

const phaseFilters: Array<{ key: Phase | 'all'; label: string; count: number }> = [
  { key: 'all', label: 'Todas', count: 18 },
  { key: 1, label: 'Levantamento', count: 2 },
  { key: 2, label: 'Estudo', count: 3 },
  { key: 3, label: 'Anteprojeto', count: 4 },
  { key: 4, label: 'Legal', count: 2 },
  { key: 5, label: 'Executivo', count: 5 },
  { key: 6, label: 'Obra', count: 2 },
]

export function ListView({ onOpen }: Props) {
  const [mode, setMode] = useState<ListMode>('cards')
  const [phase, setPhase] = useState<Phase | 'all'>('all')

  return (
    <div className="view">
      <div className="guide-card">
        <div className="guide-title">
          Paleta de Fases{' '}
          <span className="hint">
            — cada etapa do ciclo arquitetônico tem uma cor própria
          </span>
        </div>
        <div className="guide-items">
          {phaseLegend.map((p) => (
            <span key={p.phase} className={`phase-chip phase-${p.phase}`}>
              {p.label}
            </span>
          ))}
        </div>
      </div>

      <div className="guide-card">
        <div className="guide-title">
          Faixas de Progresso{' '}
          <span className="hint">— cores evoluem conforme o avanço do projeto</span>
        </div>
        <div className="guide-items">
          <span className="prog-pill prog-pill-none">Não iniciado · 0%</span>
          <span className="prog-pill prog-pill-start">Início · 1–25%</span>
          <span className="prog-pill prog-pill-early">Andamento · 26–50%</span>
          <span className="prog-pill prog-pill-mid">Avançado · 51–75%</span>
          <span className="prog-pill prog-pill-late">Finalização · 76–99%</span>
          <span className="prog-pill prog-pill-done">Concluído · 100%</span>
        </div>
      </div>

      <div className="kpi-grid cols-5" style={{ marginTop: 16 }}>
        <div className="kpi">
          <div className="kpi-label">Projetos Ativos</div>
          <div className="kpi-value">18</div>
          <div className="kpi-sub">+3 este mês</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Concluídos no Ano</div>
          <div className="kpi-value" style={{ color: 'var(--p-done)' }}>
            12
          </div>
          <div className="kpi-sub">R$ 840k · honorários</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Entregas do Mês</div>
          <div className="kpi-value">11</div>
          <div className="kpi-sub">6 já realizadas</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Projetos em Atraso</div>
          <div className="kpi-value" style={{ color: 'var(--p-start)' }}>
            2
          </div>
          <div className="kpi-sub">Atenção requerida</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Horas Alocadas</div>
          <div className="kpi-value">
            412<span className="unit">h</span>
          </div>
          <div className="kpi-sub">Mês atual</div>
        </div>
      </div>

      <div className="filter-bar">
        <span className="filter-label">Fase:</span>
        {phaseFilters.map((f) => (
          <button
            key={f.key}
            className={`filter-pill${phase === f.key ? ' active' : ''}`}
            onClick={() => setPhase(f.key)}
          >
            {f.key !== 'all' && (
              <span className="dot" style={{ background: `var(--f${f.key})` }} />
            )}
            {f.label} <span className="count">{f.count}</span>
          </button>
        ))}
        <div style={{ marginLeft: 'auto' }}>
          <div className="view-toggle">
            <button
              className={`vt-btn${mode === 'cards' ? ' active' : ''}`}
              onClick={() => setMode('cards')}
            >
              Cards
            </button>
            <button
              className={`vt-btn${mode === 'table' ? ' active' : ''}`}
              onClick={() => setMode('table')}
            >
              Tabela
            </button>
            <button
              className={`vt-btn${mode === 'gantt' ? ' active' : ''}`}
              onClick={() => setMode('gantt')}
            >
              Cronograma
            </button>
          </div>
        </div>
      </div>

      {mode === 'cards' && <CardsView onOpen={onOpen} />}
      {mode === 'table' && <TableView onOpen={onOpen} />}
      {mode === 'gantt' && <GanttView />}
    </div>
  )
}

function CardsView({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <div className="projects-grid">
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} onOpen={() => onOpen(p.id)} />
      ))}
    </div>
  )
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const pc = progressClass(project.progress)
  const r = 32
  const c = 2 * Math.PI * r
  const offset = c - (project.progress / 100) * c
  const done = project.progress === 100
  const notStarted = project.notStarted

  return (
    <div
      className={`project-card${done ? ' done' : ''}${notStarted ? ' not-started' : ''}`}
      onClick={onOpen}
    >
      <div className={`pc-phase-accent phase-${project.phase}`} />
      <div className="pc-top">
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="pc-id">{project.id}</div>
          <div className="pc-name">{project.name}</div>
          <div className="pc-client">{project.client}</div>
        </div>
        <span className={`phase-chip phase-${project.phase}`}>
          Fase {String(project.phase).padStart(2, '0')}
        </span>
      </div>

      <div className="pc-mid">
        <div className={`prog-ring prog-ring-${pc}`}>
          <svg viewBox="0 0 80 80">
            <circle cx="40" cy="40" r={r} className="bg-circle" />
            <circle
              cx="40"
              cy="40"
              r={r}
              className="fg-circle"
              strokeDasharray={c.toFixed(2)}
              strokeDashoffset={offset.toFixed(2)}
            />
          </svg>
          <div className="prog-ring-center">
            <div className="prog-ring-num">
              {project.progress}
              <span style={{ fontSize: 9 }}>%</span>
            </div>
            <div className="prog-ring-label">Prog.</div>
          </div>
        </div>
        <div className="pc-mid-info">
          <div className="pc-progress-label">{project.phaseName}</div>
          <div className={`progress-wrap prog-${pc}`} style={{ minWidth: 0 }}>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
          <div style={{ marginTop: 8 }}>
            <span className={`prog-pill prog-pill-${pc}`}>{progressLabel(pc)}</span>
          </div>
        </div>
      </div>

      <div className="pc-stats">
        <div>
          <div className="pc-stat-label">Início</div>
          <div className="pc-stat-val">{project.start}</div>
        </div>
        <div>
          <div className="pc-stat-label">Entrega</div>
          <div className="pc-stat-val">{project.end}</div>
        </div>
        <div>
          <div className="pc-stat-label">Horas</div>
          <div className="pc-stat-val">{project.hours}</div>
        </div>
      </div>
    </div>
  )
}

function TableView({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Projeto</th>
            <th>Cliente</th>
            <th>Fase Atual</th>
            <th>Progresso</th>
            <th>Início</th>
            <th>Prev. Entrega</th>
            <th>Horas</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => {
            const pc = progressClass(p.progress)
            return (
              <tr
                key={p.id}
                onClick={() => onOpen(p.id)}
                style={{ cursor: 'pointer' }}
              >
                <td>
                  <div className="td-primary">{p.name}</div>
                  <div
                    className="td-mono"
                    style={{
                      fontSize: 10,
                      color: 'var(--gray-400)',
                      marginTop: 2,
                    }}
                  >
                    {p.id}
                  </div>
                </td>
                <td>{p.client}</td>
                <td>
                  <span className={`phase-chip phase-${p.phase}`}>
                    {String(p.phase).padStart(2, '0')} · {p.phaseName}
                  </span>
                </td>
                <td>
                  <div
                    className={`progress-wrap prog-${pc}`}
                    style={{ minWidth: 120 }}
                  >
                    <div className="progress-head">
                      <span className="progress-val">{p.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="td-mono">{p.start}</td>
                <td className="td-mono">{p.end}</td>
                <td className="td-mono">{p.hours}</td>
                <td className="td-mono td-primary">{p.value}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
