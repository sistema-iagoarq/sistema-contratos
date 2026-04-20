import { useState, type ReactNode } from 'react'

type Tab =
  | 'overview'
  | 'contacts'
  | 'projects'
  | 'communications'
  | 'materials'
  | 'documents'
  | 'notes'

const tabs: Array<{ key: Tab; label: string; count?: number }> = [
  { key: 'overview', label: 'Visão Geral' },
  { key: 'contacts', label: 'Contatos', count: 2 },
  { key: 'projects', label: 'Projetos', count: 1 },
  { key: 'communications', label: 'Comunicações', count: 24 },
  { key: 'materials', label: 'Materiais Enviados', count: 6 },
  { key: 'documents', label: 'Documentos', count: 12 },
  { key: 'notes', label: 'Anotações', count: 5 },
]

type Props = { onEdit: () => void }

export function DetailView({ onEdit }: Props) {
  const [tab, setTab] = useState<Tab>('overview')

  return (
    <div className="view">
      <DetailHeader onEdit={onEdit} />

      <div className="tabs">
        {tabs.map((t) => (
          <button
            key={t.key}
            className={`tab${tab === t.key ? ' active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
            {t.count !== undefined && <span className="count">{t.count}</span>}
          </button>
        ))}
      </div>

      {tab === 'overview' && <OverviewPanel />}
      {tab === 'contacts' && <ContactsPanel />}
      {tab === 'projects' && <ProjectsPanel />}
      {tab === 'communications' && <CommunicationsPanel />}
      {tab === 'materials' && <MaterialsPanel />}
      {tab === 'documents' && <DocumentsPanel />}
      {tab === 'notes' && <NotesPanel />}
    </div>
  )
}

function DetailHeader({ onEdit }: { onEdit: () => void }) {
  return (
    <div className="detail-header">
      <div className="detail-header-top">
        <div className="detail-identity">
          <div className="detail-avatar">M</div>
          <div>
            <div className="detail-name">Marina Andrade Costa</div>
            <div className="detail-meta">
              <span className="badge badge-dark badge-no-dot">Cliente Ativo</span>
              <span className="sep">·</span>
              <span>Pessoa Física</span>
              <span className="sep">·</span>
              <span className="td-mono">CPF 042.xxx.xxx-18</span>
              <span className="sep">·</span>
              <span>Goiânia / GO</span>
            </div>
            <div style={{ marginTop: 10, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              <span className="tag">Alto Padrão</span>
              <span className="tag">Residencial</span>
              <span className="tag">Indicação</span>
              <span className="tag">VIP</span>
            </div>
          </div>
        </div>
        <div className="detail-actions">
          <button className="btn btn-secondary btn-sm">
            <IconChat /> Mensagem
          </button>
          <button className="btn btn-secondary btn-sm">
            <IconMail /> Enviar Material
          </button>
          <button className="btn btn-secondary btn-sm" onClick={onEdit}>
            <IconEdit /> Editar
          </button>
          <button className="btn btn-primary btn-sm">
            <IconPlus /> Nova Proposta
          </button>
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
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
          Posição no Funil
        </div>
        <div className="pipeline">
          <div className="pipeline-step passed">Prospecção</div>
          <div className="pipeline-step passed">Briefing</div>
          <div className="pipeline-step passed">Proposta</div>
          <div className="pipeline-step passed">Negociação</div>
          <div className="pipeline-step current">Cliente Ativo</div>
          <div className="pipeline-step">Concluído</div>
        </div>
      </div>

      <div className="detail-stats">
        <Stat label="Contratos" value="R$ 145.000" />
        <Stat label="Projetos Ativos" value="1" />
        <Stat label="Cliente desde" value="Jan/26" />
        <Stat label="Última Interação" value="há 2h" />
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat-cell">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  )
}

function InfoSection({
  title,
  action,
  children,
  bodyPadding,
}: {
  title: string
  action?: ReactNode
  children: ReactNode
  bodyPadding?: string
}) {
  return (
    <div className="info-section">
      <div className="info-head">
        <div className="info-title">{title}</div>
        {action}
      </div>
      <div className="info-body" style={bodyPadding ? { padding: bodyPadding } : undefined}>
        {children}
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="info-row">
      <div className="info-label">{label}</div>
      <div className="info-value">{value}</div>
    </div>
  )
}

/* -------- Overview -------- */

function OverviewPanel() {
  return (
    <div className="detail-grid">
      <div>
        <InfoSection
          title="Dados Pessoais"
          action={<button className="btn btn-ghost btn-sm">Editar</button>}
          bodyPadding="0 20px"
        >
          <Row label="Nome Completo" value="Marina Andrade Costa" />
          <Row label="Como chamar" value="Marina" />
          <Row
            label="CPF"
            value={<span className="td-mono">042.158.336-18</span>}
          />
          <Row label="Nascimento" value="14/08/1984 · 41 anos" />
          <Row label="Profissão" value="Médica Dermatologista" />
          <Row label="Estado Civil" value="Casada" />
          <Row label="Cônjuge" value="Eduardo Costa" />
          <Row label="Filhos" value="2 filhos — Pedro (11) e Laura (8)" />
        </InfoSection>

        <InfoSection title="Endereço" bodyPadding="0 20px">
          <Row
            label="Cliente"
            value={
              <>
                Rua T-28, 1420 · Apto 1902 · Setor Bueno
                <br />
                Goiânia / GO · 74210-150
              </>
            }
          />
          <Row
            label="Obra"
            value={
              <>
                Alameda das Palmeiras, Qd 14 Lt 08 · Cond. Alphaville Flamboyant
                <br />
                Goiânia / GO · 74884-560
              </>
            }
          />
        </InfoSection>

        <InfoSection title="Projeto de Interesse" bodyPadding="0 20px">
          <Row label="Tipo" value="Residencial — Casa unifamiliar" />
          <Row label="Escopo" value="Projeto Executivo Completo + Interiores" />
          <Row label="Metragem" value="420 m² construídos" />
          <Row label="Investimento estimado" value="R$ 150 – 300 mil (honorários)" />
          <Row label="Previsão de início" value="Março/2026" />
          <Row label="Estilo" value="Contemporâneo · Minimalista · Biofílico" />
          <Row
            label="Briefing"
            value={
              <span style={{ lineHeight: 1.6 }}>
                Casa para família com 4 pessoas. Prioridade para integração social, home office
                duplo, suíte master ampla com closet. Terreno em declive, vista para reserva
                ambiental. Gostam de receber, cozinham bastante. Evitar cores escuras, materiais
                aparentes bem-vindos.
              </span>
            }
          />
        </InfoSection>
      </div>

      <div>
        <InfoSection title="Contato Rápido" bodyPadding="0 20px">
          <Row label="E-mail" value="marina.costa@email.com" />
          <Row
            label="Celular"
            value={
              <>
                <span className="td-mono">(62) 99872-4418</span>
                <span
                  className="badge badge-outline badge-no-dot"
                  style={{ marginLeft: 6, fontSize: 9 }}
                >
                  WhatsApp
                </span>
              </>
            }
          />
          <Row label="Instagram" value="@marinacostadermato" />
          <Row label="Canal preferido" value="WhatsApp" />
          <Row label="Melhor horário" value="Tarde (14h – 18h)" />
        </InfoSection>

        <InfoSection title="Relacionamento" bodyPadding="0 20px">
          <Row label="Origem" value="Indicação de Cliente" />
          <Row label="Indicado por" value="Paula Andrade (Casa Jardins)" />
          <Row label="Primeiro contato" value="15/12/2025" />
          <Row label="Responsável" value="Iago Siqueira" />
          <Row label="Próximo follow-up" value="22/04/2026" />
          <Row
            label="Prioridade"
            value={<span className="badge badge-dark badge-no-dot">Estratégica</span>}
          />
        </InfoSection>

        <InfoSection title="Observações">
          <p style={{ fontSize: 13, color: 'var(--gray-700)', lineHeight: 1.6 }}>
            Decisão compartilhada com o marido, mas <strong>Marina é a voz final</strong> em
            estética. Reuniões de preferência terças ou quintas à tarde. Pet: Golden Retriever
            (Toby). Interesse em paisagismo integrado — considerar parceria Studio Lume.
          </p>
        </InfoSection>
      </div>
    </div>
  )
}

/* -------- Contacts -------- */

function ContactsPanel() {
  return (
    <div className="info-section">
      <div className="info-head">
        <div className="info-title">Pontos de Contato</div>
        <button className="btn btn-primary btn-sm">+ Adicionar Contato</button>
      </div>
      <div>
        <ContactRow
          initial="M"
          dark
          name="Marina Andrade Costa"
          role="Titular · Decisora Principal"
          badge={<span className="badge badge-dark badge-no-dot">Principal</span>}
          fields={[
            { label: 'E-mail', value: 'marina.costa@email.com' },
            { label: 'Celular', value: '(62) 99872-4418', mono: true },
            { label: 'Preferência', value: 'WhatsApp · tarde' },
            { label: 'Último contato', value: 'há 2h' },
          ]}
        />
        <ContactRow
          initial="E"
          name="Eduardo Costa"
          role="Cônjuge · Decisor Compartilhado"
          badge={<span className="badge badge-outline badge-no-dot">Secundário</span>}
          fields={[
            { label: 'E-mail', value: 'eduardo.costa@email.com' },
            { label: 'Celular', value: '(62) 99144-2002', mono: true },
            { label: 'Preferência', value: 'E-mail · após 18h' },
            { label: 'Observação', value: 'Engenheiro · parte técnica' },
          ]}
          noBorder
        />
      </div>
    </div>
  )
}

function ContactRow({
  initial,
  dark,
  name,
  role,
  badge,
  fields,
  noBorder,
}: {
  initial: string
  dark?: boolean
  name: string
  role: string
  badge: ReactNode
  fields: Array<{ label: string; value: string; mono?: boolean }>
  noBorder?: boolean
}) {
  return (
    <div
      style={{
        padding: 20,
        borderBottom: noBorder ? 'none' : '1px solid var(--gray-100)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: dark ? 'var(--gray-900)' : 'var(--gray-200)',
            color: dark ? 'var(--white)' : 'var(--gray-700)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          {initial}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--gray-900)' }}>{name}</div>
          <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>{role}</div>
        </div>
        {badge}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 20,
          paddingLeft: 54,
        }}
      >
        {fields.map((f) => (
          <div key={f.label}>
            <div
              style={{
                fontSize: 10,
                color: 'var(--gray-500)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: 2,
              }}
            >
              {f.label}
            </div>
            <div style={{ fontSize: 12, fontFamily: f.mono ? 'var(--mono)' : undefined }}>
              {f.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* -------- Projects -------- */

function ProjectsPanel() {
  return (
    <>
      <div className="info-section">
        <div className="info-head">
          <div className="info-title">Projetos Vinculados</div>
          <button className="btn btn-primary btn-sm">+ Vincular Projeto</button>
        </div>
        <div style={{ padding: 0 }}>
          <table>
            <thead>
              <tr>
                <th>Projeto</th>
                <th>Fase</th>
                <th>Valor</th>
                <th>Início</th>
                <th>Prev. Entrega</th>
                <th>Progresso</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ cursor: 'default' }}>
                <td className="td-primary">Residência Alphaville Flamboyant</td>
                <td>Projeto Executivo</td>
                <td className="td-mono">R$ 145.000</td>
                <td className="td-mono">15/01/26</td>
                <td className="td-mono">28/06/26</td>
                <td style={{ minWidth: 120 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div
                      style={{
                        height: 4,
                        background: 'var(--gray-100)',
                        borderRadius: 2,
                        flex: 1,
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: '62%',
                          background: 'var(--gray-900)',
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: 11,
                        color: 'var(--gray-600)',
                      }}
                    >
                      62%
                    </span>
                  </div>
                </td>
                <td>
                  <span className="badge badge-dark">Em Execução</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="info-section" style={{ marginTop: 20 }}>
        <div className="info-head">
          <div className="info-title">Histórico de Propostas</div>
        </div>
        <div style={{ padding: 0 }}>
          <table>
            <thead>
              <tr>
                <th>Nº</th>
                <th>Escopo</th>
                <th>Valor</th>
                <th>Enviada</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ cursor: 'default' }}>
                <td className="td-mono">P-2026-041</td>
                <td className="td-primary">Projeto Executivo Residencial</td>
                <td className="td-mono">R$ 145.000</td>
                <td className="td-mono">10/01/26</td>
                <td>
                  <span className="badge badge-dark">Aprovada</span>
                </td>
              </tr>
              <tr style={{ cursor: 'default' }}>
                <td className="td-mono">P-2025-168</td>
                <td className="td-primary">Estudo Preliminar</td>
                <td className="td-mono">R$ 18.000</td>
                <td className="td-mono">22/12/25</td>
                <td>
                  <span className="badge badge-dark">Aprovada</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

/* -------- Communications -------- */

type CommKind = 'whatsapp' | 'phone' | 'email' | 'meeting' | 'material'
type Comm = {
  kind: CommKind
  out?: boolean
  title: string
  time: string
  desc: string
}

const comms: Comm[] = [
  {
    kind: 'whatsapp',
    out: true,
    title: 'WhatsApp enviado · Confirmação de reunião',
    time: 'Hoje · 14:02',
    desc:
      'Confirmada reunião presencial amanhã às 15h para apresentação do desenvolvimento do projeto executivo e aprovação das plantas de layout.',
  },
  {
    kind: 'phone',
    title: 'Ligação recebida · 12 min',
    time: 'Ontem · 16:48',
    desc:
      'Marina ligou para tirar dúvidas sobre as esquadrias especificadas e se seria possível trocar o revestimento da fachada. Solicitou apresentação de alternativas.',
  },
  {
    kind: 'email',
    out: true,
    title: 'E-mail enviado · Moodboard Alphaville v2',
    time: '18/04 · 10:15',
    desc:
      'Envio do moodboard revisado conforme feedback da reunião do dia 15/04. Paleta ajustada para tons mais quentes, texturas madeira + pedra sabão.',
  },
  {
    kind: 'meeting',
    title: 'Reunião presencial · 1h 40min',
    time: '15/04 · 15:00 — Escritório IS',
    desc:
      'Apresentação de anteprojeto. Marina e Eduardo aprovaram plantas. Solicitaram revisão do moodboard (preferência por paleta mais quente).',
  },
  {
    kind: 'material',
    out: true,
    title: 'Material enviado · Portfólio Residencial 2026',
    time: '10/01 · 09:30',
    desc:
      'Envio automático via campanha "Boas-vindas Novos Clientes". Taxa de abertura confirmada (visualizado há 4 min).',
  },
]

function CommunicationsPanel() {
  const [filter, setFilter] = useState<'todos' | 'out' | 'in'>('todos')
  const filtered = comms.filter(
    (c) => filter === 'todos' || (filter === 'out' ? c.out : !c.out),
  )

  return (
    <>
      <div className="quick-compose">
        <div
          style={{
            fontSize: 12,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--gray-500)',
            fontWeight: 500,
            marginBottom: 12,
          }}
        >
          Registrar Nova Interação
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '160px 1fr auto',
            gap: 12,
            marginBottom: 10,
          }}
        >
          <div className="select-wrap">
            <select className="input" defaultValue="WhatsApp">
              <option>WhatsApp</option>
              <option>E-mail</option>
              <option>Ligação</option>
              <option>Reunião Presencial</option>
              <option>Videoconferência</option>
              <option>Visita Técnica</option>
            </select>
          </div>
          <input className="input" placeholder="Assunto ou resumo…" />
          <button className="btn btn-primary btn-sm">Registrar</button>
        </div>
      </div>

      <div className="info-section">
        <div className="info-head">
          <div className="info-title">Histórico Completo</div>
          <div style={{ display: 'flex', gap: 4 }}>
            {(['todos', 'out', 'in'] as const).map((f) => (
              <button
                key={f}
                className={`filter-pill${filter === f ? ' active' : ''}`}
                onClick={() => setFilter(f)}
                style={{ fontSize: 11, padding: '3px 8px' }}
              >
                {f === 'todos' ? 'Todos' : f === 'out' ? 'Enviadas' : 'Recebidas'}
              </button>
            ))}
          </div>
        </div>
        <div>
          {filtered.map((c, i) => (
            <div className="comm-item" key={i}>
              <div className={`comm-icon${c.out ? ' out' : ''}`}>
                <CommIcon kind={c.kind} />
              </div>
              <div className="comm-body">
                <div className="comm-head">
                  <div className="comm-title">{c.title}</div>
                  <div className="comm-time">{c.time}</div>
                </div>
                <div className="comm-desc">{c.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

function CommIcon({ kind }: { kind: CommKind }) {
  const common = {
    width: 14,
    height: 14,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  if (kind === 'whatsapp')
    return (
      <svg {...common}>
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    )
  if (kind === 'phone')
    return (
      <svg {...common}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    )
  if (kind === 'email')
    return (
      <svg {...common}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    )
  if (kind === 'meeting')
    return (
      <svg {...common}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
      </svg>
    )
  return (
    <svg {...common}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}

/* -------- Materials -------- */

type Material = {
  thumb: string
  title: string
  meta: string
  tags: string[]
  status: string
  statusClass: string
  action: string
}

const materials: Material[] = [
  {
    thumb: 'Pb',
    title: 'Portfólio Residencial 2026',
    meta: 'Enviado em 10/01/26 · E-mail · 12 páginas',
    tags: ['Prospecção', 'Residencial'],
    status: 'Visualizado',
    statusClass: 'badge badge-dark',
    action: 'Reenviar',
  },
  {
    thumb: 'Ap',
    title: 'Apresentação Institucional IS',
    meta: 'Enviado em 15/01/26 · WhatsApp · PDF',
    tags: ['Briefing'],
    status: 'Visualizado',
    statusClass: 'badge badge-dark',
    action: 'Reenviar',
  },
  {
    thumb: 'Pr',
    title: 'Proposta Comercial P-2026-041',
    meta: 'Enviado em 10/01/26 · E-mail + DocuSign',
    tags: ['Proposta', 'Assinada'],
    status: 'Assinada',
    statusClass: 'badge badge-dark',
    action: 'Ver',
  },
  {
    thumb: 'Mb',
    title: 'Moodboard Alphaville v1',
    meta: 'Enviado em 12/04/26 · E-mail · 8 páginas',
    tags: ['Desenvolvimento'],
    status: 'Visualizado',
    statusClass: 'badge badge-dark',
    action: 'Reenviar',
  },
  {
    thumb: 'Mb',
    title: 'Moodboard Alphaville v2',
    meta: 'Enviado em 18/04/26 · E-mail · 8 páginas',
    tags: ['Desenvolvimento', 'Revisão'],
    status: 'Aguardando',
    statusClass: 'badge',
    action: 'Reenviar',
  },
  {
    thumb: 'Nw',
    title: 'Newsletter · Tendências 2026',
    meta: 'Enviado em 05/02/26 · E-mail marketing',
    tags: ['Nutrição'],
    status: 'Clicou',
    statusClass: 'badge badge-dark',
    action: 'Detalhes',
  },
]

function MaterialsPanel() {
  return (
    <>
      <div className="info-section">
        <div className="info-head">
          <div className="info-title">Materiais Personalizados Enviados</div>
          <button className="btn btn-primary btn-sm">+ Enviar Material</button>
        </div>
        <div>
          {materials.map((m, i) => (
            <div className="material-card" key={i}>
              <div className="material-thumb">{m.thumb}</div>
              <div className="material-info">
                <div className="material-title">{m.title}</div>
                <div className="material-meta">{m.meta}</div>
                <div className="material-tags">
                  {m.tags.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <span className={m.statusClass}>{m.status}</span>
              <button className="btn btn-ghost btn-sm">{m.action}</button>
            </div>
          ))}
        </div>
      </div>

      <div className="info-section" style={{ marginTop: 20 }}>
        <div className="info-head">
          <div className="info-title">Sugestões de Envio</div>
          <span style={{ fontSize: 11, color: 'var(--gray-500)', fontStyle: 'italic' }}>
            Baseado na etapa atual do funil
          </span>
        </div>
        <div style={{ padding: 0 }}>
          <div className="material-card">
            <div className="material-thumb">Rl</div>
            <div className="material-info">
              <div className="material-title">Relatório de Progresso — Semana 12</div>
              <div className="material-meta">Automático · Clientes em execução</div>
            </div>
            <button className="btn btn-secondary btn-sm">Programar Envio</button>
            <span />
          </div>
          <div className="material-card">
            <div className="material-thumb">Gu</div>
            <div className="material-info">
              <div className="material-title">Guia: Próximas Etapas da Obra</div>
              <div className="material-meta">Personalizado · Educativo</div>
            </div>
            <button className="btn btn-secondary btn-sm">Programar Envio</button>
            <span />
          </div>
        </div>
      </div>
    </>
  )
}

/* -------- Documents -------- */

const docs = [
  {
    ext: 'PDF',
    name: 'Contrato Proj. Executivo — Alphaville.pdf',
    meta: '2,1 MB · Assinado digitalmente em 15/01/26',
    badge: 'Assinado',
  },
  {
    ext: 'PDF',
    name: 'Proposta P-2026-041.pdf',
    meta: '1,4 MB · 10/01/26',
  },
  {
    ext: 'PDF',
    name: 'RG_Marina_Costa.pdf',
    meta: '420 KB · 08/01/26',
  },
  {
    ext: 'PDF',
    name: 'Matrícula do Imóvel.pdf',
    meta: '1,8 MB · 20/12/25',
  },
  {
    ext: 'DWG',
    name: 'Planta Baixa Executiva — Alphaville.dwg',
    meta: '2,4 MB · 18/04/26 · v3',
  },
  {
    ext: 'SKP',
    name: 'Modelo 3D — Alphaville.skp',
    meta: '18,7 MB · 14/04/26',
  },
]

function DocumentsPanel() {
  return (
    <div className="info-section">
      <div className="info-head">
        <div className="info-title">Documentos do Cliente</div>
        <button className="btn btn-primary btn-sm">+ Upload</button>
      </div>
      <div>
        {docs.map((d, i) => (
          <div className="doc-list-item" key={i}>
            <div className="doc-ico">{d.ext}</div>
            <div className="doc-info">
              <div className="doc-name">{d.name}</div>
              <div className="doc-meta">{d.meta}</div>
            </div>
            {d.badge && <span className="badge badge-dark">{d.badge}</span>}
            <button className="btn btn-ghost btn-sm">Abrir</button>
          </div>
        ))}
      </div>
    </div>
  )
}

/* -------- Notes -------- */

const notes = [
  {
    author: 'Iago Siqueira',
    time: 'há 3h · Importante',
    text:
      'Marina mencionou interesse em integrar paisagismo ao projeto. Propor parceria com Studio Lume na próxima reunião. Verificar se Eduardo concorda com budget adicional estimado em R$ 18–25k.',
  },
  {
    author: 'Laura Mendonça',
    time: '18/04 · Geral',
    text:
      'Cliente gostou muito do moodboard v2, mas pediu para testar alternativa com revestimento cerâmico grandes formatos em vez de pedra sabão na fachada (preocupação com manutenção).',
  },
  {
    author: 'Iago Siqueira',
    time: '15/04 · Lembrete',
    text:
      'Aniversário de casamento em 22/05 — Marina comentou que gostaria de iniciar obra antes disso simbolicamente. Se possível, programar marco de início pra essa data.',
  },
  {
    author: 'Iago Siqueira',
    time: '20/12/25 · Geral',
    text:
      'Indicada pela Paula Andrade (Casa Jardins). Paula deu referências excelentes, disse que Marina é "muito clara no que quer e decide rápido". Alto ticket. Investir tempo no relacionamento.',
  },
]

const timeline = [
  {
    title: 'Reunião presencial confirmada',
    desc: 'Apresentação de desenvolvimento executivo, amanhã 15h — escritório.',
    time: 'Hoje · 14:02',
  },
  {
    title: 'Moodboard v2 enviado',
    desc: 'Revisão conforme feedback da reunião do dia 15/04.',
    time: '18/04 · 10:15',
  },
  {
    title: 'Reunião presencial · anteprojeto',
    desc: 'Aprovação das plantas. Solicitaram moodboard revisado.',
    time: '15/04 · 15:00',
    muted: true,
  },
  {
    title: 'Contrato assinado digitalmente',
    desc: 'Projeto Executivo Residencial — R$ 145.000 em 4 parcelas.',
    time: '15/01 · 09:40',
    muted: true,
  },
  {
    title: 'Proposta enviada',
    desc: 'P-2026-041 via e-mail + DocuSign.',
    time: '10/01 · 09:30',
    muted: true,
  },
  {
    title: 'Primeiro contato',
    desc: 'Indicação de Paula Andrade via WhatsApp.',
    time: '15/12/25 · 18:22',
    muted: true,
  },
]

function NotesPanel() {
  const [kind, setKind] = useState<'Geral' | 'Importante' | 'Lembrete' | null>(null)

  return (
    <>
      <div className="quick-compose">
        <div
          style={{
            fontSize: 12,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--gray-500)',
            fontWeight: 500,
            marginBottom: 10,
          }}
        >
          Nova Anotação Interna
        </div>
        <textarea
          className="input"
          placeholder="Descreva observação, contexto ou lembrete…"
          rows={3}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}
        >
          <div style={{ display: 'flex', gap: 6 }}>
            {(['Geral', 'Importante', 'Lembrete'] as const).map((k) => (
              <button
                key={k}
                className={`filter-pill${kind === k ? ' active' : ''}`}
                onClick={() => setKind(kind === k ? null : k)}
                style={{ fontSize: 11, padding: '3px 8px' }}
              >
                {k}
              </button>
            ))}
          </div>
          <button className="btn btn-primary btn-sm">Salvar Anotação</button>
        </div>
      </div>

      <div className="info-section">
        <div className="info-head">
          <div className="info-title">Anotações da Equipe</div>
        </div>
        <div style={{ padding: 20 }}>
          {notes.map((n, i) => (
            <div className="note-card" key={i}>
              <div className="note-head">
                <div className="note-author">{n.author}</div>
                <div className="note-time">{n.time}</div>
              </div>
              <div className="note-text">{n.text}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="info-section" style={{ marginTop: 20 }}>
        <div className="info-head">
          <div className="info-title">Linha do Tempo do Relacionamento</div>
        </div>
        <div className="info-body">
          <div className="timeline">
            {timeline.map((t, i) => (
              <div className={`timeline-item${t.muted ? ' muted' : ''}`} key={i}>
                <div className="timeline-title">{t.title}</div>
                <div className="timeline-desc">{t.desc}</div>
                <div className="timeline-time">{t.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

/* -------- Icons -------- */

function IconChat() {
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
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}
function IconMail() {
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
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}
function IconEdit() {
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
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}
function IconPlus() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}
