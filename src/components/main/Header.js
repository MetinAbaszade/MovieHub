
// Libraries
import React, { useEffect, useState } from 'react' 
// Components
import Navbar from '../Navbar'
import Carousel from '../Carousel'
// Services
import { MovieService } from '../../services' 

const INITIAL_PAGE = 1;

export default function Header() {
    const [popularMovies, setPopularMovies] = useState([]); 

    useEffect(() => {
        MovieService.getMovies("popular", INITIAL_PAGE)
            .then(result => setPopularMovies(result.results))
    }, [])

  return (
      <header className="header">
          <div className="container">
              <Navbar />
              <Carousel movies={popularMovies.slice(0, 6)} />
          </div>
      </header>
  )
}
