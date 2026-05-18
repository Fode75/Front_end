// src/components/Navbar/Navbar.jsx
// La barre de navigation en haut de toutes les pages.
// Très similaire à ton Navbar Animeka, juste les liens changent.

import { NavLink } from 'react-router-dom'
import { useBot } from '../../context/BotContext'
import styles from './Navbar.module.css'

function Navbar() {
  const { savedDeals, botActive } = useBot()

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {/* Logo */}
        <NavLink to="/" className={styles.logo}>
          <span className={styles.logoAccent}>⚡</span>
          VINTED<span className={styles.logoLight}>BOT</span>
        </NavLink>

        {/* Liens de navigation */}
        <ul className={styles.links}>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/bons-plans"
              className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
            >
              Bons plans
              {/* Badge rouge avec le nombre de deals sauvegardés */}
              {savedDeals.length > 0 && (
                <span className={styles.badge}>{savedDeals.length}</span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/recherches"
              className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
            >
              Recherches
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/parametres"
              className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
            >
              Paramètres
            </NavLink>
          </li>
        </ul>

        {/* Indicateur de statut du bot */}
        <div className={`${styles.status} ${botActive ? styles.statusActive : styles.statusOff}`}>
          <span className={styles.statusDot} />
          {botActive ? 'Bot actif' : 'Bot arrêté'}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
