import React, {useState} from 'react'
import nopic from "../assets/images/nopic.png"
//import { useRef, Link } from 'react'
import {Link} from 'react-scroll'

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
        <>
        <h3 style={{padding:"5px",marginTop:"15px",backgroundColor:"#6d8eaa"}}>Featured Cast</h3>
        <div className="actors">
        <table className="table">
            <tbody>
            
            {cast.filter(actor => actor.order <= 5).map(actor => (
                <tr key={actor.order}>
                    <td 
                        key={actor.id} 
                        style={{fontSize:"1.8rem"}}
                    >
                        <table className="castlist"

                        >
                            <tbody>
                            <tr>
                                <Link  to={bio.id} spy={true} smooth={true}>
                                <td key={actor.name} style={{border:"none"}}
                                    onClick={ function () {
                                        getActorInfo(actor.id)
                                    }}                                
                                >
                                    <img 
                                        src={actor.profile_path ? imageRoot + actor.profile_path : nopic}
                                        alt={actor.name} title="Click for bio"
                                        style={{width:"60px",paddingRight:"2px",pointerEvents: "all",margin:"4px",borderRadius:"15px"}} 
                                    />
                                </td>
                                </Link>
                                <td style={{border:"none"}}> 
                                    <strong>{actor.name}</strong><br />
                                    <span>
                                        <em>{actor.character}</em>
                                    </span>
                                </td> 
                           </tr> 
                           </tbody> 
                        </table>
                    </td>
                </tr>
            ))} 

            <tr>
                <td colSpan="6" style={{textAlign:"left",paddingLeft:"6px"}}>
                    <h4>Other Cast:</h4>
                    <div className="other-cast">
                    {cast.filter(actor => actor.order > 5 ).map(actor => (
                        <span 
                            onClick={() => getActorInfo(actor.id)} 
                            key={actor.order} 
                            style={{marginRight:"6px",textDecoration:"underline",cursor:"pointer",fontSize:"1.3rem"}}>
                            {actor.name}
                        </span>
                    ))} 
                    </div>
                </td>
            </tr>
            <tr>
                <td colSpan="6" className={bioClassName} id={bio.id}
                    onClick={() => {
                        setBio([])
                        setCredits([])
                        setBioClassName('bioClosed')
                        }
                    }>
                    <div className="row" style={{marginRight:"-6px"}}>    
                        <div className="col-sm-3">
                            {bio.profile_path
                                ? <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${bio.profile_path}`} className="headshot" alt={bio.name} />
                                : null
                            }
                        </div>
                        <div className="col-sm-9 actor-blurb">
                            <h3 style={{color:"white"}}>{bio.name}</h3>
                            {bio.biography}
                            <hr />
                            <h4>Acting Credits ({credits.length})</h4>
                            {[...credits].sort((a, b) => parseInt(a.release_date) - parseInt(b.release_date)).map((credit,key) => 
                                <li key={key}>
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
                    
                    {/*bio.biography || credits ?
                        <a 
                            href={`https://www.imdb.com/name/${bio.imdb_id}/`}
                            style={{marginTop:"20px",display:"block"}}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {bio.name}'s IMDb Profile
                        </a>
                        : null
                    */}
                </td>    
            </tr>  
            </tbody>                             
        </table>                            
    </div>
    </>        
    )
}


