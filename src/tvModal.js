import React,{useState} from 'react'
import Modal from 'react-bootstrap/Modal'

import { Button } from 'react-bootstrap';

const TvModal = ({details, similars, seasons, recommendations}) => {
    const [show, setShow] = useState(false);
    const [expandedEpisodes, setExpandedEpisodes] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    var seasonInfo = null

    const toggleEpisode = (id) => {
        setExpandedEpisodes(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    }

    try {
        seasonInfo = seasons.map((season,key) => (
        <h5 key={key}>
            <span style={{display:"block",borderBottom:"1px solid gray",cursor:"pointer",marginBottom:"5px"}} onClick={() => toggleEpisode(`season-${season.season_number}`)}>
                Season {season.season_number}
                &nbsp;({Array.isArray(season.episodes) ? season.episodes.length : 0} episodes)
                <br />
            </span>
            <div>
                {season.episodes.map((episode,ekey) => {
                    const eid = episode.id || `${season.season_number}-${episode.episode_number}`;
                    const isExpanded = expandedEpisodes.includes(eid);
                    return (
                        <div key={ekey} style={{marginLeft: '2ch', marginBottom: '0.4em'}}>
                            <div className="episodes" style={{cursor: 'pointer'}} onClick={() => toggleEpisode(eid)}>
                                {episode.episode_number !== undefined ? <strong>{episode.episode_number}. </strong> : ''}{episode.name}
                                {episode.air_date ? <span style={{marginLeft:'0.5ch', fontSize:'0.9em', color:'#ddd'}}>({episode.air_date})</span> : null}
                            </div>
                            {isExpanded && episode.overview ? (
                                <div className="episode-overview" style={{marginLeft:'1ch', marginTop:'0.25em', color:'#e6eef8'}}>{episode.overview}</div>
                            ) : null}
                        </div>
                    )
                })}
            </div>
        </h5>))
    } catch (e) {
        seasonInfo = "Not available"
    }

    return (
    <>
        <Button variant="primary btn-lg mt-5" onClick={handleShow}>
            More Info
        </Button>
  
        <Modal 
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show} onHide={handleClose} style={{opacity: "0.9"}}>
            <Modal.Header closeButton>
                <Modal.Title><h2>{details.name} - More Info</h2></Modal.Title>
            </Modal.Header>
            <Modal.Body style={{backgroundColor:"#09243e"}}>
                <table className="table">
                    <tr>
                        <td className="detailItems" style={{width:"100%"}}>
                            <strong>AIR DATES:</strong> {details.first_air_date} to {details.last_air_date}
                        </td>
                    </tr>
                    <tr>
                        <td className="detailItems">
                                <strong>GENRE(S):</strong>
                                {Array.isArray(details.genres) ? (
                                    <ul style={{listStyle: 'none', marginLeft: '2ch', paddingLeft: 0}}>
                                        {details.genres.map(genre => (<li key={genre.id}>{genre.name}</li>))}
                                    </ul>
                                ) : ""}
                        </td>
                    </tr>
                    <tr>
                        <td className="detailItems">
                                <strong>RATING:</strong> {details.vote_average} out of 10
                        </td>    
                    </tr>
                    <tr>
                        <td className="detailItems">
                                <strong>ORIGINAL NETWORK(S):</strong>
                            {Array.isArray(details.networks) ? (
                                <ul style={{listStyle: 'none', marginLeft: '2ch', paddingLeft: 0}}>
                                    {details.networks.map(network => (<li key={network.id}>{network.name}</li>))}
                                </ul>
                            ) : ""}
                        </td>
                    </tr>
                    <tr>
                        <td className="detailItems">
                                <strong>Seasons</strong>
                                <span> {details.number_of_seasons}</span><br />
                                <strong># Of Episodes</strong>
                                <span> {details.number_of_episodes}</span><br />
                                <strong>Created By</strong>
                                {details.created_by !== undefined 
                                    ? (
                                        <ul style={{listStyle: 'none', marginLeft: '2ch', paddingLeft: 0}}>
                                            {details.created_by.map(creator => (<li style={{textAlign:"left"}} key={creator.id}>{creator.name}</li>))}
                                        </ul>
                                      )
                                    : ""
                                }
                        </td>
                    </tr>
                </table>
                <table className="table">
                    <tr>
                        <td className="detailItems" style={{textAlign:"left"}}>
                            <h4 className="blueHeader">Episodes By Season</h4>
                            <div style={{maxHeight:"400px",overflowX:"scroll"}}>
                                {seasonInfo}
                            </div>    
                        </td>
                    </tr>
                    {/* <tr>
                        <td className="detailItems" style={{textAlign:"left"}}>
                            <h4 className="blueHeader">Similar Shows</h4>
                            <div style={{maxHeight:"400px",overflowX:"scroll"}}>
                                <ul>
                                {similars.results !== undefined
                                    ? similars.results.map(show => (
                                        <li key={show.id}> 
                                            <a href={`/show/${show.name}`}>{show.name}</a>
                                        </li>                                        
                                        )) 
                                    : "None"
                                }
                                </ul>
                            </div>                                
                        </td>
                    </tr> */}

                </table>     

                <table className="table table-responsive">
                    <tr>
                        <td className="detailItems">
                            <h4 className="blueHeader">If you liked "{details.name}", you might like...</h4>
                            <ul style={{listStyle: 'none', marginLeft: '2ch', paddingLeft: 0}}>
                            {recommendations.results !== undefined
                                ? recommendations.results.map(show => (
                                    <li key={show.id}> 
                                        <a href={`/show/${show.original_name}/${show.id}`}>{show.original_name}</a>
                                    </li>                                        
                                )) 
                                : "None"
                            }
                            </ul>
                        </td>
                    </tr>
                </table>   
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </>
    )
}
export default TvModal
//<Link className="article-list-item" key={key} to={`/article/${article.name}`}>
                