import React from 'react'

const Footer = () => {
    return (
        <div id="footer" style={{
            fontSize:"1.3rem",
            padding:"20px 5px",
            color:"white",
            textAlign:"center",
            marginTop:"40px",
            backgroundColor:"#1a1a1a",
            borderTop:"2px solid #6d8eaa"
        }}>
            Powered By 
            &nbsp;
            <a href="https://developers.themoviedb.org/3/getting-started/introduction" rel="noopener noreferrer" target="_blank">The Movie Database API</a> 
            &nbsp;and <a href="https://www.justwatch.com/" rel="noopener noreferrer" target="_blank">JustWatch</a>
            <div style={{fontSize:"1.2rem",color:"#e0e0e0",marginTop:"10px"}}>&copy; 2025 SkrapHeap Development</div>
        </div>
    )
}

export default Footer
