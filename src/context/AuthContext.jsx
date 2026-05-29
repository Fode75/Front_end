// src/context/AuthContext.jsx
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

// Vide = les appels passent par le proxy Nginx sur le même domaine
const API_URL = ''

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('vintedbot-token'))
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('vintedbot-user')
    return u ? JSON.parse(u) : null
  })

  const isLoggedIn = !!token

  function login(token, user) {
    setToken(token)
    setUser(user)
    localStorage.setItem('vintedbot-token', token)
    localStorage.setItem('vintedbot-user', JSON.stringify(user))
  }

  function logout() {
    setToken(null)
    setUser(null)
    localStorage.removeItem('vintedbot-token')
    localStorage.removeItem('vintedbot-user')
  }

  return (
    <AuthContext.Provider value={{ token, user, isLoggedIn, login, logout, API_URL }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}