import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedLayout } from './layouts/ProtectedLayout'
import { BrandMark } from './components/BrandMark'

const Login = lazy(() => import('./pages/Login').then((m) => ({ default: m.Login })))
const Dashboard = lazy(() => import('./pages/Dashboard').then((m) => ({ default: m.Dashboard })))
const Clientes = lazy(() => import('./pages/Clientes').then((m) => ({ default: m.Clientes })))
const Propostas = lazy(() => import('./pages/Propostas').then((m) => ({ default: m.Propostas })))
const Projetos = lazy(() => import('./pages/Projetos').then((m) => ({ default: m.Projetos })))
const Agenda = lazy(() => import('./pages/Agenda').then((m) => ({ default: m.Agenda })))
const Financeiro = lazy(() => import('./pages/Financeiro').then((m) => ({ default: m.Financeiro })))
const Marketing = lazy(() => import('./pages/Marketing').then((m) => ({ default: m.Marketing })))
const Config = lazy(() => import('./pages/Config').then((m) => ({ default: m.Config })))

function LoadingFallback() {
  return (
    <div className="splash">
      <div className="splash-mark">
        <BrandMark size={72} />
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/propostas" element={<Propostas />} />
            <Route path="/projetos" element={<Projetos />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/financeiro" element={<Financeiro />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/configuracoes" element={<Config />} />
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
