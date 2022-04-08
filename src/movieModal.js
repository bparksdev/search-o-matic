import React,{useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap';

const MovieModal = ({details, similars, recommendations}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const numberFormat = (value) =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(value)

    const revBackgroundColor = details.revenue >= details.budget ? "lightgreen" : "#ff9473"  

    return (
    <>
        {similars.total_results !== 0
            ?
            <Button variant="primary btn-lg mt-5" onClick={handleShow}>
                More Info
            </Button>
            : null
        }
        <Modal 
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show} onHide={handleClose}>
            <Modal.Header  closeButton>
                <Modal.Title><h2>{details.title} - More Info</h2></Modal.Title>
            </Modal.Header>
            <Modal.Body style={{backgroundColor:"#09243e"}}>
                <table className="table table-responsive">
                    <tr>
                        <td className="detailItems">
                            <h4>Tagline</h4>
                            "<em>{details.tagline}"</em>    
                        </td>
                    </tr>
                    <tr>
                        <td className="detailItems">
                            <h4>Production Companies</h4>
                            {details.production_companies !== undefined 
                                ? details.production_companies.map(company => (<li style={{textAlign:"left"}} key={company.id}>{company.name}</li>)) 
                                : ""
                            }
                        </td>
                    </tr>
                </table>

                <table className="table table-responsive">
                    <tr>
                        <td className="">
                            <div className="" style={{backgroundColor:`${revBackgroundColor}`,padding:"5px"}}>
                                <span>
                                    <h4 style={{display:"inline"}}>Budget: </h4>
                                    {details.budget !== 0 ? numberFormat(details.budget) : "Unknown"}
                                </span>
                                <span style={{marginLeft:"10px"}}>
                                    <h4 style={{display:"inline"}}>Revenue: </h4>
                                    {details.revenue !== 0 ? numberFormat(details.revenue) : "Unknown"}
                                </span>    
                            </div>
                        </td>
                    </tr>
                </table>    

                <table className="table table-responsive">
                    <tr>
                        <td className="detailItems">
                            <h4>If you liked "{details.title}", you might like...</h4>
                            <ul>
                            {recommendations.results !== undefined
                                ? recommendations.results.map(movie => (
                                    <li key={movie.id}> 
                                        <a href={`/movie/${movie.title}/${movie.id}`}>{movie.title}</a>
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
                <Button variant="secondary btn-lg" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </>
    )
}
export default MovieModal
//<Link className="article-list-item" key={key} to={`/article/${article.name}`}>
                