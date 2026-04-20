import { useState } from 'react'
import { ListView } from './projetos/ListView'
import { DetailView } from './projetos/DetailView'
import { projects } from './projetos/data'
import { BackLink } from '../components/BackLink'

type View = 'list' | 'detail'

export function Projetos() {
  const [view, setView] = useState<View>('list')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const go = (v: View) => {
    setView(v)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const selected = projects.find((p) => p.id === selectedId) ?? projects[0]
  const crumbs =
    view === 'list' ? ['Projetos'] : ['Projetos', selected.name]
  const title = view === 'list' ? 'Projetos' : selected.name
  const sub = view === 'list' ? 'gestão e cronogramas' : selected.client

  return (
    <>
      <div className="topbar">
        <div className="topbar-left">
          <div>
            <div className="breadcrumb">
              {crumbs.map((c, i) =>
                i === crumbs.length - 1 ? (
                  <span key={i}>{c}</span>
                ) : (
                  <span key={i}>
                    <a onClick={() => go('list')}>{c}</a>
                    <span className="sep"> / </span>
                  </span>
                ),
              )}
            </div>
            {view !== 'list' && <BackLink onClick={() => go('list')} />}
            <div className="page-title">
              {title} <span className="serif">{sub}</span>
            </div>
          </div>
        </div>
        <div className="topbar-actions">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar projeto, cliente, fase…"
          />
          <button className="btn btn-secondary btn-sm">Exportar</button>
          <button className="btn btn-primary btn-sm">
            <IconPlus /> Novo Projeto
          </button>
        </div>
      </div>

      <div className="content">
        {view === 'list' && (
          <ListView
            onOpen={(id) => {
              setSelectedId(id)
              go('detail')
            }}
          />
        )}
        {view === 'detail' && <DetailView onBack={() => go('list')} />}
      </div>
    </>
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
