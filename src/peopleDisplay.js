import React, {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import PeopleCard from './peopleCard.js'

function PeopleDisplay() {
    const {query} = useParams()
    const [people, setPeople] = useState([]);
    const TMDB_KEY = process.env.REACT_APP_TMDB_KEY || "";
    const url = `https://api.themoviedb.org/3/search/person?api_key=${TMDB_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;

    useEffect(() => {
        try {
            fetch(url)
                .then(res => res.json())
                .then(data => setPeople(data.results))
        } catch(err) {
            console.error(err);
        }
    }, [url])  
    
    return (
        <div className="card-list">
            {people.map(person => (
                <PeopleCard person={person} key={person.id} />
            ))}
        </div>
    )
}

export default PeopleDisplay