import React, {useState, useEffect} from "react";

export default function WatchInfo({movie}) {
   
    const [providers, setProviders] = useState([])
    // eslint-disable-next-line
    const getProviders = () => {
        fetch( `https://api.themoviedb.org/3/${arguments[0].source}/${movie.id}/watch/providers?api_key=017579ded6888c915f4b861b1f93aec6&language=en-US` )
            .then( res => res.json() )
            .then( providers => {
                setProviders(providers)
            })    
    }
    
    useEffect(() => {
        getProviders()
    }, []) 

    return (
    <div className="row">
        <div className="col-sm-12" style={{padding:"10px 10px 24px 10px", border:"1px solid #85a5de",marginTop:"10px",borderRadius:"5px"}}>
            <h3>Where Can I Watch It?</h3>
            <h5 style={{backgroundColor:"rgb(109, 142, 170)",padding:"5px",color:"white"}}>Buy/Rent</h5>
            {providers.results && providers.results.US && Array.isArray(providers.results.US.buy) 
                ? providers.results.US.buy.map(
                    buyoption => (
                        <div key={buyoption.provider_id} style={{display:"inline-block",width:"80px",height:"80px",marginRight:"10px",marginBottom:"4px"}}>
                            <img alt=""  src={`https://image.tmdb.org/t/p/w200/${buyoption.logo_path}`} title={buyoption.provider_name} style={{width:"100%",height:"100%",marginBottom:"3px"}} />
                            
                        </div>
                    )
                ) 
                : "N/A"
            }
            <h5 style={{backgroundColor:"rgb(109, 142, 170)",padding:"5px",color:"white",marginTop:"20px"}}>Streaming</h5>
            {providers.results && providers.results.US && Array.isArray(providers.results.US.flatrate) 
                ? providers.results.US.flatrate.map(
                    rentoption => (
                        <div key={rentoption.provider_id} style={{display:"inline-block",width:"80px",height:"80px",marginRight:"10px",marginBottom:"4px"}}>
                            <img alt=""  src={`https://image.tmdb.org/t/p/w200/${rentoption.logo_path}`} title={rentoption.provider_name} style={{width:"100%",height:"100%"}} />
                        </div>
                    )
                ) 
                : "N/A"
            }                                    
           
        </div>    
    </div>        
    )

}