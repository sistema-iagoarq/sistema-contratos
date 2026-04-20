import { useState } from 'react'
import { Topbar } from '../components/Topbar'

type Tab = 'overview' | 'movements' | 'projects' | 'taxes'

type MonthPoint = { m: string; in: number; out: number; forecast?: boolean; current?: boolean }

const chartData: MonthPoint[] = [
  { m: 'Nov', in: 98, out: 52 },
  { m: 'Dez', in: 112, out: 56 },
  { m: 'Jan', in: 104, out: 58 },
  { m: 'Fev', in: 88, out: 52 },
  { m: 'Mar', in: 132, out: 58 },
  { m: 'Abr', in: 148, out: 58, current: true },
  { m: 'Mai', in: 138, out: 62, forecast: true },
]

type Cat =
  | 'payroll'
  | 'fixed'
  | 'software'
  | 'marketing'
  | 'services'
  | 'taxes'
  | 'office'
  | 'travel'
  | 'other'

type Movement = {
  type: 'in' | 'out'
  date: string
  desc: string
  ref: string
  cat?: Cat
  catLbl?: string
  proj?: string | null
  method: string
  status: 'paid' | 'pending' | 'late'
  amount: number
}

const movements: Movement[] = [
  { type: 'in',  date: '18/04', desc: 'Parcela 2/4 · Executivo Alphaville', ref: 'Marina Costa', proj: 'Residência Alphaville', method: 'PIX',     status: 'paid',    amount: 17100 },
  { type: 'in',  date: '15/04', desc: 'Entrada Projeto Setor Bueno',        ref: 'Ricardo Vaz',  proj: 'Escritório Setor Bueno', method: 'Transf.', status: 'paid',    amount: 18600 },
  { type: 'in',  date: '12/04', desc: 'Parcela 3/6 · Retrofit Mirante',     ref: 'Hotel Mirante',proj: 'Retrofit Hotel Mirante',method: 'Boleto',  status: 'paid',    amount: 76000 },
  { type: 'in',  date: '05/04', desc: 'Consultoria · Casa Modelo',          ref: 'GV Construtora', proj: 'Consultoria Casa Modelo', method: 'PIX',  status: 'paid',    amount: 8000 },
  { type: 'in',  date: '28/04', desc: 'Parcela 3/4 · Executivo Alphaville', ref: 'Marina Costa', proj: 'Residência Alphaville', method: 'PIX',     status: 'pending', amount: 17100 },
  { type: 'in',  date: '30/04', desc: 'Parcela · Clínica Vertex',           ref: 'Clínica Vertex', proj: 'Clínica Vertex',     method: 'Boleto',  status: 'pending', amount: 26000 },
  { type: 'in',  date: '02/04', desc: 'Parcela final · Cobertura Marista',  ref: 'Fabio Mourão', proj: 'Cobertura Setor Marista', method: 'PIX',   status: 'paid',    amount: 32000 },
  { type: 'in',  date: '08/04', desc: 'Kick-off · Casa Jardins',            ref: 'Paula Andrade',proj: 'Casa Jardins',        method: 'Transf.', status: 'paid',    amount: 21000 },
  { type: 'out', date: '20/04', desc: 'DAS Simples Nacional',               ref: 'Receita Federal', cat: 'taxes',     catLbl: 'Impostos',    method: 'DARF',    status: 'paid',    amount: 8280 },
  { type: 'out', date: '15/04', desc: 'Pró-labore abril',                   ref: 'Iago Siqueira',   cat: 'payroll',   catLbl: 'Pró-labore',  method: 'Transf.', status: 'paid',    amount: 18000 },
  { type: 'out', date: '15/04', desc: 'Salário Laura Mendonça',             ref: 'Laura M.',        cat: 'payroll',   catLbl: 'Folha',       method: 'Transf.', status: 'paid',    amount: 9200 },
  { type: 'out', date: '15/04', desc: 'Salário Thiago Reis',                ref: 'Thiago R.',       cat: 'payroll',   catLbl: 'Folha',       method: 'Transf.', status: 'paid',    amount: 6800 },
  { type: 'out', date: '05/04', desc: 'Aluguel escritório',                 ref: 'GR Imóveis',      cat: 'fixed',     catLbl: 'Fixo',        method: 'Boleto',  status: 'paid',    amount: 4200 },
  { type: 'out', date: '05/04', desc: 'Energia + Internet',                 ref: 'Contas',          cat: 'fixed',     catLbl: 'Fixo',        method: 'Boleto',  status: 'paid',    amount: 680 },
  { type: 'out', date: '03/04', desc: 'Adobe CC + Figma + Autodesk',        ref: 'Assinaturas',     cat: 'software',  catLbl: 'Software',    method: 'Cartão',  status: 'paid',    amount: 1480 },
  { type: 'out', date: '10/04', desc: 'Anúncios Meta · abril',              ref: 'Meta Ads',        cat: 'marketing', catLbl: 'Marketing',   method: 'Cartão',  status: 'paid',    amount: 2400 },
  { type: 'out', date: '12/04', desc: 'Contador mensal',                    ref: 'Escritório Vega', cat: 'services',  catLbl: 'Serviços',    method: 'PIX',     status: 'paid',    amount: 950 },
  { type: 'out', date: '25/04', desc: 'ISS Goiânia',                        ref: 'Prefeitura',      cat: 'taxes',     catLbl: 'Impostos',    method: 'DARF',    status: 'pending', amount: 3420 },
  { type: 'out', date: '18/04', desc: 'Material de escritório',             ref: 'Kalunga',         cat: 'office',    catLbl: 'Escritório',  method: 'Cartão',  status: 'paid',    amount: 380 },
  { type: 'out', date: '09/04', desc: 'Viagem Caldas Novas (cliente)',      ref: 'Reembolsos',      cat: 'travel',    catLbl: 'Viagem',      method: 'Cartão',  status: 'paid',    amount: 720 },
  { type: 'out', date: '28/04', desc: 'Pró-labore adicional',               ref: 'Iago Siqueira',   cat: 'payroll',   catLbl: 'Pró-labore',  method: 'Transf.', status: 'pending', amount: 6000 },
  { type: 'out', date: '30/04', desc: 'FGTS + INSS',                        ref: 'Encargos',        cat: 'taxes',     catLbl: 'Impostos',    method: 'DARF',    status: 'pending', amount: 4100 },
]

type ProjectFin = {
  name: string
  client: string
  status: 'active' | 'done'
  revenue: number
  cost: number
  hours: string
  progress: number
}

const projectsFin: ProjectFin[] = [
  { name: 'Residência Alphaville',       client: 'Marina Costa',     status: 'active', revenue: 145000, cost: 38200, hours: '284/460', progress: 62 },
  { name: 'Loja Conceito Noma',          client: 'Atelier Noma',     status: 'active', revenue: 54000,  cost: 12400, hours: '312/380', progress: 85 },
  { name: 'Retrofit Hotel Mirante',      client: 'Hotel Mirante',    status: 'active', revenue: 456000, cost: 94800, hours: '22/880',  progress: 10 },
  { name: 'Escritório Setor Bueno',      client: 'Ricardo Vaz',      status: 'active', revenue: 62000,  cost: 16800, hours: '96/240',  progress: 40 },
  { name: 'Casa Jardins',                client: 'Paula Andrade',    status: 'active', revenue: 210000, cost: 48600, hours: '58/420',  progress: 25 },
  { name: 'Clínica Vertex',              client: 'Clínica Vertex',   status: 'active', revenue: 78000,  cost: 22400, hours: '246/310', progress: 78 },
  { name: 'Cobertura Setor Marista',     client: 'Fabio Mourão',     status: 'done',   revenue: 128000, cost: 46200, hours: '380/380', progress: 100 },
  { name: 'Galpão Industrial Transvale', client: 'Transvale',        status: 'active', revenue: 340000, cost: 42800, hours: '42/520',  progress: 18 },
  { name: 'Consultoria Casa Modelo',     client: 'GV Construtora',   status: 'active', revenue: 32000,  cost: 28400, hours: '88/120',  progress: 92 },
]

type Tax = { code: string; name: string; desc: string; due: string; amount: number }

const taxes: Tax[] = [
  { code: 'DAS',  name: 'DAS · Simples Nacional',   desc: 'Mensal · Abril 2026',       due: 'Vence 20/04/26', amount: 8280 },
  { code: 'ISS',  name: 'ISS · Prefeitura Goiânia', desc: 'Nota fiscal de serviços',    due: 'Vence 25/04/26', amount: 3420 },
  { code: 'IR',   name: 'IRPJ + CSLL',               desc: 'Estimativa trimestral',      due: 'Vence 30/04/26', amount: 5700 },
  { code: 'PIS',  name: 'PIS + COFINS',              desc: 'Apuração mensal',            due: 'Vence 30/04/26', amount: 1680 },
  { code: 'FGTS', name: 'FGTS + INSS (folha)',       desc: 'Encargos trabalhistas',      due: 'Vence 30/04/26', amount: 4100 },
]

function brl(n: number): string {
  return n.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}
function brlCents(n: number): string {
  return n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function Financeiro() {
  const [tab, setTab] = useState<Tab>('overview')

  return (
    <>
      <Topbar />
      <div className="content page">
      <div className="tabs">
        <button
          className={`tab${tab === 'overview' ? ' active' : ''}`}
          onClick={() => setTab('overview')}
        >
          Visão Geral
        </button>
        <button
          className={`tab${tab === 'movements' ? ' active' : ''}`}
          onClick={() => setTab('movements')}
        >
          Movimentações<span className="count">{movements.length}</span>
        </button>
        <button
          className={`tab${tab === 'projects' ? ' active' : ''}`}
          onClick={() => setTab('projects')}
        >
          Lucro por Projeto<span className="count">{projectsFin.length}</span>
        </button>
        <button
          className={`tab${tab === 'taxes' ? ' active' : ''}`}
          onClick={() => setTab('taxes')}
        >
          Impostos
        </button>
      </div>

      {tab === 'overview' && <OverviewPanel />}
      {tab === 'movements' && <MovementsPanel />}
      {tab === 'projects' && <ProjectsPanel />}
      {tab === 'taxes' && <TaxesPanel />}
      </div>
    </>
  )
}

function OverviewPanel() {
  const totalIn = chartData.filter((c) => !c.forecast).reduce((a, b) => a + b.in, 0)
  const totalOut = chartData.filter((c) => !c.forecast).reduce((a, b) => a + b.out, 0)
  const maxVal = Math.max(...chartData.map((c) => Math.max(c.in, c.out)))

  return (
    <div>
      <div className="hero-grid">
        <div className="hero-card in">
          <div className="hero-top">
            <div className="hero-label">Entradas · Abril</div>
            <div className="hero-icon" style={{ color: 'var(--in)' }}>
              <IconArrowDown />
            </div>
          </div>
          <div className="hero-value">R$ 148.800</div>
          <div className="hero-sub">↑ 12% vs março</div>
        </div>
        <div className="hero-card out">
          <div className="hero-top">
            <div className="hero-label">Saídas · Abril</div>
            <div className="hero-icon" style={{ color: 'var(--out)' }}>
              <IconArrowUp />
            </div>
          </div>
          <div className="hero-value">R$ 58.230</div>
          <div className="hero-sub">= estável</div>
        </div>
        <div className="hero-card profit">
          <div className="hero-top">
            <div className="hero-label">Lucro Líquido</div>
            <div className="hero-icon" style={{ color: 'var(--profit)' }}>
              <IconTrendUp />
            </div>
          </div>
          <div className="hero-value">R$ 90.570</div>
          <div className="hero-sub">margem 60.8%</div>
        </div>
        <div className="hero-card balance">
          <div className="hero-top">
            <div className="hero-label">Saldo em Conta</div>
            <div className="hero-icon" style={{ color: 'var(--gray-700)' }}>
              <IconWallet />
            </div>
          </div>
          <div className="hero-value">R$ 312.480</div>
          <div className="hero-sub">Inter + Sicoob</div>
        </div>
      </div>

      <div className="chart-card">
        <div className="chart-head">
          <div className="chart-title">
            Fluxo Semestral
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 11,
                color: 'var(--gray-500)',
                fontWeight: 400,
                letterSpacing: 0,
                textTransform: 'none',
              }}
            >
              Nov 2025 · Mai 2026
            </span>
          </div>
          <div className="chart-legend">
            <div className="leg">
              <span className="sw" style={{ background: 'var(--in)' }} />
              Entradas
            </div>
            <div className="leg">
              <span className="sw" style={{ background: 'var(--out)' }} />
              Saídas
            </div>
            <div className="leg">
              <span className="sw" style={{ background: 'var(--in)', opacity: 0.3 }} />
              Previsto
            </div>
          </div>
        </div>
        <div className="chart-body">
          <div className="bars-wrap">
            {chartData.map((c) => {
              const inH = (c.in / maxVal) * 100
              const outH = (c.out / maxVal) * 100
              const inClass = c.forecast ? 'bar bar-forecast-in' : 'bar bar-in'
              const outClass = c.forecast ? 'bar bar-forecast-out' : 'bar bar-out'
              return (
                <div className="bar-group" key={c.m}>
                  <div className="bar-pair">
                    <div className={inClass} style={{ height: `${inH}%` }} title={`Entrada: R$ ${c.in}k`} />
                    <div className={outClass} style={{ height: `${outH}%` }} title={`Saída: R$ ${c.out}k`} />
                  </div>
                  <div className={`bar-label${c.current ? ' current' : ''}`}>{c.m}</div>
                </div>
              )
            })}
          </div>
          <div className="chart-footer">
            <div className="chart-footer-cell">
              <div className="cf-label">Entradas · 6 meses</div>
              <div className="cf-value" style={{ color: 'var(--in)' }}>
                R$ {brl(totalIn)}k
              </div>
            </div>
            <div className="chart-footer-cell">
              <div className="cf-label">Saídas · 6 meses</div>
              <div className="cf-value" style={{ color: 'var(--out)' }}>
                R$ {brl(totalOut)}k
              </div>
            </div>
            <div className="chart-footer-cell">
              <div className="cf-label">Lucro consolidado</div>
              <div className="cf-value" style={{ color: 'var(--profit)' }}>
                R$ {brl(totalIn - totalOut)}k
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cash-block">
        <div className="cash-head">
          <div className="cash-title">Posição de Caixa · Abril</div>
          <div className="cash-period">Fluxo realizado + previsto</div>
        </div>
        <div className="cash-rows">
          <div className="cash-row">
            <div className="cash-row-label">Saldo inicial · 01/04</div>
            <div className="cash-row-bar in" style={{ width: '60%' }}>
              R$ 222k
            </div>
            <div className="cash-row-value">R$ 222.000</div>
          </div>
          <div className="cash-row">
            <div className="cash-row-label">Entradas realizadas</div>
            <div className="cash-row-bar in" style={{ width: '80%' }}>
              R$ 148,8k
            </div>
            <div className="cash-row-value">R$ 148.800</div>
          </div>
          <div className="cash-row">
            <div className="cash-row-label">Saídas realizadas</div>
            <div className="cash-row-bar out" style={{ width: '34%' }}>
              R$ 58,2k
            </div>
            <div className="cash-row-value" style={{ color: 'var(--out)' }}>
              − R$ 58.230
            </div>
          </div>
          <div className="cash-row">
            <div className="cash-row-label">A receber (previsto)</div>
            <div className="cash-row-bar pending" style={{ width: '46%' }}>
              R$ 43,1k
            </div>
            <div className="cash-row-value" style={{ color: 'var(--pending)' }}>
              + R$ 43.100
            </div>
          </div>
        </div>
        <div className="cash-balance-row">
          <span
            style={{
              fontSize: 12,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 600,
              opacity: 0.9,
            }}
          >
            Saldo previsto 30/04
          </span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 20, fontWeight: 700 }}>
            R$ 355.670
          </span>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <div className="section-title">Saídas por Categoria</div>
          </div>
          <div className="card-body">
            <div className="cat-bars">
              {([
                { name: 'Pró-labore & Folha',  val: 40000, pct: 68, cat: 'payroll' },
                { name: 'Impostos',            val: 15800, pct: 27, cat: 'taxes' },
                { name: 'Fixo (aluguel, contas)', val: 4880, pct: 8, cat: 'fixed' },
                { name: 'Marketing (anúncios)', val: 2400, pct: 4, cat: 'marketing' },
                { name: 'Software',            val: 1480, pct: 3, cat: 'software' },
                { name: 'Serviços',            val: 950,  pct: 2, cat: 'services' },
                { name: 'Viagem',              val: 720,  pct: 1, cat: 'travel' },
                { name: 'Escritório',          val: 380,  pct: 1, cat: 'office' },
              ] as Array<{ name: string; val: number; pct: number; cat: Cat }>).map((c) => (
                <div key={c.name}>
                  <div className="cat-row">
                    <span className="name">{c.name}</span>
                    <span className="val">R$ {brl(c.val)}</span>
                  </div>
                  <div className="cat-bar-wrap">
                    <div className={`cat-bar-fill cat-${c.cat}`} style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="section-title">Últimas Movimentações</div>
          </div>
          <div className="card-body" style={{ padding: '8px 16px' }}>
            {movements.slice(0, 6).map((m, i) => (
              <div key={i} className="list-item">
                <div
                  className="list-dot"
                  style={{
                    background: m.type === 'in' ? 'var(--in)' : 'var(--out)',
                  }}
                />
                <div className="list-content">
                  <div className="list-title">{m.desc}</div>
                  <div className="list-meta">
                    {m.date} · {m.ref}
                  </div>
                </div>
                <span
                  className="td-mono"
                  style={{
                    fontWeight: 600,
                    color: m.type === 'in' ? 'var(--in)' : 'var(--out)',
                  }}
                >
                  {m.type === 'in' ? '+' : '−'} R$ {brl(m.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function MovementsPanel() {
  const [filter, setFilter] = useState<'all' | 'in' | 'out'>('all')
  const [status, setStatus] = useState<'all' | 'paid' | 'pending' | 'late'>('all')

  const filtered = movements
    .filter((m) => filter === 'all' || m.type === filter)
    .filter((m) => status === 'all' || m.status === status)

  const totalIn = movements.filter((m) => m.type === 'in').reduce((a, b) => a + b.amount, 0)
  const totalOut = movements.filter((m) => m.type === 'out').reduce((a, b) => a + b.amount, 0)

  return (
    <div>
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', marginBottom: 16 }}>
        <div className="kpi">
          <div className="kpi-label">Total Entradas · Abril</div>
          <div className="kpi-value" style={{ color: 'var(--in)' }}>R$ {brl(totalIn)}</div>
          <div className="kpi-sub">{movements.filter((m) => m.type === 'in').length} lançamentos</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Total Saídas · Abril</div>
          <div className="kpi-value" style={{ color: 'var(--out)' }}>R$ {brl(totalOut)}</div>
          <div className="kpi-sub">{movements.filter((m) => m.type === 'out').length} lançamentos</div>
        </div>
      </div>

      <div className="filter-bar">
        <span className="filter-label">Tipo:</span>
        {([
          { key: 'all', label: 'Todas' },
          { key: 'in', label: 'Entradas' },
          { key: 'out', label: 'Saídas' },
        ] as const).map((f) => (
          <button
            key={f.key}
            className={`filter-pill${filter === f.key ? ' active' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}

        <div className="filter-divider" />

        <span className="filter-label">Status:</span>
        {([
          { key: 'all', label: 'Todos', color: undefined },
          { key: 'paid', label: 'Pago', color: 'var(--paid)' },
          { key: 'pending', label: 'Pendente', color: 'var(--pending)' },
          { key: 'late', label: 'Atrasado', color: 'var(--late)' },
        ] as const).map((f) => (
          <button
            key={f.key}
            className={`filter-pill${status === f.key ? ' active' : ''}`}
            onClick={() => setStatus(f.key)}
          >
            {f.color && <span className="dot" style={{ background: f.color }} />}
            {f.label}
          </button>
        ))}

        <div style={{ marginLeft: 'auto' }}>
          <button className="btn btn-primary btn-sm">+ Nova Movimentação</button>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Data</th>
              <th>Descrição</th>
              <th>Projeto / Categoria</th>
              <th>Método</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Valor</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m, i) => (
              <tr key={i}>
                <td>
                  <span
                    className="badge badge-no-dot"
                    style={{
                      background: m.type === 'in' ? 'var(--in-bg)' : 'var(--out-bg)',
                      color: m.type === 'in' ? 'var(--in)' : 'var(--out)',
                      border: `1px solid ${m.type === 'in' ? 'var(--in-bd)' : 'var(--out-bd)'}`,
                    }}
                  >
                    {m.type === 'in' ? 'Entrada' : 'Saída'}
                  </span>
                </td>
                <td className="td-mono">{m.date}</td>
                <td className="td-primary">
                  {m.desc}
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginTop: 2 }}>
                    {m.ref}
                  </div>
                </td>
                <td>
                  {m.proj ? (
                    <span style={{ color: 'var(--gray-700)' }}>{m.proj}</span>
                  ) : m.cat ? (
                    <span
                      className="badge badge-no-dot"
                      style={{
                        background: `var(--cat-${m.cat}-bg)`,
                        color: `var(--cat-${m.cat})`,
                      }}
                    >
                      {m.catLbl}
                    </span>
                  ) : (
                    <span style={{ color: 'var(--gray-400)' }}>—</span>
                  )}
                </td>
                <td className="td-mono">{m.method}</td>
                <td>
                  <span className={`status ${statusClass(m.status)}`}>
                    {statusLabel(m.status)}
                  </span>
                </td>
                <td
                  className="td-mono"
                  style={{
                    textAlign: 'right',
                    fontWeight: 600,
                    color: m.type === 'in' ? 'var(--in)' : 'var(--out)',
                  }}
                >
                  {m.type === 'in' ? '+' : '−'} R$ {brlCents(m.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function statusClass(s: Movement['status']): string {
  if (s === 'paid') return 'status-approved'
  if (s === 'pending') return 'status-analysis'
  return 'status-rejected'
}
function statusLabel(s: Movement['status']): string {
  if (s === 'paid') return 'Pago'
  if (s === 'pending') return 'Pendente'
  return 'Atrasado'
}

function ProjectsPanel() {
  const totalRev = projectsFin.reduce((a, b) => a + b.revenue, 0)
  const totalCost = projectsFin.reduce((a, b) => a + b.cost, 0)

  return (
    <div>
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 16 }}>
        <div className="kpi">
          <div className="kpi-label">Receita Contratada</div>
          <div className="kpi-value" style={{ color: 'var(--in)' }}>
            R$ {brl(totalRev / 1000)}k
          </div>
          <div className="kpi-sub">{projectsFin.length} projetos</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Custos Alocados</div>
          <div className="kpi-value" style={{ color: 'var(--out)' }}>
            R$ {brl(totalCost / 1000)}k
          </div>
          <div className="kpi-sub">Pró-labore + externos</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Lucro Bruto Estimado</div>
          <div className="kpi-value" style={{ color: 'var(--profit)' }}>
            R$ {brl((totalRev - totalCost) / 1000)}k
          </div>
          <div className="kpi-sub">Antes de impostos</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Margem Média</div>
          <div className="kpi-value">
            {Math.round(((totalRev - totalCost) / totalRev) * 100)}
            <span className="unit">%</span>
          </div>
          <div className="kpi-sub">Portfolio consolidado</div>
        </div>
      </div>

      <div className="projects-grid">
        {projectsFin.map((p) => {
          const profit = p.revenue - p.cost
          const margin = Math.round((profit / p.revenue) * 100)
          const marginClass = margin >= 60 ? 'high' : margin >= 30 ? 'mid' : 'low'
          const outPct = (p.cost / p.revenue) * 100
          const inPct = 100 - outPct
          const cardClass =
            margin < 20 ? 'profit-loss' : margin >= 60 ? 'profit-high' : ''
          return (
            <div key={p.name} className={`proj-card ${cardClass}`}>
              <div className="proj-head">
                <div className="proj-info">
                  <div className="proj-name">{p.name}</div>
                  <div className="proj-client">{p.client}</div>
                </div>
                <span className={`proj-status ${p.status}`}>
                  {p.status === 'active' ? 'Ativo' : 'Concluído'}
                </span>
              </div>
              <div className="proj-body">
                <div className="proj-line">
                  <span className="lbl">Receita</span>
                  <span className="val" style={{ color: 'var(--in)' }}>
                    R$ {brl(p.revenue)}
                  </span>
                </div>
                <div className="proj-line">
                  <span className="lbl">Custos</span>
                  <span className="val" style={{ color: 'var(--out)' }}>
                    − R$ {brl(p.cost)}
                  </span>
                </div>
                <div className="proj-divider" />
                <div className="proj-line">
                  <span className="lbl">Horas</span>
                  <span className="val">{p.hours}</span>
                </div>
                <div className="proj-line">
                  <span className="lbl">Progresso</span>
                  <span className="val">{p.progress}%</span>
                </div>
                <div className="proj-progress">
                  <div className="proj-progress-in" style={{ width: `${inPct}%` }} />
                  <div className="proj-progress-out" style={{ width: `${outPct}%` }} />
                </div>
                <div className="proj-profit-box">
                  <span className="proj-profit-label">Lucro estimado</span>
                  <div>
                    <span
                      className="proj-profit-value"
                      style={{ color: `var(--${margin >= 20 ? 'profit' : 'loss'})` }}
                    >
                      R$ {brl(profit)}
                    </span>
                    <span className={`proj-profit-margin ${marginClass}`}>
                      {margin}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function TaxesPanel() {
  const total = taxes.reduce((a, b) => a + b.amount, 0)

  return (
    <div>
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 20 }}>
        <div className="kpi">
          <div className="kpi-label">A pagar este mês</div>
          <div className="kpi-value" style={{ color: 'var(--tax)' }}>R$ {brl(total)}</div>
          <div className="kpi-sub">{taxes.length} guias</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Já pagos</div>
          <div className="kpi-value" style={{ color: 'var(--paid)' }}>R$ 8.280</div>
          <div className="kpi-sub">DAS · 20/04</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Pendentes</div>
          <div className="kpi-value" style={{ color: 'var(--pending)' }}>R$ {brl(total - 8280)}</div>
          <div className="kpi-sub">Até 30/04</div>
        </div>
      </div>

      <div className="tax-card">
        {taxes.map((t) => (
          <div key={t.code} className="tax-item">
            <div className="tax-dot">{t.code.slice(0, 2)}</div>
            <div>
              <div className="tax-name">{t.name}</div>
              <div className="tax-desc">{t.desc}</div>
            </div>
            <div className="tax-due">{t.due}</div>
            <div>
              <div className="tax-value" style={{ textAlign: 'right', marginBottom: 4 }}>
                R$ {brl(t.amount)}
              </div>
              <button className="btn btn-secondary btn-sm">Gerar guia</button>
            </div>
          </div>
        ))}
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
function IconArrowDown() {
  return (
    <svg {...svgProps}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </svg>
  )
}
function IconArrowUp() {
  return (
    <svg {...svgProps}>
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  )
}
function IconTrendUp() {
  return (
    <svg {...svgProps}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  )
}
function IconWallet() {
  return (
    <svg {...svgProps}>
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
    </svg>
  )
}
