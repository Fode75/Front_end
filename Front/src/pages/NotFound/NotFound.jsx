import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'

function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <p className={styles.kanji}>迷</p>
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>Page introuvable</h1>
        <p className={styles.text}>
          Cette page n'existe pas ou a été déplacée dans une autre dimension.
        </p>
        <div className={styles.actions}>
          <Link to="/" className={styles.primary}>Retour à l'accueil</Link>
          <Link to="/catalogue" className={styles.secondary}>Voir le catalogue</Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
