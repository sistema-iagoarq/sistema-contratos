import { useRef, useState, type FormEvent, type MouseEvent } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { BrandMark } from '../components/BrandMark'
import { useSession } from '../hooks/useSession'

const marqueeItems = [
  'Residência Alphaville',
  'Atelier Noma',
  'Hotel Mirante',
  'Escritório Setor Bueno',
  'Casa Jardins',
  'Galpão Transvale',
  'Clínica Vertex',
]

export function Login() {
  const { session } = useSession()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  if (session) return <Navigate to="/dashboard" replace />

  const leftRef = useRef<HTMLDivElement>(null)

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = leftRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  const signIn = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(translateError(error.message))
    setLoading(false)
  }

  const magicLink = async () => {
    if (!email) {
      setError('Informe seu e-mail para receber o link.')
      return
    }
    setLoading(true)
    setError(null)
    setSuccess(null)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin },
    })
    if (error) setError(translateError(error.message))
    else setSuccess(`Link de acesso enviado para ${email}. Verifique seu e-mail.`)
    setLoading(false)
  }

  return (
    <div className="login-shell">
      <div className="login-left" ref={leftRef} onMouseMove={handleMove}>
        <div className="login-grid" />
        <div className="login-aurora" />
        <div className="login-meteors">
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="login-brand">
          <div className="login-logo">
            <BrandMark symbolOnly={false} size={96} color="var(--white)" />
          </div>
          <div className="login-tagline shimmer-text">
            Arquitetura que <em>conta histórias</em>.
          </div>
          <div className="login-kicker">Plataforma interna · IS Arquitetura</div>
        </div>

        <div className="login-marquee">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((p, i) => (
              <span key={i}>
                {p} <span className="dot">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <div className="login-minilogo">
            <BrandMark size={36} />
          </div>

          <h1 className="login-title">
            Entrar <span className="serif">em sua conta</span>
          </h1>
          <p className="login-sub">Use seu e-mail corporativo para acessar o sistema.</p>

          {error && <div className="login-error">{error}</div>}
          {success && <div className="login-success">{success}</div>}

          <form onSubmit={signIn}>
            <div className="form-field" style={{ marginBottom: 14 }}>
              <label className="form-label">E-mail</label>
              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@isarquitetura.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="form-field" style={{ marginBottom: 10 }}>
              <label className="form-label">Senha</label>
              <div style={{ position: 'relative' }}>
                <input
                  className="input"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  style={{ paddingRight: 40 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  aria-pressed={showPassword}
                  tabIndex={-1}
                  style={{
                    position: 'absolute',
                    right: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 0,
                    padding: 6,
                    cursor: 'pointer',
                    color: 'var(--gray-500)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 4,
                  }}
                >
                  {showPassword ? <IconEyeOff /> : <IconEye />}
                </button>
              </div>
            </div>

            <div className="login-row">
              <button
                type="button"
                className="login-link"
                onClick={() => alert('Fluxo de recuperação — em breve')}
              >
                Esqueci a senha
              </button>
            </div>

            <button
              type="submit"
              className="btn btn-primary login-submit"
              disabled={loading}
            >
              {loading ? 'Entrando…' : 'Entrar'}
            </button>
          </form>

          <div className="login-divider">
            <span>ou</span>
          </div>

          <button
            type="button"
            className="btn btn-secondary login-alt"
            onClick={magicLink}
            disabled={loading}
          >
            <IconMail /> Enviar link mágico
          </button>

          <div className="login-footer">
            Não tem acesso?{' '}
            <button type="button" className="login-link">
              Solicite ao administrador.
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function IconMail() {
  return (
    <svg
      width="14"
      height="14"
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

function IconEye() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function IconEyeOff() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a19.77 19.77 0 0 1 4.22-5.19" />
      <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 7 11 7a19.77 19.77 0 0 1-3.22 4.19" />
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  )
}

function translateError(msg: string): string {
  const m = msg.toLowerCase()
  if (m.includes('invalid login credentials')) return 'E-mail ou senha incorretos.'
  if (m.includes('email not confirmed')) return 'E-mail ainda não confirmado.'
  if (m.includes('rate limit')) return 'Muitas tentativas. Aguarde alguns segundos.'
  return msg
}
