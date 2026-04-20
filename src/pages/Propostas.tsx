import { useState } from 'react'
import { ListView } from './propostas/ListView'
import { FormView } from './propostas/FormView'
import { DetailView } from './propostas/DetailView'
import { BackLink } from '../components/BackLink'

type View = 'list' | 'form' | 'detail'

const headings: Record<View, { crumbs: string[]; title: string; sub: string }> = {
  list: { crumbs: ['Propostas'], title: 'Propostas', sub: 'monitoramento e status' },
  form: {
    crumbs: ['Propostas', 'Nova Proposta'],
    title: 'Nova Proposta',
    sub: 'preencha os dados',
  },
  detail: {
    crumbs: ['Propostas', 'P-2026-040'],
    title: 'Proposta P-2026-040',
    sub: 'Hotel Mirante',
  },
}

export function Propostas() {
  const [view, setView] = useState<View>('list')

  const go = (v: View) => {
    setView(v)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const h = headings[view]

  return (
    <>
      <div className="topbar">
        <div className="topbar-left">
          <div>
            <div className="breadcrumb">
              {h.crumbs.map((c, i) =>
                i === h.crumbs.length - 1 ? (
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
              {h.title} <span className="serif">{h.sub}</span>
            </div>
          </div>
        </div>
        <div className="topbar-actions">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por número, cliente, escopo…"
          />
          <button className="btn btn-secondary btn-sm">
            <IconDownload /> Exportar
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => go('form')}>
            <IconPlus /> Nova Proposta
          </button>
        </div>
      </div>

      <div className="content">
        {view === 'list' && <ListView onOpen={() => go('detail')} onNew={() => go('form')} />}
        {view === 'form' && <FormView onCancel={() => go('list')} onSave={() => go('list')} />}
        {view === 'detail' && <DetailView onEdit={() => go('form')} />}
      </div>
    </>
  )
}

function IconDownload() {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
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
