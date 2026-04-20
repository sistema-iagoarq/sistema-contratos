import { useState } from 'react'
import { Topbar } from '../components/Topbar'
import {
  dayViewEvents,
  formatTime,
  legendEntries,
  monthEvents,
  todayEvents,
  tomorrowEvents,
  weekEvents,
  type DayEvent,
  type EventType,
} from './agenda/data'

type View = 'combined' | 'month' | 'week' | 'day'

const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']

export function Agenda() {
  const [view, setView] = useState<View>('combined')
  const [modalOpen, setModalOpen] = useState(false)
  const [hidden, setHidden] = useState<Set<EventType>>(new Set())

  const toggleType = (t: EventType) => {
    const next = new Set(hidden)
    if (next.has(t)) next.delete(t)
    else next.add(t)
    setHidden(next)
  }

  const openDay = () => {
    setView('day')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Topbar
        actions={
          <>
            <button className="btn btn-secondary btn-sm">
              <IconCalendar /> Hoje
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setModalOpen(true)}
            >
              <IconPlus /> Novo Compromisso
            </button>
          </>
        }
      />
      <div className="content page">

      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="kpi">
          <div className="kpi-label">Hoje</div>
          <div className="kpi-value">4</div>
          <div className="kpi-sub">compromissos · 5h agendadas</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Esta Semana</div>
          <div className="kpi-value">18</div>
          <div className="kpi-sub">6 reuniões · 3 visitas</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Entregas de Projeto</div>
          <div className="kpi-value" style={{ color: 'var(--e-delivery)' }}>
            7
          </div>
          <div className="kpi-sub">marcos este mês</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Deadlines Críticos</div>
          <div className="kpi-value" style={{ color: 'var(--e-deadline)' }}>
            2
          </div>
          <div className="kpi-sub">vencem esta semana</div>
        </div>
      </div>

      <div className="view-switcher">
        <div className="vs-left">
          {(
            [
              { key: 'combined', label: 'Visão Geral', icon: <IconOverview /> },
              { key: 'month', label: 'Mês', icon: <IconMonth /> },
              { key: 'week', label: 'Semana', icon: <IconWeek /> },
              { key: 'day', label: 'Dia', icon: <IconDay /> },
            ] as const
          ).map((v) => (
            <button
              key={v.key}
              className={`vs-tab${view === v.key ? ' active' : ''}`}
              onClick={() => setView(v.key)}
            >
              {v.icon}
              {v.label}
            </button>
          ))}
        </div>
        <div className="vs-right">
          <button className="btn btn-ghost btn-sm">←</button>
          <span
            style={{
              fontFamily: 'var(--serif)',
              fontStyle: 'italic',
              fontSize: 16,
              color: 'var(--gray-700)',
              fontWeight: 500,
              minWidth: 180,
              textAlign: 'center',
            }}
          >
            {view === 'week'
              ? 'Semana · 20–26 abr 2026'
              : view === 'day'
                ? 'Segunda, 20 abril'
                : 'Abril 2026'}
          </span>
          <button className="btn btn-ghost btn-sm">→</button>
        </div>
      </div>

      {view !== 'day' && (
        <Legend hidden={hidden} onToggle={toggleType} />
      )}

      {view === 'combined' && (
        <CombinedView hidden={hidden} onDayClick={openDay} />
      )}
      {view === 'month' && <MonthView hidden={hidden} onDayClick={openDay} />}
      {view === 'week' && <WeekView hidden={hidden} />}
      {view === 'day' && <DayView hidden={hidden} />}

      {modalOpen && <EventModal onClose={() => setModalOpen(false)} />}
      </div>
    </>
  )
}

function Legend({
  hidden,
  onToggle,
}: {
  hidden: Set<EventType>
  onToggle: (t: EventType) => void
}) {
  return (
    <div className="legend-bar">
      <span className="legend-title">Tipos:</span>
      {legendEntries.map((l) => (
        <div
          key={l.type}
          className={`legend-item ${l.type}${hidden.has(l.type) ? ' off' : ''}`}
          onClick={() => onToggle(l.type)}
        >
          <span className="dot" />
          {l.label}
        </div>
      ))}
    </div>
  )
}

function MonthCalendar({
  hidden,
  onDayClick,
}: {
  hidden: Set<EventType>
  onDayClick: (day: number) => void
}) {
  const daysInMonth = 30
  const firstOffset = 2
  const prevStart = 31 - firstOffset + 1
  const total = firstOffset + daysInMonth
  const pad = total % 7 === 0 ? 0 : 7 - (total % 7)
  const cells: React.ReactNode[] = []

  for (let i = 0; i < firstOffset; i++) {
    cells.push(
      <div className="cal-day muted" key={`prev-${i}`}>
        <div className="cal-day-num">{prevStart + i}</div>
      </div>,
    )
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const evs = (monthEvents[d] || []).filter((e) => !hidden.has(e.type))
    const dayOfWeek = (firstOffset + d - 1) % 7
    const isWeekend = dayOfWeek >= 5
    const isToday = d === 20
    cells.push(
      <div
        key={`d-${d}`}
        className={`cal-day${isToday ? ' today' : ''}${isWeekend ? ' weekend' : ''}`}
        onClick={() => onDayClick(d)}
      >
        <div className="cal-day-num">{d}</div>
        {evs.slice(0, 3).map((e, i) => (
          <div key={i} className={`cal-event ${e.type}`}>
            <span className="time">{e.t}</span>
            {e.title}
          </div>
        ))}
        {evs.length > 3 && (
          <div className="cal-event-more">+{evs.length - 3} mais</div>
        )}
      </div>,
    )
  }

  for (let i = 1; i <= pad; i++) {
    cells.push(
      <div className="cal-day muted" key={`next-${i}`}>
        <div className="cal-day-num">{i}</div>
      </div>,
    )
  }

  return (
    <div className="cal-wrap">
      <div className="cal-head-row">
        {weekDays.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="cal-body-row">{cells}</div>
    </div>
  )
}

function DayPanel({
  date,
  sub,
  events,
  hidden,
}: {
  date: string
  sub: string
  events: DayEvent[]
  hidden: Set<EventType>
}) {
  const filtered = events.filter((e) => !hidden.has(e.type))
  return (
    <div className="day-panel">
      <div className="day-panel-head">
        <div className="day-panel-date" dangerouslySetInnerHTML={{ __html: date }} />
        <div className="day-panel-sub">{sub}</div>
      </div>
      <div className="day-events">
        {filtered.map((e, i) => (
          <div key={i} className={`day-event ${e.type}`}>
            <div className="day-event-time">
              <span>{e.time}</span>
              {e.altTime && <span>→</span>}
              {e.altTime && <span>{e.altTime}</span>}
              <span className="day-event-type">{e.typeLabel}</span>
            </div>
            <div className="day-event-title">{e.title}</div>
            <div
              className="day-event-meta"
              style={{ whiteSpace: 'pre-line' }}
            >
              {e.meta}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CombinedView({
  hidden,
  onDayClick,
}: {
  hidden: Set<EventType>
  onDayClick: (d: number) => void
}) {
  return (
    <div className="view-panel active">
      <div className="combined-section" style={{ marginBottom: 20 }}>
        <div className="combined-section-head">
          <div className="combined-section-title">
            Calendário de Compromissos
            <span className="tag">Abril 2026</span>
          </div>
        </div>
        <div className="month-layout" style={{ padding: 16, gap: 16 }}>
          <MonthCalendar hidden={hidden} onDayClick={onDayClick} />
          <DayPanel
            date={'Hoje <em>segunda, 20 abr</em>'}
            sub="4 compromissos agendados"
            events={todayEvents}
            hidden={hidden}
          />
        </div>
      </div>
    </div>
  )
}

function MonthView({
  hidden,
  onDayClick,
}: {
  hidden: Set<EventType>
  onDayClick: (d: number) => void
}) {
  return (
    <div className="view-panel active">
      <div className="month-layout">
        <MonthCalendar hidden={hidden} onDayClick={onDayClick} />
        <DayPanel
          date={'Hoje <em>segunda, 20 abr</em>'}
          sub="4 compromissos agendados"
          events={todayEvents}
          hidden={hidden}
        />
      </div>
    </div>
  )
}

function WeekView({ hidden }: { hidden: Set<EventType> }) {
  const hours = Array.from({ length: 14 }, (_, i) => i + 7) // 7-20
  const dayNumbers = [20, 21, 22, 23, 24, 25, 26]

  return (
    <div className="view-panel active">
      <div className="week-wrap">
        <div className="week-head">
          <div />
          {weekDays.map((d, i) => {
            const isToday = i === 0
            const isWeekend = i >= 5
            return (
              <div
                key={d}
                className={`${isToday ? 'today ' : ''}${isWeekend ? 'weekend' : ''}`}
              >
                <div className="week-head-day-name">{d}</div>
                <div className="week-head-day-num">{dayNumbers[i]}</div>
              </div>
            )
          })}
        </div>

        <div className="week-body">
          <div className="week-time-col">
            {hours.map((h) => (
              <div key={h} className="week-time-slot">
                {String(h).padStart(2, '0')}:00
              </div>
            ))}
          </div>

          {Array.from({ length: 7 }).map((_, d) => {
            const dayEvs = weekEvents
              .filter((e) => e.day === d)
              .filter((e) => !hidden.has(e.type))
            const isWeekend = d >= 5
            return (
              <div
                key={d}
                className={`week-day-col${isWeekend ? ' weekend' : ''}`}
              >
                {hours.map((h) => (
                  <div key={h} className="week-hour-slot" />
                ))}
                {dayEvs.map((e, i) => {
                  const top = (e.start - 7) * 48
                  const height = (e.end - e.start) * 48
                  return (
                    <div
                      key={i}
                      className={`week-event ${e.type}`}
                      style={{ top: `${top + 2}px`, height: `${height - 4}px` }}
                    >
                      <div className="week-event-time">
                        {formatTime(e.start)} → {formatTime(e.end)}
                      </div>
                      <div className="week-event-title">{e.title}</div>
                    </div>
                  )
                })}
              </div>
            )
          })}

          <div
            className="week-now-line"
            style={{ top: `calc(48px * 5.5)` }}
          />
        </div>
      </div>
    </div>
  )
}

function DayView({ hidden }: { hidden: Set<EventType> }) {
  const hours = Array.from({ length: 14 }, (_, i) => i + 7)
  const filtered = dayViewEvents.filter((e) => !hidden.has(e.type))

  return (
    <div className="view-panel active">
      <div className="day-layout">
        <div className="day-wrap">
          <div className="day-head-row">
            <div className="day-head-title">
              Segunda-feira <em>20 de abril</em>
            </div>
            <div className="day-head-meta">4 compromissos · 5h agendadas</div>
          </div>
          <div className="day-body">
            <div className="day-time-col">
              {hours.map((h) => (
                <div key={h} className="day-time-slot">
                  {String(h).padStart(2, '0')}:00
                </div>
              ))}
            </div>
            <div className="day-events-col">
              {hours.map((h) => (
                <div key={h} className="day-hour-slot" />
              ))}
              {filtered.map((e, i) => {
                const top = (e.start - 7) * 64
                const height = (e.end - e.start) * 64
                return (
                  <div
                    key={i}
                    className={`day-view-event ${e.type}`}
                    style={{ top: `${top + 4}px`, height: `${height - 8}px` }}
                  >
                    <div className="day-view-event-time">
                      {formatTime(e.start)} → {formatTime(e.end)}
                    </div>
                    <div className="day-view-event-title">{e.title}</div>
                    <div className="day-view-event-meta">{e.meta}</div>
                  </div>
                )
              })}
              <div className="day-now-line" style={{ top: `calc(64px * 5.5)` }} />
            </div>
          </div>
        </div>

        <DayPanel
          date={'Amanhã <em>21 abr</em>'}
          sub="Prévia do próximo dia"
          events={tomorrowEvents}
          hidden={hidden}
        />
      </div>
    </div>
  )
}

function EventModal({ onClose }: { onClose: () => void }) {
  const [type, setType] = useState<EventType>('e-meeting')
  const types: Array<{ key: EventType; label: string; pickClass: string }> = [
    { key: 'e-meeting', label: 'Reunião', pickClass: 't-meeting' },
    { key: 'e-visit', label: 'Visita', pickClass: 't-visit' },
    { key: 'e-delivery', label: 'Entrega', pickClass: 't-delivery' },
    { key: 'e-deadline', label: 'Deadline', pickClass: 't-deadline' },
    { key: 'e-call', label: 'Ligação', pickClass: 't-call' },
    { key: 'e-internal', label: 'Interno', pickClass: 't-internal' },
    { key: 'e-personal', label: 'Pessoal', pickClass: 't-personal' },
  ]

  return (
    <div
      className="modal-overlay active"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="modal">
        <div className="modal-head">
          <div className="modal-title">Novo Compromisso</div>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <div className="form-row">
            <div className="form-field">
              <label className="form-label">Tipo de Compromisso</label>
              <div className="type-picker">
                {types.map((t) => (
                  <div
                    key={t.key}
                    className={`type-pick ${t.pickClass}${type === t.key ? ' selected' : ''}`}
                    onClick={() => setType(t.key)}
                  >
                    <span className="dot" />
                    <span className="label">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label className="form-label">Título</label>
              <input className="input" placeholder="Ex: Reunião com cliente" />
            </div>
          </div>

          <div className="form-row cols-3">
            <div className="form-field">
              <label className="form-label">Data</label>
              <input className="input" type="date" defaultValue="2026-04-20" />
            </div>
            <div className="form-field">
              <label className="form-label">Início</label>
              <input className="input mono" type="time" defaultValue="14:00" />
            </div>
            <div className="form-field">
              <label className="form-label">Fim</label>
              <input className="input mono" type="time" defaultValue="15:00" />
            </div>
          </div>

          <div className="form-row cols-2">
            <div className="form-field">
              <label className="form-label">Projeto vinculado</label>
              <div className="select-wrap">
                <select className="input">
                  <option>— Nenhum —</option>
                  <option>Residência Alphaville · Marina Costa</option>
                  <option>Loja Noma · Atelier Noma</option>
                  <option>Galpão Transvale · Transvale Logística</option>
                  <option>Casa Jardins · Paula Andrade</option>
                </select>
              </div>
            </div>
            <div className="form-field">
              <label className="form-label">Cliente / Contato</label>
              <input className="input" placeholder="Ex: Marina Andrade Costa" />
            </div>
          </div>

          <div className="form-row cols-2">
            <div className="form-field">
              <label className="form-label">Local / Modalidade</label>
              <div className="select-wrap">
                <select className="input">
                  <option>Escritório IS</option>
                  <option>Videoconferência</option>
                  <option>Presencial · Cliente</option>
                  <option>Presencial · Obra</option>
                  <option>Outro local</option>
                </select>
              </div>
            </div>
            <div className="form-field">
              <label className="form-label">Participantes</label>
              <input className="input" placeholder="Iago, Laura…" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label className="form-label">Observações</label>
              <textarea className="input" placeholder="Pauta, assuntos, lembretes…" />
            </div>
          </div>
        </div>
        <div className="modal-foot">
          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn btn-primary btn-sm" onClick={onClose}>
            Criar Compromisso
          </button>
        </div>
      </div>
    </div>
  )
}

/* Icons */
const svgProps = {
  width: 14,
  height: 14,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

function IconCalendar() {
  return (
    <svg {...{ ...svgProps, width: 13, height: 13 }}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
    </svg>
  )
}
function IconPlus() {
  return (
    <svg {...{ ...svgProps, width: 13, height: 13, strokeWidth: 2.2 }}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}
function IconOverview() {
  return (
    <svg {...svgProps}>
      <rect x="3" y="3" width="18" height="8" rx="1" />
      <rect x="3" y="13" width="18" height="8" rx="1" />
    </svg>
  )
}
function IconMonth() {
  return (
    <svg {...svgProps}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}
function IconWeek() {
  return (
    <svg {...svgProps}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="9" y1="4" x2="9" y2="22" />
      <line x1="15" y1="4" x2="15" y2="22" />
    </svg>
  )
}
function IconDay() {
  return (
    <svg {...svgProps}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="12" y1="4" x2="12" y2="22" />
    </svg>
  )
}
