import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom"
import MovieCard from './movieCard.js';

function MovieDisplay() {
    const {query, movieId} = useParams()
    const [movies, setMovies] = useState([]);
    const TMDB_KEY = process.env.REACT_APP_TMDB_KEY || "";
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;

    useEffect(() => {
        try {
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    const newdata = data.results.filter(movie => parseInt(movie.id) === parseInt(movieId)) //get one result by id
                    setMovies(newdata)
                })
        } catch(err) {
            console.error(err);
        }
    }, [movieId,url])  
    
    return (
        <div className="card-list">
            {movies.map(movie => (
                <MovieCard movie={movie} key={movie.id} />
            ))}
        </div>
    )
}

export default MovieDisplay