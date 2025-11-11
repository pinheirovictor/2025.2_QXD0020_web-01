 import { useState, useEffect } from "react";
import NewsCard from "../components/NewsCard";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favs = Object.keys(localStorage)
      .map((key) => {
        try {
          const item = JSON.parse(localStorage.getItem(key));
          // Garante que é uma notícia válida
          if (item && item.title && item.url) {
            return item;
          }
          return null;
        } catch {
          // Ignora valores não JSON (ex: "light" ou "dark")
          return null;
        }
      })
      .filter((item) => item !== null);

    setFavorites(favs);
  }, []);

  return (
    <div className="container">
      <h2>⭐ Meus Favoritos</h2>
      <div className="grid">
        {favorites.length > 0 ? (
          favorites.map((news, i) => <NewsCard key={i} news={news} />)
        ) : (
          <p>Você ainda não favoritou nenhuma notícia.</p>
        )}
      </div>
    </div>
  );
}
