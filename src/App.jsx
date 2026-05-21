// src/App.jsx
// Version mise à jour avec le login.
// On ajoute : AuthProvider, routes login/register, et protection des pages.

import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Dashboard from './pages/Dashboard/Dashboard'
import Deals from './pages/Deals/Deals'
import Filters from './pages/Filters/Filters'
import Settings from './pages/Settings/Settings'
import NotFound from './pages/NotFound/NotFound'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import { BotProvider } from './context/BotContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import styles from './App.module.css'

// Composant qui protège les pages privées.
// Si l'utilisateur n'est pas connecté → redirige vers /login
function PrivateRoute({ children }) {
  const { isLoggedIn } = useAuth()
  return isLoggedIn ? children : <Navigate to="/login" />
}

// Composant qui protège les pages publiques (login/register).
// Si l'utilisateur est déjà connecté → redirige vers le dashboard
function PublicRoute({ children }) {
  const { isLoggedIn } = useAuth()
  return isLoggedIn ? <Navigate to="/" /> : children
}

function AppContent() {
  const { isLoggedIn } = useAuth()

  return (
    <div className={styles.app}>
      {/* On n'affiche la Navbar que si l'utilisateur est connecté */}
      {isLoggedIn && <Navbar />}

      <main className={styles.main}>
        <Routes>
          {/* Pages publiques (accessibles sans être connecté) */}
          <Route path="/login" element={
            <PublicRoute><Login /></PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute><Register /></PublicRoute>
          } />

          {/* Pages privées (nécessitent d'être connecté) */}
          <Route path="/" element={
            <PrivateRoute><Dashboard /></PrivateRoute>
          } />
          <Route path="/bons-plans" element={
            <PrivateRoute><Deals /></PrivateRoute>
          } />
          <Route path="/recherches" element={
            <PrivateRoute><Filters /></PrivateRoute>
          } />
          <Route path="/parametres" element={
            <PrivateRoute><Settings /></PrivateRoute>
          } />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    // AuthProvider entoure tout → tous les composants peuvent utiliser useAuth()
    <AuthProvider>
      <BotProvider>
        <AppContent />
      </BotProvider>
    </AuthProvider>
  )
}

export default App
