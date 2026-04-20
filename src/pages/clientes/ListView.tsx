import { useState } from 'react'
import { clients, initials, stageBadgeClass } from './data'

type StageFilter =
  | 'Todas'
  | 'Prospecção'
  | 'Briefing'
  | 'Proposta'
  | 'Negociação'
  | 'Ativo'
  | 'Concluído'
  | 'Perdido'

const stageFilters: Array<{ label: StageFilter; count: number }> = [
  { label: 'Todas', count: 164 },
  { label: 'Prospecção', count: 14 },
  { label: 'Briefing', count: 10 },
  { label: 'Proposta', count: 8 },
  { label: 'Negociação', count: 10 },
  { label: 'Ativo', count: 18 },
  { label: 'Concluído', count: 98 },
  { label: 'Perdido', count: 6 },
]

type Props = {
  onOpen: () => void
  onNew: () => void
}

export function ListView({ onOpen, onNew }: Props) {
  const [stage, setStage] = useState<StageFilter>('Todas')
  const [type, setType] = useState<'PF' | 'PJ' | null>(null)
  const [origin, setOrigin] = useState<string | null>(null)

  return (
    <div className="view">
      <div className="kpi-grid cols-5">
        <div className="kpi">
          <div className="kpi-label">Total Cadastrados</div>
          <div className="kpi-value">164</div>
          <div className="kpi-sub">+8 este mês</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Ativos</div>
          <div className="kpi-value">18</div>
          <div className="kpi-sub">Projetos em execução</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Em Prospecção</div>
          <div className="kpi-value">42</div>
          <div className="kpi-sub">Leads qualificados</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Taxa de Resposta</div>
          <div className="kpi-value">
            78<span className="unit">%</span>
          </div>
          <div className="kpi-sub">Últimos 30 dias</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">LTV Médio</div>
          <div className="kpi-value">
            R$ 94<span className="unit">k</span>
          </div>
          <div className="kpi-sub">Ciclo completo</div>
        </div>
      </div>

      <div className="filter-bar">
        <div className="filter-group">
          <span className="filter-label">Etapa:</span>
          {stageFilters.map((f) => (
            <button
              key={f.label}
              className={`filter-pill${stage === f.label ? ' active' : ''}`}
              onClick={() => setStage(f.label)}
            >
              {f.label} <span className="count">{f.count}</span>
            </button>
          ))}
        </div>

        <div className="filter-divider" />

        <div className="filter-group">
          <span className="filter-label">Tipo:</span>
          {(['PF', 'PJ'] as const).map((t) => (
            <button
              key={t}
              className={`filter-pill${type === t ? ' active' : ''}`}
              onClick={() => setType(type === t ? null : t)}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="filter-divider" />

        <div className="filter-group">
          <span className="filter-label">Origem:</span>
          {['Instagram', 'Google', 'Indicação', 'Site'].map((o) => (
            <button
              key={o}
              className={`filter-pill${origin === o ? ' active' : ''}`}
              onClick={() => setOrigin(origin === o ? null : o)}
            >
              {o}
            </button>
          ))}
        </div>

        <div style={{ marginLeft: 'auto' }}>
          <button className="btn btn-ghost btn-sm">+ Mais filtros</button>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Tipo</th>
              <th>Cidade</th>
              <th>Etapa no Funil</th>
              <th>Origem</th>
              <th>Projeto de Interesse</th>
              <th>Orçamento</th>
              <th>Última Interação</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c, i) => (
              <tr key={i} onClick={onOpen}>
                <td>
                  <div className="cell-avatar">
                    <div className="mini-avatar">{initials(c.name)}</div>
                    <div className="info">
                      <span className="name">{c.name}</span>
                      <span className="sub td-mono">{c.doc}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    className="badge badge-outline badge-no-dot"
                    style={{ fontFamily: 'var(--mono)' }}
                  >
                    {c.type}
                  </span>
                </td>
                <td>{c.city}</td>
                <td>
                  <span className={stageBadgeClass(c.stage)}>{c.stage}</span>
                </td>
                <td>{c.origin}</td>
                <td>{c.project}</td>
                <td className="td-mono">{c.budget}</td>
                <td className="td-mono" style={{ color: 'var(--gray-500)' }}>
                  {c.lastContact}
                </td>
                <td>
                  {c.tags.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          style={{
            padding: '14px 20px',
            borderTop: '1px solid var(--gray-200)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'var(--gray-50)',
          }}
        >
          <span
            style={{ fontSize: 12, color: 'var(--gray-500)', fontFamily: 'var(--mono)' }}
          >
            Exibindo 1–10 de 164
          </span>
          <div style={{ display: 'flex', gap: 4 }}>
            <button className="btn btn-secondary btn-sm">←</button>
            <button className="btn btn-primary btn-sm">1</button>
            <button className="btn btn-secondary btn-sm">2</button>
            <button className="btn btn-secondary btn-sm">3</button>
            <span style={{ padding: '0 8px', color: 'var(--gray-400)', alignSelf: 'center' }}>
              …
            </span>
            <button className="btn btn-secondary btn-sm">17</button>
            <button className="btn btn-secondary btn-sm">→</button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16, textAlign: 'right' }}>
        <button className="btn btn-primary btn-sm" onClick={onNew}>
          + Novo Cliente
        </button>
      </div>
    </div>
  )
}
