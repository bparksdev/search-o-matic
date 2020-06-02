import React, {useState, useEffect} from "react";
import MovieModal from "./movieModal"
import { isArray } from "util"
import imdbLogo from "./assets/images/imdb.png"
import ActorInfo from "./components/actorInfo"

export default function MovieCard({movie}) {
    const [details, setDetails] = useState([])
    const [cast, setCast] = useState([])
    const [crew, setCrew] = useState([])
    const [similars, setSimilars] = useState([])

    const dispDate = movie.release_date !== "" ? new Date(movie.release_date) : null

    useEffect(() => {
        getDetails()    
        getCast()
        getSimilars()    
    }, [])      

    const getDetails = async () => {
        const url = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=017579ded6888c915f4b861b1f93aec6&language=en-US`;
        const res = await fetch(url);
        const data  = await res.json(); 
        setDetails(data)    
    }

    const getCast = async () => {
        const url = `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=017579ded6888c915f4b861b1f93aec6&language=en-US`
        const res = await fetch(url);
        const data  = await res.json(); 
        setCast(data.cast)
        setCrew(data.crew)
    }

    const getSimilars = async () => {
        const url = `https://api.themoviedb.org/3/movie/${movie.id}/similar?api_key=017579ded6888c915f4b861b1f93aec6&language=en-US`
        const res = await fetch(url);
        const data  = await res.json(); 
        setSimilars(data)
    }    

    const style = {  
        backgroundImage: `url("https://image.tmdb.org/t/p/w185_and_h278_bestv2/${details.backdrop_path}")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    }    
      
    return (
        <div className="card" style={style}>
            <table>
                <tbody>
                <tr>
                    <td width="20%" valign="top" className="poster">
                        {details.status === 'Released' && movie.poster_path
                            ?
                                <img className="card--image"
                                    src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                                    alt={movie.title + ' poster'}
                                />
                            : null
                        }
                        {details.status !== 'Released' ? <small className="upComing">Not Yet Released</small> : null}
                    </td>
                    <td>
                        <div className="card--content" key={movie.id}>
                            <h3 className="card--title">
                                {movie.title} {dispDate !== null ? `(${dispDate.getFullYear()})` : null}
                                <span style={{float:"right"}}>
                                    <a href={`https://www.imdb.com/title/${details.imdb_id}`} rel="noopener noreferrer" target="_blank">
                                        <img src={imdbLogo} alt="IMDb" title="Go to IMDb" />
                                    </a>
                                </span>
                            </h3>
                            <div className="row">
                                <div className="col-sm-2">
                                    <small>RELEASE DATE:<br />{movie.release_date ? movie.release_date : "In Production"}</small>
                                </div>
                                <div className="col-sm-2">
                                    <small>
                                        GENRE(S):<br />
                                        {isArray(details.genres) ? details.genres.map(genre => (<li key={genre.id}>{genre.name}</li>)) : ""}
                                    </small>
                                </div>
                                <div className="col-sm-2">
                                    <small>
                                    DIRECTOR:<br />{crew.filter(person => person.job === 'Director').map(person => (
                                       <li key={person.id}><a href={`/people/${person.name}`}>{person.name}</a></li>
                                    ))}
                                    </small>
                                </div>
                                <div className="col-sm-2">
                                    <small>
                                    SCREENPLAY:<br />
                                    {crew.filter(person => person.job === 'Screenplay').map(person => (
                                       <li key={person.id}><a href={`/people/${person.name}`}>{person.name}</a></li>
                                    ))}
                                    </small>
                                </div>                                
                                <div className="col-sm-2">
                                    <small>
                                    RUNTIME:<br />{details.runtime ? `${details.runtime} mins` : "TBD"} 
                                    </small>
                                </div>                                
                                <div className="col-sm-2">
                                    <small>
                                        RATING:<br />{movie.vote_average ? `${movie.vote_average} out of 10` : "TBD"}
                                    </small>
                                </div>
                            </div>

                            <ActorInfo cast={cast} />
                            
                            <p className="card--desc" style={{marginTop:"20px"}}>{movie.overview}</p>
                            <MovieModal details={details} similars={similars} />
                        </div>
                    </td>
                </tr>
                </tbody>
            </table> 
        </div>
    )
}
