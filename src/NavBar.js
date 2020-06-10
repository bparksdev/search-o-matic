import React from 'react'
import {NavLink} from 'react-router-dom'

const NavBar = () => {
    return (
        <div>
            <h1 className="title">
                TV/Movie Search-O-Matic
            </h1>

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