import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { animes } from '../../data/animes'
import AnimeCard from '../../components/AnimeCard/AnimeCard'
import styles from './Home.module.css'

function Home() {
  const [topAnimes, setTopAnimes] = useState([])

  useEffect(() => {
    const sorted = [...animes].sort((a, b) => b.score - a.score).slice(0, 3)
    setTopAnimes(sorted)
  }, [])

  const featured = animes[0]

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero} style={{ backgroundImage: `url(${featured.banner})` }}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>★ Score {featured.score} · {featured.year}</p>
          <h1 className={styles.heroTitle}>{featured.title}</h1>
          <p className={styles.heroTitleJP}>{featured.titleJP}</p>
          <p className={styles.heroSynopsis}>{featured.synopsis.slice(0, 160)}...</p>
          <div className={styles.heroActions}>
            <Link to={`/anime/${featured.id}`} className={styles.heroCta}>
              Voir la fiche
            </Link>
            <Link to="/catalogue" className={styles.heroSecondary}>
              Tout le catalogue →
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statNum}>{animes.length}</span>
          <span className={styles.statLabel}>Animes</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statNum}>{animes.filter(a => a.status === 'En cours').length}</span>
          <span className={styles.statLabel}>En cours</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statNum}>{Math.max(...animes.map(a => a.score)).toFixed(1)}</span>
          <span className={styles.statLabel}>Meilleure note</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statNum}>{animes.reduce((acc, a) => acc + a.episodes, 0)}+</span>
          <span className={styles.statLabel}>Épisodes</span>
        </div>
      </section>

      {/* Top animes */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Top animes</h2>
          <Link to="/catalogue" className={styles.seeAll}>Voir tout →</Link>
        </div>
        <div className={styles.grid}>
          {topAnimes.map(anime => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      </section>

      {/* Genres */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Par genre</h2>
        <div className={styles.genreGrid}>
          {['Action', 'Aventure', 'Thriller', 'Sci-Fi'].map(genre => (
            <Link key={genre} to={`/catalogue?genre=${genre}`} className={styles.genreCard}>
              <span className={styles.genreIcon}>
                {genre === 'Action' ? '⚔️' : genre === 'Aventure' ? '🗺️' : genre === 'Thriller' ? '🎭' : '🚀'}
              </span>
              <span className={styles.genreName}>{genre}</span>
              <span className={styles.genreCount}>
                {animes.filter(a => a.genre === genre).length} anime{animes.filter(a => a.genre === genre).length > 1 ? 's' : ''}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
