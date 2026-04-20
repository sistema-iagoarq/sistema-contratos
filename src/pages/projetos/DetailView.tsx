import { useState } from 'react'
import { progressClass, type Phase } from './data'

type Tab = 'phases' | 'calendar'

type Deliverable = { text: string; date: string; done: boolean }

type Task = {
  title: string
  assignee: string
  due: string
  overdue?: boolean
  tag?: { label: string; kind: 'urgent' | 'review' | 'blocked' }
  blocked?: boolean
  completed?: boolean
}

type PhaseSection = {
  phase: Phase
  name: string
  sub: string
  period: string
  days: string
  tasksSummary: string
  progress: number
  status: string
  desc: string
  deliverables?: Deliverable[]
  tasks?: { todo: Task[]; doing: Task[]; review: Task[]; done: Task[] }
}

const phases: PhaseSection[] = [
  {
    phase: 1,
    name: 'Levantamento Cadastral',
    sub: 'Medição e documentação do terreno existente',
    period: '15/01 → 05/02/26',
    days: '21 dias',
    tasksSummary: '8 tarefas · 8 concluídas',
    progress: 100,
    status: 'Concluído',
    desc:
      'Visitas de campo, medição do terreno em declive, registro fotográfico completo e caracterização do entorno (vista para reserva, orientação solar, ventos predominantes). Análise de viabilidade e subsídios para o estudo preliminar.',
    deliverables: [
      { text: 'Levantamento topográfico', date: '18/01/26', done: true },
      { text: 'Registro fotográfico (entorno e terreno)', date: '20/01/26', done: true },
      { text: 'Análise de insolação e ventos', date: '25/01/26', done: true },
      { text: 'Estudo do entorno e legislação', date: '28/01/26', done: true },
      { text: 'Pesquisa de campo (vizinhança)', date: '01/02/26', done: true },
      { text: 'Relatório de levantamento consolidado', date: '05/02/26', done: true },
    ],
  },
  {
    phase: 2,
    name: 'Estudo Preliminar',
    sub: 'Partido arquitetônico e estudos de volumetria',
    period: '06/02 → 28/02/26',
    days: '22 dias',
    tasksSummary: '5 tarefas · 5 concluídas',
    progress: 100,
    status: 'Concluído',
    desc: 'Partido aprovado no primeiro ciclo de revisão.',
  },
  {
    phase: 3,
    name: 'Anteprojeto',
    sub: 'Desenvolvimento técnico, plantas e imagens 3D',
    period: '01/03 → 05/04/26',
    days: '36 dias',
    tasksSummary: '12 tarefas · 12 concluídas',
    progress: 100,
    status: 'Concluído',
    desc: 'Aprovado com 12 renderizações internas/externas e walkthrough 3D.',
  },
  {
    phase: 4,
    name: 'Projeto Legal',
    sub: 'Aprovação junto aos órgãos competentes',
    period: '06/04 → 12/04/26',
    days: '7 dias',
    tasksSummary: '4 tarefas · 4 concluídas',
    progress: 100,
    status: 'Concluído',
    desc: 'Aprovação protocolada na Prefeitura. Alvará em trâmite, sem pendências.',
  },
  {
    phase: 5,
    name: 'Projeto Executivo + Detalhamentos',
    sub: 'Documentação técnica completa para execução da obra',
    period: '13/04 → 15/06/26 (previsto)',
    days: '64 dias',
    tasksSummary: '14 tarefas · 9 concluídas · 3 em andamento · 2 pendentes',
    progress: 62,
    status: 'Em Andamento',
    desc:
      'Desenvolvimento dos desenhos executivos em escala 1:50 (plantas, cortes, fachadas), detalhamentos construtivos em escalas 1:20 e 1:10, paginação de revestimentos, especificações técnicas e memorial descritivo. Em paralelo, compatibilização com os projetos complementares (estrutural e hidrossanitário).',
    deliverables: [
      { text: 'Plantas baixas executivas (3 pavimentos)', date: '18/04/26', done: true },
      { text: 'Cortes longitudinais e transversais', date: '18/04/26', done: true },
      { text: 'Fachadas detalhadas 4 faces', date: '18/04/26', done: true },
      { text: 'Planta de cobertura', date: '20/04/26', done: true },
      { text: 'Layout de mobiliário (suítes e sociais)', date: '20/04/26', done: true },
      { text: 'Planta de piso e paginação', date: '22/04/26', done: true },
      { text: 'Detalhamento escadas', date: '20/04/26', done: true },
      { text: 'Detalhamento banheiros', date: '22/04/26', done: true },
      { text: 'Detalhamento cozinha', date: '25/04/26', done: true },
      { text: 'Planta de forros (em revisão)', date: '28/04/26', done: false },
      { text: 'Detalhamento esquadrias', date: '05/05/26', done: false },
      { text: 'Compatibilização com estrutural', date: '15/05/26', done: false },
      { text: 'Memorial descritivo técnico', date: '30/05/26', done: false },
      { text: 'Caderno de especificações', date: '10/06/26', done: false },
    ],
    tasks: {
      todo: [
        {
          title: 'Detalhamento caixilharia — esquadrias grandes formato',
          assignee: 'TR',
          due: '05/05',
        },
        {
          title: 'Preparar caderno de especificações (templates)',
          assignee: 'CO',
          due: '08/05',
        },
      ],
      doing: [
        {
          title: 'Compatibilização hidrossanitário com layout',
          assignee: 'IS',
          due: '28/04',
          blocked: true,
          tag: { label: 'Aguarda parceiro', kind: 'blocked' },
        },
        {
          title: 'Revisão de planta de forros — áreas molhadas',
          assignee: 'LM',
          due: '25/04',
        },
        {
          title: 'Detalhamento da adega climatizada',
          assignee: 'LM',
          due: '22/04',
          overdue: true,
        },
      ],
      review: [
        {
          title: 'Paginação de porcelanato — sala e áreas sociais',
          assignee: 'TR',
          due: '23/04',
          tag: { label: 'Cliente', kind: 'review' },
        },
      ],
      done: [
        {
          title: 'Plantas baixas executivas',
          assignee: 'IS',
          due: '18/04',
          completed: true,
        },
        {
          title: 'Cortes e fachadas',
          assignee: 'LM',
          due: '18/04',
          completed: true,
        },
        {
          title: 'Detalhamento banheiros',
          assignee: 'TR',
          due: '22/04',
          completed: true,
        },
      ],
    },
  },
  {
    phase: 6,
    name: 'Acompanhamento de Obra',
    sub: 'Visitas técnicas durante a execução',
    period: 'Previsão: 16/06 → 15/12/26',
    days: '182 dias',
    tasksSummary: '24 visitas planejadas',
    progress: 0,
    status: 'Não iniciado',
    desc:
      'Fase de acompanhamento iniciará após conclusão do projeto executivo e início efetivo da obra pelo cliente.',
  },
]

const calEvents: Record<number, Array<{ t: string; p: Phase }>> = {
  2: [{ t: 'Início Fase 5 · Executivo', p: 5 }],
  10: [{ t: 'Entrega Alvará · Fase 4', p: 4 }],
  14: [{ t: 'Reunião cliente · v3 revisões', p: 3 }],
  18: [
    { t: 'Entrega Plantas baixas', p: 5 },
    { t: 'Cortes + fachadas', p: 5 },
  ],
  20: [{ t: 'Hoje · Compatibilização', p: 5 }],
  22: [{ t: 'Detalhamento adega', p: 5 }],
  23: [{ t: 'Reunião aprovação paginação', p: 5 }],
  25: [
    { t: 'Entrega Planta de forros', p: 5 },
    { t: 'Cozinha detalhada', p: 5 },
  ],
  28: [{ t: 'Visita técnica cliente', p: 5 }],
  30: [{ t: 'Entrega compatibilização', p: 5 }],
}

type Props = {
  onBack: () => void
}

export function DetailView({ onBack: _onBack }: Props) {
  const [tab, setTab] = useState<Tab>('phases')

  return (
    <div className="view">
      <div className="detail-header">
        <div className="detail-header-accent phase-5" />
        <div className="detail-top">
          <div>
            <div className="detail-id">PRJ-2026-018 · Residência Unifamiliar</div>
            <div className="detail-title">Residência Alphaville Flamboyant</div>
            <div className="detail-meta">
              <span className="phase-chip phase-5">Fase 5 · Projeto Executivo</span>
              <span className="sep">·</span>
              <span>
                <strong style={{ color: 'var(--gray-900)' }}>Marina Andrade Costa</strong>
              </span>
              <span className="sep">·</span>
              <span>420 m² · Goiânia/GO</span>
              <span className="sep">·</span>
              <span>Iago Siqueira + Laura Mendonça</span>
            </div>
          </div>
          <div className="detail-actions">
            <button className="btn btn-secondary btn-sm">Cronograma PDF</button>
            <button className="btn btn-secondary btn-sm">Relatório</button>
            <button className="btn btn-primary btn-sm">+ Nova Tarefa</button>
          </div>
        </div>

        <div className="phase-pipeline">
          <PipelineStep num="01" label="Levantamento" pct="100%" phase={1} done />
          <PipelineStep num="02" label="Estudo Prelim." pct="100%" phase={2} done />
          <PipelineStep num="03" label="Anteprojeto" pct="100%" phase={3} done />
          <PipelineStep num="04" label="Projeto Legal" pct="100%" phase={4} done />
          <PipelineStep num="05" label="Executivo" pct="62%" phase={5} current />
          <PipelineStep num="06" label="Obra" pct="0%" phase={6} />
        </div>

        <div className="detail-stats" style={{ marginTop: 20 }}>
          <div className="stat-cell">
            <div className="stat-label">Progresso Geral</div>
            <div className="stat-value" style={{ color: 'var(--p-mid)' }}>
              62%
            </div>
            <div className="stat-sub">4 de 6 fases concluídas</div>
          </div>
          <div className="stat-cell">
            <div className="stat-label">Início</div>
            <div className="stat-value">15/01/2026</div>
            <div className="stat-sub">há 95 dias</div>
          </div>
          <div className="stat-cell">
            <div className="stat-label">Entrega Prevista</div>
            <div className="stat-value">28/06/2026</div>
            <div className="stat-sub">em 69 dias</div>
          </div>
          <div className="stat-cell">
            <div className="stat-label">Horas Consumidas</div>
            <div className="stat-value">284h / 460h</div>
            <div className="stat-sub">62% do planejado</div>
          </div>
          <div className="stat-cell">
            <div className="stat-label">Valor</div>
            <div className="stat-value">R$ 145.000</div>
            <div className="stat-sub">R$ 42k recebidos</div>
          </div>
        </div>
      </div>

      <div className="tabs">
        <button
          className={`tab${tab === 'phases' ? ' active' : ''}`}
          onClick={() => setTab('phases')}
        >
          Fases &amp; Tarefas
          <span className="count">6</span>
        </button>
        <button
          className={`tab${tab === 'calendar' ? ' active' : ''}`}
          onClick={() => setTab('calendar')}
        >
          Cronograma Mensal
        </button>
      </div>

      {tab === 'phases' && <PhasesPanel />}
      {tab === 'calendar' && <CalendarPanel />}
    </div>
  )
}

function PipelineStep({
  num,
  label,
  pct,
  phase,
  done,
  current,
}: {
  num: string
  label: string
  pct: string
  phase: Phase
  done?: boolean
  current?: boolean
}) {
  const cls = ['phase-pipeline-step']
  if (done) cls.push('done', `phase-${phase}`)
  if (current) cls.push('current')
  return (
    <div className={cls.join(' ')}>
      <span className="num">{num}</span>
      <span className="label">{label}</span>
      <span className="pct">{pct}</span>
    </div>
  )
}

function PhasesPanel() {
  const [open, setOpen] = useState<Phase | null>(5)
  return (
    <div>
      {phases.map((p) => {
        const isOpen = open === p.phase
        const doneClass = p.progress === 100 ? ' done' : ''
        const activeClass = isOpen ? ' active' : ' collapsed'
        const pc = progressClass(p.progress)
        return (
          <div
            key={p.phase}
            className={`phase-section phase-${p.phase}${doneClass}${activeClass}`}
            style={p.progress === 0 ? { opacity: 0.85 } : undefined}
          >
            <div
              className="phase-section-head"
              onClick={() => setOpen(isOpen ? null : p.phase)}
            >
              <div className="phase-number">{String(p.phase).padStart(2, '0')}</div>
              <div className="phase-info">
                <div className="phase-info-top">
                  <div className="phase-info-name">{p.name}</div>
                  <span className={`phase-chip phase-${p.phase}`}>{p.status}</span>
                </div>
                <div className="phase-info-sub">{p.sub}</div>
                <div className="phase-info-meta">
                  <span>{p.period}</span>
                  <span>·</span>
                  <span>{p.days}</span>
                  <span>·</span>
                  <span>{p.tasksSummary}</span>
                </div>
              </div>
              <div className="phase-progress-side">
                <span className={`prog-pill prog-pill-${pc}`}>{p.progress}%</span>
                <div className="phase-chevron">
                  <Chevron />
                </div>
              </div>
            </div>
            <div className="phase-body">
              <div className="phase-desc">
                {p.phase === 5 && (
                  <>
                    <strong>O que está sendo feito nesta fase:</strong>{' '}
                  </>
                )}
                {p.desc}
              </div>

              {p.deliverables && p.deliverables.length > 0 && (
                <div className="phase-deliverables">
                  <div className="deliv-head">
                    <span>Entregáveis desta fase</span>
                    <span
                      style={{
                        color: `var(--p-${pc})`,
                        fontWeight: 600,
                      }}
                    >
                      {p.deliverables.filter((d) => d.done).length} de{' '}
                      {p.deliverables.length}
                      {p.progress === 100 ? ' ✓' : ' concluídos'}
                    </span>
                  </div>
                  {p.deliverables.map((d, i) => (
                    <div className="deliv-item" key={i}>
                      <div className={`deliv-check${d.done ? ' checked' : ''}`} />
                      <div className={`deliv-text${d.done ? ' done' : ''}`}>
                        {d.text}
                      </div>
                      <div className="deliv-date">{d.date}</div>
                    </div>
                  ))}
                </div>
              )}

              {p.tasks && (
                <>
                  <div
                    style={{
                      fontSize: 11,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--gray-500)',
                      fontWeight: 500,
                      marginBottom: 10,
                      marginTop: 20,
                    }}
                  >
                    Quadro de Tarefas da Fase
                  </div>
                  <div className="tasks-wrap">
                    <div className="tasks-columns">
                      <TaskColumn name="A Fazer" kind="todo" tasks={p.tasks.todo} />
                      <TaskColumn
                        name="Em Execução"
                        kind="doing"
                        tasks={p.tasks.doing}
                      />
                      <TaskColumn
                        name="Em Revisão"
                        kind="review"
                        tasks={p.tasks.review}
                      />
                      <TaskColumn name="Concluídas" kind="done" tasks={p.tasks.done} />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function TaskColumn({
  name,
  kind,
  tasks,
}: {
  name: string
  kind: 'todo' | 'doing' | 'review' | 'done'
  tasks: Task[]
}) {
  return (
    <div className="task-col">
      <div className="task-col-head">
        <span className={`task-col-name ${kind}`}>{name}</span>
        <span className="task-col-count">{tasks.length}</span>
      </div>
      {tasks.map((t, i) => (
        <div
          key={i}
          className={`task-card${t.blocked ? ' blocked' : ''}`}
          style={t.completed ? { opacity: 0.7 } : undefined}
        >
          <div
            className="task-card-title"
            style={t.completed ? { textDecoration: 'line-through' } : undefined}
          >
            {t.title}
          </div>
          {t.tag && (
            <div className="task-card-tags">
              <span className={`task-tag task-tag-${t.tag.kind}`}>{t.tag.label}</span>
            </div>
          )}
          <div className="task-card-meta" style={t.tag ? { marginTop: 6 } : undefined}>
            <div className="task-card-assignee" title={t.assignee}>
              {t.assignee}
            </div>
            <span className={`task-card-due${t.overdue ? ' overdue' : ''}`}>
              {t.due}
            </span>
          </div>
        </div>
      ))}
      <button className="add-task-btn">
        {kind === 'done' && tasks.length < 9 ? 'Ver todas as 9 →' : '+ Nova tarefa'}
      </button>
    </div>
  )
}

function CalendarPanel() {
  const daysInMonth = 30
  const firstOffset = 2
  const prevStart = 31 - firstOffset + 1
  const cells: React.ReactNode[] = []
  for (let i = 0; i < firstOffset; i++) {
    cells.push(
      <div className="cal-day muted" key={`prev-${i}`}>
        <div className="cal-day-num">{prevStart + i}</div>
      </div>,
    )
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const today = d === 20
    const evs = calEvents[d] || []
    cells.push(
      <div className={`cal-day${today ? ' today' : ''}`} key={d}>
        <div className="cal-day-num">{d}</div>
        {evs.map((e, i) => (
          <div className={`cal-event phase-${e.p}`} key={i}>
            {e.t}
          </div>
        ))}
      </div>,
    )
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <div>
          <div style={{ fontSize: 16, fontWeight: 500, letterSpacing: '-0.01em' }}>
            Abril 2026
          </div>
          <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>
            Entregas e marcos do projeto neste mês
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary btn-sm">← Março</button>
          <button className="btn btn-primary btn-sm">Abril</button>
          <button className="btn btn-secondary btn-sm">Maio →</button>
        </div>
      </div>

      <div className="cal-wrap">
        <div className="cal-head-row">
          {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
        <div className="cal-body-row">{cells}</div>
      </div>

      <div
        style={{
          background: 'var(--white)',
          border: '1px solid var(--gray-200)',
          borderRadius: 8,
          padding: '18px 20px',
          marginTop: 20,
        }}
      >
        <div
          style={{
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--gray-500)',
            fontWeight: 500,
            marginBottom: 12,
          }}
        >
          Próximos Marcos
        </div>
        <div style={{ display: 'grid', gap: 10 }}>
          <Milestone
            phase={5}
            title="Entrega parcial — planta de forros"
            sub="Quinta, 25/04 · responsável: Laura Mendonça"
            pill="Em 5 dias"
            pillKind="mid"
          />
          <Milestone
            phase={5}
            title="Reunião com Marina — aprovação de paginação"
            sub="Quarta, 23/04 · 14h · escritório IS"
            pill="Em 3 dias"
            pillKind="early"
          />
          <Milestone
            phase={5}
            title="Entrega — compatibilização estrutural"
            sub="Sexta, 15/05 · aguarda Eng. Helena"
            pill="Em 25 dias"
            pillKind="late"
          />
        </div>
      </div>
    </div>
  )
}

function Milestone({
  phase,
  title,
  sub,
  pill,
  pillKind,
}: {
  phase: Phase
  title: string
  sub: string
  pill: string
  pillKind: 'none' | 'start' | 'early' | 'mid' | 'late' | 'done'
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 14px',
        background: `var(--f${phase}-bg)`,
        borderRadius: 6,
        borderLeft: `3px solid var(--f${phase})`,
      }}
    >
      <span className={`phase-chip phase-${phase}`}>Executivo</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--gray-900)' }}>
          {title}
        </div>
        <div style={{ fontSize: 11, color: 'var(--gray-500)', marginTop: 2 }}>
          {sub}
        </div>
      </div>
      <span className={`prog-pill prog-pill-${pillKind}`}>{pill}</span>
    </div>
  )
}

function Chevron() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}
