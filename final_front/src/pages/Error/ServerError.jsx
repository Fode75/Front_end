// src/pages/Error/ServerError.jsx
// Page 500 — s'affiche quand le serveur ne répond pas
import { Link } from 'react-router-dom'
import styles from './ServerError.module.css'

function ServerError() {
  return (
    <div className={styles.page}>
      <p className={styles.code}>500</p>
      <h1 className={styles.title}>Erreur serveur</h1>
      <p className={styles.text}>Le serveur ne répond pas. Réessaie dans quelques instants.</p>
      <Link to="/" className={styles.btn}>Retour au Dashboard</Link>
    </div>
  )
}

export default ServerError
