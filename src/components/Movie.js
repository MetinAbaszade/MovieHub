    import React, { useState } from 'react';
    import { Link } from 'react-router-dom';
    import { CookieService } from '../services'

    function Movie({ movieDetails }) {

        const [isMovieSaved, setIsMovieSaved] = useState(movieDetails.saved);

        function toggleSaveMovie(event) {
            event.preventDefault();
            let result = CookieService.toggleSaveMovie(movieDetails.id);
            console.log(result)
            setIsMovieSaved(result);
        }

        return (
            <Link to={`/movie/${movieDetails.id}`}>
                <div className="single-portfolio cursor-pointer">
                    <div className="single-portfolio-img mt-5">
                        <img src={`https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`} alt="movieposter" style={{ height: "400px" }} />
                        <button className={`save-movie-button ${isMovieSaved ? 'saved' : ''}`} onClick={toggleSaveMovie}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                            </svg>
                        </button>
                        <div className="score bg-yellow-400 font-bold rounded-xl p-2 mb-3 ms-3">{movieDetails.vote_average}</div>
                    </div>
                    <div className="portfolio-content">
                        <h2>{movieDetails.title}</h2>
                    </div>
                </div>
            </Link>
        )
    }

    export default Movie;
