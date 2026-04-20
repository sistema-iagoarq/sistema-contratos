import { useState } from 'react'
import {
  proposals,
  statusClassMap,
  statusFilters,
  statusLabelMap,
  type ProposalStatus,
} from './data'

type Props = {
  onOpen: () => void
  onNew: () => void
}

type SlaFilter = 'late' | 'warn' | 'ok' | null

export function ListView({ onOpen, onNew }: Props) {
  const [status, setStatus] = useState<ProposalStatus | 'all'>('all')
  const [sla, setSla] = useState<SlaFilter>(null)

  return (
    <div className="view">
      <div
        style={{
          background: 'var(--gray-50)',
          border: '1px solid var(--gray-200)',
          borderRadius: 8,
          padding: '14px 20px',
          marginBottom: 16,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 10,
          }}
        >
          <span
            style={{
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--gray-500)',
              fontWeight: 500,
            }}
          >
            Paleta de Status
          </span>
          <span
            style={{
              fontSize: 11,
              color: 'var(--gray-400)',
              fontStyle: 'italic',
            }}
          >
            — cada fase do ciclo usa uma cor semântica
          </span>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {(Object.keys(statusLabelMap) as ProposalStatus[]).map((s) => (
            <span key={s} className={`status ${statusClassMap[s]}`}>
              {statusLabelMap[s]}
            </span>
          ))}
        </div>
      </div>

      <div className="kpi-grid cols-5">
        <div className="kpi">
          <div className="kpi-label">Propostas Abertas</div>
          <div className="kpi-value">18</div>
          <div className="kpi-sub">Valor total R$ 1,24 Mi</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Aprovadas no Mês</div>
          <div className="kpi-value">6</div>
          <div className="kpi-sub">R$ 412.800</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Taxa de Conversão</div>
          <div className="kpi-value">
            34<span className="unit">%</span>
          </div>
          <div className="kpi-sub">Últimos 90 dias</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Ticket Médio</div>
          <div className="kpi-value">
            R$ 68<span className="unit">k</span>
          </div>
          <div className="kpi-sub">Trimestre vigente</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">SLA Crítico</div>
          <div className="kpi-value" style={{ color: 'var(--sla-late)' }}>
            2
          </div>
          <div className="kpi-sub">Atrasadas · atenção</div>
        </div>
      </div>

      <div className="filter-bar">
        <span className="filter-label">Status:</span>
        {statusFilters.map((f) => (
          <button
            key={f.key}
            className={`filter-pill${status === f.key ? ' active' : ''}`}
            onClick={() => setStatus(f.key)}
          >
            {f.color && <span className="dot" style={{ background: f.color }} />}
            {f.label} <span className="count">{f.count}</span>
          </button>
        ))}

        <div className="filter-divider" />

        <span className="filter-label">SLA:</span>
        {([
          { key: 'late', label: 'Crítico', color: 'var(--sla-late)' },
          { key: 'warn', label: 'Atenção', color: 'var(--sla-warn)' },
          { key: 'ok', label: 'No prazo', color: 'var(--sla-ok)' },
        ] as const).map((s) => (
          <button
            key={s.key}
            className={`filter-pill${sla === s.key ? ' active' : ''}`}
            onClick={() => setSla(sla === s.key ? null : s.key)}
          >
            <span className="dot" style={{ background: s.color }} />
            {s.label}
          </button>
        ))}

        <div style={{ marginLeft: 'auto' }}>
          <button className="btn btn-ghost btn-sm">+ Mais filtros</button>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Nº</th>
              <th>Cliente</th>
              <th>Escopo</th>
              <th>Valor</th>
              <th>Status</th>
              <th style={{ minWidth: 170 }}>SLA</th>
              <th>Enviada</th>
              <th>Validade</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {proposals.map((p) => {
              const slaPct =
                p.sla.total === 0
                  ? 0
                  : Math.min(100, (p.sla.days / p.sla.total) * 100)
              return (
                <tr key={p.id} onClick={onOpen} style={{ cursor: 'pointer' }}>
                  <td className="td-mono">{p.id}</td>
                  <td className="td-primary">{p.client}</td>
                  <td>{p.scope}</td>
                  <td className="td-mono">{p.value}</td>
                  <td>
                    <span className={`status ${statusClassMap[p.status]}`}>
                      {statusLabelMap[p.status]}
                    </span>
                  </td>
                  <td>
                    {p.sla.total === 0 ? (
                      <span
                        style={{
                          color: 'var(--gray-400)',
                          fontSize: 11,
                          fontFamily: 'var(--mono)',
                        }}
                      >
                        —
                      </span>
                    ) : (
                      <div className={`sla sla-${p.sla.state}`}>
                        <div className="sla-header">
                          <span className="sla-days">{p.sla.days}d</span>
                          <span className="sla-total">/ {p.sla.total}d</span>
                        </div>
                        <div className="sla-bar">
                          <div className="sla-fill" style={{ width: `${slaPct}%` }} />
                        </div>
                        <div className="sla-label">{p.sla.label}</div>
                      </div>
                    )}
                  </td>
                  <td className="td-mono" style={{ color: 'var(--gray-500)' }}>
                    {p.sent}
                  </td>
                  <td className="td-mono" style={{ color: 'var(--gray-500)' }}>
                    {p.expires}
                  </td>
                  <td>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        onOpen()
                      }}
                    >
                      Abrir →
                    </button>
                  </td>
                </tr>
              )
            })}
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
            style={{
              fontSize: 12,
              color: 'var(--gray-500)',
              fontFamily: 'var(--mono)',
            }}
          >
            Exibindo 1–10 de 24
          </span>
          <div style={{ display: 'flex', gap: 4 }}>
            <button className="btn btn-secondary btn-sm">←</button>
            <button className="btn btn-primary btn-sm">1</button>
            <button className="btn btn-secondary btn-sm">2</button>
            <button className="btn btn-secondary btn-sm">3</button>
            <button className="btn btn-secondary btn-sm">→</button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16, textAlign: 'right' }}>
        <button className="btn btn-primary btn-sm" onClick={onNew}>
          + Nova Proposta
        </button>
      </div>
    </div>
  )
}
