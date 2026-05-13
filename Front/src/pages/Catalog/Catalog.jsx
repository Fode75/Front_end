import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { animes } from '../../data/animes'
import AnimeCard from '../../components/AnimeCard/AnimeCard'
import SearchBar from '../../components/SearchBar/SearchBar'
import Badge from '../../components/Badge/Badge'
import styles from './Catalog.module.css'

const GENRES = ['Tous', 'Action', 'Aventure', 'Thriller', 'Sci-Fi']
const STATUSES = ['Tous', 'En cours', 'Terminé', 'En pause']
const SORTS = [
  { label: 'Mieux notés', value: 'score' },
  { label: 'Plus récents', value: 'year' },
  { label: 'A → Z', value: 'alpha' },
]

function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState(searchParams.get('genre') || 'Tous')
  const [status, setStatus] = useState('Tous')
  const [sort, setSort] = useState('score')
  const [filtered, setFiltered] = useState(animes)

  useEffect(() => {
    let result = [...animes]

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.titleJP.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q)) ||
        a.studio.toLowerCase().includes(q)
      )
    }

    if (genre !== 'Tous') result = result.filter(a => a.genre === genre)
    if (status !== 'Tous') result = result.filter(a => a.status === status)

    if (sort === 'score') result.sort((a, b) => b.score - a.score)
    else if (sort === 'year') result.sort((a, b) => b.year - a.year)
    else if (sort === 'alpha') result.sort((a, b) => a.title.localeCompare(b.title))

    setFiltered(result)
  }, [search, genre, status, sort])

  function handleGenre(g) {
    setGenre(g)
    if (g !== 'Tous') setSearchParams({ genre: g })
    else setSearchParams({})
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Catalogue</h1>
        <p className={styles.subtitle}>
          {filtered.length} anime{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}
        </p>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.toolbarTop}>
          <SearchBar value={search} onChange={setSearch} />
          <div className={styles.sortWrapper}>
            <label className={styles.sortLabel}>Trier par</label>
            <select
              className={styles.select}
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              {SORTS.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Genre :</span>
            <div className={styles.filterBadges}>
              {GENRES.map(g => (
                <Badge key={g} label={g} active={genre === g} onClick={() => handleGenre(g)} />
              ))}
            </div>
          </div>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Statut :</span>
            <div className={styles.filterBadges}>
              {STATUSES.map(s => (
                <Badge key={s} label={s} active={status === s} onClick={() => setStatus(s)} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className={styles.grid}>
          {filtered.map(anime => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>(╯°□°）╯</span>
          <p className={styles.emptyTitle}>Aucun anime trouvé</p>
          <p className={styles.emptyText}>Essayez de modifier vos filtres.</p>
          <button
            className={styles.resetBtn}
            onClick={() => { setSearch(''); setGenre('Tous'); setStatus('Tous'); setSearchParams({}) }}
          >
            Réinitialiser
          </button>
        </div>
      )}
    </div>
  )
}

export default Catalog
