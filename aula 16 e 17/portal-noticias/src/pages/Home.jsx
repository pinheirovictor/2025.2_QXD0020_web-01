import { useState, useEffect } from "react";
import FilterBar from "../components/FilterBar";
import NewsCard from "../components/NewsCard";
import { getTopHeadlines } from "../services/newsApi";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [country, setCountry] = useState("br");
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getTopHeadlines(country, category, query);
        setArticles(data);
        setError("");
      } catch (err) {
        console.error("Erro ao buscar notícias:", err);
        setError("Erro ao carregar notícias. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [country, category, query]);

  return (
    <div className="container">
      <FilterBar setCountry={setCountry} setCategory={setCategory} setQuery={setQuery} />
      
      {loading && <p>Carregando notícias...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {!loading && !error && (
        <div className="grid">
          {articles.length > 0 ? (
            articles.map((news, i) => <NewsCard key={i} news={news} />)
          ) : (
            <p>Nenhuma notícia encontrada.</p>
          )}
        </div>
      )}
    </div>
  );
}
