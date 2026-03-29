import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from "./pages/Login"

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem('token')
  return token ? <>{children}</> : <Navigate to="/" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Exemplo de uso: 
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } /> 
        */}
      </Routes>
    </BrowserRouter>
  )
}