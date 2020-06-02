import React, {useState} from 'react'
import nopic from "../assets/images/nopic.png"

export default function ActorInfo({cast}) {

    const [bioClassName, setBioClassName] = useState("bioClosed")
    const [credits, setCredits] = useState([])
    const [bio, setBio] = useState([])
    
    const imageRoot = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2'

    const getActorInfo = async (actorid) => {
        setBio("")
        setCredits([])   
        setBioClassName("bio")
        const url = `https://api.themoviedb.org/3/person/${actorid}?api_key=017579ded6888c915f4b861b1f93aec6&language=en-US`
        const res = await fetch(url);
        const data  = await res.json(); 
        setBio(data)

        const url2 = `https://api.themoviedb.org/3/person/${actorid}/combined_credits?api_key=017579ded6888c915f4b861b1f93aec6&language=en-US`
        const res2 = await fetch(url2);
        const data2  = await res2.json(); 
        setCredits(data2.cast)        
    }

    return (
        <div className="actors">
        <h3>Featured Cast</h3>
        <table style={{width:"100%",fontSize:"1.2rem"}}>
            <tbody>
            <tr>
            {cast.filter(actor => actor.order <= 5).map(actor => (
                <td width="16%" key={actor.id}>
                    <img 
                        src={actor.profile_path ? imageRoot + actor.profile_path : nopic}
                        alt={actor.name} title="Click for bio"
                        style={{width:"36px",paddingRight:"2px",pointerEvents: "all"}} 
                        onClick={() => getActorInfo(actor.id)}
                    />
                </td>
            ))} 
            </tr>
            <tr>
            {cast.filter(actor => actor.order <= 5).map(actor => (
                <td key={actor.id} valign="top">
                    {actor.name}<br /><em>{actor.character}</em>
                </td>
            ))}                                        
            </tr>
            <tr>
                <td colSpan="6" style={{textAlign:"left",paddingLeft:"6px",borderTop:"1px solid #85a5de"}}>
                    <h4>Other Cast:</h4>
                    <div className="other-cast">
                    {cast.filter(actor => actor.order > 5 ).map(actor => (
                        <span 
                            onClick={() => getActorInfo(actor.id)} 
                            key={actor.id} 
                            style={{marginRight:"6px",textDecoration:"underline",cursor:"pointer"}}>
                            {actor.name}
                        </span>
                    ))} 
                    </div>
                </td>
            </tr>
            <tr>
                <td colSpan="6" className={bioClassName} 
                    onClick={() => {
                        setBio([])
                        setCredits([])
                        setBioClassName('bioClosed')
                        }
                    }>
                    <div className="row">    
                        <div className="col-sm-3">
                            {bio.profile_path
                                ? <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${bio.profile_path}`} className="headshot" alt={bio.name} />
                                : null
                            }
                        </div>
                        <div className="col-sm-8 offset-sm-1 actor-blurb">
                            {bio.biography}
                            <hr />
                            <h4>Acting Credits ({credits.length})</h4>
                            {[...credits].sort((a, b) => parseInt(a.release_date) - parseInt(b.release_date)).map(credit => 
                                <li key={credit.id}>
                                    {credit.title 
                                        ? <a href={`/movie/${credit.title}/${credit.id}`}>{credit.title}</a>
                                        : <a href={`/show/${credit.name}`}>{credit.name}</a>
                                    }
                                    &nbsp;
                                    ({credit.first_air_date
                                        ? "TV"
                                        : credit.release_date !== '' && credit.release_date
                                            ? credit.release_date.substring(0,4)
                                            : "In Production" 
                                    })
                                </li>
                            )}                                                    
                        </div>
                    </div>
                    
                    {bio.biography || credits ?
                        <a 
                            href={`https://www.imdb.com/name/${bio.imdb_id}`}
                            style={{marginTop:"20px",display:"block"}}
                            rel="noopener noreferrer" target="_blank">
                            {bio.name}'s IMDb Profile
                        </a>
                        : null
                    }
                </td>    
            </tr>  
            </tbody>                             
        </table>                            
    </div>        
    )
}


