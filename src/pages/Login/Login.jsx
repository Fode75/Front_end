// src/pages/Login/Login.jsx
// Page de connexion. Envoie email + mot de passe à ton API backend.

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import styles from './Login.module.css'

// URL de ton API backend — à mettre dans .env plus tard
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  // État du formulaire
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault() // empêche le rechargement de la page
    setError('')
    setLoading(true)

    try {
      // Appel à ton API backend
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Le serveur a renvoyé une erreur (mauvais mdp, etc.)
        setError(data.message || 'Email ou mot de passe incorrect')
        return
      }

      // Connexion réussie → on sauvegarde le token et on redirige
      login(data.token, data.user)
      navigate('/')

    } catch (err) {
      setError('Impossible de se connecter au serveur. Vérifie que ton backend tourne.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>

        {/* Logo */}
        <div className={styles.logo}>
          <span className={styles.logoAccent}>⚡</span>
          VINTED<span className={styles.logoLight}>BOT</span>
        </div>

        <h1 className={styles.title}>Connexion</h1>
        <p className={styles.subtitle}>Accède à ton dashboard de bons plans</p>

        {/* Message d'erreur */}
        {error && <div className={styles.error}>{error}</div>}

        {/* Formulaire */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={styles.input}
              placeholder="ton@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Mot de passe</label>
            <input
              type="password"
              className={styles.input}
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className={styles.btn}
            disabled={loading}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <p className={styles.footer}>
          Pas encore de compte ?{' '}
          <Link to="/register" className={styles.link}>Créer un compte</Link>
        </p>

      </div>
    </div>
  )
}

export default Login
