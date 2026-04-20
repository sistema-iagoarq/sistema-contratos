type Props = {
  onCancel: () => void
  onSave: () => void
}

type Item = { desc: string; qty: string; unit: string; total: string }

const items: Item[] = [
  {
    desc: 'Estudo Preliminar (plantas, volumetria, implantação)',
    qty: '1',
    unit: 'R$ 8.500,00',
    total: 'R$ 8.500,00',
  },
  {
    desc: 'Anteprojeto com imagens 3D internas/externas',
    qty: '1',
    unit: 'R$ 18.000,00',
    total: 'R$ 18.000,00',
  },
  {
    desc: 'Projeto Legal para aprovação na Prefeitura',
    qty: '1',
    unit: 'R$ 9.500,00',
    total: 'R$ 9.500,00',
  },
  {
    desc: 'Projeto Executivo completo (plantas, cortes, detalhamentos)',
    qty: '1',
    unit: 'R$ 28.000,00',
    total: 'R$ 28.000,00',
  },
  {
    desc: 'Compatibilização com projetos complementares',
    qty: '1',
    unit: 'R$ 12.000,00',
    total: 'R$ 12.000,00',
  },
  {
    desc: 'Acompanhamento de obra (12 visitas técnicas)',
    qty: '12',
    unit: 'R$ 800,00',
    total: 'R$ 9.600,00',
  },
]

const parcelas = [
  { num: 'Parcela 1 · 25%', value: 'R$ 20.330,00', date: 'Ass. contrato · 25/04/26' },
  { num: 'Parcela 2 · 25%', value: 'R$ 20.330,00', date: 'Entrega Anteprojeto · 25/05/26' },
  { num: 'Parcela 3 · 25%', value: 'R$ 20.330,00', date: 'Entrega Executivo · 25/07/26' },
  { num: 'Parcela 4 · 25%', value: 'R$ 20.330,00', date: 'Entrega Final · 25/09/26' },
]

const marcos = [
  { fase: 'Estudo Preliminar', dur: '30 dias', entrega: '25/05/26' },
  { fase: 'Anteprojeto + 3D', dur: '45 dias', entrega: '10/07/26' },
  { fase: 'Projeto Legal', dur: '30 dias', entrega: '10/08/26' },
  { fase: 'Projeto Executivo + Complementares', dur: '45 dias', entrega: '25/09/26' },
]

export function FormView({ onCancel, onSave }: Props) {
  return (
    <div className="view">
      <div className="form-wrap">
        <div className="form-main">
          {/* Section 1: Identificação */}
          <div className="form-section">
            <div className="form-section-head">
              <div className="form-section-title">Identificação da Proposta</div>
              <div className="form-section-desc">
                Dados básicos, cliente vinculado e prazos de vigência.
              </div>
            </div>

            <div className="form-row cols-3">
              <div className="form-field">
                <label className="form-label">
                  Número <span className="required">*</span>
                </label>
                <input
                  className="input mono"
                  defaultValue="P-2026-042"
                  readOnly
                  style={{ background: 'var(--gray-50)' }}
                />
              </div>
              <div className="form-field">
                <label className="form-label">
                  Data de Emissão <span className="required">*</span>
                </label>
                <input className="input" type="date" defaultValue="2026-04-20" />
              </div>
              <div className="form-field">
                <label className="form-label">
                  Validade <span className="required">*</span>
                </label>
                <div className="select-wrap">
                  <select className="input" defaultValue="15">
                    <option value="7">7 dias</option>
                    <option value="15">15 dias</option>
                    <option value="30">30 dias</option>
                    <option value="45">45 dias</option>
                    <option value="60">60 dias</option>
                    <option value="custom">Personalizado…</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-row cols-2">
              <div className="form-field">
                <label className="form-label">
                  Cliente <span className="required">*</span>
                </label>
                <div className="select-wrap">
                  <select className="input" defaultValue="Fernanda Lima Ribeiro">
                    <option>Selecione um cliente existente…</option>
                    <option>Marina Andrade Costa</option>
                    <option>Fernanda Lima Ribeiro</option>
                    <option>Atelier Noma</option>
                    <option>Ricardo Vaz Empreendimentos</option>
                    <option>Hotel Mirante</option>
                    <option>Giovana Alencar</option>
                    <option>+ Cadastrar novo cliente</option>
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
            </div>

            <div className="form-row">
              <div className="form-field">
                <label className="form-label">
                  Título / Objeto da Proposta <span className="required">*</span>
                </label>
                <input
                  className="input"
                  defaultValue="Projeto Arquitetônico Residencial — Condomínio Aldeia do Vale"
                  placeholder="Ex: Projeto Executivo Residencial 180m²"
                />
              </div>
            </div>

            <div className="form-row cols-3">
              <div className="form-field">
                <label className="form-label">Tipo de Projeto</label>
                <div className="select-wrap">
                  <select className="input" defaultValue="Residencial">
                    <option>Residencial</option>
                    <option>Comercial</option>
                    <option>Retrofit</option>
                    <option>Interiores</option>
                    <option>Industrial</option>
                    <option>Hospitalar</option>
                    <option>Paisagismo</option>
                    <option>Consultoria</option>
                  </select>
                </div>
              </div>
              <div className="form-field">
                <label className="form-label">Modalidade</label>
                <div className="select-wrap">
                  <select className="input" defaultValue="Projeto Executivo">
                    <option>Projeto Completo</option>
                    <option>Projeto Executivo</option>
                    <option>Anteprojeto</option>
                    <option>Estudo Preliminar</option>
                    <option>Interiores + Mobiliário</option>
                    <option>Projeto Legal</option>
                    <option>Acompanhamento de Obra</option>
                  </select>
                </div>
              </div>
              <div className="form-field">
                <label className="form-label">Metragem</label>
                <input
                  className="input mono"
                  defaultValue="180 m²"
                  placeholder="Ex: 180 m²"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Escopo / Investimento */}
          <div className="form-section">
            <div className="form-section-head">
              <div className="form-section-title">Escopo e Investimento</div>
              <div className="form-section-desc">
                Itens, serviços e entregáveis contemplados nesta proposta.
              </div>
            </div>

            <div className="items-table">
              <div className="items-head">
                <div>Descrição do Serviço / Entregável</div>
                <div className="right">Qtd.</div>
                <div className="right">Valor Unitário</div>
                <div className="right">Total</div>
                <div></div>
              </div>

              {items.map((it, i) => (
                <div className="item-row" key={i}>
                  <input className="input" defaultValue={it.desc} />
                  <input className="input mono right" defaultValue={it.qty} />
                  <input className="input mono right" defaultValue={it.unit} />
                  <input
                    className="input mono right"
                    defaultValue={it.total}
                    readOnly
                    style={{ background: 'var(--gray-50)' }}
                  />
                  <button className="remove-btn" aria-label="remover">
                    ×
                  </button>
                </div>
              ))}
            </div>
            <button className="add-item-btn">+ Adicionar item ou serviço</button>

            <div className="items-summary">
              <div className="summary-col">
                <div className="summary-line">
                  <span>Subtotal</span>
                  <span className="val">R$ 85.600,00</span>
                </div>
                <div className="summary-line">
                  <span>Desconto comercial (5%)</span>
                  <span className="val">− R$ 4.280,00</span>
                </div>
                <div className="summary-line">
                  <span>Impostos inclusos</span>
                  <span className="val">R$ 0,00</span>
                </div>
                <div className="summary-line total">
                  <span>Total da Proposta</span>
                  <span className="val">R$ 81.320,00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Condições de Pagamento */}
          <div className="form-section">
            <div className="form-section-head">
              <div className="form-section-title">Condições de Pagamento</div>
              <div className="form-section-desc">
                Forma, parcelas e vinculação a entregas.
              </div>
            </div>

            <div className="form-row cols-3">
              <div className="form-field">
                <label className="form-label">Forma de Pagamento</label>
                <div className="select-wrap">
                  <select className="input" defaultValue="Parcelado vinculado a entregas">
                    <option>À vista (desconto adicional)</option>
                    <option>Parcelado vinculado a entregas</option>
                    <option>Parcelado em meses iguais</option>
                    <option>Entrada + saldo no final</option>
                    <option>Personalizado</option>
                  </select>
                </div>
              </div>
              <div className="form-field">
                <label className="form-label">Nº de Parcelas</label>
                <input className="input mono" defaultValue="4" />
              </div>
              <div className="form-field">
                <label className="form-label">Método</label>
                <div className="select-wrap">
                  <select className="input" defaultValue="PIX / Transferência">
                    <option>PIX / Transferência</option>
                    <option>Boleto</option>
                    <option>Cartão</option>
                    <option>Boleto + PIX</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="form-label">Cronograma de Desembolso</label>
              <div className="parcelas-grid">
                {parcelas.map((p) => (
                  <div className="parcela-card" key={p.num}>
                    <div className="parcela-num">{p.num}</div>
                    <div className="parcela-value">{p.value}</div>
                    <div className="parcela-date">{p.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 4: Prazos */}
          <div className="form-section">
            <div className="form-section-head">
              <div className="form-section-title">Prazos de Execução</div>
              <div className="form-section-desc">
                Fases do projeto com prazos de entrega estimados.
              </div>
            </div>

            <div className="form-row cols-2">
              <div className="form-field">
                <label className="form-label">Prazo Total Estimado</label>
                <input
                  className="input mono"
                  defaultValue="5 meses (150 dias corridos)"
                />
              </div>
              <div className="form-field">
                <label className="form-label">Início Previsto</label>
                <input className="input" type="date" defaultValue="2026-04-25" />
              </div>
            </div>

            <div
              style={{
                background: 'var(--gray-50)',
                borderRadius: 8,
                padding: '16px 20px',
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--gray-500)',
                  fontWeight: 500,
                  marginBottom: 12,
                }}
              >
                Marcos de Entrega
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 120px 140px',
                  gap: 12,
                  padding: '8px 0',
                  borderBottom: '1px solid var(--gray-200)',
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--gray-500)',
                  fontWeight: 500,
                }}
              >
                <div>Fase</div>
                <div>Duração</div>
                <div>Entrega</div>
              </div>
              {marcos.map((m, i) => (
                <div
                  key={m.fase}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 120px 140px',
                    gap: 12,
                    padding: '10px 0',
                    borderBottom:
                      i === marcos.length - 1
                        ? 'none'
                        : '1px solid var(--gray-100)',
                    fontSize: 13,
                  }}
                >
                  <div>{m.fase}</div>
                  <div className="td-mono">{m.dur}</div>
                  <div className="td-mono">{m.entrega}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Termos */}
          <div className="form-section">
            <div className="form-section-head">
              <div className="form-section-title">Termos e Observações</div>
              <div className="form-section-desc">
                Condições gerais, garantias e observações específicas.
              </div>
            </div>

            <div className="form-row cols-2">
              <div className="form-field">
                <label className="form-label">Modelo de Contrato</label>
                <div className="select-wrap">
                  <select className="input" defaultValue="Residencial · Padrão IS 2026">
                    <option>Residencial · Padrão IS 2026</option>
                    <option>Comercial · Padrão IS 2026</option>
                    <option>Retrofit · Padrão IS 2026</option>
                    <option>Consultoria</option>
                  </select>
                </div>
              </div>
              <div className="form-field">
                <label className="form-label">Reajuste</label>
                <div className="select-wrap">
                  <select className="input" defaultValue="IGPM-M (anual)">
                    <option>IGPM-M (anual)</option>
                    <option>IPCA (anual)</option>
                    <option>Sem reajuste</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-field" style={{ marginTop: 14 }}>
              <label className="form-label">
                Observações Internas{' '}
                <span
                  style={{
                    color: 'var(--gray-400)',
                    fontSize: 10,
                    fontStyle: 'italic',
                    textTransform: 'none',
                    letterSpacing: 0,
                  }}
                >
                  (não aparecem no PDF do cliente)
                </span>
              </label>
              <textarea
                className="input"
                rows={3}
                placeholder="Observações que ficam registradas internamente para a equipe…"
                defaultValue="Cliente indicada pela Giovana. Possível negociação de prazo — ela tem viagem em junho. Orçamento flexível se mantivermos qualidade do 3D."
              />
            </div>

            <div className="form-field" style={{ marginTop: 14 }}>
              <label className="form-label">Observações para o Cliente</label>
              <textarea
                className="input"
                rows={3}
                placeholder="Informações que aparecerão no documento enviado ao cliente…"
                defaultValue="Proposta contempla projeto arquitetônico completo, desde estudo preliminar até executivo com acompanhamento de obra. Não inclui projetos complementares (estrutural, elétrico, hidrossanitário), que serão orçados à parte com parceiros de confiança."
              />
            </div>
          </div>
        </div>

        {/* ASIDE */}
        <div className="form-aside">
          <div className="aside-card">
            <div className="aside-head">Resumo da Proposta</div>
            <div className="aside-body">
              <div className="summary-big-num">R$ 81.320</div>
              <div className="summary-big-label">Valor total</div>
            </div>
            <div>
              <div className="aside-step">
                <span className="label">Subtotal</span>
                <span className="val">R$ 85.600</span>
              </div>
              <div className="aside-step">
                <span className="label">Desconto</span>
                <span className="val">− R$ 4.280</span>
              </div>
              <div className="aside-step">
                <span className="label">Parcelas</span>
                <span className="val">4× R$ 20.330</span>
              </div>
              <div className="aside-step">
                <span className="label">Prazo total</span>
                <span className="val">150 dias</span>
              </div>
              <div className="aside-step">
                <span className="label">Validade</span>
                <span className="val">15 dias</span>
              </div>
            </div>
          </div>

          <div className="aside-card">
            <div className="aside-head">Status Inicial</div>
            <div className="aside-body" style={{ padding: '14px 18px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '8px 10px',
                    borderRadius: 6,
                    cursor: 'pointer',
                    border: '1px solid var(--gray-200)',
                  }}
                >
                  <input type="radio" name="st" defaultChecked />
                  <span className="status status-draft">Rascunho</span>
                  <span
                    style={{
                      fontSize: 11,
                      color: 'var(--gray-500)',
                      marginLeft: 'auto',
                    }}
                  >
                    salvar apenas
                  </span>
                </label>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '8px 10px',
                    borderRadius: 6,
                    cursor: 'pointer',
                    border: '1px solid var(--gray-200)',
                  }}
                >
                  <input type="radio" name="st" />
                  <span className="status status-sent">Enviada</span>
                  <span
                    style={{
                      fontSize: 11,
                      color: 'var(--gray-500)',
                      marginLeft: 'auto',
                    }}
                  >
                    gerar PDF
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button
              className="btn btn-primary"
              style={{ justifyContent: 'center' }}
              onClick={onSave}
            >
              Salvar Proposta
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
