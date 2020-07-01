import React,{useState} from 'react'
import Modal from 'react-bootstrap/Modal'

import { Button } from 'react-bootstrap';

const TvModal = ({details, similars, seasons}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    var seasonInfo = null

    try {
        seasonInfo = seasons.map(season => (
        <h5>
            Season {season.season_number}
            <ol>
                {season.episodes.map((episode,key) => 
                    <li className="episodes" key={key} title={episode.air_date + ": " + episode.overview} style={{cursor:"default"}}>{episode.name}</li>
                )}
            </ol>
        </h5>))
    } catch (e) {
        seasonInfo = "Not available"
    }

    return (
    <>
        <Button variant="primary" onClick={handleShow}>
          More Info
        </Button>
  
        <Modal 
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title><h2>{details.name} - More Info</h2></Modal.Title>
            </Modal.Header>
            <Modal.Body style={{backgroundColor:"#09243e"}}>
                <div className="row">
                    <div className="col-sm-2">
                        <img 
                            src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${details.poster_path}`} 
                            style={{width:"100%"}}
                            alt="show poster"
                        />
                    </div>
                    <div className="col-sm-10">
                        <div className="row text-center">
                            <div className="col-sm-5 detailItems">
                                <h4>Seasons</h4>
                                <span>{details.number_of_seasons}</span>
                                <h4># Of Episodes</h4>
                                <span>{details.number_of_episodes}</span><br />
                            </div>
                            <div className="col-sm-6 detailItems">
                                <h4>Created By</h4>
                                {details.created_by !== undefined 
                                    ? details.created_by.map(creator => (<li style={{textAlign:"left"}} key={creator.id}>{creator.name}</li>)) 
                                    : ""
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-5 detailItems" style={{textAlign:"left"}}>
                                <h4>Similar shows</h4>
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
                            <div className="col-sm-6 detailItems episode-list" style={{textAlign:"left"}}>
                                <h4>Epsodes By Season</h4>
                                {seasonInfo}
                            </div>    
                        </div>
                    </div>
                </div>
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
                