import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSaveMovie } from '../redux/savedMoviesSlice';

function Movie({ movieDetails }) {
    const dispatch = useDispatch();
    console.log("movieDetails.id: " + movieDetails.id)
    const selectIsMovieSaved = (state, movieId) => state.savedMovies.includes(movieId);

    const isMovieSaved = useSelector(state => {
        console.log("state.savedMovies: ")
        console.log(state.savedMovies)
        console.log('movieDetails.id')
        console.log(movieDetails.id)
        console.log("includes " + state.savedMovies.includes(movieDetails.id));
        return selectIsMovieSaved(state, movieDetails.id)
    });

    function toggleSaveMovieHandle(event) {
        event.preventDefault();
        dispatch(toggleSaveMovie(movieDetails.id))
    }

    return (
        <Link to={`/movie/${movieDetails.id}`}>
            <div className="single-portfolio cursor-pointer">
                <div className="single-portfolio-img mt-5">
                    <img src={`https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`} alt="movieposter" style={{ height: "400px" }} />
                    <button className={`save-movie-button ${isMovieSaved ? 'saved' : ''}`} onClick={toggleSaveMovieHandle}>
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
