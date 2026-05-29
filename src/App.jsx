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

// Protège les pages privées → redirige vers /login si pas connecté
function PrivateRoute({ children }) {
  const { isLoggedIn } = useAuth()
  return isLoggedIn ? children : <Navigate to="/login" />
}

// Protège les pages publiques → redirige vers / si déjà connecté
function PublicRoute({ children }) {
  const { isLoggedIn } = useAuth()
  return isLoggedIn ? <Navigate to="/" /> : children
}

function AppContent() {
  const { isLoggedIn } = useAuth()

  return (
    <div className={styles.app}>
      {isLoggedIn && <Navbar />}
      <main className={styles.main}>
        <Routes>
          {/* Pages publiques */}
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/error" element={<ServerError />} />

          {/* Pages privées */}
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/bons-plans" element={<PrivateRoute><Deals /></PrivateRoute>} />
          <Route path="/recherches" element={<PrivateRoute><Filters /></PrivateRoute>} />
          <Route path="/parametres" element={<PrivateRoute><Settings /></PrivateRoute>} />

          {/* Page 404 */}
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
