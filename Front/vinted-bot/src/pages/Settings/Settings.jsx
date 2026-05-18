// src/pages/Settings/Settings.jsx
// Page de configuration du bot.

import { useState } from 'react'
import { useBot } from '../../context/BotContext'
import styles from './Settings.module.css'

function Settings() {
  const { botActive, setBotActive } = useBot()

  // Paramètres du bot — plus tard ces valeurs iront dans ton API
  const [settings, setSettings] = useState({
    minDiscount: 40,
    minScore: 70,
    scanInterval: 5,
    telegram: true,
    discord: false,
    email: true,
    apiEndpoint: 'https://mon-api.fr/vinted',
    excludedWords: 'replica, fake, cassé, défaut',
    franceOnly: true,
  })

  // Met à jour un champ de settings
  function update(key, value) {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  function handleSave() {
    // Plus tard : faire un fetch() vers ton API pour sauvegarder
    alert('Paramètres sauvegardés ! (connecte ton API pour persister)')
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Paramètres</h1>
        <button className={styles.saveBtn} onClick={handleSave}>
          Sauvegarder
        </button>
      </div>

      <div className={styles.grid}>

        {/* Seuils de détection */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Seuils de détection</h2>

          <div className={styles.row}>
            <div>
              <p className={styles.rowLabel}>Réduction minimale</p>
              <p className={styles.rowDesc}>% de réduction pour déclencher une alerte</p>
            </div>
            <div className={styles.inputGroup}>
              <input
                type="number"
                className={styles.input}
                value={settings.minDiscount}
                min={0} max={100}
                onChange={e => update('minDiscount', Number(e.target.value))}
              />
              <span className={styles.inputUnit}>%</span>
            </div>
          </div>

          <div className={styles.row}>
            <div>
              <p className={styles.rowLabel}>Score minimum</p>
              <p className={styles.rowDesc}>Score IA minimum (0-100)</p>
            </div>
            <div className={styles.inputGroup}>
              <input
                type="number"
                className={styles.input}
                value={settings.minScore}
                min={0} max={100}
                onChange={e => update('minScore', Number(e.target.value))}
              />
              <span className={styles.inputUnit}>/100</span>
            </div>
          </div>

          <div className={styles.row}>
            <div>
              <p className={styles.rowLabel}>Fréquence de scan</p>
              <p className={styles.rowDesc}>Le bot scanne Vinted toutes les N minutes</p>
            </div>
            <div className={styles.inputGroup}>
              <input
                type="number"
                className={styles.input}
                value={settings.scanInterval}
                min={1}
                onChange={e => update('scanInterval', Number(e.target.value))}
              />
              <span className={styles.inputUnit}>min</span>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Notifications</h2>

          <div className={styles.row}>
            <div>
              <p className={styles.rowLabel}>Telegram</p>
              <p className={styles.rowDesc}>Reçois les alertes via ton bot Telegram</p>
            </div>
            <label className={styles.toggle}>
              <input type="checkbox" checked={settings.telegram} onChange={e => update('telegram', e.target.checked)} />
              <span className={styles.toggleSlider} />
            </label>
          </div>

          <div className={styles.row}>
            <div>
              <p className={styles.rowLabel}>Discord</p>
              <p className={styles.rowDesc}>Webhook vers ton serveur Discord</p>
            </div>
            <label className={styles.toggle}>
              <input type="checkbox" checked={settings.discord} onChange={e => update('discord', e.target.checked)} />
              <span className={styles.toggleSlider} />
            </label>
          </div>

          <div className={styles.row}>
            <div>
              <p className={styles.rowLabel}>Email</p>
              <p className={styles.rowDesc}>Résumé quotidien par email</p>
            </div>
            <label className={styles.toggle}>
              <input type="checkbox" checked={settings.email} onChange={e => update('email', e.target.checked)} />
              <span className={styles.toggleSlider} />
            </label>
          </div>
        </div>

        {/* API Backend */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>API Backend</h2>

          <div className={styles.rowVertical}>
            <p className={styles.rowLabel}>URL de ton API</p>
            <p className={styles.rowDesc}>L'adresse de ton serveur backend</p>
            <input
              type="text"
              className={styles.inputFull}
              value={settings.apiEndpoint}
              onChange={e => update('apiEndpoint', e.target.value)}
            />
          </div>

          <div className={styles.row} style={{ marginTop: '1rem' }}>
            <div>
              <p className={styles.rowLabel}>Statut de connexion</p>
            </div>
            <span className={styles.statusConnected}>● Connectée</span>
          </div>
        </div>

        {/* Filtres d'exclusion */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Exclusions</h2>

          <div className={styles.rowVertical}>
            <p className={styles.rowLabel}>Mots-clés à exclure</p>
            <p className={styles.rowDesc}>Sépare les mots par des virgules</p>
            <input
              type="text"
              className={styles.inputFull}
              value={settings.excludedWords}
              onChange={e => update('excludedWords', e.target.value)}
              placeholder="replica, fake, cassé..."
            />
          </div>

          <div className={styles.row} style={{ marginTop: '1rem' }}>
            <div>
              <p className={styles.rowLabel}>France uniquement</p>
              <p className={styles.rowDesc}>Ignorer les annonces hors France</p>
            </div>
            <label className={styles.toggle}>
              <input type="checkbox" checked={settings.franceOnly} onChange={e => update('franceOnly', e.target.checked)} />
              <span className={styles.toggleSlider} />
            </label>
          </div>
        </div>

        {/* Statut global du bot */}
        <div className={`${styles.card} ${styles.botCard}`}>
          <h2 className={styles.cardTitle}>Statut du bot</h2>
          <p className={styles.rowDesc} style={{ marginBottom: '1rem' }}>
            Active ou désactive le bot globalement. Quand il est arrêté, il ne scanne plus Vinted.
          </p>
          <button
            className={`${styles.botBtn} ${botActive ? styles.botBtnOn : styles.botBtnOff}`}
            onClick={() => setBotActive(!botActive)}
          >
            {botActive ? '⏸ Arrêter le bot' : '▶ Démarrer le bot'}
          </button>
        </div>

      </div>
    </div>
  )
}

export default Settings
