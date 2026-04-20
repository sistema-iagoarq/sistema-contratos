import { useMemo, useState } from 'react'

type Props = {
  onCancel: () => void
  onSave: () => void
}

type PhaseDraft = {
  num: number
  name: string
  desc: string
  selected: boolean
  days: string
  deliveryDate: string
  hours: string
}

const defaultPhases: PhaseDraft[] = [
  {
    num: 1,
    name: 'Levantamento',
    desc: 'Medição, fotografia, análise do terreno',
    selected: true,
    days: '15',
    deliveryDate: '',
    hours: '40',
  },
  {
    num: 2,
    name: 'Estudo Preliminar',
    desc: 'Partido, volumetria, diretrizes',
    selected: true,
    days: '20',
    deliveryDate: '',
    hours: '60',
  },
  {
    num: 3,
    name: 'Anteprojeto',
    desc: 'Plantas, cortes, fachadas, 3D',
    selected: true,
    days: '35',
    deliveryDate: '',
    hours: '100',
  },
  {
    num: 4,
    name: 'Projeto Legal',
    desc: 'Aprovação prefeitura/bombeiros',
    selected: true,
    days: '30',
    deliveryDate: '',
    hours: '20',
  },
  {
    num: 5,
    name: 'Projeto Executivo',
    desc: 'Detalhamentos, memoriais, especificações',
    selected: true,
    days: '60',
    deliveryDate: '',
    hours: '180',
  },
  {
    num: 6,
    name: 'Acompanhamento Obra',
    desc: 'Visitas técnicas durante execução',
    selected: false,
    days: '',
    deliveryDate: '',
    hours: '',
  },
]

export function FormView({ onCancel, onSave }: Props) {
  const [phases, setPhases] = useState<PhaseDraft[]>(defaultPhases)

  const togglePhase = (num: number) => {
    setPhases((prev) =>
      prev.map((p) => (p.num === num ? { ...p, selected: !p.selected } : p)),
    )
  }

  const updatePhase = (num: number, field: keyof PhaseDraft, value: string) => {
    setPhases((prev) =>
      prev.map((p) => (p.num === num ? { ...p, [field]: value } : p)),
    )
  }

  const summary = useMemo(() => {
    const active = phases.filter((p) => p.selected)
    const totalDays = active.reduce((sum, p) => sum + (parseInt(p.days) || 0), 0)
    const totalHours = active.reduce((sum, p) => sum + (parseInt(p.hours) || 0), 0)
    return {
      activeCount: active.length,
      totalCount: phases.length,
      totalDays,
      totalHours,
    }
  }, [phases])

  return (
    <div className="view">
      <div className="form-wrap">
        <div className="form-main">
          {/* S1 - Identificação */}
          <div className="form-section">
            <div className="form-section-head">
              <div className="form-section-title">Identificação do Projeto</div>
              <div className="form-section-desc">Dados básicos e vinculação ao cliente.</div>
            </div>

            <div className="form-row cols-3">
              <div className="form-field">
                <label className="form-label">
                  Código <span className="required">*</span>
                </label>
                <input
                  className="input mono"
                  defaultValue="PRJ-2026-019"
                  readOnly
                  style={{ background: 'var(--gray-50)' }}
                />
              </div>
              <div className="form-field">
                <label className="form-label">
                  Data de Abertura <span className="required">*</span>
                </label>
                <input className="input" type="date" defaultValue="2026-04-20" />
              </div>
              <div className="form-field">
                <label className="form-label">Proposta Vinculada</label>
                <div className="select-wrap">
                  <select className="input">
                    <option>— Nenhuma —</option>
                    <option>P-2026-037 · Giovana Alencar</option>
                    <option>P-2026-041 · Marina Costa</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label className="form-label">
                  Nome do Projeto <span className="required">*</span>
                </label>
                <input
                  className="input"
                  placeholder="Ex: Residência Cond. Aldeia do Vale"
                />
              </div>
            </div>

            <div className="form-row cols-2">
              <div className="form-field">
                <label className="form-label">
                  Cliente <span className="required">*</span>
                </label>
                <div className="select-wrap">
                  <select className="input">
                    <option>Selecione…</option>
                    <option>Giovana Alencar</option>
                    <option>Marina Costa</option>
                    <option>Ricardo Vaz</option>
                    <option>+ Cadastrar novo cliente</option>
                  </select>
                </div>
              </div>
              <div className="form-field">
                <label className="form-label">Responsável Principal</label>
                <div className="select-wrap">
                  <select className="input" defaultValue="Iago Siqueira">
                    <option>Iago Siqueira</option>
                    <option>Laura Mendonça</option>
                    <option>Thiago Reis</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* S2 - Características */}
          <div className="form-section">
            <div className="form-section-head">
              <div className="form-section-title">Características</div>
              <div className="form-section-desc">
                Tipo, localização e dimensões do projeto.
              </div>
            </div>

            <div className="form-row cols-3">
              <div className="form-field">
                <label className="form-label">Tipo</label>
                <div className="select-wrap">
                  <select className="input" defaultValue="Residencial · Unifamiliar">
                    <option>Residencial · Unifamiliar</option>
                    <option>Residencial · Multifamiliar</option>
                    <option>Comercial · Varejo</option>
                    <option>Comercial · Escritório</option>
                    <option>Hotelaria / Hospitalidade</option>
                    <option>Industrial</option>
                    <option>Retrofit</option>
                    <option>Interiores</option>
                  </select>
                </div>
              </div>
              <div className="form-field">
                <label className="form-label">Metragem</label>
                <input className="input mono" placeholder="Ex: 420" />
              </div>
              <div className="form-field">
                <label className="form-label">Unidade</label>
                <div className="select-wrap">
                  <select className="input" defaultValue="m²">
                    <option>m²</option>
                    <option>hectares</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-row cols-2">
              <div className="form-field">
                <label className="form-label">Endereço da Obra</label>
                <input className="input" placeholder="Rua, número, bairro" />
              </div>
              <div className="form-field">
                <label className="form-label">Cidade / UF</label>
                <input className="input" defaultValue="Goiânia / GO" />
              </div>
            </div>

            <div className="form-row cols-2">
              <div className="form-field">
                <label className="form-label">Briefing</label>
                <textarea
                  className="input"
                  rows={3}
                  placeholder="Contexto e diretrizes do projeto"
                />
              </div>
              <div className="form-field">
                <label className="form-label">Referências</label>
                <textarea
                  className="input"
                  rows={3}
                  placeholder="Links, Pinterest, Instagram…"
                />
              </div>
            </div>
          </div>

          {/* S3 - Fases */}
          <div className="form-section">
            <div className="form-section-head">
              <div className="form-section-title">Fases do Projeto</div>
              <div className="form-section-desc">
                Selecione as fases contempladas e defina prazos estimados.
              </div>
            </div>

            <div className="phase-selector">
              {phases.map((p) => (
                <div
                  key={p.num}
                  className={`phase-check phase-${p.num}${p.selected ? ' selected' : ''}`}
                  onClick={() => togglePhase(p.num)}
                >
                  <div className="phase-check-head">
                    <span className="phase-check-num">
                      {String(p.num).padStart(2, '0')}
                    </span>
                    <div className="phase-check-check" />
                  </div>
                  <div>
                    <div className="phase-check-name">{p.name}</div>
                    <div className="phase-check-desc">{p.desc}</div>
                  </div>
                  <div
                    className="phase-check-fields"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      className="input mono"
                      placeholder="Dias"
                      value={p.days}
                      onChange={(e) => updatePhase(p.num, 'days', e.target.value)}
                    />
                    <input
                      className="input"
                      type="date"
                      value={p.deliveryDate}
                      onChange={(e) =>
                        updatePhase(p.num, 'deliveryDate', e.target.value)
                      }
                    />
                    <input
                      className="input mono"
                      placeholder="Horas"
                      value={p.hours}
                      onChange={(e) => updatePhase(p.num, 'hours', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* S4 - Prazos & Valor */}
          <div className="form-section">
            <div className="form-section-head">
              <div className="form-section-title">Prazos &amp; Valor</div>
            </div>
            <div className="form-row cols-3">
              <div className="form-field">
                <label className="form-label">Início Previsto</label>
                <input className="input" type="date" />
              </div>
              <div className="form-field">
                <label className="form-label">Entrega Prevista</label>
                <input className="input" type="date" />
              </div>
              <div className="form-field">
                <label className="form-label">Valor Contratado</label>
                <input className="input mono" placeholder="R$ 0,00" />
              </div>
            </div>
          </div>
        </div>

        {/* ASIDE */}
        <div className="form-aside">
          <div className="aside-card">
            <div className="aside-head">Resumo</div>
            <div>
              <div className="aside-step">
                <span className="label">Fases ativas</span>
                <span className="val">
                  {summary.activeCount} de {summary.totalCount}
                </span>
              </div>
              <div className="aside-step">
                <span className="label">Duração total</span>
                <span className="val">{summary.totalDays} dias</span>
              </div>
              <div className="aside-step">
                <span className="label">Horas previstas</span>
                <span className="val">{summary.totalHours}h</span>
              </div>
              <div className="aside-step">
                <span className="label">Valor</span>
                <span className="val">R$ —</span>
              </div>
            </div>
          </div>

          <div className="aside-card">
            <div className="aside-head">Auto-Sugestão</div>
            <div
              className="aside-body"
              style={{ fontSize: 12, color: 'var(--gray-600)', lineHeight: 1.6 }}
            >
              Com base na metragem e nas fases selecionadas, sugerimos alocar{' '}
              <strong style={{ color: 'var(--gray-900)' }}>380–420h</strong> e prazo
              total de <strong style={{ color: 'var(--gray-900)' }}>5–6 meses</strong>.
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button
              className="btn btn-primary"
              style={{ justifyContent: 'center' }}
              onClick={onSave}
            >
              Criar Projeto
            </button>
            <button
              className="btn btn-secondary"
              style={{ justifyContent: 'center' }}
              onClick={onSave}
            >
              Salvar como Rascunho
            </button>
            <button
              className="btn btn-ghost btn-sm"
              style={{ justifyContent: 'center' }}
              onClick={onCancel}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
