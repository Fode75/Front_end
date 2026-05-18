// src/components/SearchBar/SearchBar.jsx
// Barre de recherche. Identique à l'Animeka, juste le placeholder change.

import styles from './SearchBar.module.css'

function SearchBar({ value, onChange, placeholder = 'Rechercher un article...' }) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.icon}>🔍</span>
      <input
        type="text"
        className={styles.input}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <button className={styles.clear} onClick={() => onChange('')}>✕</button>
      )}
    </div>
  )
}

export default SearchBar
