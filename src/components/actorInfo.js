import React, {useState} from 'react'
import nopic from "../assets/images/nopic.png"
//import { useRef, Link } from 'react'
import {Link} from 'react-scroll'

export default function ActorInfo({cast}) {

    const [bioClassName, setBioClassName] = useState("bioClosed")
    const [credits, setCredits] = useState([])
    const [bio, setBio] = useState([])
    
    const imageRoot = 'https://image.tmdb.org/t/p/original'

    //https://image.tmdb.org/t/p/w200

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
        // after loading bio and credits, scroll down to the bio section
        try {
            setTimeout(() => {
                const el = document.getElementById(data.id)
                if (el && el.scrollIntoView) el.scrollIntoView({behavior: 'smooth', block: 'start'})
            }, 80)
        } catch (e) {}
    }

    // derive separate lists for movies and TV from combined credits
    const movieCredits = Array.isArray(credits)
        ? credits.filter(c => c.media_type === 'movie' || Boolean(c.title)).sort((a, b) => {
            const ya = a.release_date ? parseInt(a.release_date.substring(0,4)) : 0
            const yb = b.release_date ? parseInt(b.release_date.substring(0,4)) : 0
            return ya - yb
        })
        : []

    const tvCredits = Array.isArray(credits)
        ? credits.filter(c => c.media_type === 'tv' || Boolean(c.name)).sort((a, b) => {
            const ya = a.first_air_date ? parseInt(a.first_air_date.substring(0,4)) : 0
            const yb = b.first_air_date ? parseInt(b.first_air_date.substring(0,4)) : 0
            return ya - yb
        })
        : []

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
                                        style={actor.profile_path ? {height:"140px",paddingRight:"2px",pointerEvents: "all",margin:"4px",borderRadius:"15px"} : {width:"100px",height:"130px",paddingRight:"2px",pointerEvents: "all",margin:"4px",borderRadius:"15px"}}
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
                    <div className="row" style={{marginLeft:"-4px",backgroundColor:"black", width:"100%"}}>    
                        <div className="col-sm-3">
                            {bio.profile_path
                                ? <img src={`https://image.tmdb.org/t/p/w200${bio.profile_path}`} className="headshot box-shadow" alt={bio.name} />
                                : null
                            }
                        </div>
                        <div className="col-sm-9 actor-blurb">
                            <h3 style={{color:"white"}}>{bio.name}</h3>
                            {bio.biography}
                            <hr />
                            <h4>Acting Credits ({credits.length})</h4>

                            {movieCredits.length > 0 && (
                                <div>
                                    <strong>Movies</strong>
                                    {movieCredits.map((credit, key) => (
                                        <li key={`m-${key}`}>
                                            <a href={`/movie/${credit.title}/${credit.id}`}>{credit.title || credit.name}</a>
                                            &nbsp; {credit.release_date ? `(${credit.release_date.substring(0,4)})` : null}
                                            &nbsp; {credit.character ? ` - ${credit.character}` : null}
                                        </li>
                                    ))}
                                </div>
                            )}

                            {tvCredits.length > 0 && (
                                <div>
                                    <strong>TV</strong>
                                    {tvCredits.map((credit, key) => (
                                        <li key={`t-${key}`}>
                                            <a href={`/show/${credit.name}/${credit.id}`}>{credit.name || credit.title}</a>
                                            &nbsp; {credit.first_air_date ? `(${credit.first_air_date.substring(0,4)})` : null}
                                            &nbsp; {credit.character ? ` - ${credit.character}` : null}
                                        </li>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* {bio.biography || credits ?
                        <a 
                            href={`http://imdb.com/name/${bio.imdb_id}/?ref_=nv_sr_srsg_0`}
                            style={{marginTop:"20px",display:"block"}}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {bio.name}'s IMDb Profile
                        </a>
                        : null
                    } */}
                </td>    
            </tr>  
            </tbody>                             
        </table>                            
    </div>
    </>        
    )
}


