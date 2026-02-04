import React, {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import TvCard from './tvCard.js'

function TVDisplay() {
    const {query} = useParams()
    const [shows, setShows] = useState([]);
    const TMDB_KEY = process.env.REACT_APP_TMDB_KEY || "";
    const url = `https://api.themoviedb.org/3/search/tv?api_key=${TMDB_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;

    useEffect(() => {
        try {
            fetch(url)
                .then(res => res.json())
                .then(data => setShows(data.results))
        } catch(err) {
            console.error(err);
        }
    }, [url])  
    
    return (
        <div className="card-list">
            {shows.map(show => (
                <TvCard show={show} key={show.id} />
            ))}
        </div>
    )
}

export default TVDisplay