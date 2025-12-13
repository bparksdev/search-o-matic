import React, {useState} from "react";
import PeopleCard from './peopleCard.js';

const SearchPeople = () => {

    const [queryPerson, setQueryPerson] = useState('');
    const [people, setPeople] = useState([]);
    
    const searchTV = async (e) => {
        e.preventDefault();
    
        const url = `https://api.themoviedb.org/3/search/person?api_key=017579ded6888c915f4b861b1f93aec6&language=en-US&query=${queryPerson}&page=1&include_adult=false`;
        
        try {
            const res = await fetch(url)
            const data  = await res.json()
            setPeople(data.results)
        } catch(err) {
            console.error(err);
        }

    }    
    return (
        <>
            <form className="form" onSubmit={searchTV}>
                <label className="label" htmlFor="querytv">Cast Member/Crew Member</label>
                <input className="input" type="text" name="querytv"  required
                    placeholder="i.e. Steven Spielberg"
                    value={queryPerson} onChange={(e) => setQueryPerson(e.target.value)}
                />
                <button className="button" type="submit">Search</button>
            </form>
            <hr />
            <div className="card-list">
                {people.map(person => (
                    <PeopleCard person={person} key={person.id} />
                ))}
            </div>    
        </>
    )
}


export default SearchPeople