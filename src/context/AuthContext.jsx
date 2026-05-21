// src/context/AuthContext.jsx
// Gère l'état de connexion dans toute l'app.
// Même principe que BotContext — une "boîte" accessible partout.

import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  // On récupère le token stocké dans le navigateur au démarrage
  const [token, setToken] = useState(() => localStorage.getItem('vintedbot-token'))
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('vintedbot-user')
    return u ? JSON.parse(u) : null
  })

  // Est-ce que l'utilisateur est connecté ?
  const isLoggedIn = !!token

  // Connexion : on sauvegarde le token et l'utilisateur
  function login(token, user) {
    setToken(token)
    setUser(user)
    localStorage.setItem('vintedbot-token', token)
    localStorage.setItem('vintedbot-user', JSON.stringify(user))
  }

  // Déconnexion : on efface tout
  function logout() {
    setToken(null)
    setUser(null)
    localStorage.removeItem('vintedbot-token')
    localStorage.removeItem('vintedbot-user')
  }

  return (
    <AuthContext.Provider value={{ token, user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook custom : permet d'utiliser le contexte avec "const { isLoggedIn } = useAuth()"
export function useAuth() {
  return useContext(AuthContext)
}
