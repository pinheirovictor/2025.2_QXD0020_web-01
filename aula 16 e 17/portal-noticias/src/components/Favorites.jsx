export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const keys = Object.keys(localStorage);
    const favs = keys.map(k => JSON.parse(localStorage.getItem(k)));
    setFavorites(favs);
  }, []);

  return (
    <div className="container">
      <h2>⭐ Meus Favoritos</h2>
      <div className="grid">
        {favorites.map((news, i) => (
          <div key={i} style={{ background: "#fff", padding: "1rem" }}>
            <h3>{news.title}</h3>
            <a href={news.url} target="_blank">Ler mais</a>
          </div>
        ))}
      </div>
    </div>
  );
}
