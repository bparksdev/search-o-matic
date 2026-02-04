import React from 'react'
import {NavLink} from 'react-router-dom'

const NavBar = () => {
    return (
        <div className="header">
            <div style={{paddingBottom:"4px"}}>
                
                <h1 className="title">
                    Where Can I Watch It?
                </h1>
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

                    <li>
                        <NavLink
                            to="/my-list"
                            activeClassName="currentnav"
                        >
                            My List
                        </NavLink>
                    </li>

                </ul>
            </nav>
        </div>
        )
    }

export default NavBar