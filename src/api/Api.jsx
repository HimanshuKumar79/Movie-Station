
const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = process.env.REACT_APP_MOVIE_API_KEY
const SearchResult='https://api.themoviedb.org/3/search/multi'

export const fetchDataFromApi = async (url,page=1) => {
    try {
        const res=await fetch(`${BASE_URL}${url}?api_key=${TMDB_TOKEN}&page=${page}`)
        console.log(`${BASE_URL}${url}?api_key=${TMDB_TOKEN}&page=${page}`)
        const data=await res.json()
        return data
    } catch (err) {
        console.log(err);
        return err;
    }
};



export const fetchSearchDataFromApi = async (url) => {
    try {
        const res=await fetch(`${SearchResult}?api_key=${TMDB_TOKEN}${url}`)
        const data=await res.json()
        return data
    } catch (err) {
        console.log(err);
        return err;
    }
};

