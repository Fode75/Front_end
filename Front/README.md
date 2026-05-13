# Animeka — Catalogue d'Anime

Application web de catalogue d'anime développée avec **React JS** et **Vite**.

## 🚀 Lancer le projet

```bash
npm install
npm run dev
```

Application disponible sur [http://localhost:5173](http://localhost:5173)

## 📁 Structure du projet

```
src/
├── components/
│   ├── Navbar/        # Barre de navigation sticky avec badge favoris
│   ├── AnimeCard/     # Carte anime réutilisable avec score et statut
│   ├── SearchBar/     # Barre de recherche avec reset
│   └── Badge/         # Badge cliquable pour les filtres et tags
├── pages/
│   ├── Home/          # Accueil : hero, stats, top animes, genres
│   ├── Catalog/       # Catalogue avec recherche, filtres et tri
│   ├── AnimeDetail/   # Fiche détaillée d'un anime + suggestions
│   ├── Favorites/     # Liste personnelle sauvegardée
│   └── NotFound/      # Page 404
├── context/
│   └── FavoritesContext.jsx  # Gestion globale des favoris
├── data/
│   └── animes.js      # Base de données des animes
├── App.jsx
└── index.css
```

## ✅ Critères techniques

| Critère | Implémentation |
|---------|---------------|
| Vite | `npm create vite@latest` |
| 3+ composants | Navbar, AnimeCard, SearchBar, Badge |
| 3+ pages | Home, Catalog, AnimeDetail, Favorites, NotFound |
| Composants fonctionnels | Tous les composants |
| Props | `anime`, `value`, `onChange`, `active`, `label`… |
| `.map()` + `key` | Listes d'animes, tags, filtres, suggestions |
| `useState` | Recherche, filtres, tri, anime courant |
| `useEffect` | Chargement, filtrage réactif, scroll au top |
| React Router | `<Routes>`, `<NavLink>`, `<Link>`, `useParams`, `useSearchParams` |
| Navbar globale | Sticky sur toutes les pages |
| Page 404 | Route `*` → NotFound |
| CSS Modules | Fichier `.module.css` par composant/page |

## ✨ Fonctionnalités

- 🔍 Recherche temps réel (titre, titre JP, studio, tags)
- 🏷️ Filtres par genre et statut + tri (score / année / A→Z)
- ★ Ma liste : favoris persistants via `localStorage`
- 🎌 Page de détail avec suggestions du même genre
- 🔗 Filtres reflétés dans l'URL (partageables)
- 📱 Design responsive
