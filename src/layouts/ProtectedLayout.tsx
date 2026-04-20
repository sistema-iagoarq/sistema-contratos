import { Suspense, useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'
import { BrandMark } from '../components/BrandMark'
import { useSession } from '../hooks/useSession'

const STORAGE_KEY = 'is:sidebar-collapsed'

export function ProtectedLayout() {
  const { session, loading } = useSession()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState<boolean>(
    () => localStorage.getItem(STORAGE_KEY) === '1',
  )

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, collapsed ? '1' : '0')
  }, [collapsed])

  if (loading) {
    return (
      <div className="splash">
        <div className="splash-mark">
          <BrandMark size={72} />
        </div>
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return (
    <div className={`app${collapsed ? ' sidebar-collapsed' : ''}`}>
      <Sidebar
        session={session}
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
      />
      <main className="main">
        <Suspense fallback={<div className="page-loading" />}>
          <div className="page-fade" key={location.pathname}>
            <Outlet />
          </div>
        </Suspense>
      </main>
    </div>
  )
}
