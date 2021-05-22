import React, {useState} from "react";
import MovieCard from './movieCard.js';

const SearchMovies = () => {

    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    
    const searchMovies = async (e) => {
        e.preventDefault();
    
        const url = `https://api.themoviedb.org/3/search/movie?api_key=017579ded6888c915f4b861b1f93aec6&language=en-US&query=${query}&page=1&include_adult=false`;
        
        try {
            const res = await fetch(url)
            const data  = await res.json()
            setMovies(data.results)
        } catch(err) {
            console.error(err);
        }
    }    
    return (
        <>
            <form className="form" onSubmit={searchMovies}>
                <label className="label" htmlFor="query">Movie Title</label>
                <input className="input" type="text" name="query" required="true"
                    placeholder="i.e. Jurassic Park"
                    value={query} onChange={(e) => setQuery(e.target.value)}
                    />
                <button className="button" type="submit">Search</button>
            </form>

            {query.length > 0 
                ? <div id="tvsearch"><a href={`/show/${query}`}>Search in TV</a></div>
                : null
            }
            <div className="card-list">
                {movies.filter(movie => movie.poster_path).map(movie => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>    
        </>
    )
}


export default SearchMovies