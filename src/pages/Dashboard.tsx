import { Topbar } from '../components/Topbar'

const cashData = [
  { m: 'Jan', in: 72, out: 48 },
  { m: 'Fev', in: 88, out: 52 },
  { m: 'Mar', in: 104, out: 58 },
  { m: 'Abr', in: 148, out: 58 },
  { m: 'Mai', in: 132, out: 62 },
  { m: 'Jun', in: 118, out: 60 },
]
const maxCash = Math.max(...cashData.flatMap((d) => [d.in, d.out]))

export function Dashboard() {
  return (
    <>
      <Topbar />
      <div className="content page">
      <div className="kpi-grid">
        <div className="kpi">
          <div className="kpi-label">Receita do Mês</div>
          <div className="kpi-value">
            R$ 147.820<span className="unit">,00</span>
          </div>
          <div className="kpi-trend up">↑ 12,4% vs mês anterior</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Projetos Ativos</div>
          <div className="kpi-value">18</div>
          <div className="kpi-trend up">+3 este mês</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Propostas em Análise</div>
          <div className="kpi-value">7</div>
          <div className="kpi-trend">Valor total R$ 412k</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Taxa de Conversão</div>
          <div className="kpi-value">
            34<span className="unit">%</span>
          </div>
          <div className="kpi-trend down">↓ 2pp trimestre</div>
        </div>
      </div>

      <div className="grid-3">
        <div className="card">
          <div className="card-head">
            <div className="card-title">Fluxo de Caixa — 2026</div>
            <button className="btn btn-ghost btn-sm">Exportar</button>
          </div>
          <div className="card-body">
            <div className="bar-chart">
              {cashData.map((d) => (
                <div className="bar-col" key={d.m}>
                  <div className="bar-pair">
                    <div
                      className="bar"
                      style={{ height: `${((d.in / maxCash) * 100).toFixed(1)}%` }}
                    />
                    <div
                      className="bar out"
                      style={{ height: `${((d.out / maxCash) * 100).toFixed(1)}%` }}
                    />
                  </div>
                  <div className="bar-label">{d.m}</div>
                </div>
              ))}
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-dot" /> Entradas
              </div>
              <div className="legend-item">
                <span className="legend-dot out" /> Saídas
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <div className="card-title">Próximas Entregas</div>
          </div>
          <div className="card-body" style={{ padding: '12px 20px' }}>
            <div className="list-item">
              <div className="list-dot" />
              <div className="list-content">
                <div className="list-title">Projeto Executivo — Residência Alphaville</div>
                <div className="list-meta">Em 3 dias · Cliente Marina Costa</div>
              </div>
            </div>
            <div className="list-item">
              <div className="list-dot" />
              <div className="list-content">
                <div className="list-title">Anteprojeto — Escritório Setor Bueno</div>
                <div className="list-meta">Em 6 dias · Cliente Ricardo Vaz</div>
              </div>
            </div>
            <div className="list-item">
              <div className="list-dot muted" />
              <div className="list-content">
                <div className="list-title">Memorial Descritivo — Loja Conceito</div>
                <div className="list-meta">Em 10 dias · Cliente Atelier Noma</div>
              </div>
            </div>
            <div className="list-item">
              <div className="list-dot muted" />
              <div className="list-content">
                <div className="list-title">Estudo Preliminar — Galpão Industrial</div>
                <div className="list-meta">Em 14 dias · Cliente Transvale</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-head">
            <div className="card-title">Funil Comercial</div>
            <span className="badge badge-outline">42 leads ativos</span>
          </div>
          <div className="card-body">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '160px 1fr',
                gap: 24,
                alignItems: 'center',
              }}
            >
              <div className="donut-wrap">
                <svg viewBox="0 0 120 120" width="160" height="160">
                  <circle cx="60" cy="60" r="48" fill="none" stroke="#f5f5f5" strokeWidth="14" />
                  <circle
                    cx="60"
                    cy="60"
                    r="48"
                    fill="none"
                    stroke="#171717"
                    strokeWidth="14"
                    strokeDasharray="103 301"
                    strokeDashoffset="0"
                    transform="rotate(-90 60 60)"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="48"
                    fill="none"
                    stroke="#525252"
                    strokeWidth="14"
                    strokeDasharray="75 301"
                    strokeDashoffset="-103"
                    transform="rotate(-90 60 60)"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="48"
                    fill="none"
                    stroke="#a3a3a3"
                    strokeWidth="14"
                    strokeDasharray="60 301"
                    strokeDashoffset="-178"
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <div className="donut-center">
                  <div className="donut-num">42</div>
                  <div className="donut-sub">Leads</div>
                </div>
              </div>
              <div>
                <FunnelRow color="#171717" label="Prospecção" value="14" border />
                <FunnelRow color="#525252" label="Briefing" value="10" border />
                <FunnelRow color="#a3a3a3" label="Proposta Enviada" value="8" border />
                <FunnelRow color="#d4d4d4" label="Negociação" value="10" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <div className="card-title">Atividade Recente</div>
          </div>
          <div className="card-body" style={{ padding: '12px 20px' }}>
            <div className="list-item">
              <div className="list-dot" />
              <div className="list-content">
                <div className="list-title">Proposta #P-2026-041 aprovada</div>
                <div className="list-meta">Residência Alphaville · há 2h</div>
              </div>
              <div className="list-value">R$ 68.400</div>
            </div>
            <div className="list-item">
              <div className="list-dot muted" />
              <div className="list-content">
                <div className="list-title">NF-e #1284 emitida</div>
                <div className="list-meta">Cliente Ricardo Vaz · há 5h</div>
              </div>
              <div className="list-value">R$ 12.800</div>
            </div>
            <div className="list-item">
              <div className="list-dot muted" />
              <div className="list-content">
                <div className="list-title">Novo lead via Instagram Ads</div>
                <div className="list-meta">Campanha "Residencial Alto Padrão" · ontem</div>
              </div>
            </div>
            <div className="list-item">
              <div className="list-dot muted" />
              <div className="list-content">
                <div className="list-title">Documento enviado ao cliente</div>
                <div className="list-meta">Projeto Legal — Atelier Noma · ontem</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

function FunnelRow({
  color,
  label,
  value,
  border,
}: {
  color: string
  label: string
  value: string
  border?: boolean
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '8px 0',
        borderBottom: border ? '1px solid var(--gray-100)' : 'none',
      }}
    >
      <span style={{ fontSize: 12, color: 'var(--gray-600)' }}>
        <span
          style={{
            display: 'inline-block',
            width: 8,
            height: 8,
            background: color,
            borderRadius: 2,
            marginRight: 8,
          }}
        />
        {label}
      </span>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 12 }}>{value}</span>
    </div>
  )
}
