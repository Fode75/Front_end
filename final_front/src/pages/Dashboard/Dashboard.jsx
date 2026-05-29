// src/pages/Dashboard/Dashboard.jsx
// Page d'accueil : stats du bot + alertes récentes + panel IA.
// C'est l'équivalent de la page Home dans Animeka.

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { deals, getDiscount } from '../../data/deals'
import { useBot } from '../../context/BotContext'
import styles from './Dashboard.module.css'

// Clé API Anthropic — à mettre dans un fichier .env en vrai projet !
const API_KEY = import.meta.env.VITE_ANTHROPIC_KEY || ''

function Dashboard() {
  const { botActive, setBotActive } = useBot()

  // État du panel IA
  const [aiMessage, setAiMessage] = useState('')
  const [aiResponse, setAiResponse] = useState('Clique sur "Analyser IA" sur une alerte, ou pose une question ci-dessous.')
  const [aiLoading, setAiLoading] = useState(false)

  // Les 3 alertes les plus récentes = les 3 premiers deals
  const recentAlerts = deals.slice(0, 3)

  // Statistiques calculées depuis les données
  const totalScanned = 4821
  const todayDeals = deals.length
  const avgDiscount = Math.round(deals.reduce((acc, d) => acc + getDiscount(d.price, d.originalPrice), 0) / deals.length)

  // Appel à l'API Claude
  async function askClaude(prompt) {
    setAiLoading(true)
    setAiResponse('')
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: "Tu es un expert en bonnes affaires sur Vinted et en revente. Analyse les annonces en 3-4 phrases max. Donne un verdict clair : acheter ou passer. Réponds en français.",
          messages: [{ role: 'user', content: prompt }],
        }),
      })
      const data = await response.json()
      const text = data.content?.map(b => b.text || '').join('') || 'Pas de réponse.'
      setAiResponse(text)
    } catch (err) {
      setAiResponse('Erreur de connexion. Vérifie ta clé API dans le fichier .env')
    }
    setAiLoading(false)
  }

  function handleAnalyze(deal) {
    askClaude(`Analyse cette annonce Vinted : "${deal.name}" de la marque ${deal.brand}, vendu ${deal.price}€ (prix neuf ~${deal.originalPrice}€, soit −${getDiscount(deal.price, deal.originalPrice)}%). État : ${deal.condition}. Score bot : ${deal.score}/100. Est-ce une bonne affaire ?`)
  }

  function handleAsk() {
    if (!aiMessage.trim()) return
    askClaude(aiMessage)
    setAiMessage('')
  }

  return (
    <div className={styles.page}>

      {/* Stats */}
      <section className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statNum}>{totalScanned.toLocaleString()}</span>
          <span className={styles.statLabel}>Annonces scannées</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statNum} style={{ color: 'var(--color-accent)' }}>{todayDeals}</span>
          <span className={styles.statLabel}>Bons plans détectés</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statNum} style={{ color: 'var(--color-green)' }}>{avgDiscount}%</span>
          <span className={styles.statLabel}>Réduction moyenne</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          {/* Bouton pour activer/désactiver le bot */}
          <button
            className={`${styles.botToggle} ${botActive ? styles.botOn : styles.botOff}`}
            onClick={() => setBotActive(!botActive)}
          >
            {botActive ? '⏸ Arrêter' : '▶ Démarrer'}
          </button>
          <span className={styles.statLabel}>Statut du bot</span>
        </div>
      </section>

      {/* Alertes récentes */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Alertes récentes</h2>
          <Link to="/bons-plans" className={styles.seeAll}>Voir tout →</Link>
        </div>

        <div className={styles.alertsList}>
          {recentAlerts.map(deal => (
            <div key={deal.id} className={styles.alertCard}>
              {/* Emoji de la catégorie */}
              <div className={styles.alertThumb}>{deal.emoji}</div>

              <div className={styles.alertInfo}>
                <p className={styles.alertName}>{deal.name}</p>
                <p className={styles.alertMeta}>{deal.condition} · {deal.city}</p>
                {/* Badge de score */}
                <span className={`${styles.scoreBadge} ${deal.score >= 90 ? styles.scoreHot : styles.scoreGood}`}>
                  {deal.score >= 90 ? '🔥' : '✓'} Score {deal.score}/100
                </span>
              </div>

              <div className={styles.alertRight}>
                <p className={styles.alertPrice}>{deal.price} €</p>
                <p className={styles.alertDiscount}>−{getDiscount(deal.price, deal.originalPrice)}% vs neuf</p>
                <button className={styles.btnAnalyze} onClick={() => handleAnalyze(deal)}>
                  Analyser IA ↗
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Panel IA */}
      <section className={styles.aiPanel}>
        <div className={styles.aiHeader}>
          ✨ Analyse IA — Claude
        </div>

        <div className={styles.aiBody}>
          {aiLoading ? (
            <div className={styles.loading}>
              <span /><span /><span />
              <p>Analyse en cours...</p>
            </div>
          ) : (
            <p>{aiResponse}</p>
          )}
        </div>

        {/* Input pour poser une question */}
        <div className={styles.aiInput}>
          <input
            type="text"
            placeholder="Ex: Quel est le meilleur prix pour des Jordan 1 ?"
            value={aiMessage}
            onChange={e => setAiMessage(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAsk()}
          />
          <button onClick={handleAsk}>Envoyer</button>
        </div>
      </section>

    </div>
  )
}

export default Dashboard
