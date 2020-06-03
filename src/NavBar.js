import React from 'react'
import {Link} from 'react-router-dom'

const NavBar = () => {
    return (
        <div>
            <h1 className="title">TV/Movie Search-O-Matic</h1>
        <nav>
            <ul>
                <li>
                    <Link to="/movies">Movies</Link>
                </li>
                <li>
                    <Link to="/shows">TV</Link>
                </li>
                <li>
                    <Link to="/people">People</Link>
                </li>

            </ul>
        </nav>
            
        </div>
        )
    }

export default NavBar