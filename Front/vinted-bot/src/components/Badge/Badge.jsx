// src/components/Badge/Badge.jsx
// Petit badge cliquable pour les filtres. Identique à ton Badge Animeka.

import styles from './Badge.module.css'

function Badge({ label, active, onClick }) {
  return (
    <span
      className={`${styles.badge} ${active ? styles.active : ''} ${onClick ? styles.clickable : ''}`}
      onClick={onClick}
    >
      {label}
    </span>
  )
}

export default Badge
