import React, {useState, useEffect} from 'react'
import nopic from "./assets/images/nopic.png"
import SaveButton from './utils/saveButton'

const PeopleCard = ({person}) => {
    const [details, setDetails] = useState([])
    const [credits, setCredits] = useState([])
    const [showBio, setShowBio] = useState(false)
    const [showActingCredits, setShowActingCredits] = useState(false)
    const [showOtherCredits, setShowOtherCredits] = useState(false)

    const TMDB_KEY = process.env.REACT_APP_TMDB_KEY || "";

    const getDetails = async () => {
        const url = `https://api.themoviedb.org/3/person/${person.id}?api_key=${TMDB_KEY}&language=en-US`;
        const res = await fetch(url);
        const data  = await res.json(); 
        setDetails(data)    
    }    

    const getCredits = async () => {
        const url2 = `https://api.themoviedb.org/3/person/${person.id}/combined_credits?api_key=${TMDB_KEY}&language=en-US`
        const res2 = await fetch(url2);
        const data2  = await res2.json(); 
        setCredits(data2)     
    }

    useEffect(() => {
        getDetails()    
        getCredits()
        // eslint-disable-next-line
    }, []) 

    // normalize credits into separate lists for movies and tv
    const movieList = (credits && Array.isArray(credits.cast))
        ? credits.cast
            .filter(c => (c.media_type === 'movie') || Boolean(c.title))
            .sort((a, b) => {
                const ya = a.release_date ? parseInt(a.release_date.substring(0,4)) : 0
                const yb = b.release_date ? parseInt(b.release_date.substring(0,4)) : 0
                return ya - yb
            })
        : []

    const tvList = (credits && Array.isArray(credits.cast))
        ? credits.cast
            .filter(c => (c.media_type === 'tv') || Boolean(c.name))
            .sort((a, b) => {
                const ya = a.first_air_date ? parseInt(a.first_air_date.substring(0,4)) : 0
                const yb = b.first_air_date ? parseInt(b.first_air_date.substring(0,4)) : 0
                return ya - yb
            })
        : []

    return (
        <div className="card">
            <div className="row">
                <div className="col-sm-3">
                    <img 
                        src={details.profile_path ? "https://image.tmdb.org/t/p/w200" + details.profile_path : nopic}
                        alt={details.name} className="headshot box-shadow"
                        
                    />
                </div>
                <div className="col-sm-8">
                    <h2>{details.name}  
                        <span style={{float:"right"}}>
                            <SaveButton person={person} />
                        </span>
                    </h2>
                    <div style={{fontSize:"1.6rem",marginBottom:"10px"}}>Known For: {details.known_for_department}</div>
                    <h3 
                        style={{cursor:"pointer",userSelect:"none",display:"inline-block"}}
                        onClick={() => setShowBio(!showBio)}
                    >
                        Biography {showBio ? '▼' : '►'}
                    </h3>
                    {showBio && (
                    <div style={{fontSize:"1.3rem",marginTop:"10px"}}>
                        {details.biography}
                    </div>
                    )}
                    <hr />
                    <h3 
                        style={{cursor:"pointer",userSelect:"none",display:"inline-block"}}
                        onClick={() => setShowActingCredits(!showActingCredits)}
                    >
                        Acting Credits {showActingCredits ? '▼' : '►'}
                    </h3>
                    {/* <div className="row">
                        <div className="col-sm-6"><h4>MOVIES</h4></div>
                        <div className="col-sm-6"><h4>TV</h4></div>
                    </div> */}
                    {showActingCredits && (
                    <div className="row person-credits">
                        <div className="col-sm-6">
                            {credits.length !== 0
                                ?   credits.cast.sort((a, b) => parseInt(a.release_date) - parseInt(b.release_date)).filter(credit => credit.title).map((credit, key) => 
                                        <div key={key} className="credits-item">
                                            <a href={`/movie/${credit.title}/${credit.id}`}>{credit.title}</a>
                                            &nbsp; {credit.release_date ? `(Movie - ${credit.release_date.substring(0,4)})` : null}
                                            &nbsp; {credit.character !== '' ? ` - ${credit.character}`  : null}
                                        </div>
                                    )
                                : null
                            }
                        </div>
                        <div className="col-sm-6">
                            {credits.length !== 0
                                ?   credits.cast.sort((a, b) => parseInt(a.first_air_date) - parseInt(b.first_air_date)).filter(credit => credit.name).map((credit, key) => 
                                        <div key={key} className="credits-item">
                                            <a href={`/show/${credit.name}/${credit.id}`}>{credit.name}</a> 
                                            &nbsp; (TV) {credit.character !== '' ? ` - ${credit.character}`  : null}
                                        </div>
                                    )
                                : null
                            }
                        </div>                            
                    </div>
                    )}
                    <hr />
                    <h3 
                        style={{cursor:"pointer",userSelect:"none",display:"inline-block"}}
                        onClick={() => setShowOtherCredits(!showOtherCredits)}
                    >
                        Other Credits {showOtherCredits ? '▼' : '►'}
                    </h3>
                    {showOtherCredits && (
                    <div className="person-credits">
                        {credits.length !== 0
                            ?   credits.crew.filter(credit => credit.department).sort((a, b) => a.id - b.id).map((credit, key) => 
                                    <li key={key} className="credits-item">
                                        {credit.title 
                                            ? <a href={`/movie/${credit.title}/${credit.id}`}>{credit.title}</a>
                                            : <a href={`/show/${credit.name}/${credit.id}`}>{credit.name}</a>
                                        }
                                        &nbsp; {credit.department !== '' ? ` - ${credit.department}`  : null}
                                    </li>
                                )
                            : null
                        }                        
                    </div>
                    )}
                </div>
            </div>

        </div>
    )

}

export default PeopleCard