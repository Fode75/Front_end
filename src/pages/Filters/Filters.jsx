// src/pages/Filters/Filters.jsx
// Page pour gérer les recherches sauvegardées du bot.
// Les données sont stockées dans le state React (plus tard dans une API/BDD).

import { useState } from 'react'
import styles from './Filters.module.css'

// Données initiales : tes filtres de départ
const defaultFilters = [
  {
    id: 1,
    name: '👟 Sneakers',
    active: true,
    brands: 'Nike, Adidas, New Balance',
    budget: 150,
    discount: 50,
    condition: 'Bon / Très bon état',
    keywords: ['Jordan 1', 'Forum Low', 'Gazelle'],
    sizes: ['42', '43'],
  },
  {
    id: 2,
    name: '👜 Maroquinerie',
    active: true,
    brands: 'Jacquemus, Totême',
    budget: 200,
    discount: 40,
    condition: 'Neuf / Très bon état',
    keywords: ['Le Bambino', 'Le Chiquito'],
    sizes: [],
  },
  {
    id: 3,
    name: '🎮 High-tech',
    active: false,
    brands: 'Sony, Apple',
    budget: 400,
    discount: 35,
    condition: 'Bon état minimum',
    keywords: ['PS5', 'AirPods Pro'],
    sizes: [],
  },
  {
    id: 4,
    name: '🧥 Vêtements',
    active: true,
    brands: 'The North Face, Carhartt',
    budget: 120,
    discount: 55,
    condition: 'Bon état',
    keywords: ['Manteau', 'Veste'],
    sizes: ['M', 'L'],
  },
]

function Filters() {
  const [filters, setFilters] = useState(defaultFilters)
  const [showForm, setShowForm] = useState(false)

  // Active ou désactive un filtre
  function toggleFilter(id) {
    setFilters(prev =>
      prev.map(f => f.id === id ? { ...f, active: !f.active } : f)
    )
  }

  // Supprime un filtre
  function deleteFilter(id) {
    setFilters(prev => prev.filter(f => f.id !== id))
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Recherches sauvegardées</h1>
        <p className={styles.subtitle}>
          {filters.filter(f => f.active).length} actives · {filters.length} au total
        </p>
      </div>

      <div className={styles.grid}>
        {filters.map(filter => (
          <div key={filter.id} className={`${styles.card} ${!filter.active ? styles.cardInactive : ''}`}>

            {/* En-tête de la carte */}
            <div className={styles.cardHeader}>
              <h2 className={styles.filterName}>{filter.name}</h2>

              {/* Toggle on/off */}
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={filter.active}
                  onChange={() => toggleFilter(filter.id)}
                />
                <span className={styles.toggleSlider} />
              </label>
            </div>

            {/* Critères */}
            <div className={styles.rows}>
              <div className={styles.row}>
                <span className={styles.rowLabel}>Marques</span>
                <span className={styles.rowVal}>{filter.brands}</span>
              </div>
              <div className={styles.row}>
                <span className={styles.rowLabel}>Budget max</span>
                <span className={styles.rowVal}>{filter.budget} €</span>
              </div>
              <div className={styles.row}>
                <span className={styles.rowLabel}>Réduction min.</span>
                <span className={styles.rowVal}>{filter.discount}%</span>
              </div>
              <div className={styles.row}>
                <span className={styles.rowLabel}>État</span>
                <span className={styles.rowVal}>{filter.condition}</span>
              </div>
            </div>

            {/* Mots-clés */}
            {filter.keywords.length > 0 && (
              <div className={styles.tags}>
                {filter.keywords.map(kw => (
                  <span key={kw} className={styles.tag}>{kw}</span>
                ))}
                {filter.sizes.map(s => (
                  <span key={s} className={`${styles.tag} ${styles.tagSize}`}>T.{s}</span>
                ))}
              </div>
            )}

            {/* Bouton supprimer */}
            <button className={styles.deleteBtn} onClick={() => deleteFilter(filter.id)}>
              Supprimer
            </button>
          </div>
        ))}
      </div>

      {/* Bouton ajouter un filtre */}
      <button className={styles.addBtn} onClick={() => setShowForm(!showForm)}>
        + Nouvelle recherche
      </button>

      {/* Formulaire simplifié (apparaît quand on clique) */}
      {showForm && (
        <div className={styles.form}>
          <h2 className={styles.formTitle}>Nouvelle recherche</h2>
          <p className={styles.formInfo}>
            Cette fonctionnalité sera connectée à ton API backend.
            Pour l'instant, ajoute tes critères directement dans <code>src/data/deals.js</code>.
          </p>
          <button className={styles.formClose} onClick={() => setShowForm(false)}>
            Fermer
          </button>
        </div>
      )}
    </div>
  )
}

export default Filters
