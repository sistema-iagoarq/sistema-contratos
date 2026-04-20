import { useState, type KeyboardEvent } from 'react'

type Props = { onCancel: () => void; onSave: () => void }

const steps = [
  { n: 1, label: 'Identificação' },
  { n: 2, label: 'Contatos' },
  { n: 3, label: 'Endereço' },
  { n: 4, label: 'Projeto de Interesse' },
  { n: 5, label: 'Relacionamento' },
  { n: 6, label: 'Observações' },
] as const

export function FormView({ onCancel, onSave }: Props) {
  const [step, setStep] = useState(1)
  const [tipo, setTipo] = useState<'pf' | 'pj'>('pf')

  const next = () => (step < 6 ? setStep(step + 1) : onSave())
  const prev = () => (step > 1 ? setStep(step - 1) : onCancel())

  return (
    <div className="view">
      <div className="form-shell">
        <div className="form-sections">
          <div className="form-nav">
            {steps.map((s) => (
              <button
                key={s.n}
                className={`form-nav-item${
                  step === s.n ? ' active' : step > s.n ? ' done' : ''
                }`}
                onClick={() => setStep(s.n)}
              >
                <span className="num">{s.n}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </div>

          <div style={{ minWidth: 0 }}>
            <div className="form-content">
              {step === 1 && <Step1 tipo={tipo} setTipo={setTipo} />}
              {step === 2 && <Step2 />}
              {step === 3 && <Step3 />}
              {step === 4 && <Step4 />}
              {step === 5 && <Step5 />}
              {step === 6 && <Step6 />}
            </div>

            <div className="form-footer">
              <div className="form-footer-left">
                Etapa{' '}
                <span style={{ fontFamily: 'var(--mono)', color: 'var(--gray-900)' }}>
                  {step}
                </span>{' '}
                de 6 · Rascunho salvo automaticamente
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-secondary btn-sm" onClick={onCancel}>
                  Cancelar
                </button>
                <button className="btn btn-secondary btn-sm" onClick={prev}>
                  ← Anterior
                </button>
                <button className="btn btn-primary btn-sm" onClick={next}>
                  {step === 6 ? 'Salvar Cliente ✓' : 'Próximo →'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------------- STEP 1 ---------------- */

function Step1({ tipo, setTipo }: { tipo: 'pf' | 'pj'; setTipo: (t: 'pf' | 'pj') => void }) {
  return (
    <>
      <div className="form-step-head">
        <div className="form-step-title">Identificação</div>
        <div className="form-step-desc">
          Dados básicos para identificação e documentação do cliente.
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <label className="form-label">
          Tipo de Cliente <span className="required">*</span>
        </label>
        <div className="toggle-group">
          <button
            className={`toggle-btn${tipo === 'pf' ? ' active' : ''}`}
            onClick={() => setTipo('pf')}
          >
            Pessoa Física
          </button>
          <button
            className={`toggle-btn${tipo === 'pj' ? ' active' : ''}`}
            onClick={() => setTipo('pj')}
          >
            Pessoa Jurídica
          </button>
        </div>
      </div>

      {tipo === 'pf' ? <FieldsPF /> : <FieldsPJ />}
    </>
  )
}

function FieldsPF() {
  return (
    <>
      <div className="form-row cols-2">
        <div className="form-field">
          <label className="form-label">
            Nome Completo <span className="required">*</span>
          </label>
          <input className="input" placeholder="Ex: Marina Andrade Costa" />
        </div>
        <div className="form-field">
          <label className="form-label">Como prefere ser chamado</label>
          <input className="input" placeholder="Ex: Marina" />
        </div>
      </div>
      <div className="form-row cols-3">
        <div className="form-field">
          <label className="form-label">
            CPF <span className="required">*</span>
          </label>
          <input className="input mono" placeholder="000.000.000-00" />
        </div>
        <div className="form-field">
          <label className="form-label">RG</label>
          <input className="input mono" placeholder="00.000.000" />
        </div>
        <div className="form-field">
          <label className="form-label">Data de Nascimento</label>
          <input className="input" type="date" />
        </div>
      </div>
      <div className="form-row cols-3">
        <div className="form-field">
          <label className="form-label">Profissão</label>
          <input className="input" placeholder="Ex: Médica Dermatologista" />
        </div>
        <div className="form-field">
          <label className="form-label">Estado Civil</label>
          <div className="select-wrap">
            <select className="input" defaultValue="">
              <option value="">Selecione…</option>
              <option>Solteiro(a)</option>
              <option>Casado(a)</option>
              <option>União estável</option>
              <option>Divorciado(a)</option>
              <option>Viúvo(a)</option>
            </select>
          </div>
        </div>
        <div className="form-field">
          <label className="form-label">
            Gênero <span className="optional">(opcional)</span>
          </label>
          <div className="select-wrap">
            <select className="input" defaultValue="">
              <option>Prefiro não informar</option>
              <option>Feminino</option>
              <option>Masculino</option>
              <option>Não-binário</option>
              <option>Outro</option>
            </select>
          </div>
        </div>
      </div>
      <div className="form-row cols-2">
        <div className="form-field">
          <label className="form-label">
            Cônjuge / Parceiro(a){' '}
            <span className="optional">(se decisor compartilhado)</span>
          </label>
          <input className="input" placeholder="Nome do cônjuge ou parceiro(a)" />
        </div>
        <div className="form-field">
          <label className="form-label">Filhos / Dependentes</label>
          <input className="input" placeholder="Ex: 2 filhos (8 e 11 anos)" />
        </div>
      </div>
    </>
  )
}

function FieldsPJ() {
  return (
    <>
      <div className="form-row cols-2">
        <div className="form-field">
          <label className="form-label">
            Razão Social <span className="required">*</span>
          </label>
          <input className="input" placeholder="Nome empresarial completo" />
        </div>
        <div className="form-field">
          <label className="form-label">Nome Fantasia</label>
          <input className="input" placeholder="Nome comercial / marca" />
        </div>
      </div>
      <div className="form-row cols-3">
        <div className="form-field">
          <label className="form-label">
            CNPJ <span className="required">*</span>
          </label>
          <input className="input mono" placeholder="00.000.000/0000-00" />
        </div>
        <div className="form-field">
          <label className="form-label">Inscrição Estadual</label>
          <input className="input mono" placeholder="IE ou isento" />
        </div>
        <div className="form-field">
          <label className="form-label">Inscrição Municipal</label>
          <input className="input mono" placeholder="IM" />
        </div>
      </div>
      <div className="form-row cols-3">
        <div className="form-field">
          <label className="form-label">Ramo de Atuação</label>
          <input className="input" placeholder="Ex: Varejo de moda" />
        </div>
        <div className="form-field">
          <label className="form-label">Porte</label>
          <div className="select-wrap">
            <select className="input" defaultValue="">
              <option value="">Selecione…</option>
              <option>MEI</option>
              <option>ME — Microempresa</option>
              <option>EPP — Pequeno Porte</option>
              <option>Médio Porte</option>
              <option>Grande Porte</option>
            </select>
          </div>
        </div>
        <div className="form-field">
          <label className="form-label">Data de Fundação</label>
          <input className="input" type="date" />
        </div>
      </div>
    </>
  )
}

/* ---------------- STEP 2 ---------------- */

function Step2() {
  const [whatsapp, setWhatsapp] = useState(true)
  return (
    <>
      <div className="form-step-head">
        <div className="form-step-title">Contatos</div>
        <div className="form-step-desc">
          Canais de comunicação e pontos de contato. Para empresas, inclua tomadores de decisão.
        </div>
      </div>

      <div className="form-row cols-2">
        <div className="form-field">
          <label className="form-label">E-mail Principal</label>
          <input className="input" type="email" placeholder="nome@email.com" />
        </div>
        <div className="form-field">
          <label className="form-label">E-mail Secundário</label>
          <input className="input" type="email" placeholder="alternativo@email.com" />
        </div>
      </div>

      <div className="form-row cols-3">
        <div className="form-field">
          <label className="form-label">Celular</label>
          <input className="input mono" placeholder="(62) 99999-9999" />
          <div className="checkbox-row" style={{ marginTop: 6 }}>
            <div
              className={`checkbox${whatsapp ? ' checked' : ''}`}
              onClick={() => setWhatsapp(!whatsapp)}
            />
            <span style={{ fontSize: 12, color: 'var(--gray-600)' }}>
              Este número tem WhatsApp
            </span>
          </div>
        </div>
        <div className="form-field">
          <label className="form-label">Telefone Fixo</label>
          <input className="input mono" placeholder="(62) 3333-3333" />
        </div>
        <div className="form-field">
          <label className="form-label">Canal Preferido</label>
          <div className="select-wrap">
            <select className="input" defaultValue="WhatsApp">
              <option>WhatsApp</option>
              <option>E-mail</option>
              <option>Ligação</option>
              <option>Presencial</option>
              <option>Instagram DM</option>
            </select>
          </div>
        </div>
      </div>

      <div className="form-row cols-3">
        <div className="form-field">
          <label className="form-label">Instagram</label>
          <input className="input" placeholder="@usuario" />
        </div>
        <div className="form-field">
          <label className="form-label">LinkedIn</label>
          <input className="input" placeholder="linkedin.com/in/..." />
        </div>
        <div className="form-field">
          <label className="form-label">Site / Portfolio</label>
          <input className="input" placeholder="www.exemplo.com" />
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          <label className="form-label" style={{ margin: 0 }}>
            Pontos de Contato Adicionais
          </label>
          <span style={{ fontSize: 11, color: 'var(--gray-500)' }}>
            Para clientes PJ: decisores, financeiro, técnico
          </span>
        </div>

        <div className="contact-card">
          <div className="contact-card-head">
            <div className="contact-card-title">Contato 01 · Decisor</div>
            <button className="btn btn-ghost btn-sm">× Remover</button>
          </div>
          <div className="form-row cols-4">
            <div className="form-field">
              <label className="form-label">Nome</label>
              <input className="input" placeholder="Nome completo" />
            </div>
            <div className="form-field">
              <label className="form-label">Cargo</label>
              <input className="input" placeholder="Ex: Diretora" />
            </div>
            <div className="form-field">
              <label className="form-label">E-mail</label>
              <input className="input" type="email" />
            </div>
            <div className="form-field">
              <label className="form-label">Telefone</label>
              <input className="input mono" />
            </div>
          </div>
          <div className="form-row cols-2">
            <div className="form-field">
              <label className="form-label">Papel na Decisão</label>
              <div className="select-wrap">
                <select className="input" defaultValue="Decisor Principal">
                  <option>Decisor Principal</option>
                  <option>Decisor Compartilhado</option>
                  <option>Influenciador</option>
                  <option>Usuário / Técnico</option>
                  <option>Financeiro</option>
                </select>
              </div>
            </div>
            <div className="form-field">
              <label className="form-label">Observações</label>
              <input className="input" placeholder="Ex: prefere e-mail, responde após 18h" />
            </div>
          </div>
        </div>

        <button className="add-row-btn">+ Adicionar outro ponto de contato</button>
      </div>
    </>
  )
}

/* ---------------- STEP 3 ---------------- */

function Step3() {
  const [obraDiff, setObraDiff] = useState(false)
  return (
    <>
      <div className="form-step-head">
        <div className="form-step-title">Endereço</div>
        <div className="form-step-desc">
          Endereço de correspondência do cliente e, se aplicável, o endereço da obra.
        </div>
      </div>

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
        Endereço do Cliente
      </div>

      <div className="form-row cep-row">
        <div className="form-field">
          <label className="form-label">CEP</label>
          <input className="input mono" placeholder="00000-000" />
        </div>
        <div className="form-field">
          <label className="form-label">Logradouro</label>
          <input className="input" placeholder="Rua, Avenida, etc." />
        </div>
        <div className="form-field">
          <label className="form-label">Número</label>
          <input className="input" placeholder="123" />
        </div>
      </div>

      <div className="form-row cols-3">
        <div className="form-field">
          <label className="form-label">Complemento</label>
          <input className="input" placeholder="Apto, bloco, referência" />
        </div>
        <div className="form-field">
          <label className="form-label">Bairro</label>
          <input className="input" placeholder="Ex: Setor Bueno" />
        </div>
        <div className="form-field">
          <label className="form-label">Cidade / UF</label>
          <input className="input" placeholder="Goiânia / GO" />
        </div>
      </div>

      <div
        style={{
          marginTop: 28,
          paddingTop: 20,
          borderTop: '1px solid var(--gray-100)',
        }}
      >
        <div className="checkbox-row" style={{ marginBottom: 16 }}>
          <div
            className={`checkbox${obraDiff ? ' checked' : ''}`}
            onClick={() => setObraDiff(!obraDiff)}
          />
          <span style={{ fontSize: 13, color: 'var(--gray-900)', fontWeight: 500 }}>
            Endereço da obra é diferente
          </span>
        </div>

        {obraDiff && (
          <div>
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
              Endereço da Obra
            </div>
            <div className="form-row cep-row">
              <div className="form-field">
                <label className="form-label">CEP</label>
                <input className="input mono" placeholder="00000-000" />
              </div>
              <div className="form-field">
                <label className="form-label">Logradouro</label>
                <input className="input" />
              </div>
              <div className="form-field">
                <label className="form-label">Número</label>
                <input className="input" />
              </div>
            </div>
            <div className="form-row cols-3">
              <div className="form-field">
                <label className="form-label">Complemento</label>
                <input className="input" placeholder="Lote, quadra, torre" />
              </div>
              <div className="form-field">
                <label className="form-label">Bairro</label>
                <input className="input" />
              </div>
              <div className="form-field">
                <label className="form-label">Cidade / UF</label>
                <input className="input" />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

/* ---------------- STEP 4 ---------------- */

const projectTypes = [
  { title: 'Residencial', desc: 'Casa, apartamento, cobertura' },
  { title: 'Comercial', desc: 'Loja, escritório, restaurante' },
  { title: 'Retrofit', desc: 'Reforma de edificação existente' },
  { title: 'Interiores', desc: 'Design de interiores' },
  { title: 'Corporativo', desc: 'Edifício, sede empresarial' },
  { title: 'Industrial', desc: 'Galpão, fábrica' },
  { title: 'Hospitalar', desc: 'Clínica, consultório' },
  { title: 'Outro', desc: 'Especificar nas observações' },
]

function Step4() {
  const [selected, setSelected] = useState('Residencial')
  const [styles, setStyles] = useState<string[]>(['Contemporâneo', 'Minimalista'])

  return (
    <>
      <div className="form-step-head">
        <div className="form-step-title">Projeto de Interesse</div>
        <div className="form-step-desc">
          Características preliminares do projeto — permite segmentar, priorizar e preparar
          materiais personalizados.
        </div>
      </div>

      <label className="form-label" style={{ marginBottom: 12 }}>
        Tipo de Projeto
      </label>
      <div className="radio-cards">
        {projectTypes.map((p) => (
          <button
            key={p.title}
            className={`radio-card${selected === p.title ? ' selected' : ''}`}
            onClick={() => setSelected(p.title)}
          >
            <div className="rc-title">{p.title}</div>
            <div className="rc-desc">{p.desc}</div>
          </button>
        ))}
      </div>

      <div className="form-row cols-3">
        <div className="form-field">
          <label className="form-label">Escopo de Serviço</label>
          <div className="select-wrap">
            <select className="input" defaultValue="Projeto Completo">
              <option>Projeto Completo</option>
              <option>Estudo Preliminar</option>
              <option>Anteprojeto</option>
              <option>Projeto Executivo</option>
              <option>Interiores + Mobiliário</option>
              <option>Projeto Legal (aprovação)</option>
              <option>Acompanhamento de Obra</option>
              <option>Consultoria</option>
            </select>
          </div>
        </div>
        <div className="form-field">
          <label className="form-label">Metragem Estimada</label>
          <input className="input mono" placeholder="Ex: 180 m²" />
        </div>
        <div className="form-field">
          <label className="form-label">Prazo Desejado</label>
          <div className="select-wrap">
            <select className="input" defaultValue="A definir">
              <option>A definir</option>
              <option>Flexível</option>
              <option>3 meses</option>
              <option>6 meses</option>
              <option>Até 1 ano</option>
              <option>Mais de 1 ano</option>
            </select>
          </div>
        </div>
      </div>

      <div className="form-row cols-2">
        <div className="form-field">
          <label className="form-label">Faixa de Investimento Estimada</label>
          <div className="select-wrap">
            <select className="input" defaultValue="A definir">
              <option>A definir</option>
              <option>Até R$ 30.000</option>
              <option>R$ 30 – 80 mil</option>
              <option>R$ 80 – 150 mil</option>
              <option>R$ 150 – 300 mil</option>
              <option>R$ 300 – 500 mil</option>
              <option>Acima de R$ 500 mil</option>
            </select>
          </div>
        </div>
        <div className="form-field">
          <label className="form-label">Previsão de Início da Obra</label>
          <input className="input" type="month" />
        </div>
      </div>

      <div className="form-row cols-2">
        <div className="form-field">
          <label className="form-label">Estilo Preferido</label>
          <ChipInput
            values={styles}
            onChange={setStyles}
            placeholder="Adicionar estilo…"
          />
        </div>
        <div className="form-field">
          <label className="form-label">
            Referências Visuais <span className="optional">(Pinterest, Instagram)</span>
          </label>
          <input className="input" placeholder="URL ou descrição" />
        </div>
      </div>

      <div className="form-field">
        <label className="form-label">Briefing Inicial</label>
        <textarea
          className="input"
          placeholder="Descreva desejos, necessidades, contexto familiar, rotina, hobbies, aspectos funcionais importantes…"
        />
      </div>
    </>
  )
}

/* ---------------- STEP 5 ---------------- */

function Step5() {
  const [tags, setTags] = useState<string[]>(['Alto Padrão', 'VIP', 'Indicação'])
  const [email, setEmail] = useState(true)
  const [whatsapp, setWhatsapp] = useState(true)
  const [portfolio, setPortfolio] = useState(false)
  const [lgpd, setLgpd] = useState(false)

  return (
    <>
      <div className="form-step-head">
        <div className="form-step-title">Relacionamento Comercial</div>
        <div className="form-step-desc">
          Origem, posição no funil e informações para personalizar o atendimento.
        </div>
      </div>

      <div className="form-row cols-3">
        <div className="form-field">
          <label className="form-label">Origem do Lead</label>
          <div className="select-wrap">
            <select className="input" defaultValue="Instagram Orgânico">
              <option>Instagram Orgânico</option>
              <option>Instagram Ads</option>
              <option>Google Ads</option>
              <option>Google Busca Orgânica</option>
              <option>Meta Ads (Facebook)</option>
              <option>Site da IS</option>
              <option>Indicação de Cliente</option>
              <option>Indicação Profissional</option>
              <option>Evento / Feira</option>
              <option>LinkedIn</option>
              <option>Outro</option>
            </select>
          </div>
        </div>
        <div className="form-field">
          <label className="form-label">Campanha Específica</label>
          <input className="input" placeholder="Ex: Residencial Alto Padrão 04/26" />
        </div>
        <div className="form-field">
          <label className="form-label">Indicado por</label>
          <input className="input" placeholder="Nome de quem indicou (se aplicável)" />
        </div>
      </div>

      <div className="form-row cols-3">
        <div className="form-field">
          <label className="form-label">Etapa Inicial do Funil</label>
          <div className="select-wrap">
            <select className="input" defaultValue="Prospecção">
              <option>Prospecção</option>
              <option>Briefing</option>
              <option>Proposta Enviada</option>
              <option>Negociação</option>
              <option>Cliente Ativo</option>
            </select>
          </div>
        </div>
        <div className="form-field">
          <label className="form-label">Responsável Interno</label>
          <div className="select-wrap">
            <select className="input" defaultValue="Iago Siqueira">
              <option>Iago Siqueira</option>
              <option>Laura Mendonça</option>
              <option>Thiago Reis</option>
            </select>
          </div>
        </div>
        <div className="form-field">
          <label className="form-label">Prioridade</label>
          <div className="select-wrap">
            <select className="input" defaultValue="Normal">
              <option>Normal</option>
              <option>Alta</option>
              <option>Estratégica</option>
              <option>Baixa</option>
            </select>
          </div>
        </div>
      </div>

      <div className="form-row cols-2">
        <div className="form-field">
          <label className="form-label">Data do Primeiro Contato</label>
          <input className="input" type="date" />
        </div>
        <div className="form-field">
          <label className="form-label">Próximo Follow-up</label>
          <input className="input" type="date" />
        </div>
      </div>

      <div className="form-field" style={{ marginBottom: 16 }}>
        <label className="form-label">Tags</label>
        <ChipInput values={tags} onChange={setTags} placeholder="Adicionar tag…" />
      </div>

      <div className="form-row cols-2">
        <div className="form-field">
          <label className="form-label">Frequência de Contato Preferida</label>
          <div className="select-wrap">
            <select className="input" defaultValue="Mensal">
              <option>Semanal</option>
              <option>Quinzenal</option>
              <option>Mensal</option>
              <option>Sob demanda</option>
            </select>
          </div>
        </div>
        <div className="form-field">
          <label className="form-label">Melhor Horário para Contato</label>
          <div className="select-wrap">
            <select className="input" defaultValue="Tarde (14h – 18h)">
              <option>Manhã (8h – 12h)</option>
              <option>Almoço (12h – 14h)</option>
              <option>Tarde (14h – 18h)</option>
              <option>Noite (após 18h)</option>
              <option>Qualquer horário</option>
            </select>
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 20,
          padding: 16,
          background: 'var(--gray-50)',
          borderRadius: 8,
        }}
      >
        <Check checked={email} onChange={setEmail} label="Aceita comunicações por e-mail marketing" />
        <Check
          checked={whatsapp}
          onChange={setWhatsapp}
          label="Aceita envio de materiais via WhatsApp"
        />
        <Check
          checked={portfolio}
          onChange={setPortfolio}
          label="Aceita ser apresentado em cases de portfólio"
        />
        <Check checked={lgpd} onChange={setLgpd} label="Consentimento LGPD registrado" />
      </div>
    </>
  )
}

/* ---------------- STEP 6 ---------------- */

function Step6() {
  return (
    <>
      <div className="form-step-head">
        <div className="form-step-title">Observações e Notas Internas</div>
        <div className="form-step-desc">
          Informações adicionais, particularidades e contexto que ajudam a equipe no atendimento.
        </div>
      </div>

      <div className="form-field" style={{ marginBottom: 16 }}>
        <label className="form-label">Observações Gerais</label>
        <textarea
          className="input"
          rows={5}
          placeholder="Particularidades, contexto familiar ou empresarial, preferências, pontos de atenção…"
        />
      </div>

      <div className="form-row cols-2">
        <div className="form-field">
          <label className="form-label">Pets</label>
          <input className="input" placeholder="Ex: 2 cães de porte médio" />
        </div>
        <div className="form-field">
          <label className="form-label">Reformas / Projetos Anteriores</label>
          <input className="input" placeholder="Ex: cozinha reformada em 2022" />
        </div>
      </div>

      <div className="form-row cols-2">
        <div className="form-field">
          <label className="form-label">
            Aniversário <span className="optional">(relacionamento)</span>
          </label>
          <input className="input" type="date" />
        </div>
        <div className="form-field">
          <label className="form-label">Datas Importantes</label>
          <input className="input" placeholder="Ex: aniversário de casamento, mudança" />
        </div>
      </div>

      <div
        style={{
          background: 'var(--gray-50)',
          padding: '16px 20px',
          borderRadius: 8,
          borderLeft: '3px solid var(--gray-900)',
        }}
      >
        <div
          style={{
            fontSize: 12,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--gray-700)',
            fontWeight: 500,
            marginBottom: 8,
          }}
        >
          Nota sobre privacidade
        </div>
        <div style={{ fontSize: 12, color: 'var(--gray-600)', lineHeight: 1.6 }}>
          Campos pessoais sensíveis (data de nascimento, estado civil, pets, dependentes) são
          usados exclusivamente para personalizar atendimento e comunicação. O cliente pode
          solicitar exclusão a qualquer momento conforme LGPD.
        </div>
      </div>
    </>
  )
}

/* ---------------- Reusable bits ---------------- */

function ChipInput({
  values,
  onChange,
  placeholder,
}: {
  values: string[]
  onChange: (v: string[]) => void
  placeholder?: string
}) {
  const [draft, setDraft] = useState('')
  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && draft.trim()) {
      e.preventDefault()
      onChange([...values, draft.trim()])
      setDraft('')
    }
  }
  const remove = (i: number) => onChange(values.filter((_, j) => j !== i))
  return (
    <div className="chip-input">
      {values.map((v, i) => (
        <span className="chip" key={i}>
          {v}
          <button onClick={() => remove(i)} type="button">
            ×
          </button>
        </span>
      ))}
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={handleKey}
        placeholder={placeholder}
      />
    </div>
  )
}

function Check({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (b: boolean) => void
  label: string
}) {
  return (
    <div className="checkbox-row">
      <div className={`checkbox${checked ? ' checked' : ''}`} onClick={() => onChange(!checked)} />
      <span style={{ fontSize: 13 }}>{label}</span>
    </div>
  )
}
