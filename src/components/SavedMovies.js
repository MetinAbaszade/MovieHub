import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { CookieService, MovieService } from '../services'
import MovieList from './MovieList';

export default function SavedMovies() {
  const [savedMovies, setSavedMovies] = useState([]);

  async function GetMovieDetails(movieId) {
    let result = await MovieService.GetMovieDetails(movieId);
    return result
  }

  useEffect(() => {
    async function DownloadSavedMovies() {
      const cookieData = CookieService.getCookieData('savedMovies');
      const savedMovieIds = cookieData || [];
      
      const promises = savedMovieIds.map(id => GetMovieDetails(id));
      const results = await Promise.allSettled(promises);
      const resolvedMovies = results
        .filter(result => result.status === 'fulfilled')
        .map(result => result.value);
      console.log(resolvedMovies);
      setSavedMovies(resolvedMovies);
    }

    DownloadSavedMovies();
  }, [])

  return (
    <div>
      <Navbar />
      <div className='mx-5 mb-5'>
        <MovieList movies={savedMovies} />
      </div>
      <Footer />
    </div>
  )
}
