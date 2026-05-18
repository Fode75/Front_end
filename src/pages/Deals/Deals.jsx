// src/pages/Deals/Deals.jsx
// Page qui liste tous les bons plans détectés.
// C'est l'équivalent du Catalogue dans Animeka.

import { useState, useEffect } from 'react'
import { deals, CATEGORIES, getDiscount } from '../../data/deals'
import DealCard from '../../components/DealCard/DealCard'
import SearchBar from '../../components/SearchBar/SearchBar'
import Badge from '../../components/Badge/Badge'
import styles from './Deals.module.css'

// Options de tri
const SORTS = [
  { label: 'Meilleur score', value: 'score' },
  { label: 'Prix croissant', value: 'price_asc' },
  { label: 'Prix décroissant', value: 'price_desc' },
  { label: 'Réduction max', value: 'discount' },
]

function Deals() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Tous')
  const [sort, setSort] = useState('score')
  const [filtered, setFiltered] = useState(deals)

  // aiPanel : pour afficher l'analyse IA en bas de page
  const [aiDeal, setAiDeal] = useState(null)
  const [aiResponse, setAiResponse] = useState('')
  const [aiLoading, setAiLoading] = useState(false)

  // Recalcule la liste filtrée à chaque changement
  useEffect(() => {
    let result = [...deals]

    // Filtre par recherche texte
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.brand.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        d.city.toLowerCase().includes(q)
      )
    }

    // Filtre par catégorie
    if (category !== 'Tous') {
      result = result.filter(d => d.category === category)
    }

    // Tri
    if (sort === 'score') result.sort((a, b) => b.score - a.score)
    else if (sort === 'price_asc') result.sort((a, b) => a.price - b.price)
    else if (sort === 'price_desc') result.sort((a, b) => b.price - a.price)
    else if (sort === 'discount') result.sort((a, b) => getDiscount(b.price, b.originalPrice) - getDiscount(a.price, a.originalPrice))

    setFiltered(result)
  }, [search, category, sort])

  // Analyse IA d'un deal
  async function handleAnalyze(deal) {
    setAiDeal(deal)
    setAiLoading(true)
    setAiResponse('')

    // Scroll vers le panel IA
    setTimeout(() => {
      document.getElementById('ai-panel')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_ANTHROPIC_KEY || '',
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: "Tu es un expert en bonnes affaires sur Vinted. Analyse en 3-4 phrases. Verdict clair : acheter ou passer. En français.",
          messages: [{
            role: 'user',
            content: `Analyse : "${deal.name}" (${deal.brand}) à ${deal.price}€ au lieu de ${deal.originalPrice}€ (−${getDiscount(deal.price, deal.originalPrice)}%). État : ${deal.condition}. Score bot : ${deal.score}/100. Bonne affaire ?`
          }],
        }),
      })
      const data = await response.json()
      setAiResponse(data.content?.map(b => b.text || '').join('') || 'Pas de réponse.')
    } catch {
      setAiResponse('Erreur de connexion. Vérifie ta clé API.')
    }

    setAiLoading(false)
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Bons plans</h1>
        <p className={styles.subtitle}>
          {filtered.length} article{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Barre d'outils : recherche + tri + filtres */}
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

        {/* Filtres par catégorie */}
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Catégorie :</span>
          <div className={styles.filterBadges}>
            {CATEGORIES.map(cat => (
              <Badge key={cat} label={cat} active={category === cat} onClick={() => setCategory(cat)} />
            ))}
          </div>
        </div>
      </div>

      {/* Grille de deals */}
      {filtered.length > 0 ? (
        <div className={styles.grid}>
          {filtered.map(deal => (
            <DealCard key={deal.id} deal={deal} onAnalyze={handleAnalyze} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p className={styles.emptyIcon}>🔍</p>
          <h2 className={styles.emptyTitle}>Aucun résultat</h2>
          <p className={styles.emptyText}>Essaie de modifier tes filtres.</p>
          <button
            className={styles.resetBtn}
            onClick={() => { setSearch(''); setCategory('Tous') }}
          >
            Réinitialiser
          </button>
        </div>
      )}

      {/* Panel IA (s'affiche quand on clique sur "Analyser IA") */}
      {aiDeal && (
        <div id="ai-panel" className={styles.aiPanel}>
          <div className={styles.aiHeader}>
            ✨ Analyse IA — {aiDeal.name}
          </div>
          <div className={styles.aiBody}>
            {aiLoading ? (
              <p className={styles.aiLoading}>Analyse en cours...</p>
            ) : (
              <p>{aiResponse}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Deals
