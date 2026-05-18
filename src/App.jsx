// src/App.jsx
// Point d'entrée principal de l'app.
// On définit ici toutes les routes (URLs) et on entoure l'app avec le BotProvider.

import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Dashboard from './pages/Dashboard/Dashboard'
import Deals from './pages/Deals/Deals'
import Filters from './pages/Filters/Filters'
import Settings from './pages/Settings/Settings'
import NotFound from './pages/NotFound/NotFound'
import { BotProvider } from './context/BotContext'
import styles from './App.module.css'

function App() {
  return (
    // BotProvider entoure tout → tous les composants peuvent utiliser useBot()
    <BotProvider>
      <div className={styles.app}>
        <Navbar />
        <main className={styles.main}>
          <Routes>
            {/* Chaque Route = une URL → un composant page */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/bons-plans" element={<Deals />} />
            <Route path="/recherches" element={<Filters />} />
            <Route path="/parametres" element={<Settings />} />
            {/* Route catch-all : si l'URL n'existe pas → page 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BotProvider>
  )
}

export default App
