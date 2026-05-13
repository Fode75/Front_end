import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { animes } from '../../data/animes'
import { useFavorites } from '../../context/FavoritesContext'
import Badge from '../../components/Badge/Badge'
import AnimeCard from '../../components/AnimeCard/AnimeCard'
import styles from './AnimeDetail.module.css'

function AnimeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isFavorite, toggleFavorite } = useFavorites()
  const [anime, setAnime] = useState(null)
  const [related, setRelated] = useState([])

  useEffect(() => {
    const found = animes.find(a => a.id === parseInt(id))
    if (!found) {
      navigate('/404')
      return
    }
    setAnime(found)
    setRelated(animes.filter(a => a.id !== found.id && a.genre === found.genre).slice(0, 3))
    window.scrollTo(0, 0)
  }, [id, navigate])

  if (!anime) return null

  const fav = isFavorite(anime.id)

  const statusClass = {
    'Terminé': styles.statusDone,
    'En cours': styles.statusOngoing,
    'En pause': styles.statusPaused,
  }

  return (
    <div className={styles.page}>
      {/* Banner */}
      <div className={styles.banner} style={{ backgroundImage: `url(${anime.banner})` }}>
        <div className={styles.bannerOverlay} />
        <div className={styles.bannerContent}>
          <nav className={styles.breadcrumb}>
            <Link to="/">Accueil</Link>
            <span>›</span>
            <Link to="/catalogue">Catalogue</Link>
            <span>›</span>
            <span>{anime.title}</span>
          </nav>
          <div className={styles.bannerMeta}>
            <span className={`${styles.statusBadge} ${statusClass[anime.status] || ''}`}>
              {anime.status}
            </span>
            {anime.tags.map(tag => <Badge key={tag} label={tag} />)}
          </div>
          <h1 className={styles.title}>{anime.title}</h1>
          <p className={styles.titleJP}>{anime.titleJP}</p>
        </div>
      </div>

      {/* Main content */}
      <div className={styles.content}>
        {/* Info sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.scoreBox}>
            <span className={styles.scoreStar}>★</span>
            <span className={styles.scoreVal}>{anime.score.toFixed(1)}</span>
            <span className={styles.scoreLabel}>/ 10</span>
          </div>

          <button
            className={`${styles.favBtn} ${fav ? styles.favActive : ''}`}
            onClick={() => toggleFavorite(anime.id)}
          >
            {fav ? '★ Dans ma liste' : '☆ Ajouter à ma liste'}
          </button>

          <div className={styles.infoTable}>
            <div className={styles.infoRow}>
              <span className={styles.infoKey}>Studio</span>
              <span className={styles.infoVal}>{anime.studio}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoKey}>Année</span>
              <span className={styles.infoVal}>{anime.year}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoKey}>Épisodes</span>
              <span className={styles.infoVal}>{anime.episodes}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoKey}>Genre</span>
              <span className={styles.infoVal}>{anime.genre}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoKey}>Statut</span>
              <span className={styles.infoVal}>{anime.status}</span>
            </div>
          </div>
        </aside>

        {/* Synopsis */}
        <div className={styles.main}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Synopsis</h2>
            <p className={styles.synopsis}>{anime.synopsis}</p>
          </section>

          {related.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Du même genre</h2>
              <div className={styles.relatedGrid}>
                {related.map(a => (
                  <AnimeCard key={a.id} anime={a} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <div className={styles.back}>
        <Link to="/catalogue" className={styles.backLink}>← Retour au catalogue</Link>
      </div>
    </div>
  )
}

export default AnimeDetail
