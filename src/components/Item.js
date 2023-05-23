import React from 'react'
import { Link } from 'react-router-dom';
import './item.css'

function Item({ movie }) {
    return (
        <Link to={`/movie/${movie?.id}`}>
            <div className="single-portfolio cursor-pointer">
                <div className="single-portfolio-img">
                    <img src={`https://image.tmdb.org/t/p/w300${movie?.poster_path}`} alt="portfolio" />
                    <div className="score bg-yellow-400 font-bold rounded-xl p-2 mb-3 ms-3">{movie?.vote_average}</div>
                </div>
                <div className="portfolio-content">
                    <h2>{movie?.title}</h2>
                    <div className="review">
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Item;
