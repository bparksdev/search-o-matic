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
            const normalize = (s) => (s || '').toString().toLowerCase().replace(/[^a-z0-9]/g, '')
            const qnorm = normalize(query)
            const getPrimary = (item) => (item && (item.title || item.original_title || '')).toString()
            const sorted = (data.results || []).slice().sort((a, b) => {
                const aTitle = getPrimary(a)
                const bTitle = getPrimary(b)
                const aRaw = aTitle.toLowerCase().trim()
                const bRaw = bTitle.toLowerCase().trim()
                const qRaw = query.toLowerCase().trim()

                // exact raw match (preserve punctuation) wins
                const aExactRaw = aRaw === qRaw
                const bExactRaw = bRaw === qRaw
                if (aExactRaw && !bExactRaw) return -1
                if (bExactRaw && !aExactRaw) return 1

                // normalized match (ignore punctuation)
                const aNorm = normalize(aTitle)
                const bNorm = normalize(bTitle)
                const aExact = aNorm === qnorm
                const bExact = bNorm === qnorm
                if (aExact && !bExact) return -1
                if (bExact && !aExact) return 1

                // if both normalize-match (tie), prefer title whose length is closer to query length
                if (aExact && bExact) {
                    const aDiff = Math.abs(aTitle.length - query.length)
                    const bDiff = Math.abs(bTitle.length - query.length)
                    if (aDiff !== bDiff) return aDiff - bDiff
                }

                // fallback: prefer higher popularity / vote_average to keep relevant items near top
                const aScore = (a.popularity || a.vote_average || 0)
                const bScore = (b.popularity || b.vote_average || 0)
                return bScore - aScore
            })
            setMovies(sorted)
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