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
            // normalize helper and prioritization: raw exact, normalized exact, length proximity, then popularity
            const normalize = (s) => (s || '').toString().toLowerCase().replace(/[^a-z0-9]/g, '')
            const qnorm = normalize(querytv)
            const getPrimary = (item) => (item && (item.name || item.original_name || '')).toString()

            const sorted = (data.results || []).slice().sort((a, b) => {
                const aTitle = getPrimary(a)
                const bTitle = getPrimary(b)
                const aRaw = aTitle.toLowerCase().trim()
                const bRaw = bTitle.toLowerCase().trim()
                const qRaw = querytv.toLowerCase().trim()

                const aExactRaw = aRaw === qRaw
                const bExactRaw = bRaw === qRaw
                if (aExactRaw && !bExactRaw) return -1
                if (bExactRaw && !aExactRaw) return 1

                const aNorm = normalize(aTitle)
                const bNorm = normalize(bTitle)
                const aExact = aNorm === qnorm
                const bExact = bNorm === qnorm
                if (aExact && !bExact) return -1
                if (bExact && !aExact) return 1

                if (aExact && bExact) {
                    const aDiff = Math.abs(aTitle.length - querytv.length)
                    const bDiff = Math.abs(bTitle.length - querytv.length)
                    if (aDiff !== bDiff) return aDiff - bDiff
                }

                const aScore = (a.popularity || a.vote_average || 0)
                const bScore = (b.popularity || b.vote_average || 0)
                return bScore - aScore
            })

            setShows(sorted)
            //console.log(data)
        } catch(err) {
            console.error(err);
        }

    }    
    return (
        <>
            <form className="form" onSubmit={searchTV}>
                <label className="label" htmlFor="querytv">TV SHOW</label>
                <div className="input-wrapper">
                    <input className="input" type="text" name="querytv"  required={true}
                        placeholder="i.e. Seinfeld"
                        value={querytv} onChange={(e) => setQuerytv(e.target.value)}
                    />
                    {querytv.length > 0 && <button type="button" className="clear-button" aria-label="Clear" onClick={() => setQuerytv('')}><i className="ri-close-line" /></button>}
                </div>
                <button className="button" type="submit">Search</button>
            </form>

            <div className="card-list">
                {shows.map(show => (
                    <TvCard show={show} key={show.id} />
                ))}
            </div>    
        </>
    )
}


export default SearchTV