import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom"
import MovieCard from './movieCard.js';

function MovieDisplay() {
    const {query, movieId} = useParams()
    const [movies, setMovies] = useState([]);
    const url = `https://api.themoviedb.org/3/search/movie?api_key=017579ded6888c915f4b861b1f93aec6&language=en-US&query=${query}&page=1&include_adult=false`;

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
    }, [])  
    
    return (
        <div className="card-list">
            {movies.map(movie => (
                <MovieCard movie={movie} key={movie.id} />
            ))}
        </div>
    )
}

export default MovieDisplay