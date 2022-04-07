import React, {useState, useEffect} from "react"
import TvModal from "./tvModal"
import ActorInfo from "./components/actorInfo"
//import { isArray } from "util"
import imdbLogo from "./assets/images/imdb.png"
import WatchInfo from "./components/watchInfo"

export default function TvCard({show}) {
    const [details, setDetails] = useState([])
    const [cast, setCast] = useState([])
    const [similars, setSimilars] = useState([])
    const [externalIds, setExternalIDs] = useState([])
    const [seasons, setSeasons] = useState([])
    const allSeasons = []
 
    useEffect(() => {
        getDetails()    
        getCast()
        getSimilars()
        getExternalIDs()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        getSeasons()
        // eslint-disable-next-line
    }, [details])    
    
    
    var dispDate = new Date(show.first_air_date)
    const getDetails = async () => {
        const url = `https://api.themoviedb.org/3/tv/${show.id}?api_key=017579ded6888c915f4b861b1f93aec6&language=en-US`;
        const res = await fetch(url);
        const data  = await res.json(); 
        setDetails(data)
        console.log(data)

        for(var x=1; x<=details.number_of_seasons; x++) {
            const url = `https://api.themoviedb.org/3/tv/${show.id}/season/${x}?api_key=017579ded6888c915f4b861b1f93aec6&language=en-US`
            const res = fetch(url);
            const data  = res.json();
            allSeasons.push(data)
        }
        setSeasons(allSeasons)
    }

    const getCast = async () => {
        //console.log(show.id);
        const url = `https://api.themoviedb.org/3/tv/${show.id}/credits?api_key=017579ded6888c915f4b861b1f93aec6&language=en-US`
        const res = await fetch(url);
        const data  = await res.json(); 
        setCast(data.cast)
    }

    const getSimilars = async () => {
        const url = `https://api.themoviedb.org/3/tv/${show.id}/similar?api_key=017579ded6888c915f4b861b1f93aec6&language=en-US`
        const res = await fetch(url);
        const data  = await res.json(); 
        setSimilars(data)
    }    

    const getExternalIDs = async () => {
        const url = `https://api.themoviedb.org/3/tv/${show.id}/external_ids?api_key=017579ded6888c915f4b861b1f93aec6&language=en-US`
        const res = await fetch(url);
        const data  = await res.json(); 
        setExternalIDs(data)
        //console.log(data);     
    }

    const getSeasons = async () => {
        for(var x=1; x<=details.number_of_seasons; x++) {
            const url = `https://api.themoviedb.org/3/tv/${show.id}/season/${x}?api_key=017579ded6888c915f4b861b1f93aec6&language=en-US`
            const res = await fetch(url);
            const data  = await res.json();
            allSeasons.push(data)
        }
        setSeasons(allSeasons)
    }

    if(Array.isArray(details.genres)) {
        details.genres.map(genre => genre.name) 
    }
    const style = {  
        backgroundImage: `url("https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${details.backdrop_path}")`,
        backgroundPosition: 'right top',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    }    

    return (
         <div className="card" style={style}>
            <table>
                <tbody>
                <tr>
                    <td width="20%" valign="top" className="poster">
                        {show.poster_path
                            ?
                                <img className="card--image"
                                    src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${show.poster_path}`}
                                    alt={show.name + ' poster'}
                                />
                            : null
                        }
                        <div className="alert alert-info mt-4" style={{opacity: "0.8", width:"90%"}}>
                                <div>
                                    <small><strong>AIR DATES:</strong> {show.first_air_date} to {details.last_air_date}</small>
                                </div>
                                <hr />
                                <div>
                                    <small><strong>SEASONS:</strong> {details.number_of_seasons}<br />({details.number_of_episodes} episodes)</small>
                                </div>
                                <hr />                                
                                <div>
                                    <small>
                                        <strong>GENRE(S):</strong>
                                        {Array.isArray(details.genres) ? details.genres.map(genre => (<li key={genre.id}>{genre.name}</li>)) : ""}
                                    </small>
                                </div>
                                <hr />
                                <div>
                                    <small>
                                        <strong>RATING:</strong> {show.vote_average} out of 10
                                    </small>
                                </div>
                                <hr />
                                <div>
                                    <small>
                                        <strong>ORIGINAL NETWORK(S):</strong>
                                    {Array.isArray(details.networks) ? details.networks.map(network => (<li key={network.id}>{network.name}</li>)) : ""}
                                    </small>
                                </div>                                
                            </div>                    
                    </td>
                    <td>
                        <div className="card--content" key={show.id}>
                            <h3 className="card--title">
                                {show.name} ({dispDate.getFullYear()})
                            </h3>
                            <table className="table text-center">
                                <tr>
                                    <td width="25%">
                                        <a href={`https://imdb.com/title/${externalIds.imdb_id}`} rel="noopener noreferrer" target="_blank">
                                            <img src={imdbLogo} className="" style={{width:"80px"}} alt="IMDb" title="Go to IMDb" />
                                        </a>
                                    </td>

                                    {externalIds.facebook_id !== null
                                        ?   <td>
                                                <a href={`http://facebook.com/${externalIds.facebook_id}`} rel="noopener noreferrer" target="_blank">
                                                    <i className="ri-facebook-fill" style={{fontSize:"2.2rem"}}></i>
                                                </a>
                                            </td>
                                        :   null
                                    }

                                    {externalIds.twitter_id !== null
                                        ?   <td>
                                                <a href={`http://twitter.com/${externalIds.twitter_id}`} rel="noopener noreferrer" target="_blank">
                                                    <i className="ri-twitter-fill" style={{fontSize:"2.2rem"}}></i>
                                                </a>
                                            </td>
                                        :   null
                                    }
                                    {externalIds.instagram_id !== null
                                        ?   <td>
                                                <a href={`http://instagram.com/${externalIds.instagram_id}`} rel="noopener noreferrer" target="_blank">
                                                    <i className="ri-instagram-fill" style={{fontSize:"2.2rem"}}></i>
                                                </a>
                                            </td>
                                        :   null
                                    }
                            </tr>
                        </table>

                            <p className="card--desc" style={{marginTop:"20px"}}>{show.overview}</p>

                            <WatchInfo movie={show} source="tv" />

                            <ActorInfo cast={cast} />

                            <TvModal details={details} similars={similars} seasons={seasons} />
                        </div>
                    </td>
                </tr>
                </tbody>
            </table> 
        </div>
    )
}
