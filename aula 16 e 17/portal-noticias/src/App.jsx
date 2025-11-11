// // import { useState, useEffect } from "react";
// // import Header from "./components/Header";
// // import FilterBar from "./components/FilterBar";
// // import NewsCard from "./components/NewsCard";
// // import { getTopHeadlines } from "./services/newsApi";
// // import "./styles.css";

// // export default function App() {
// //   const [articles, setArticles] = useState([]);
// //   const [country, setCountry] = useState("br");
// //   const [category, setCategory] = useState("");
// //   const [query, setQuery] = useState("");

// //   useEffect(() => {
// //     async function fetchData() {
// //       const data = await getTopHeadlines(country, category, query);
// //       setArticles(data);
// //     }
// //     fetchData();
// //   }, [country, category, query]);

// //   return (
// //     <>
// //       <Header />
// //       <div className="container">
// //         <FilterBar 
// //           setCountry={setCountry} 
// //           setCategory={setCategory} 
// //           setQuery={setQuery} 
// //         />
// //         <div className="grid">
// //           {articles.map((news, index) => (
// //             <NewsCard key={index} news={news} />
// //           ))}
// //         </div>
// //       </div>
// //     </>
// //   );
// // }




// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Home from "./pages/Home";
// import FavoritesPage from "./pages/FavoritesPage";
// import "./styles.css";

// export default function App() {
//   return (
//     <Router>
//       <header>
//         <h1>📰 Portal de Notícias</h1>
//         <nav style={{ marginTop: "8px" }}>
//           <Link to="/" style={{ marginRight: "10px", color: "white" }}>Início</Link>
//           <Link to="/favoritos" style={{ color: "white" }}>Favoritos</Link>
//         </nav>
//       </header>

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/favoritos" element={<FavoritesPage />} />
//       </Routes>
//     </Router>
//   );
// }



import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import FavoritesPage from "./pages/FavoritesPage";
import Header from "./components/Header"; // ✅ importar o componente
import "./styles.css";

export default function App() {
  return (
    <Router>
      <Header /> {/* ✅ Aqui o Header com modo escuro é exibido */}

      <nav
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          margin: "1rem 0",
        }}
      >
        <Link to="/">Início</Link>
        <Link to="/favoritos">Favoritos</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favoritos" element={<FavoritesPage />} />
      </Routes>
    </Router>
  );
}
