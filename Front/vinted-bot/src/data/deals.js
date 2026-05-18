// src/data/deals.js
// C'est ici que tu mettras les données qui viennent de ton API plus tard.
// Pour l'instant ce sont des données fictives pour tester l'interface.

export const deals = [
  {
    id: 1,
    name: "Nike Air Jordan 1 Retro High OG",
    brand: "Nike",
    category: "Sneakers",
    size: "42",
    condition: "Très bon état",
    city: "Paris",
    price: 65,
    originalPrice: 240,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    score: 94,
    url: "#",
    createdAt: "2026-05-18T09:32:00",
    emoji: "👟"
  },
  {
    id: 2,
    name: "Sac Jacquemus Le Bambino",
    brand: "Jacquemus",
    category: "Sacs",
    size: "Unique",
    condition: "Neuf avec étiquette",
    city: "Lyon",
    price: 120,
    originalPrice: 300,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80",
    score: 91,
    url: "#",
    createdAt: "2026-05-18T08:15:00",
    emoji: "👜"
  },
  {
    id: 3,
    name: "PlayStation 5 Standard + manette",
    brand: "Sony",
    category: "High-tech",
    size: null,
    condition: "Bon état",
    city: "Bordeaux",
    price: 320,
    originalPrice: 600,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&q=80",
    score: 78,
    url: "#",
    createdAt: "2026-05-18T07:50:00",
    emoji: "🎮"
  },
  {
    id: 4,
    name: "Lunettes Carrera 1007/S",
    brand: "Carrera",
    category: "Accessoires",
    size: "Unique",
    condition: "Neuf avec étiquette",
    city: "Marseille",
    price: 35,
    originalPrice: 180,
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=400&q=80",
    score: 88,
    url: "#",
    createdAt: "2026-05-18T07:10:00",
    emoji: "🕶️"
  },
  {
    id: 5,
    name: "Manteau The North Face",
    brand: "The North Face",
    category: "Vêtements",
    size: "M",
    condition: "Bon état",
    city: "Toulouse",
    price: 80,
    originalPrice: 250,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80",
    score: 82,
    url: "#",
    createdAt: "2026-05-18T06:45:00",
    emoji: "🧥"
  },
  {
    id: 6,
    name: "Casio G-Shock GA-100",
    brand: "Casio",
    category: "Accessoires",
    size: "Unique",
    condition: "Bon état",
    city: "Nantes",
    price: 45,
    originalPrice: 120,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&q=80",
    score: 75,
    url: "#",
    createdAt: "2026-05-17T22:30:00",
    emoji: "⌚"
  },
]

// Fonction utilitaire : calcule le % de réduction
export function getDiscount(price, originalPrice) {
  return Math.round((1 - price / originalPrice) * 100)
}

// Toutes les catégories uniques
export const CATEGORIES = ['Tous', ...new Set(deals.map(d => d.category))]
