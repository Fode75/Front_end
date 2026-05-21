// src/components/Navbar/Navbar.jsx

import { NavLink, useNavigate } from 'react-router-dom'
import { useBot } from '../../context/BotContext'
import { useAuth } from '../../context/AuthContext'
import styles from './Navbar.module.css'

function Navbar() {
  const { savedDeals, botActive } = useBot()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        
        {/* Logo */}
        <NavLink to="/" className={styles.logo}>
          <span className={styles.logoAccent}>⚡</span>
          VINTED<span className={styles.logoLight}>BOT</span>
        </NavLink>

        {/* Navigation */}
        <ul className={styles.links}>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? `${styles.link} ${styles.active}`
                  : styles.link
              }
            >
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/bons-plans"
              className={({ isActive }) =>
                isActive
                  ? `${styles.link} ${styles.active}`
                  : styles.link
              }
            >
              Bons plans

              {savedDeals.length > 0 && (
                <span className={styles.badge}>
                  {savedDeals.length}
                </span>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/recherches"
              className={({ isActive }) =>
                isActive
                  ? `${styles.link} ${styles.active}`
                  : styles.link
              }
            >
              Recherches
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/parametres"
              className={({ isActive }) =>
                isActive
                  ? `${styles.link} ${styles.active}`
                  : styles.link
              }
            >
              Paramètres
            </NavLink>
          </li>
        </ul>

        {/* Partie droite */}
        <div className={styles.right}>

          {/* Statut du bot */}
          <div
            className={`${styles.status} ${
              botActive
                ? styles.statusActive
                : styles.statusOff
            }`}
          >
            <span className={styles.statusDot} />

            {botActive
              ? 'Bot actif'
              : 'Bot arrêté'}
          </div>

          {/* SI connecté */}
          {user ? (
            <>
              <span className={styles.userEmail}>
                {user.email}
              </span>

              <button
                className={styles.logoutBtn}
                onClick={handleLogout}
              >
                Déconnexion
              </button>
            </>
          ) : (
            /* SI pas connecté */
            <NavLink
              to="/login"
              className={styles.loginBtn}
            >
              Connexion
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar