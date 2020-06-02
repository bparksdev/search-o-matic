import React, {useState} from "react";
import TvCard from './tvCard.js';

const SearchTV = () => {

    const [querytv, setQuerytv] = useState('');
    const [shows, setShows] = useState([]);
    
    const searchTV = async (e) => {
        e.preventDefault();
    
        const url = `https://api.themoviedb.org/3/search/tv?api_key=017579ded6888c915f4b861b1f93aec6&language=en-US&query=${querytv}&page=1&include_adult=false`;
        
        try {
            const res = await fetch(url)
            const data  = await res.json()
            setShows(data.results)
        } catch(err) {
            console.error(err);
        }

    }    
    return (
        <>
            <form className="form" onSubmit={searchTV}>
                <label className="label" htmlFor="querytv">TV SHOW</label>
                <input className="input" type="text" name="querytv"
                    placeholder="i.e. Seinfeld"
                    value={querytv} onChange={(e) => setQuerytv(e.target.value)}
                />
                <button className="button" type="submit">Search</button>
            </form>
            <hr />
            <div className="card-list">
                {shows.filter(show => show.poster_path).map(show => (
                    <TvCard show={show} key={show.id} />
                ))}
            </div>    
        </>
    )
}


export default SearchTV