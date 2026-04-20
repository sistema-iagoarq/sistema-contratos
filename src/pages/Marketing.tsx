import { useState } from 'react'
import { Topbar } from '../components/Topbar'

type Tab = 'calendar' | 'ads'

type ContentType = 'ct-post' | 'ct-reels' | 'ct-carousel' | 'ct-story'

type ContentEvent = { t: string; title: string; type: ContentType; draft?: boolean }

const monthEvents: Record<number, ContentEvent[]> = {
  2:  [{ t: '10:00', title: 'Post · Projetos residenciais', type: 'ct-post' }],
  5:  [{ t: '18:00', title: 'Carrossel · Iluminação', type: 'ct-carousel' }],
  7:  [{ t: '11:00', title: 'Reels · Obra Atelier Noma', type: 'ct-reels' }],
  9:  [{ t: '15:00', title: 'Story · Bastidores', type: 'ct-story' }],
  12: [{ t: '10:00', title: 'Post · Antes/Depois Noma', type: 'ct-post' }],
  14: [{ t: '19:00', title: 'Reels · Materiais naturais', type: 'ct-reels' }],
  16: [{ t: '10:00', title: 'Carrossel · 5 dicas iluminação', type: 'ct-carousel' }],
  18: [{ t: '14:00', title: 'Story · Enquete paleta', type: 'ct-story' }],
  20: [{ t: '18:00', title: 'Post · Detalhe Alphaville', type: 'ct-post' }],
  22: [{ t: '10:00', title: 'Reels · Tour Alphaville', type: 'ct-reels' }],
  24: [{ t: '15:00', title: 'Carrossel · 5 erros cozinha', type: 'ct-carousel' }],
  26: [{ t: '11:00', title: 'Story · Dia a dia', type: 'ct-story' }],
  28: [{ t: '18:00', title: 'Post · Biofilia', type: 'ct-post', draft: true }],
  30: [{ t: '10:00', title: 'Reels · Retrospectiva', type: 'ct-reels', draft: true }],
}

const contentLabel: Record<ContentType, string> = {
  'ct-post': 'Post',
  'ct-reels': 'Reels',
  'ct-carousel': 'Carrossel',
  'ct-story': 'Story',
}

const todayPublications: Array<{
  time: string
  type: ContentType
  title: string
  meta: string
}> = [
  {
    time: '18:00',
    type: 'ct-post',
    title: 'Detalhe fachada · Residência Alphaville',
    meta: '3 assets · legenda aprovada\nCliente Marina Costa · autorização de uso',
  },
]

type Platform = 'ad-instagram' | 'ad-meta' | 'ad-google'

type Ad = {
  name: string
  meta: string
  platform: Platform
  platformLabel: string
  status: 'active' | 'paused'
  period: string
  budget: number
  spent: number
  reach: string
  ctr: string
  notes: string
}

const ads: Ad[] = [
  {
    name: 'Residencial Alto Padrão · Abril',
    meta: 'Ativo desde 01/04 · Públicos 30+ Goiânia',
    platform: 'ad-instagram',
    platformLabel: 'Instagram',
    status: 'active',
    period: '01/04 → 30/04',
    budget: 3000,
    spent: 2140,
    reach: '42.8k',
    ctr: '3.1%',
    notes:
      'Melhor desempenho em post de antes/depois. CTR 3.1% — acima da média (1.8%). Leads qualificados: 14.',
  },
  {
    name: 'Retrofit Comercial · Hotel/Retail',
    meta: 'Campanha institucional · segmentado B2B',
    platform: 'ad-meta',
    platformLabel: 'Meta Ads',
    status: 'active',
    period: '10/04 → 10/05',
    budget: 4500,
    spent: 1820,
    reach: '28.4k',
    ctr: '1.9%',
    notes:
      'Público corporativo (hotéis, clínicas). Rodando Reels vertical + estático. 6 leads → 2 propostas em andamento.',
  },
  {
    name: 'Consultoria Arquitetônica · Search',
    meta: 'Google Search · palavras arquitetura residencial Goiânia',
    platform: 'ad-google',
    platformLabel: 'Google Ads',
    status: 'paused',
    period: '25/03 → pausado 18/04',
    budget: 2000,
    spent: 1680,
    reach: '— impressões',
    ctr: '4.8%',
    notes:
      'Pausado para reformular palavras-chave. Conversão caiu na última semana. Retomar após ajuste em 01/05.',
  },
]

const legendItems: Array<{ type: ContentType; label: string }> = [
  { type: 'ct-post', label: 'Post' },
  { type: 'ct-reels', label: 'Reels' },
  { type: 'ct-carousel', label: 'Carrossel' },
  { type: 'ct-story', label: 'Story' },
]

function brl(n: number): string {
  return n.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

export function Marketing() {
  const [tab, setTab] = useState<Tab>('calendar')

  return (
    <>
      <Topbar />
      <div className="content page">
      <div className="tabs">
        <button
          className={`tab${tab === 'calendar' ? ' active' : ''}`}
          onClick={() => setTab('calendar')}
        >
          Calendário Instagram<span className="count">14</span>
        </button>
        <button
          className={`tab${tab === 'ads' ? ' active' : ''}`}
          onClick={() => setTab('ads')}
        >
          Anúncios<span className="count">3</span>
        </button>
      </div>

      {tab === 'calendar' && <CalendarTab />}
      {tab === 'ads' && <AdsTab />}
      </div>
    </>
  )
}

function CalendarTab() {
  const [hidden, setHidden] = useState<Set<ContentType>>(new Set())
  const toggle = (t: ContentType) => {
    const next = new Set(hidden)
    if (next.has(t)) next.delete(t)
    else next.add(t)
    setHidden(next)
  }

  const scheduled = Object.values(monthEvents)
    .flat()
    .filter((e) => !e.draft).length
  const drafts = Object.values(monthEvents)
    .flat()
    .filter((e) => e.draft).length

  return (
    <div>
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 16 }}>
        <div className="kpi">
          <div className="kpi-label">Publicações no Mês</div>
          <div className="kpi-value">14</div>
          <div className="kpi-sub">{scheduled} agendados · {drafts} rascunhos</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Reels Programados</div>
          <div className="kpi-value" style={{ color: 'var(--ct-reels)' }}>4</div>
          <div className="kpi-sub">meta: 1 por semana</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Posts + Carrosséis</div>
          <div className="kpi-value" style={{ color: 'var(--ct-post)' }}>8</div>
          <div className="kpi-sub">mix de conteúdo orgânico</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Próxima Publicação</div>
          <div className="kpi-value" style={{ fontSize: 20 }}>Hoje · 18h</div>
          <div className="kpi-sub">Post · Alphaville</div>
        </div>
      </div>

      <div className="period-nav">
        <div>
          <div className="period-title">
            Abril <em>2026</em>
          </div>
          <div className="period-sub">14 publicações · 12 agendadas · 2 rascunhos</div>
        </div>
        <div className="period-controls">
          <button className="btn btn-secondary btn-sm">← Março</button>
          <button className="btn btn-primary btn-sm">Abril</button>
          <button className="btn btn-secondary btn-sm">Maio →</button>
          <button className="btn btn-primary btn-sm" style={{ marginLeft: 8 }}>
            + Nova Publicação
          </button>
        </div>
      </div>

      <div className="legend-bar">
        <span className="legend-title">Tipos:</span>
        {legendItems.map((l) => (
          <div
            key={l.type}
            className={`legend-item ${l.type}${hidden.has(l.type) ? ' off' : ''}`}
            onClick={() => toggle(l.type)}
          >
            <span className="dot" />
            {l.label}
          </div>
        ))}
      </div>

      <div className="cal-layout">
        <CalendarGrid hidden={hidden} />
        <div className="side-panel">
          <div className="side-head">
            <div
              className="side-date"
              dangerouslySetInnerHTML={{ __html: 'Hoje <em>segunda, 20 abr</em>' }}
            />
            <div className="side-sub">1 publicação programada</div>
          </div>
          <div className="side-body">
            {todayPublications.map((p, i) => (
              <div key={i} className={`side-item ${p.type}`}>
                <div className="side-item-head">
                  <span className="side-item-time">{p.time}</span>
                  <span className="side-item-type">{contentLabel[p.type]}</span>
                </div>
                <div className="side-item-title">{p.title}</div>
                <div className="side-item-meta" style={{ whiteSpace: 'pre-line' }}>
                  {p.meta}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function CalendarGrid({ hidden }: { hidden: Set<ContentType> }) {
  const daysInMonth = 30
  const firstOffset = 2
  const prevStart = 31 - firstOffset + 1
  const total = firstOffset + daysInMonth
  const pad = total % 7 === 0 ? 0 : 7 - (total % 7)
  const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
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
    const isToday = d === 20
    cells.push(
      <div
        className={`cal-day${isToday ? ' today' : ''}`}
        key={`d-${d}`}
      >
        <div className="cal-day-num">{d}</div>
        {evs.slice(0, 3).map((e, i) => (
          <div
            key={i}
            className={`cal-event ${e.type}${e.draft ? ' draft' : ''}`}
            title={e.title}
          >
            <span className="time">{e.t}</span>
            {e.title}
          </div>
        ))}
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

function AdsTab() {
  const totalBudget = ads.reduce((a, b) => a + b.budget, 0)
  const totalSpent = ads.reduce((a, b) => a + b.spent, 0)
  const active = ads.filter((a) => a.status === 'active').length

  return (
    <div>
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 16 }}>
        <div className="kpi">
          <div className="kpi-label">Investido · Abril</div>
          <div className="kpi-value" style={{ color: 'var(--ct-post)' }}>
            R$ {brl(totalSpent)}
          </div>
          <div className="kpi-sub">de R$ {brl(totalBudget)} orçado</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Anúncios Ativos</div>
          <div className="kpi-value" style={{ color: 'var(--st-posted)' }}>
            {active}
          </div>
          <div className="kpi-sub">{ads.length - active} pausado</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Orçamento Anual</div>
          <div className="kpi-value">R$ 48k</div>
          <div className="kpi-sub">R$ 4k/mês médio</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Plataforma Principal</div>
          <div className="kpi-value" style={{ fontSize: 20, color: 'var(--ad-instagram)' }}>
            Instagram
          </div>
          <div className="kpi-sub">62% do investimento</div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 14,
        }}
      >
        <div className="section-title">Campanhas</div>
        <button className="btn btn-primary btn-sm">+ Novo Anúncio</button>
      </div>

      <div className="ads-layout">
        <div>
          {ads.map((ad) => {
            const pct = Math.min(100, (ad.spent / ad.budget) * 100)
            const fillClass =
              pct >= 85 ? 'full' : pct >= 60 ? 'warn' : 'ok'
            return (
              <div key={ad.name} className={`ad-card ${ad.status}`}>
                <div className="ad-head">
                  <div className="ad-info">
                    <div className="ad-name">{ad.name}</div>
                    <div className="ad-meta">{ad.meta}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
                    <span className={`ad-platform ${ad.platform}`}>
                      <span className="dot" />
                      {ad.platformLabel}
                    </span>
                    <span className={`ad-status ${ad.status}`}>
                      {ad.status === 'active' ? 'Ativo' : 'Pausado'}
                    </span>
                  </div>
                </div>
                <div className="ad-body">
                  <div className="ad-row">
                    <span className="lbl">Período</span>
                    <span className="val">{ad.period}</span>
                  </div>
                  <div className="ad-row">
                    <span className="lbl">Orçamento</span>
                    <span className="val">R$ {brl(ad.budget)}</span>
                  </div>
                  <div className="ad-row">
                    <span className="lbl">Investido</span>
                    <span className="val" style={{ color: 'var(--out)' }}>
                      R$ {brl(ad.spent)}
                    </span>
                  </div>
                  <div className="ad-row">
                    <span className="lbl">Alcance</span>
                    <span className="val">{ad.reach}</span>
                  </div>
                  <div className="ad-row">
                    <span className="lbl">CTR</span>
                    <span className="val" style={{ color: 'var(--value-pos)' }}>
                      {ad.ctr}
                    </span>
                  </div>

                  <div className="ad-progress-wrap">
                    <div className="ad-progress-head">
                      <span className="lbl">Consumo do orçamento</span>
                      <span className="val">{Math.round(pct)}%</span>
                    </div>
                    <div className="ad-progress-bar">
                      <div
                        className={`ad-progress-fill ${fillClass}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: 14,
                      padding: '10px 12px',
                      background: 'var(--gray-50)',
                      borderRadius: 6,
                      fontSize: 12,
                      color: 'var(--gray-700)',
                      lineHeight: 1.5,
                    }}
                  >
                    {ad.notes}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="summary-card">
          <div className="summary-head">
            <div className="summary-title">Investimento de Abril</div>
          </div>
          <div className="summary-big">
            <div className="summary-big-label">Total Investido</div>
            <div className="summary-big-value">
              <span className="currency">R$</span>
              {brl(totalSpent)}
            </div>
            <div className="summary-big-sub">
              de R$ {brl(totalBudget)} orçado · {Math.round((totalSpent / totalBudget) * 100)}%
            </div>
          </div>

          <div className="summary-divider" />

          <div className="summary-row">
            <span className="lbl">
              <span className="plat-dot ad-instagram" />
              Instagram
            </span>
            <span className="val">R$ {brl(ads[0].spent)}</span>
          </div>
          <div className="summary-row">
            <span className="lbl">
              <span className="plat-dot ad-meta" />
              Meta Ads
            </span>
            <span className="val">R$ {brl(ads[1].spent)}</span>
          </div>
          <div className="summary-row">
            <span className="lbl">
              <span className="plat-dot ad-google" />
              Google Ads
            </span>
            <span className="val">R$ {brl(ads[2].spent)}</span>
          </div>

          <div className="summary-divider" />

          <div className="summary-row">
            <span className="lbl">Saldo disponível</span>
            <span className="val" style={{ color: 'var(--value-pos)' }}>
              R$ {brl(totalBudget - totalSpent)}
            </span>
          </div>

          <div className="summary-total">
            <span className="lbl">Orçamento mensal</span>
            <span className="val">R$ {brl(totalBudget)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
