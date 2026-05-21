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

import { BotProvider } from './context/BotContext'
import { AuthProvider, useAuth } from './context/AuthContext'

import styles from './App.module.css'


function PrivateRoute({ children }) {
  const { isLoggedIn } = useAuth()

  return isLoggedIn
    ? children
    : <Navigate to="/login" />
}


function PublicRoute({ children }) {
  const { isLoggedIn } = useAuth()

  return isLoggedIn
    ? <Navigate to="/" />
    : children
}


function AppContent() {
  return (
    <div className={styles.app}>

      {/* Navbar toujours visible */}
      <Navbar />

      <main className={styles.main}>
        <Routes>

          {/* PUBLIC */}
          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/bons-plans"
            element={<Deals />}
          />

          {/* PRIVÉ */}
          <Route
            path="/recherches"
            element={
              <PrivateRoute>
                <Filters />
              </PrivateRoute>
            }
          />

          <Route
            path="/parametres"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />

          {/* AUTH */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* 404 */}
          <Route
            path="*"
            element={<NotFound />}
          />

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