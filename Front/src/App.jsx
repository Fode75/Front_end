import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Catalog from './pages/Catalog/Catalog'
import AnimeDetail from './pages/AnimeDetail/AnimeDetail'
import Favorites from './pages/Favorites/Favorites'
import NotFound from './pages/NotFound/NotFound'
import { FavoritesProvider } from './context/FavoritesContext'
import styles from './App.module.css'

function App() {
  return (
    <FavoritesProvider>
      <div className={styles.app}>
        <Navbar />
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogue" element={<Catalog />} />
            <Route path="/anime/:id" element={<AnimeDetail />} />
            <Route path="/favoris" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </FavoritesProvider>
  )
}

export default App
