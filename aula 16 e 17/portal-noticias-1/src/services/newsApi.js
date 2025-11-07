import axios from "axios"

const API_KEY = "b1d98f0a2f622210b66be2ec40e22d24";

export async function getTopHeadlines(country = "br", category = "", query = "") {
    const url = `https://gnews.io/api/v4/top-headlines?lang=pt&country=${country}${category ? `&topic=${category}` : ""
        }${query ? `&q=${query}` : ""}&apikey=${API_KEY}`;

    const response = await axios.get(url);
    return response.data.articles;
}

