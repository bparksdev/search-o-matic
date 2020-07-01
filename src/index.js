import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import './css/style.css';
import NavBar from "./NavBar"
import MovieDisplay from "./movieDisplay";
import TvDisplay from "./tvDisplay";
import PeopleDisplay from "./peopleDisplay";
import SearchMovies from "./searchMovies";
import SearchTV from "./searchTV";
import SearchPeople from "./searchPeople";

class Main extends React.Component {
    state = {
        loading: true
      };    
      componentDidMount() {
        // this simulates an async action, after which the component will render the content
        demoAsyncCall().then(() => this.setState({ loading: false }));
      }    
  render() {
    const { loading } = this.state;
    
    if(loading) { // if your component doesn't have to wait for an async action, remove this block 
      return null; // render null when app is not ready
    }      
    return (
        <Router> 
        <div className="container">
          <span id="poweredby" style={{fontSize:"1rem",paddingRight:"5px",color:"white"}}>
              Powered By 
              <a href="https://developers.themoviedb.org/3/getting-started/introduction" rel="noopener noreferrer" target="_blank">The Movie Database API</a>
          </span>
          <NavBar/>
            <div>
                <Switch>
                    <Route path = "/show/:query" component={TvDisplay} />
                    <Route path = "/movie/:query/:movieId" component={MovieDisplay} />
                    <Route path = "/people/:query" component={PeopleDisplay} />
                    <Route path="/movies" component={SearchMovies} />
                    <Route path="/shows" component={SearchTV} />
                    <Route path="/people" component={SearchPeople} />
                </Switch>           
            </div>
        </div>
        </Router>
    );
  }
}
function demoAsyncCall() {
    return new Promise((resolve) => setTimeout(() => resolve(), 1000));
  }
ReactDOM.render(<Main />, document.getElementById('root'));
