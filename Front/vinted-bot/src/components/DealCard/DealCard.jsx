// src/components/DealCard/DealCard.jsx
// Carte qui affiche un bon plan détecté par le bot.
// C'est l'équivalent de AnimeCard dans ton projet Animeka.

import { useBot } from '../../context/BotContext'
import { getDiscount } from '../../data/deals'
import styles from './DealCard.module.css'

function DealCard({ deal, onAnalyze }) {
  const { isSaved, toggleSaved } = useBot()
  const saved = isSaved(deal.id)
  const discount = getDiscount(deal.price, deal.originalPrice)

  // Le score détermine la couleur du badge (rouge si très bon, vert si bon)
  function getScoreClass() {
    if (deal.score >= 90) return styles.scoreHot
    if (deal.score >= 75) return styles.scoreGood
    return styles.scoreOk
  }

  function handleSave(e) {
    e.preventDefault()
    toggleSaved(deal.id)
  }

  return (
    <div className={styles.card}>
      {/* Image */}
      <div className={styles.imageWrapper}>
        <img src={deal.image} alt={deal.name} className={styles.image} />
        <div className={styles.overlay} />

        {/* Bouton sauvegarder */}
        <button
          className={`${styles.saveBtn} ${saved ? styles.saveActive : ''}`}
          onClick={handleSave}
          aria-label={saved ? 'Retirer' : 'Sauvegarder'}
        >
          {saved ? '★' : '☆'}
        </button>

        {/* Badge réduction */}
        <span className={styles.discount}>−{discount}%</span>

        {/* Score du bot */}
        <div className={`${styles.score} ${getScoreClass()}`}>
          {deal.score}/100
        </div>
      </div>

      {/* Contenu */}
      <div className={styles.body}>
        <p className={styles.brand}>{deal.brand}</p>
        <h3 className={styles.name}>{deal.name}</h3>

        {/* Prix */}
        <div className={styles.prices}>
          <span className={styles.currentPrice}>{deal.price} €</span>
          <span className={styles.originalPrice}>{deal.originalPrice} €</span>
          <span className={styles.saving}>−{deal.price - deal.originalPrice < 0 ? Math.abs(deal.originalPrice - deal.price) : 0} €</span>
        </div>

        {/* Infos */}
        <div className={styles.meta}>
          <span>{deal.condition}</span>
          <span className={styles.dot}>·</span>
          <span>{deal.city}</span>
          {deal.size && (
            <>
              <span className={styles.dot}>·</span>
              <span>T.{deal.size}</span>
            </>
          )}
        </div>

        {/* Boutons */}
        <div className={styles.actions}>
          <a href={deal.url} className={styles.btnVinted} target="_blank" rel="noreferrer">
            Voir sur Vinted
          </a>
          {/* Ce bouton appelle la fonction onAnalyze passée par le parent */}
          <button className={styles.btnAI} onClick={() => onAnalyze(deal)}>
            Analyser IA
          </button>
        </div>
      </div>
    </div>
  )
}

export default DealCard
