// src/context/BotContext.jsx
// Ce fichier gère l'état global du bot : alertes sauvegardées, statut du bot, etc.
// C'est la même logique que FavoritesContext dans ton projet Animeka.

import { createContext, useContext, useState, useEffect } from 'react'

// On crée un "contexte" : une boîte qu'on peut lire depuis n'importe quel composant
const BotContext = createContext()

export function BotProvider({ children }) {
  // savedDeals = liste des IDs des bons plans sauvegardés (comme les favoris)
  const [savedDeals, setSavedDeals] = useState(() => {
    const stored = localStorage.getItem('vintedbot-saved')
    return stored ? JSON.parse(stored) : []
  })

  // botActive = est-ce que le bot tourne ?
  const [botActive, setBotActive] = useState(true)

  // On sauvegarde dans le navigateur à chaque changement
  useEffect(() => {
    localStorage.setItem('vintedbot-saved', JSON.stringify(savedDeals))
  }, [savedDeals])

  // Ajouter ou retirer un deal des sauvegardés
  function toggleSaved(id) {
    setSavedDeals(prev =>
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    )
  }

  function isSaved(id) {
    return savedDeals.includes(id)
  }

  return (
    <BotContext.Provider value={{ savedDeals, toggleSaved, isSaved, botActive, setBotActive }}>
      {children}
    </BotContext.Provider>
  )
}

// Hook custom : permet d'utiliser le contexte avec "const { botActive } = useBot()"
export function useBot() {
  return useContext(BotContext)
}
