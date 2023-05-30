// Libraries
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
// Services
import { MovieService } from '../services'
// Components
import Navbar from './Navbar'
import Footer from './main/Footer'
import MovieList from './MovieList';

export default function SavedMovies() {
  const [savedMovies, setSavedMovies] = useState([]);
  const savedMovieIds = useSelector((state) => state.savedMovies);

  async function getMovieDetails(movieId) {
    let result = await MovieService.getMovieDetails(movieId);
    return result
  }

  async function DownloadSavedMovies() {
    const promises = savedMovieIds.map(id => getMovieDetails(id));
    const results = await Promise.allSettled(promises);
    const resolvedMovies = results
      .filter(result => result.status === 'fulfilled')
      .map(result => result.value);
    setSavedMovies(resolvedMovies);
  }

  useEffect(() => {
    DownloadSavedMovies();
  }, [savedMovieIds])

  return (
    <div className="mainContainer">
      <Navbar />
      <div className='mx-5 mb-5'>
        <MovieList movies={savedMovies} />
      </div>
      <Footer className="footer" />
    </div>
  )
}
