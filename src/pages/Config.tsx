import { Topbar } from '../components/Topbar'

export function Config() {
  return (
    <>
      <Topbar />
      <div className="content page">
      <div className="grid-2">
        <div className="card">
          <div className="card-head">
            <div className="card-title">Dados do Escritório</div>
          </div>
          <div className="card-body">
            <div className="form-row">
              <div>
                <label className="form-label">Razão Social</label>
                <input className="input-field" defaultValue="IS Arquitetura LTDA" />
              </div>
              <div>
                <label className="form-label">CNPJ</label>
                <input className="input-field" defaultValue="00.000.000/0001-00" />
              </div>
            </div>
            <div className="form-row">
              <div>
                <label className="form-label">Responsável Técnico</label>
                <input className="input-field" defaultValue="Iago Siqueira" />
              </div>
              <div>
                <label className="form-label">CAU</label>
                <input className="input-field" defaultValue="A00000-0" />
              </div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label className="form-label">Endereço</label>
              <input
                className="input-field"
                defaultValue="Rua dos Arquitetos, 123 — Setor Bueno, Goiânia/GO"
              />
            </div>
            <button className="btn btn-primary btn-sm">Salvar alterações</button>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <div className="card-title">Preferências Fiscais</div>
          </div>
          <div className="card-body">
            <div className="form-row">
              <div>
                <label className="form-label">Regime Tributário</label>
                <select className="input-field" defaultValue="simples">
                  <option value="simples">Simples Nacional · Anexo IV</option>
                  <option value="presumido">Lucro Presumido</option>
                </select>
              </div>
              <div>
                <label className="form-label">Alíquota ISS Goiânia</label>
                <input className="input-field" defaultValue="3,0%" />
              </div>
            </div>
            <div className="form-row">
              <div>
                <label className="form-label">Série NF-e</label>
                <input className="input-field" defaultValue="1" />
              </div>
              <div>
                <label className="form-label">Próximo Nº</label>
                <input className="input-field" defaultValue="1285" />
              </div>
            </div>
            <button className="btn btn-primary btn-sm">Salvar alterações</button>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-head">
            <div className="card-title">Integrações</div>
          </div>
          <div className="card-body" style={{ padding: '12px 20px' }}>
            <div className="list-item">
              <div className="list-dot" />
              <div className="list-content">
                <div className="list-title">Meta Business (Instagram + Facebook Ads)</div>
                <div className="list-meta">Conectado · sincroniza diariamente</div>
              </div>
              <button className="btn btn-ghost btn-sm">Gerenciar</button>
            </div>
            <div className="list-item">
              <div className="list-dot" />
              <div className="list-content">
                <div className="list-title">Google Ads</div>
                <div className="list-meta">Conectado · 4 campanhas</div>
              </div>
              <button className="btn btn-ghost btn-sm">Gerenciar</button>
            </div>
            <div className="list-item">
              <div className="list-dot muted" />
              <div className="list-content">
                <div className="list-title">Emissor de NF-e · SIGISS Goiânia</div>
                <div className="list-meta">Configurar certificado A1</div>
              </div>
              <button className="btn btn-ghost btn-sm">Conectar</button>
            </div>
            <div className="list-item">
              <div className="list-dot muted" />
              <div className="list-content">
                <div className="list-title">Banco · Conta Jurídica</div>
                <div className="list-meta">Importar extrato automático</div>
              </div>
              <button className="btn btn-ghost btn-sm">Conectar</button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <div className="card-title">Identidade da Marca</div>
          </div>
          <div className="card-body">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: 12,
                marginBottom: 20,
              }}
            >
              <div>
                <div
                  style={{
                    aspectRatio: '1/1',
                    background: 'var(--white)',
                    border: '1px solid var(--gray-300)',
                    borderRadius: 6,
                  }}
                />
                <div
                  style={{
                    fontSize: 11,
                    color: 'var(--gray-500)',
                    marginTop: 6,
                    fontFamily: 'var(--mono)',
                  }}
                >
                  #FFFFFF · Branco
                </div>
              </div>
              <div>
                <div
                  style={{
                    aspectRatio: '1/1',
                    background: 'var(--gray-500)',
                    borderRadius: 6,
                  }}
                />
                <div
                  style={{
                    fontSize: 11,
                    color: 'var(--gray-500)',
                    marginTop: 6,
                    fontFamily: 'var(--mono)',
                  }}
                >
                  #737373 · Cinza
                </div>
              </div>
              <div>
                <div
                  style={{
                    aspectRatio: '1/1',
                    background: 'var(--black)',
                    borderRadius: 6,
                  }}
                />
                <div
                  style={{
                    fontSize: 11,
                    color: 'var(--gray-500)',
                    marginTop: 6,
                    fontFamily: 'var(--mono)',
                  }}
                >
                  #000000 · Preto
                </div>
              </div>
            </div>
            <div
              style={{
                padding: 16,
                background: 'var(--gray-50)',
                borderRadius: 6,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 24,
                  letterSpacing: '-0.01em',
                }}
              >
                IS<em>.</em> Arquitetura
              </div>
              <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 4 }}>
                Display · Instrument Serif
              </div>
              <div style={{ marginTop: 12, fontSize: 14 }}>
                Tipografia de corpo moderna e clara.
              </div>
              <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 4 }}>
                Body · Geist
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
