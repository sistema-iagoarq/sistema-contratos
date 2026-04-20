import { useLocation } from 'react-router-dom'
import { allNavItems } from '../navigation'

type Props = {
  /** Sobrescreve o título derivado da rota atual. */
  title?: string
  /** Sobrescreve o subtítulo. */
  subtitle?: string
  /** Elementos à direita (search, botões). Default: busca + notificações + "Novo" */
  actions?: React.ReactNode
}

export function Topbar({ title, subtitle, actions }: Props) {
  const { pathname } = useLocation()
  const key = pathname.split('/')[1] || 'dashboard'
  const item = allNavItems.find((i) => i.path === `/${key}`)

  const finalTitle = title ?? item?.label ?? ''
  const finalSub = subtitle ?? item?.subtitle ?? ''

  return (
    <div className="topbar">
      <div className="topbar-left">
        <div>
          <div className="breadcrumb">{finalTitle}</div>
          <div className="page-title">
            {finalTitle} <span className="serif">{finalSub}</span>
          </div>
        </div>
      </div>
      <div className="topbar-actions">
        {actions ?? <DefaultActions />}
      </div>
    </div>
  )
}

function DefaultActions() {
  return (
    <>
      <input
        type="text"
        className="search-input"
        placeholder="Buscar projeto, cliente, documento…"
      />
      <button className="btn btn-secondary btn-sm" aria-label="Notificações">
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
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      </button>
    </>
  )
}
