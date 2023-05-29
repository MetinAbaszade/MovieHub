// Libraries
import React, { useEffect, useRef, useState } from 'react'
import { debounce } from 'lodash';
// Services
import { CookieService, MovieService } from '../services'
// Custom Hooks
import useIntersectionObserver from './useIntersectionObserver'
// Components
import Navbar from './Navbar'
import Footer from './Footer'
import Carousel from './Carousel'
import MovieList from './MovieList'
import FilterForm from './FilterForm'
// Styles
import '../assets/style.css'
import '../assets/responsive.css'

const INITIAL_PAGE = 1;

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [filter, setFilter] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [lastMoviePage, setLastMoviePage] = useState(INITIAL_PAGE);
    const [activeCategory, setActiveCategory] = useState('popular');
    // This useRef is used for implementing infinite scroll
    const bottomBoundaryRef = useRef(null);
    // useIntersectionObserver is a custom hook for observing when user reached to the end of the movie list
    const isIntersecting = useIntersectionObserver(bottomBoundaryRef, { threshold: 1 });


    // This function fetches movies from API
    async function fetchMovies(page) {
        setIsLoading(true);

        const cookieData = CookieService.getCookieData('savedMovies');
        const savedMovieIds = cookieData || [];

        try {
            const result = await MovieService.GetMovies(activeCategory, page, filter)

            // NOTE: map is "pure" function, it does not mutate or modify anything, instead it returns new array
            result.results = result.results.map(movie => ({
                ...movie,
                saved: savedMovieIds.includes(movie.id)
            }));

            setIsLoading(false);
            return result.results;
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        console.log("insideeee")
        fetchMovies(INITIAL_PAGE)
            .then(fetchedMovies => setPopularMovies(fetchedMovies));
    }, [])


    // This useEffect hook fetches movies when Category or filter have been changed
    useEffect(() => {
        setLastMoviePage(INITIAL_PAGE);
        fetchMovies(INITIAL_PAGE)
            .then(fetchedMovies => setMovies(fetchedMovies));
    }, [activeCategory, filter])

    // This useEffect hook is for handling infinite scroll and loading more movies
    useEffect(() => {
        if (isIntersecting && !isLoading) {
            fetchMovies(lastMoviePage + 1)
                .then(fetchedMovies => { setMovies((prevState) => [...prevState, ...fetchedMovies]);});
            setLastMoviePage((prevState) => prevState + 1);
        }
    }, [isIntersecting]);


    async function handleSearchChange(e) {
        const movietitle = e.target.value;
        if (movietitle) {
            try {
                const result = await MovieService.SearchMovies(movietitle, INITIAL_PAGE);
                setMovies([...result.results]);
                return;
            } catch (error) {
                console.log(error)
            }
        }
        fetchMovies(INITIAL_PAGE);
        setLastMoviePage(INITIAL_PAGE);
    }

    const debouncedSearch = debounce(handleSearchChange, 300);

    function handleCategoryClick(category) {
        setActiveCategory(category);
    };

    return (
        <>
            <header className="header">
                <div className="container">
                    <Navbar />
                    <Carousel movies={popularMovies.slice(0, 6)} />
                </div>
            </header>

            <section className="portfolio-area pt-60">
                <div className="container">
                    {/* Latest / Comming Soon / Top Rated / Recently Released */}
                    <div id='searchandfilter'>
                        <div className="row flexbox-center">
                            <div className="header-right">
                                <form action="#">
                                    <input type="text" onChange={debouncedSearch} />
                                    <button><i className="icofont icofont-search"></i></button>
                                </form>
                            </div>
                            <div className="col-lg-6 text-center text-lg-right">
                                <div className="portfolio-menu">
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

                    <div className="d-flex">
                        <div className='col-lg-9'>

                            <MovieList movies={movies} />
                            {movies.length >= 20 && <div id="boundary" ref={bottomBoundaryRef}></div>}
                        </div>
                        <div className="text-center text-lg-left">
                            <FilterForm setMovies={setMovies} activeCategory={activeCategory} setFilter={setFilter}
                                filter={filter} />
                        </div>
                    </div>
                </div>
            </section>

            <section className="video ptb-90">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title pb-20">
                                <h1><i className="icofont icofont-film"></i> Trailers & Videos</h1>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-md-9">
                            <div className="video-area">
                                <img src="/img/video/video1.png" alt="video" />
                                <a href="https://www.youtube.com/watch?v=RZXnugbhw_4" className="popup-youtube">
                                    <i className="icofont icofont-ui-play"></i>
                                </a>
                                <div className="video-text">
                                    <h2>Angle of Death</h2>
                                    <div className="review">
                                        <div className="author-review">
                                            <i className="icofont icofont-star"></i>
                                            <i className="icofont icofont-star"></i>
                                            <i className="icofont icofont-star"></i>
                                            <i className="icofont icofont-star"></i>
                                            <i className="icofont icofont-star"></i>
                                        </div>
                                        <h4>180k voters</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="row">
                                <div className="col-md-12 col-sm-6">
                                    <div className="video-area">
                                        <img src="/img/video/video2.png" alt="video" />
                                        <a href="https://www.youtube.com/watch?v=RZXnugbhw_4" className="popup-youtube">
                                            <i className="icofont icofont-ui-play"></i>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-md-12 col-sm-6">
                                    <div className="video-area">
                                        <img src="/img/video/video3.png" alt="video" />
                                        <a href="https://www.youtube.com/watch?v=RZXnugbhw_4" className="popup-youtube">
                                            <i className="icofont icofont-ui-play"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="news">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title pb-20">
                                <h1><i className="icofont icofont-coffee-cup"></i> Latest News</h1>
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>
                <div className="news-slide-area">
                    <div className="news-slider">
                        <div className="single-news">
                            <div className="news-bg-1"></div>
                            <div className="news-date">
                                <h2><span>NOV</span> 25</h2>
                                <h1>2017</h1>
                            </div>
                            <div className="news-content">
                                <h2>The Witch Queen</h2>
                                <p>Witch Queen is a tall woman with a slim build. She has pink hair, which is pulled up under her hat, and teal eyes.</p>
                            </div>
                            <a href="/">Read More</a>
                        </div>
                        <div className="single-news">
                            <div className="news-bg-2"></div>
                            <div className="news-date">
                                <h2><span>NOV</span> 25</h2>
                                <h1>2017</h1>
                            </div>
                            <div className="news-content">
                                <h2>The Witch Queen</h2>
                                <p>Witch Queen is a tall woman with a slim build. She has pink hair, which is pulled up under her hat, and teal eyes.</p>
                            </div>
                            <a href="/">Read More</a>
                        </div>
                        <div className="single-news">
                            <div className="news-bg-3"></div>
                            <div className="news-date">
                                <h2><span>NOV</span> 25</h2>
                                <h1>2017</h1>
                            </div>
                            <div className="news-content">
                                <h2>The Witch Queen</h2>
                                <p>Witch Queen is a tall woman with a slim build. She has pink hair, which is pulled up under her hat, and teal eyes.</p>
                            </div>
                            <a href="/">Read More</a>
                        </div>
                    </div>
                    <div className="news-thumb">
                        <div className="news-next">
                            <div className="single-news">
                                <div className="news-bg-3"></div>
                                <div className="news-date">
                                    <h2><span>NOV</span> 25</h2>
                                    <h1>2017</h1>
                                </div>
                                <div className="news-content">
                                    <h2>The Witch Queen</h2>
                                    <p>Witch Queen is a tall woman with a slim build. She has pink hair, which is pulled up under her hat, and teal eyes.</p>
                                </div>
                                <a href="/">Read More</a>
                            </div>
                        </div>
                        <div className="news-prev">
                            <div className="single-news">
                                <div className="news-bg-2"></div>
                                <div className="news-date">
                                    <h2><span>NOV</span> 25</h2>
                                    <h1>2017</h1>
                                </div>
                                <div className="news-content">
                                    <h2>The Witch Queen</h2>
                                    <p>Witch Queen is a tall woman with a slim build. She has pink hair, which is pulled up under her hat, and teal eyes.</p>
                                </div>
                                <a href="/">Read More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}
