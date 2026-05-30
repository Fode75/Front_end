// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Dashboard from './pages/Dashboard/Dashboard'
import Deals from './pages/Deals/Deals'
import Filters from './pages/Filters/Filters'
import Settings from './pages/Settings/Settings'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import NotFound from './pages/NotFound/NotFound'
import ServerError from './pages/Error/ServerError'
import { BotProvider } from './context/BotContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import styles from './App.module.css'

function PrivateRoute({ children }) {
  const { isLoggedIn } = useAuth()
  return isLoggedIn ? children : <Navigate to="/login" />
}

function PublicRoute({ children }) {
  const { isLoggedIn } = useAuth()
  return isLoggedIn ? <Navigate to="/" /> : children
}

function AppContent() {
  return (
    <div className={styles.app}>
      <Navbar />
      <main className={styles.main}>
        <Routes>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/bons-plans" element={<Deals />} />
          <Route path="/error" element={<ServerError />} />
          <Route path="/recherches" element={<PrivateRoute><Filters /></PrivateRoute>} />
          <Route path="/parametres" element={<PrivateRoute><Settings /></PrivateRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <BotProvider>
        <AppContent />
      </BotProvider>
    </AuthProvider>
  )
}

export default App
