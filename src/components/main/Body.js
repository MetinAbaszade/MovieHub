// Libraries
import React, { useEffect, useRef, useState } from 'react'
import { debounce } from 'lodash';
// Services
import { MovieService } from '../../services'
// Custom Hooks
import useIntersectionObserver from '../../customhoks/useIntersectionObserver'
// Components
import MovieList from '../MovieList'
import FilterForm from '../FilterForm'
// Styles
import '../../assets/style.css'
import '../../assets/responsive.css'

const INITIAL_PAGE = 1;

export default function Body() {
    const [movies, setMovies] = useState([]);
    const [filter, setFilter] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [lastMoviePage, setLastMoviePage] = useState(INITIAL_PAGE);
    const [activeCategory, setActiveCategory] = useState('popular');

    const movieListStartRef = useRef(null);
    // Ref for the boundary div used to trigger infinite scroll when it comes into view
    const bottomBoundaryRef = useRef(null);
    // useIntersectionObserver is a custom hook for observing when user reached to the end of the movie list
    const isIntersecting = useIntersectionObserver(bottomBoundaryRef, { threshold: 1 });


    // Fetches movies from the API for the given page and applies active category and filter
    async function fetchMovies(page) {
        try {
            // If there's a searchTerm, use searchMovies from MovieService
            // Otherwise use getMovies
            const result = searchTerm
                ? await MovieService.searchMovies(searchTerm, page, filter)
                : await MovieService.getMovies(activeCategory, page, filter);
            return result.results;
        } catch (error) {
            console.log(error)
        }
    };


    // This useEffect hook fetches movies when Category or filter have been changed
    useEffect(() => {
        setIsLoading(true);
        setLastMoviePage(INITIAL_PAGE);
        fetchMovies(INITIAL_PAGE)
            .then(fetchedMovies => {
                setMovies(fetchedMovies)
                setIsLoading(false);
            });

        // Scroll to the start of movie list whenever category or filter changes
        if (window.pageYOffset > movieListStartRef.current.offsetTop) {
            movieListStartRef.current.scrollIntoView({
                behavior: 'smooth', // Optional: animate the scroll
            });
        }
    }, [activeCategory, filter, searchTerm])

    // This useEffect hook is for handling infinite scroll and loading more movies
    useEffect(() => {
        if (isIntersecting && !isLoading) {
            setIsLoadingMore(true);
            fetchMovies(lastMoviePage + 1)
                .then(fetchedMovies => {
                    setMovies((prevState) => [...prevState, ...fetchedMovies]);
                    setIsLoadingMore(false);
                });
            setLastMoviePage((prevState) => prevState + 1);
        }
    }, [isIntersecting]);


    function handleCategoryClick(category) {
        setActiveCategory(category);
    };

    async function handleSearchChange(e) {
        const movietitle = e.target.value;
        setSearchTerm(movietitle);
        setLastMoviePage(INITIAL_PAGE);
    }
    // Debounce function to delay search till user has stopped typing for 300ms
    const debouncedSearch = debounce(handleSearchChange, 300);

    return (
        <section className='portfolio-area pt-60 mb-5' ref={movieListStartRef}>
            <div className='container'>
                {/* Latest / Comming Soon / Top Rated / Recently Released */}
                <div className='sticky' >
                    <div className='row flexbox-center'>
                        <div className='header-right  col-5 ms-5'>
                            <input type='text' className='search-input' onChange={debouncedSearch} placeholder='Search' />
                        </div>
                        <div className='col text-center text-lg-right'>
                            <div className='portfolio-menu text-center'>
                                <ul>
                                    <li onClick={handleCategoryClick.bind(null, 'popular')}
                                        className={activeCategory === 'popular' ? 'active' : ''}>Popular</li>
                                    <li onClick={handleCategoryClick.bind(null, 'now_playing')}
                                        className={activeCategory === 'now_playing' ? 'active' : ''}>Now Playing</li>
                                    <li onClick={handleCategoryClick.bind(null, 'top_rated')}
                                        className={activeCategory === 'top_rated' ? 'active' : ''}>Top Rated</li>
                                    <li onClick={handleCategoryClick.bind(null, 'upcoming')}
                                        className={activeCategory === 'upcoming' ? 'active' : ''}>Upcoming Movies</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>

                <div className='d-flex'>
                    <div className='col-lg-9'>
                        {isLoading ? (
                            <div className='loading mt-4'>
                                <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]' role='status'>
                                    <span className='absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <>
                                <MovieList movies={movies} />
                                {movies.length >= 20 && <div id='boundary' ref={bottomBoundaryRef}></div>}
                                {isLoadingMore ? (
                                    <div className='loading mt-4'>
                                        <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]' role='status'>
                                            <span className='absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>Loading...</span>
                                        </div>
                                    </div>
                                ) : ''}
                            </>)}

                    </div>
                    <div className='text-center text-lg-left'>
                        <FilterForm setMovies={setMovies} activeCategory={activeCategory} setFilter={setFilter}
                            filter={filter} />
                    </div>
                </div>
            </div>
        </section>
    )
}
