import React, {useState, useEffect} from 'react'
import nopic from "./assets/images/nopic.png"

const PeopleCard = ({person}) => {
    const [details, setDetails] = useState([])
    const [credits, setCredits] = useState([])

    const imageRoot = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2'

    useEffect(() => {
        getDetails()    
        getCredits()
    }, [])      
    
    const getDetails = async () => {
        const url = `https://api.themoviedb.org/3/person/${person.id}?api_key=017579ded6888c915f4b861b1f93aec6&language=en-US`;
        const res = await fetch(url);
        const data  = await res.json(); 
        setDetails(data)    
    }    

    const getCredits = async () => {
        const url2 = `https://api.themoviedb.org/3/person/${person.id}/combined_credits?api_key=017579ded6888c915f4b861b1f93aec6&language=en-US`
        const res2 = await fetch(url2);
        const data2  = await res2.json(); 
        setCredits(data2)     
    }

    return (
        <div className="card">
            <div className="row">
                <div className="col-sm-3">
                    <img 
                        src={details.profile_path ? "https://image.tmdb.org/t/p/w200" + details.profile_path : nopic}
                        alt={details.name} className="headshot"
                        style={{width:"100%"}}
                    />
                </div>
                <div className="col-sm-8">
                    <h2>{details.name}  <span style={{float:"right",fontSize:"1.6rem"}}>Known For: {details.known_for_department}</span></h2> 
                    <div style={{fontSize:"1.3rem"}}>
                        {details.biography}
                    </div>
                    <hr />
                    <h3>Acting Credits</h3>
                    <div className="row">
                        <div className="col-sm-6"><h4>MOVIES</h4></div>
                        <div className="col-sm-6"><h4>TV</h4></div>
                    </div>
                    <div className="row person-credits">
                        <div className="col-sm-6">
                            {credits.length !== 0
                                ?   credits.cast.sort((a, b) => parseInt(a.release_date) - parseInt(b.release_date)).filter(credit => credit.title).map((credit, key) => 
                                        <div key={key}>
                                            <a href={`/movie/${credit.title}/${credit.id}`}>{credit.title}</a>
                                            &nbsp; {credit.release_date ? `(${credit.release_date.substring(0,4)})` : null}
                                            &nbsp; {credit.character !== '' ? ` - ${credit.character}`  : null}
                                        </div>
                                    )
                                : null
                            }
                        </div>
                        <div className="col-sm-6">
                            {credits.length !== 0
                                ?   credits.cast.sort((a, b) => parseInt(a.first_air_date) - parseInt(b.first_air_date)).filter(credit => credit.name).map((credit, key) => 
                                        <div key={key}>
                                            <a href={`/show/${credit.name}`}>{credit.name}</a>
                                            &nbsp; {credit.character !== '' ? ` - ${credit.character}`  : null}
                                        </div>
                                    )
                                : null
                            }
                        </div>                            
                    </div>
                    <hr />
                    <h3>Other Credits</h3>
                    <div className="person-credits">
                        {credits.length !== 0
                            ?   credits.crew.filter(credit => credit.department).sort((a, b) => a.id - b.id).map((credit, key) => 
                                    <li key={key}>
                                        {credit.title 
                                            ? <a href={`/movie/${credit.title}/${credit.id}`}>{credit.title}</a>
                                            : <a href={`/show/${credit.name}`}>{credit.name}</a>
                                        }
                                        &nbsp; {credit.department !== '' ? ` - ${credit.department}`  : null}
                                    </li>
                                )
                            : null
                        }                        
                    </div>    
                </div>
            </div>

        </div>
    )

}

export default PeopleCard