import { Topbar } from '../components/Topbar'
import { BrandMark } from '../components/BrandMark'

const brandPalette: Array<{ hex: string; label: string; textOn: 'dark' | 'light' }> = [
  { hex: '#A6A6A6', label: 'Cinza Claro',   textOn: 'dark' },
  { hex: '#E5E5E5', label: 'Off-White',     textOn: 'dark' },
  { hex: '#0F0F0F', label: 'Preto',         textOn: 'light' },
  { hex: '#555956', label: 'Graphite',      textOn: 'light' },
  { hex: '#6D736E', label: 'Sage Médio',    textOn: 'light' },
  { hex: '#CDD3CE', label: 'Sage Claro',    textOn: 'dark' },
]

const brandWeights: Array<{ weight: number; name: string }> = [
  { weight: 200, name: 'ExLight' },
  { weight: 300, name: 'Light' },
  { weight: 400, name: 'Regular' },
  { weight: 500, name: 'Medium' },
  { weight: 600, name: 'SemiBold' },
  { weight: 700, name: 'Bold' },
  { weight: 800, name: 'ExBold' },
]

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
                <label className="form-label">Nome Fantasia</label>
                <input className="input-field" defaultValue="Iago Siqueira Arquitetura" />
              </div>
            </div>
            <div className="form-row">
              <div>
                <label className="form-label">CNPJ</label>
                <input className="input-field" defaultValue="00.000.000/0001-00" />
              </div>
              <div>
                <label className="form-label">CAU</label>
                <input className="input-field" defaultValue="A00000-0" />
              </div>
            </div>
            <div className="form-row">
              <div>
                <label className="form-label">Responsável Técnico</label>
                <input className="input-field" defaultValue="Iago Siqueira" />
              </div>
              <div>
                <label className="form-label">Telefone</label>
                <input className="input-field" defaultValue="+55 (62) 98217-9976" />
              </div>
            </div>
            <div className="form-row">
              <div>
                <label className="form-label">Instagram</label>
                <input className="input-field" defaultValue="@iagosiqueira_" />
              </div>
              <div>
                <label className="form-label">E-mail</label>
                <input className="input-field" defaultValue="contato@iagosiqueira.com.br" />
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '28px 16px',
                background: '#0F0F0F',
                borderRadius: 6,
                marginBottom: 16,
              }}
            >
              <BrandMark symbolOnly={false} size={44} color="#E5E5E5" />
            </div>

            <div
              style={{
                fontSize: 11,
                color: 'var(--gray-500)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: 8,
              }}
            >
              Paleta
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 8,
                marginBottom: 20,
              }}
            >
              {brandPalette.map((c) => (
                <div key={c.hex}>
                  <div
                    style={{
                      aspectRatio: '1/1',
                      background: c.hex,
                      borderRadius: 6,
                      border:
                        c.hex === '#E5E5E5' || c.hex === '#CDD3CE'
                          ? '1px solid var(--gray-300)'
                          : 'none',
                      display: 'flex',
                      alignItems: 'flex-end',
                      padding: 8,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: 10,
                        letterSpacing: '0.04em',
                        color: c.textOn === 'light' ? '#E5E5E5' : '#0F0F0F',
                      }}
                    >
                      {c.hex}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: 'var(--gray-500)',
                      marginTop: 6,
                    }}
                  >
                    {c.label}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                fontSize: 11,
                color: 'var(--gray-500)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: 8,
              }}
            >
              Tipografia
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
                  fontFamily: 'var(--sans)',
                  fontSize: 32,
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  lineHeight: 1,
                }}
              >
                JUST Sans
              </div>
              <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 4 }}>
                Tipografia oficial · 7 pesos · suporte completo ao idioma latino
              </div>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px 16px',
                  marginTop: 14,
                  fontFamily: 'var(--sans)',
                  fontSize: 14,
                  color: '#555956',
                }}
              >
                {brandWeights.map((w) => (
                  <span key={w.weight} style={{ fontWeight: w.weight }}>
                    {w.name}
                  </span>
                ))}
              </div>

              <div
                style={{
                  marginTop: 14,
                  fontFamily: 'var(--sans)',
                  fontSize: 13,
                  color: 'var(--gray-500)',
                  lineHeight: 1.5,
                }}
              >
                Estética limpa e minimalista, kerning ajustado à mão e versão variável
                para máxima versatilidade.
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
