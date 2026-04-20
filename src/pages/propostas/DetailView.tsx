import { useState } from 'react'

type Props = {
  onEdit: () => void
}

type Tab = 'overview' | 'revisions' | 'negotiation' | 'documents' | 'timeline'

const scopeItems = [
  {
    title: 'Levantamento Cadastral Existente',
    desc: 'Medição completa, registro fotográfico e elaboração de as-built',
    qty: '1',
    unit: 'R$ 32.000,00',
    total: 'R$ 32.000,00',
  },
  {
    title: 'Estudo Preliminar de Retrofit',
    desc: 'Proposição de partido, volumetria, fluxos e diretrizes gerais',
    qty: '1',
    unit: 'R$ 58.000,00',
    total: 'R$ 58.000,00',
  },
  {
    title: 'Anteprojeto Arquitetônico',
    desc: 'Plantas, cortes, fachadas, renderizações internas/externas',
    qty: '1',
    unit: 'R$ 98.000,00',
    total: 'R$ 98.000,00',
  },
  {
    title: 'Projeto Executivo + Detalhamentos',
    desc: 'Plantas executivas, detalhamentos, memoriais, especificações',
    qty: '1',
    unit: 'R$ 148.000,00',
    total: 'R$ 148.000,00',
  },
  {
    title: 'Projeto de Interiores Áreas Comuns',
    desc: 'Lobby, restaurante, bar, spa e áreas sociais',
    qty: '1',
    unit: 'R$ 72.000,00',
    total: 'R$ 72.000,00',
  },
  {
    title: 'Acompanhamento de Obra',
    desc: '24 visitas técnicas quinzenais durante execução',
    qty: '24',
    unit: 'R$ 1.800,00',
    total: 'R$ 43.200,00',
  },
]

const timelineItems = [
  {
    title: 'Preparando Revisão v3',
    desc: 'Rascunho de nova revisão em elaboração, ajustando parcelamento conforme contraproposta.',
    time: 'Hoje · 11:40 — Iago Siqueira',
    muted: false,
  },
  {
    title: 'Contraproposta recebida',
    desc: 'Eduardo Mirante solicitou ajuste no parcelamento (3+3) e inclusão de boleto como método.',
    time: '18/04 · 16:40',
    muted: false,
  },
  {
    title: 'Status alterado: Em Análise → Em Negociação',
    desc: 'Atualização automática após registro de contraproposta.',
    time: '18/04 · 16:42 — sistema',
    muted: false,
  },
  {
    title: 'Revisão v2 enviada ao cliente',
    desc: 'Nova versão da proposta com R$ 456.000 após reunião presencial. PDF enviado por e-mail.',
    time: '15/04 · 18:20',
    muted: false,
  },
  {
    title: 'Reunião presencial realizada',
    desc: 'Apresentação da reestruturação de escopo. Cliente aprovou direção e pediu 48h para análise.',
    time: '15/04 · 14:32 — escritório IS',
    muted: false,
  },
  {
    title: 'Revisão v2 criada (interna)',
    desc: 'Preparada nova versão com escopo enxuto antes da reunião.',
    time: '14/04 · 09:00 — Iago Siqueira',
    muted: true,
  },
  {
    title: 'Ligação recebida — 18min',
    desc: 'Cliente comentou que valor está acima do budget. Solicitou discussão de escopo.',
    time: '12/04 · 10:20',
    muted: true,
  },
  {
    title: 'Dúvida sobre projetos complementares',
    desc: 'Esclarecimento enviado por e-mail no mesmo dia.',
    time: '10/04 · 15:45',
    muted: true,
  },
  {
    title: 'Proposta v1 enviada',
    desc: 'Primeira versão formal — R$ 480.000 em 8 parcelas · Validade 15 dias.',
    time: '08/04 · 10:15 — Iago Siqueira',
    muted: true,
  },
  {
    title: 'Proposta criada',
    desc: 'Rascunho inicial baseado no briefing da visita técnica.',
    time: '05/04 · 16:00',
    muted: true,
  },
]

const documents = [
  { type: 'PDF', name: 'P-2026-040_v2.pdf · Versão Atual', meta: '1,8 MB · gerado em 15/04/26', status: 'Atual', statusClass: 'status-approved' },
  { type: 'PDF', name: 'P-2026-040_v1.pdf', meta: '1,6 MB · 08/04/26', status: 'Substituída', statusClass: 'status-expired' },
  { type: 'PDF', name: 'contraproposta_financeiro.pdf', meta: '420 KB · enviado pelo cliente em 18/04/26' },
  { type: 'PDF', name: 'ata_reuniao_15abr.pdf', meta: '288 KB · 15/04/26' },
  { type: 'PPT', name: 'apresentacao_v2.pdf', meta: '4,2 MB · 15/04/26' },
]

export function DetailView({ onEdit }: Props) {
  const [tab, setTab] = useState<Tab>('overview')
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="view">
      {/* Header */}
      <div className="detail-header">
        <div className="detail-header-top">
          <div>
            <div className="detail-id">P-2026-040 · Revisão 02 de 03</div>
            <div className="detail-title">Retrofit Hotel Mirante — Caldas Novas</div>
            <div className="detail-meta">
              <span className="status status-lg status-negotiation">Em Negociação</span>
              <span className="sep">·</span>
              <span>
                <strong style={{ color: 'var(--gray-900)' }}>Hotel Mirante LTDA</strong> · Caldas Novas/GO
              </span>
              <span className="sep">·</span>
              <span>Responsável: Iago Siqueira</span>
            </div>
          </div>
          <div className="detail-actions">
            <button className="btn btn-secondary btn-sm">
              <IconFile /> Baixar PDF
            </button>
            <button className="btn btn-secondary btn-sm">
              <IconUpload /> Reenviar
            </button>
            <button className="btn btn-secondary btn-sm">
              <IconInfo /> Alterar Status
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => setModalOpen(true)}>
              <IconRefresh /> Nova Revisão
            </button>
          </div>
        </div>

        <div className="detail-stats">
          <div className="stat-cell">
            <div className="stat-label">Valor Atual</div>
            <div className="stat-value">R$ 456.000</div>
            <div className="stat-sub" style={{ color: 'var(--s-rejected)' }}>
              − R$ 24.000 vs v1
            </div>
          </div>
          <div className="stat-cell">
            <div className="stat-label">Enviada em</div>
            <div className="stat-value">08/04/2026</div>
            <div className="stat-sub">há 12 dias</div>
          </div>
          <div className="stat-cell">
            <div className="stat-label">Validade</div>
            <div className="stat-value">23/04/2026</div>
            <div className="stat-sub">em 3 dias</div>
          </div>
          <div className="stat-cell">
            <div className="stat-label">Última Interação</div>
            <div className="stat-value">há 2 dias</div>
            <div className="stat-sub">Contraproposta recebida</div>
          </div>
        </div>

        <div className="sla-banner sla-warn">
          <div className="sla-banner-icon">
            <IconClock />
          </div>
          <div className="sla-banner-content">
            <div className="sla-banner-title">
              SLA em atenção · 3 dias para vencer a validade
            </div>
            <div className="sla-banner-desc">
              Proposta enviada há 12 dias (80% do prazo). Cliente retornou com contraproposta em 18/04. Recomenda-se acelerar a decisão para não expirar.
            </div>
          </div>
          <div className="sla-banner-progress">
            <div className="sla-banner-progress-fill" style={{ width: '80%' }} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {(
          [
            { key: 'overview', label: 'Visão Geral' },
            { key: 'revisions', label: 'Revisões', count: 3 },
            { key: 'negotiation', label: 'Comunicações & Negociação', count: 14 },
            { key: 'documents', label: 'Documentos', count: 5 },
            { key: 'timeline', label: 'Linha do Tempo' },
          ] as const
        ).map((t) => (
          <button
            key={t.key}
            className={`tab${tab === t.key ? ' active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
            {'count' in t && t.count !== undefined && (
              <span className="count">{t.count}</span>
            )}
          </button>
        ))}
      </div>

      {tab === 'overview' && <OverviewPanel onEdit={onEdit} />}
      {tab === 'revisions' && <RevisionsPanel onCreate={() => setModalOpen(true)} />}
      {tab === 'negotiation' && <NegotiationPanel />}
      {tab === 'documents' && <DocumentsPanel />}
      {tab === 'timeline' && <TimelinePanel />}

      {modalOpen && (
        <RevisionModal onClose={() => setModalOpen(false)} onConfirm={onEdit} />
      )}
    </div>
  )
}

function OverviewPanel({ onEdit }: { onEdit: () => void }) {
  return (
    <div className="detail-grid">
      <div>
        <div className="info-section">
          <div className="info-head">
            <div className="info-title">Escopo &amp; Investimento · Versão Atual (v2)</div>
            <span className="status status-negotiation">Em Negociação</span>
          </div>
          <div className="info-body">
            <div className="scope-list">
              {scopeItems.map((s, i) => (
                <div
                  className="scope-line"
                  key={i}
                  style={i === 0 ? { borderTop: '1px solid var(--gray-100)' } : undefined}
                >
                  <div>
                    <div className="scope-title">{s.title}</div>
                    <div className="scope-desc">{s.desc}</div>
                  </div>
                  <div className="right">{s.qty}</div>
                  <div className="right">{s.unit}</div>
                  <div className="right">{s.total}</div>
                </div>
              ))}
              <div className="scope-total">
                <span className="label">Subtotal</span>
                <span className="td-mono">R$ 451.200,00</span>
                <span className="label">Desconto (1%)</span>
                <span className="td-mono">R$ −4.512</span>
              </div>
              <div
                className="scope-total"
                style={{
                  borderTop: '2px solid var(--gray-900)',
                  paddingTop: 12,
                  marginTop: 4,
                }}
              >
                <span className="label">Total</span>
                <span className="td-mono" style={{ fontSize: 22 }}>
                  R$ 456.000,00
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="info-section">
          <div className="info-head">
            <div className="info-title">Condições e Prazos</div>
          </div>
          <div className="info-body" style={{ padding: '0 20px' }}>
            <Row label="Forma de Pagamento" value="6 parcelas vinculadas a entregas" />
            <Row label="Valor por parcela" value="R$ 76.000,00" mono />
            <Row label="Método" value="Boleto + PIX" />
            <Row label="Prazo Total" value="10 meses (300 dias corridos)" />
            <Row label="Início Previsto" value="02/05/2026" />
            <Row label="Reajuste" value="IGPM-M (anual)" />
            <div className="info-row">
              <div className="info-label">Validade</div>
              <div className="info-value">
                23/04/2026{' '}
                <span className="status status-analysis" style={{ marginLeft: 8 }}>
                  3 dias
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="info-section">
          <div className="info-head">
            <div className="info-title">Cliente</div>
          </div>
          <div className="info-body" style={{ padding: '0 20px' }}>
            <Row label="Razão Social" value="Hotel Mirante LTDA" />
            <Row label="CNPJ" value="22.xxx.xxx/0001-10" mono />
            <Row label="Responsável" value="Eduardo Mirante (Sócio)" />
            <Row label="Contato" value="(64) 99xxx-4488" mono />
            <Row label="E-mail" value="financeiro@hotelmirante.com.br" />
            <Row label="Origem" value="Site IS" />
          </div>
        </div>

        <div className="info-section">
          <div className="info-head">
            <div className="info-title">Observações</div>
          </div>
          <div className="info-body">
            <p
              style={{
                fontSize: 13,
                lineHeight: 1.6,
                color: 'var(--gray-700)',
              }}
            >
              Cliente experiente com reforma anterior em 2018. Tem consultoria financeira que pediu desconto de 8% ou pagamento estendido. Concedemos 1% + ajuste de cronograma de pagamento.{' '}
              <strong>Decisão final prevista para até 22/04.</strong>
            </p>
          </div>
        </div>

        <div className="info-section">
          <div className="info-head">
            <div className="info-title">Ações Rápidas</div>
          </div>
          <div
            className="info-body"
            style={{
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <button
              className="btn btn-primary btn-sm"
              style={{ justifyContent: 'flex-start' }}
              onClick={exportProposalPdf}
            >
              <IconDownloadArrow /> Exportar PDF
            </button>
            <button
              className="btn btn-secondary btn-sm"
              style={{ justifyContent: 'flex-start' }}
            >
              <IconPhone /> Registrar ligação
            </button>
            <button
              className="btn btn-secondary btn-sm"
              style={{ justifyContent: 'flex-start' }}
            >
              <IconMessage /> Enviar WhatsApp
            </button>
            <button
              className="btn btn-secondary btn-sm"
              style={{ justifyContent: 'flex-start' }}
            >
              <IconCalendar /> Agendar reunião
            </button>
            <button
              className="btn btn-secondary btn-sm"
              style={{ justifyContent: 'flex-start' }}
              onClick={onEdit}
            >
              <IconPlus /> Estender validade
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function RevisionsPanel({ onCreate }: { onCreate: () => void }) {
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
          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--gray-900)' }}>
            Histórico de Revisões
          </div>
          <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 2 }}>
            Toda alteração gera uma nova versão imutável, com registro de motivo, mudanças e valor.
          </div>
        </div>
        <button className="btn btn-primary btn-sm" onClick={onCreate}>
          <IconPlus /> Criar Nova Revisão
        </button>
      </div>

      {/* v3 rascunho */}
      <div className="revision-card">
        <div className="revision-head">
          <div className="rev-version">
            <span className="v-label">Versão</span>
            <span className="v-num">03</span>
          </div>
          <div>
            <div className="rev-info-top">
              <span className="status status-draft">Rascunho</span>
              <span className="rev-date">em elaboração</span>
            </div>
            <div className="rev-reason">Proposta de ajuste de cronograma de pagamento</div>
            <div className="rev-author">
              Iago Siqueira · resposta à contraproposta do cliente
            </div>
            <div className="rev-value-row">
              <span className="rev-total">R$ 456.000,00</span>
              <span
                className="rev-diff"
                style={{ color: 'var(--gray-500)', background: 'var(--gray-100)' }}
              >
                = sem alteração de valor
              </span>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              alignItems: 'flex-end',
            }}
          >
            <button className="btn btn-secondary btn-sm">Continuar Edição</button>
            <button
              className="btn btn-ghost btn-sm"
              style={{ fontSize: 11, color: 'var(--s-rejected)' }}
            >
              Descartar
            </button>
          </div>
        </div>
        <div className="rev-body">
          <div className="rev-changes-title">Alterações Propostas</div>
          <div className="rev-change-item">
            <span className="change-ico edit">~</span>
            <span>
              <strong>Parcelamento:</strong> alterado de 6× iguais para{' '}
              <strong>3+3</strong> (3 parcelas de entrada + 3 vinculadas à obra), atendendo solicitação do cliente
            </span>
          </div>
          <div className="rev-change-item">
            <span className="change-ico edit">~</span>
            <span>
              <strong>Método:</strong> incluído boleto bancário como opção além do PIX
            </span>
          </div>
          <div className="rev-change-item">
            <span className="change-ico add">+</span>
            <span>
              <strong>Cláusula:</strong> adicionada possibilidade de antecipação com desconto de 1,5%
            </span>
          </div>
        </div>
      </div>

      {/* v2 atual */}
      <div className="revision-card current">
        <div className="revision-head">
          <div className="rev-version current-v">
            <span className="v-label">Versão</span>
            <span className="v-num">02</span>
            <span className="v-badge">Ativa</span>
          </div>
          <div>
            <div className="rev-info-top">
              <span className="status status-negotiation">Em Negociação</span>
              <span className="rev-date">15/04/2026 · 14:32</span>
            </div>
            <div className="rev-reason">Redução de valor e reorganização de escopo</div>
            <div className="rev-author">
              Iago Siqueira · após reunião com Eduardo Mirante
            </div>
            <div className="rev-value-row">
              <span className="rev-total">R$ 456.000,00</span>
              <span className="rev-diff down">− R$ 24.000,00 vs v1</span>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              alignItems: 'flex-end',
            }}
          >
            <button className="btn btn-secondary btn-sm">
              <IconFile /> PDF
            </button>
            <button className="btn btn-ghost btn-sm">Duplicar</button>
          </div>
        </div>
        <div className="rev-body">
          <div className="rev-changes-title">Alterações em relação à v01</div>
          <div className="rev-change-item">
            <span className="change-ico remove">−</span>
            <span>
              <strong>Item removido:</strong> "Consultoria de Marca/Ambientação" (R$ 28.000) — cliente optou por manter branding atual
            </span>
          </div>
          <div className="rev-change-item">
            <span className="change-ico edit">~</span>
            <span>
              <strong>Desconto comercial:</strong> ajustado de 0% para 1% (R$ 4.512) como deferência institucional
            </span>
          </div>
          <div className="rev-change-item">
            <span className="change-ico edit">~</span>
            <span>
              <strong>Acompanhamento de obra:</strong> reduzido de 36 para 24 visitas (semanal → quinzenal)
            </span>
          </div>
          <div className="rev-change-item">
            <span className="change-ico add">+</span>
            <span>
              <strong>Incluído:</strong> relatório mensal consolidado de obra (sem custo adicional)
            </span>
          </div>
          <div className="rev-change-item">
            <span className="change-ico edit">~</span>
            <span>
              <strong>Prazo total:</strong> estendido de 9 para 10 meses para comportar fases em paralelo menos ambiciosas
            </span>
          </div>
        </div>
      </div>

      {/* v1 original */}
      <div className="revision-card">
        <div className="revision-head">
          <div className="rev-version">
            <span className="v-label">Versão</span>
            <span className="v-num">01</span>
          </div>
          <div>
            <div className="rev-info-top">
              <span className="status status-expired">Substituída</span>
              <span className="rev-date">08/04/2026 · 10:15</span>
            </div>
            <div className="rev-reason">Proposta original enviada ao cliente</div>
            <div className="rev-author">Iago Siqueira · primeira apresentação formal</div>
            <div className="rev-value-row">
              <span className="rev-total">R$ 480.000,00</span>
              <span
                className="rev-diff"
                style={{ color: 'var(--gray-500)', background: 'var(--gray-100)' }}
              >
                — versão inicial
              </span>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              alignItems: 'flex-end',
            }}
          >
            <button className="btn btn-secondary btn-sm">
              <IconFile /> PDF
            </button>
            <button className="btn btn-ghost btn-sm">Comparar</button>
          </div>
        </div>
        <div className="rev-body">
          <div className="rev-changes-title">Escopo Original</div>
          <div className="rev-change-item">
            <span className="change-ico">○</span>
            <span>
              Proposta completa de retrofit com 7 itens, 36 visitas técnicas semanais e consultoria de marca inclusa
            </span>
          </div>
          <div className="rev-change-item">
            <span className="change-ico">○</span>
            <span>Valor total: R$ 480.000 · 8 parcelas de R$ 60.000</span>
          </div>
          <div className="rev-change-item">
            <span className="change-ico">○</span>
            <span>Prazo estimado: 9 meses · Início 02/05/2026</span>
          </div>
        </div>
      </div>

      <div
        style={{
          background: 'var(--gray-50)',
          border: '1px dashed var(--gray-300)',
          borderRadius: 8,
          padding: '16px 20px',
          textAlign: 'center',
          marginTop: 8,
        }}
      >
        <div style={{ fontSize: 12, color: 'var(--gray-600)', marginBottom: 6 }}>
          <strong>Comparar Revisões</strong>
        </div>
        <div style={{ fontSize: 11, color: 'var(--gray-500)', fontStyle: 'italic' }}>
          Clique em "Comparar" em qualquer versão para ver um diff lado a lado das alterações
        </div>
      </div>
    </div>
  )
}

function NegotiationPanel() {
  return (
    <div>
      <div className="neg-compose">
        <div className="neg-compose-head">
          <span
            style={{
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--gray-500)',
              fontWeight: 500,
            }}
          >
            Registrar nova interação:
          </span>
          <div className="neg-type-pills">
            {[
              { label: 'Negociação', color: 'var(--s-negotiation)', active: true },
              { label: 'Ligação', color: 'var(--s-sent)' },
              { label: 'E-mail', color: 'var(--s-draft)' },
              { label: 'Reunião', color: 'var(--s-negotiation)' },
              { label: 'Contraproposta', color: 'var(--s-analysis)' },
              { label: 'Anotação interna', color: 'var(--gray-700)' },
            ].map((t) => (
              <button
                key={t.label}
                className={`neg-type-pill${t.active ? ' active' : ''}`}
              >
                <span className="dot" style={{ background: t.color }} />
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <input
          className="input"
          placeholder="Assunto / resumo da interação…"
          style={{ marginBottom: 10 }}
        />
        <textarea
          className="input"
          rows={3}
          placeholder="Detalhes da comunicação, pontos discutidos, próximos passos…"
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 12,
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              fontSize: 12,
              color: 'var(--gray-500)',
            }}
          >
            <button className="btn btn-ghost btn-sm">
              <IconAttach /> Anexar
            </button>
            <span style={{ color: 'var(--gray-300)' }}>·</span>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                cursor: 'pointer',
              }}
            >
              <input type="checkbox" style={{ accentColor: 'var(--gray-900)' }} />
              Alertar responsável
            </label>
          </div>
          <button className="btn btn-primary btn-sm">Registrar Interação</button>
        </div>
      </div>

      <div className="info-section">
        <div className="info-head">
          <div className="info-title">Histórico da Negociação</div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              className="filter-pill active"
              style={{ fontSize: 11, padding: '3px 8px' }}
            >
              Todos
            </button>
            <button
              className="filter-pill"
              style={{ fontSize: 11, padding: '3px 8px' }}
            >
              Com cliente
            </button>
            <button
              className="filter-pill"
              style={{ fontSize: 11, padding: '3px 8px' }}
            >
              Internas
            </button>
          </div>
        </div>
        <div className="neg-feed">
          <NegItem
            type="counter"
            label="Contraproposta"
            labelClass="label-counter"
            title="Cliente solicita reorganização de parcelamento"
            author="Eduardo Mirante (cliente) · via WhatsApp"
            time="18/04 · 16:40"
            content={`"Iago, conversamos com nosso financeiro. O valor está bom, mas precisamos ajustar o parcelamento. Conseguimos pagar 3 parcelas de entrada (maio/jun/jul) e depois 3 parcelas vinculadas à obra. Pode ser boleto? PIX complica para nosso fluxo."`}
            attachments={['contraproposta_financeiro.pdf']}
            icon={<IconRefresh />}
          />
          <NegItem
            type="internal"
            label="Anotação Interna"
            labelClass="label-internal"
            title="Ajuste de parcelamento aceitável"
            author="Iago Siqueira"
            time="18/04 · 17:05"
            content="Financeiramente o ajuste de parcelamento é factível sem comprometer fluxo. Preparar v3 com 3+3 e incluir boleto. Negociar pequeno desconto para antecipação voluntária (-1,5%) para incentivar fluxo positivo."
            icon={<IconFile />}
          />
          <NegItem
            type="meeting"
            label="Reunião"
            labelClass="label-meeting"
            title="Apresentação da Revisão v2 · Presencial"
            author="Iago Siqueira + Laura Mendonça com Eduardo e Cláudia Mirante"
            time="15/04 · 14:32 — 1h 40min"
            content="Reunião presencial no hotel. Apresentada nova versão da proposta (v2) com escopo enxuto e desconto de 1%. Cliente aprovou remoção do item de consultoria de marca. Sobre acompanhamento de obra, preferiu quinzenal com relatórios consolidados. Pediu 48h para análise financeira antes de fechar."
            attachments={['ata_reuniao_15abr.pdf', 'apresentacao_v2.pdf']}
            icon={<IconUsers />}
          />
          <NegItem
            type="call"
            label="Ligação"
            labelClass="label-call"
            title="Retorno inicial do cliente — 18 min"
            author="Iago Siqueira"
            time="12/04 · 10:20"
            content="Eduardo ligou comentando que achou o escopo muito completo, mas o valor ficou acima do budget que tinham em mente (tinham projetado algo próximo a R$ 400k). Sugeriu rediscutir escopo e apresentar versão enxuta. Agendada reunião presencial para 15/04."
            icon={<IconPhone />}
          />
          <NegItem
            type="question"
            label="Dúvida"
            labelClass="label-question"
            title="Cliente pergunta sobre projetos complementares"
            author="Eduardo Mirante (cliente) · via e-mail"
            time="10/04 · 15:45"
            content={`"Os projetos estrutural, elétrico e hidráulico estão inclusos? Se não, vocês indicam parceiros? Importante saber pra dimensionar o budget total."`}
            icon={<IconHelp />}
          />
          <NegItem
            type="email"
            label="E-mail enviado"
            labelClass=""
            labelStyle={{
              background: 'var(--s-draft-bg)',
              color: 'var(--s-draft)',
            }}
            title="Envio da proposta v1"
            author="Iago Siqueira"
            time="08/04 · 10:15"
            content="Proposta original enviada por e-mail com PDF (v1). Cópia para financeiro@hotelmirante.com.br e eduardo@hotelmirante.com.br. Status alterado para 'Enviada'."
            attachments={['P-2026-040_v1.pdf']}
            icon={<IconMail />}
          />
        </div>
      </div>
    </div>
  )
}

function DocumentsPanel() {
  return (
    <div className="info-section">
      <div className="info-head">
        <div className="info-title">Documentos Vinculados</div>
        <button className="btn btn-primary btn-sm">+ Upload</button>
      </div>
      <div>
        {documents.map((d, i) => (
          <div className="doc-list-item" key={i}>
            <div className="doc-ico">{d.type}</div>
            <div className="doc-info">
              <div className="doc-name">{d.name}</div>
              <div className="doc-meta">{d.meta}</div>
            </div>
            {d.status && (
              <span className={`status ${d.statusClass}`}>{d.status}</span>
            )}
            <button className="btn btn-ghost btn-sm">Abrir</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function TimelinePanel() {
  return (
    <div className="info-section">
      <div className="info-head">
        <div className="info-title">Linha do Tempo Completa</div>
      </div>
      <div className="info-body">
        <div className="timeline">
          {timelineItems.map((t, i) => (
            <div
              key={i}
              className={`timeline-item${t.muted ? ' muted' : ''}`}
            >
              <div className="timeline-title">{t.title}</div>
              <div className="timeline-desc">{t.desc}</div>
              <div className="timeline-time">{t.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function RevisionModal({
  onClose,
  onConfirm,
}: {
  onClose: () => void
  onConfirm: () => void
}) {
  return (
    <div
      className="modal-overlay active"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="modal">
        <div className="modal-head">
          <div>
            <div
              style={{
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--gray-500)',
                marginBottom: 4,
              }}
            >
              Proposta P-2026-040
            </div>
            <div className="modal-title">Criar Nova Revisão (v04)</div>
          </div>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <div className="form-row" style={{ marginBottom: 18 }}>
            <div className="form-field">
              <label className="form-label">
                Motivo da Revisão <span className="required">*</span>
              </label>
              <div className="select-wrap">
                <select className="input" defaultValue="Ajuste de condições de pagamento">
                  <option>Ajuste de valor / desconto</option>
                  <option>Alteração de escopo</option>
                  <option>Alteração de prazo</option>
                  <option>Ajuste de condições de pagamento</option>
                  <option>Resposta a contraproposta</option>
                  <option>Correção de erro</option>
                  <option>Solicitação do cliente</option>
                  <option>Outro</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-row" style={{ marginBottom: 18 }}>
            <div className="form-field">
              <label className="form-label">Descrição detalhada</label>
              <textarea
                className="input"
                rows={3}
                placeholder="Explique brevemente o contexto desta revisão…"
                defaultValue="Atendimento à contraproposta do cliente (18/04): reestruturação do parcelamento para 3 parcelas de entrada + 3 vinculadas à obra, inclusão de boleto como método e cláusula de antecipação."
              />
            </div>
          </div>

          <div
            style={{
              background: 'var(--gray-50)',
              borderRadius: 8,
              padding: '16px 18px',
              marginBottom: 18,
            }}
          >
            <div
              style={{
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--gray-500)',
                fontWeight: 500,
                marginBottom: 10,
              }}
            >
              O que deseja alterar nesta revisão?
            </div>
            {[
              { label: 'Itens do escopo (adicionar, remover, editar descrição)', checked: false },
              { label: 'Valores ou quantidades', checked: false },
              { label: 'Condições de pagamento (parcelamento, método, datas)', checked: true },
              { label: 'Prazos e cronograma', checked: false },
              { label: 'Validade da proposta', checked: false },
              { label: 'Termos e observações', checked: false },
            ].map((opt) => (
              <label
                key={opt.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 0',
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                <input
                  type="checkbox"
                  defaultChecked={opt.checked}
                  style={{ accentColor: 'var(--gray-900)' }}
                />
                {opt.label}
              </label>
            ))}
          </div>

          <div className="form-row">
            <div className="form-field">
              <label className="form-label">Validade da nova versão</label>
              <div className="select-wrap">
                <select className="input" defaultValue="Estender em 15 dias (vence 05/05/26)">
                  <option>Manter atual (vence 23/04/26)</option>
                  <option>Estender em 15 dias (vence 05/05/26)</option>
                  <option>Estender em 30 dias (vence 20/05/26)</option>
                  <option>Personalizar…</option>
                </select>
              </div>
            </div>
          </div>

          <div
            style={{
              background: 'var(--s-sent-bg)',
              border: '1px solid var(--s-sent-border)',
              borderRadius: 8,
              padding: '12px 16px',
              marginTop: 16,
              color: 'var(--s-sent)',
              fontSize: 12,
              lineHeight: 1.6,
            }}
          >
            <strong>Próximo passo:</strong> ao criar a revisão, você será direcionado ao editor com a cópia da v02 pronta para modificar. A v02 permanecerá arquivada e imutável no histórico.
          </div>
        </div>
        <div className="modal-foot">
          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              onClose()
              onConfirm()
            }}
          >
            Criar Revisão e Editar →
          </button>
        </div>
      </div>
    </div>
  )
}

function Row({
  label,
  value,
  mono,
}: {
  label: string
  value: string
  mono?: boolean
}) {
  return (
    <div className="info-row">
      <div className="info-label">{label}</div>
      <div className={`info-value${mono ? ' td-mono' : ''}`}>{value}</div>
    </div>
  )
}

type NegItemProps = {
  type: string
  label: string
  labelClass: string
  labelStyle?: React.CSSProperties
  title: string
  author: string
  time: string
  content: string
  attachments?: string[]
  icon: React.ReactNode
}

function NegItem({
  type,
  label,
  labelClass,
  labelStyle,
  title,
  author,
  time,
  content,
  attachments,
  icon,
}: NegItemProps) {
  return (
    <div className="neg-item">
      <div className={`neg-icon type-${type}`}>{icon}</div>
      <div className="neg-body">
        <div className="neg-head">
          <div className="neg-head-left">
            <span className={`neg-type-label ${labelClass}`} style={labelStyle}>
              {label}
            </span>
            <span className="neg-title">{title}</span>
          </div>
          <span className="neg-time">{time}</span>
        </div>
        <div className="neg-author">{author}</div>
        <div className="neg-content">{content}</div>
        {attachments && attachments.length > 0 && (
          <div className="neg-attachments">
            {attachments.map((a) => (
              <span className="neg-attach" key={a}>
                <IconFile /> {a}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* icons */
const svgProps = {
  width: 13,
  height: 13,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}
async function exportProposalPdf() {
  try {
    const res = await fetch('/api/propostas/pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client: { name: 'Hotel Mirante', address: '' },
        pricing: {
          total: 456000,
          discountPctAVista: 5,
          installments: 6,
          installmentValue: 76000,
        },
      }),
    })
    if (!res.ok) {
      alert(`Falha ao gerar PDF (HTTP ${res.status}).`)
      return
    }
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank', 'noopener,noreferrer')
    setTimeout(() => URL.revokeObjectURL(url), 60_000)
  } catch (err) {
    console.error(err)
    alert('Erro ao gerar PDF. Veja o console.')
  }
}

function IconDownloadArrow() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

function IconFile() {
  return (
    <svg {...svgProps}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}
function IconUpload() {
  return (
    <svg {...svgProps}>
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  )
}
function IconInfo() {
  return (
    <svg {...svgProps}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}
function IconRefresh() {
  return (
    <svg {...svgProps}>
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </svg>
  )
}
function IconClock() {
  return (
    <svg {...{ ...svgProps, width: 18, height: 18 }}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
function IconPlus() {
  return (
    <svg {...svgProps}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}
function IconPhone() {
  return (
    <svg {...svgProps}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}
function IconMessage() {
  return (
    <svg {...svgProps}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}
function IconCalendar() {
  return (
    <svg {...svgProps}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
    </svg>
  )
}
function IconAttach() {
  return (
    <svg {...svgProps}>
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  )
}
function IconUsers() {
  return (
    <svg {...{ ...svgProps, width: 15, height: 15 }}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    </svg>
  )
}
function IconHelp() {
  return (
    <svg {...{ ...svgProps, width: 15, height: 15 }}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}
function IconMail() {
  return (
    <svg {...{ ...svgProps, width: 15, height: 15 }}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}
