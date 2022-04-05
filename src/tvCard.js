import React, {useState, useEffect} from "react"
import TvModal from "./tvModal"
import ActorInfo from "./components/actorInfo"
//import { isArray } from "util"
import imdbLogo from "./assets/images/imdb.png"

export default function TvCard({show}) {
    const [details, setDetails] = useState([])
    const [cast, setCast] = useState([])
    const [similars, setSimilars] = useState([])
    const [externalIds, setExternalIDs] = useState([])
    const [providers, setProviders] = useState([])
    const [seasons, setSeasons] = useState([])
    const allSeasons = []
 
    useEffect(() => {
        getDetails()    
        getCast()
        getSimilars()
        getExternalIDs()
        getProviders()
    }, [])

    useEffect(() => {
        getSeasons()
    }, [details])    
    
    
    var dispDate = new Date(show.first_air_date)
    const getDetails = async () => {
        const url = `https://api.themoviedb.org/3/tv/${show.id}?api_key=017579ded6888c915f4b861b1f93aec6&language=en-US`;
        const res = await fetch(url);
        const data  = await res.json(); 
        setDetails(data)    

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

    const getProviders = async () => {
        const url = `https://api.themoviedb.org/3/tv/${show.id}/watch/providers?api_key=017579ded6888c915f4b861b1f93aec6&language=en-US`
        const res = await fetch(url);
        const providers  = await res.json()
        setProviders(providers)
        //console.log(!providers.results)
        if( providers.results.US ) {
        console.log( providers.results.US )
        }
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
                    </td>
                    <td>
                        <div className="card--content" key={show.id}>
                            <h3 className="card--title">
                                {show.name} ({dispDate.getFullYear()})
                                <span style={{float:"right"}}>
                                    <a href={`https://imdb.com/title/${externalIds.imdb_id}`} rel="noopener noreferrer" target="_blank">
                                        <img src={imdbLogo} className="imdb-logo" alt="IMDb" title="Go to IMDb" />
                                    </a>
                                    {externalIds.facebook_id !== null
                                        ?   <a href={`http://facebook.com/${externalIds.facebook_id}`} rel="noopener noreferrer" target="_blank">
                                                <i className="ri-facebook-fill" style={{fontSize:"2.2rem"}}></i>
                                            </a>
                                        :   null
                                    }
                                    {externalIds.twitter_id !== null
                                        ?   <a href={`http://twitter.com/${externalIds.twitter_id}`} rel="noopener noreferrer" target="_blank">
                                                <i className="ri-twitter-fill" style={{fontSize:"2.2rem"}}></i>
                                            </a>
                                        :   null
                                    }
                                    {externalIds.instagram_id !== null
                                        ?   <a href={`http://instagram.com/${externalIds.instagram_id}`} rel="noopener noreferrer" target="_blank">
                                                <i className="ri-instagram-fill" style={{fontSize:"2.2rem"}}></i>
                                            </a>
                                        :   null
                                    }
                                    
                                </span>
                            </h3>
                            <div className="row">
                                <div className="col-sm-2">
                                    <small>AIR DATES:<br />{show.first_air_date} to {details.last_air_date}</small>
                                </div>
                                <div className="col-sm-2">
                                    <small>SEASONS:<br />{details.number_of_seasons}<br />({details.number_of_episodes} episodes)</small>
                                </div>                                
                                <div className="col-sm-4">
                                    <small>
                                        GENRE(S):<br />
                                        {Array.isArray(details.genres) ? details.genres.map(genre => (<li key={genre.id}>{genre.name}</li>)) : ""}
                                    </small>
                                </div>
                                <div className="col-sm-2">
                                    <small>
                                        RATING:<br />{show.vote_average} out of 10
                                    </small>
                                </div>
                                <div className="col-sm-2">
                                    <small style={{fontWeight:"600"}}>
                                    ORIGINAL NETWORK(S):<br />
                                    {Array.isArray(details.networks) ? details.networks.map(network => (<li key={network.id}>{network.name}</li>)) : ""}
                                    </small>
                                </div>                                
                            </div>
                            <div className="row">
                                <div className="col-sm-12" style={{padding:"10px", border:"2px solid gray",marginTop:"10px"}}>
                                    <h4>WATCH OPTIONS</h4>
                                    <h5 style={{backgroundColor:"rgb(109, 142, 170)",padding:"5px",color:"white"}}>Buy/Rent:</h5>
                                    {providers.results && providers.results.US && Array.isArray(providers.results.US.buy) 
                                        ? providers.results.US.buy.map(
                                            buyoption => (
                                                <div key={buyoption.provider_id} style={{display:"inline-block",width:"70px",height:"70px",marginRight:"10px"}}>
                                                    <img className=""  src={`https://image.tmdb.org/t/p/w200/${buyoption.logo_path}`} style={{width:"100%",height:"100%",marginBottom:"3px"}} />
                                                </div>
                                            )
                                        ) 
                                        : "N/A"
                                    }
                                    <h5 style={{backgroundColor:"rgb(109, 142, 170)",padding:"5px",color:"white",marginTop:"4px"}}>Streaming:</h5>
                                    {providers.results && providers.results.US && Array.isArray(providers.results.US.flatrate) 
                                        ? providers.results.US.flatrate.map(
                                            rentoption => (
                                                <div key={rentoption.provider_id} style={{display:"inline-block",width:"70px",height:"70px",marginRight:"10px"}}>
                                                    <img className=""  src={`https://image.tmdb.org/t/p/w200/${rentoption.logo_path}`} style={{width:"100%",height:"100%"}} />
                                                </div>
                                            )
                                        ) 
                                        : "N/A"
                                    }                                    
                                   
                                </div>    
                            </div>

                            <ActorInfo cast={cast} />

                            <p className="card--desc" style={{marginTop:"20px"}}>{show.overview}</p>
                            <TvModal details={details} similars={similars} seasons={seasons} />
                        </div>
                    </td>
                </tr>
                </tbody>
            </table> 
        </div>
    )
}
