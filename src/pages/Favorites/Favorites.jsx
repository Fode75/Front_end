import { useFavorites } from '../../context/FavoritesContext'
import { animes } from '../../data/animes'
import { Link } from 'react-router-dom'
import AnimeCard from '../../components/AnimeCard/AnimeCard'
import styles from './Favorites.module.css'

function Favorites() {
  const { favorites } = useFavorites()
  const favAnimes = animes.filter(a => favorites.includes(a.id))

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Ma liste</h1>
        <p className={styles.subtitle}>
          {favAnimes.length > 0
            ? `${favAnimes.length} anime${favAnimes.length > 1 ? 's' : ''} sauvegardé${favAnimes.length > 1 ? 's' : ''}`
            : 'Aucun anime sauvegardé'}
        </p>
      </div>

      {favAnimes.length > 0 ? (
        <div className={styles.grid}>
          {favAnimes.map(anime => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p className={styles.emptyKanji}>空</p>
          <h2 className={styles.emptyTitle}>Votre liste est vide</h2>
          <p className={styles.emptyText}>
            Explorez le catalogue et cliquez sur ★ pour ajouter des animes à votre liste.
          </p>
          <Link to="/catalogue" className={styles.cta}>
            Explorer le catalogue
          </Link>
        </div>
      )}
    </div>
  )
}

export default Favorites
