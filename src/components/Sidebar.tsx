import type { Session } from '@supabase/supabase-js'
import { NavLink } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { navSections } from '../navigation'
import { BrandMark } from './BrandMark'

type Props = {
  session: Session
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ session, collapsed, onToggle }: Props) {
  const email = session?.user?.email ?? ''
  const displayName = email.split('@')[0] || 'Usuário'
  const initials = displayName.slice(0, 2).toUpperCase()

  const signOut = () => supabase.auth.signOut()

  return (
    <aside className={`sidebar${collapsed ? ' collapsed' : ''}`}>
      <div className="brand">
        <div className="brand-logo">
          <BrandMark size={32} />
        </div>
        <div className="brand-sub">Iago Siqueira · Arquitetura</div>
        <button
          type="button"
          className="sidebar-toggle"
          onClick={onToggle}
          aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'}
          title={collapsed ? 'Expandir menu' : 'Recolher menu'}
        >
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
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </div>

      {navSections.map((section) => (
        <div className="nav-section" key={section.label}>
          <div className="nav-label">{section.label}</div>
          {section.items.map((item) => (
            <NavLink
              key={item.key}
              to={item.path}
              className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              {item.icon}
              <span className="nav-item-label">{item.label}</span>
            </NavLink>
          ))}
        </div>
      ))}

      <div className="sidebar-foot">
        <div className="avatar">{initials}</div>
        <div className="user-info">
          <div className="user-name">{displayName}</div>
          <div className="user-role">{email || 'Conectado'}</div>
        </div>
        <button
          className="signout-btn"
          onClick={signOut}
          aria-label="Sair"
          title="Sair"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </div>
    </aside>
  )
}
