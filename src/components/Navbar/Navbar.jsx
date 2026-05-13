import { NavLink } from 'react-router-dom'
import { useFavorites } from '../../context/FavoritesContext'
import styles from './Navbar.module.css'

function Navbar() {
  const { favorites } = useFavorites()

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink to="/" className={styles.logo}>
          <span className={styles.logoAccent}>ア</span>
          ANIMEKA
        </NavLink>

        <ul className={styles.links}>
          <li>
            <NavLink to="/" end className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink to="/catalogue" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
              Catalogue
            </NavLink>
          </li>
          <li>
            <NavLink to="/favoris" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
              Ma liste
              {favorites.length > 0 && (
                <span className={styles.badge}>{favorites.length}</span>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
