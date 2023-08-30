import React from 'react'
import {NavLink} from 'react-router-dom'

const NavBar = () => {
    return (
        <div className="header">
            <div style={{paddingBottom:"4px"}}>
                
                <h1 className="title">
                    TV/Movie Search-O-Matic &trade;
                </h1>
                <div id="poweredby" style={{fontSize:"1.3rem",paddingRight:"5px",color:"white",textAlign:"center"}}>
                    Powered By 
                    &nbsp;
                    <a href="https://developers.themoviedb.org/3/getting-started/introduction" rel="noopener noreferrer" target="_blank">The Movie Database API</a> 
                    &nbsp;and <a href="https://www.justwatch.com/" rel="noopener noreferrer" target="_blank">JustWatch</a>
                    <div style={{fontSize:"1.2rem",color:"#e0e0e0",textAlign:"center"}}>&copy; 2023 SkrapHeap Development</div>
                </div>
            </div>            

            <nav>
                <ul>
                    <li>
                        <NavLink 
                            to="/movies"
                            activeClassName="currentnav"
                        >
                            Movies
                        </NavLink>
                    </li>
                    <li>
                    <NavLink 
                            to="/shows"
                            activeClassName="currentnav"
                        >
                            TV
                        </NavLink>
                    </li>
                    <li>
                    <NavLink 
                            to="/people"
                            activeClassName="currentnav"
                        >
                            People
                        </NavLink>
                    </li>

                </ul>
            </nav>
        </div>
        )
    }

export default NavBar