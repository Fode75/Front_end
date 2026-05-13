import { Link } from 'react-router-dom'
import { useFavorites } from '../../context/FavoritesContext'
import Badge from '../Badge/Badge'
import styles from './AnimeCard.module.css'

function AnimeCard({ anime }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const fav = isFavorite(anime.id)

  function handleFavorite(e) {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(anime.id)
  }

  const statusColor = {
    'Terminé': styles.statusDone,
    'En cours': styles.statusOngoing,
    'En pause': styles.statusPaused,
  }

  return (
    <Link to={`/anime/${anime.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={anime.image} alt={anime.title} className={styles.image} />
        <div className={styles.overlay} />
        <button
          className={`${styles.favBtn} ${fav ? styles.favActive : ''}`}
          onClick={handleFavorite}
          aria-label={fav ? 'Retirer de ma liste' : 'Ajouter à ma liste'}
        >
          {fav ? '★' : '☆'}
        </button>
        <span className={`${styles.status} ${statusColor[anime.status] || ''}`}>
          {anime.status}
        </span>
        <div className={styles.score}>
          <span className={styles.scoreStar}>★</span>
          {anime.score.toFixed(1)}
        </div>
      </div>

      <div className={styles.body}>
        <p className={styles.titleJP}>{anime.titleJP}</p>
        <h3 className={styles.title}>{anime.title}</h3>

        <div className={styles.tags}>
          {anime.tags.slice(0, 2).map(tag => (
            <Badge key={tag} label={tag} />
          ))}
        </div>

        <div className={styles.meta}>
          <span>{anime.year}</span>
          <span className={styles.dot}>·</span>
          <span>{anime.episodes} éps.</span>
          <span className={styles.dot}>·</span>
          <span>{anime.studio}</span>
        </div>
      </div>
    </Link>
  )
}

export default AnimeCard
