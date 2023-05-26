import React, { useCallback, useEffect, useRef, useState } from 'react'
import '..//assets/style.css'
import '..//assets/responsive.css'
import Carousel from './Carousel'
import { MovieService } from '../services'
import Movie from './Movie'
import FilterForm from './FilterForm'
import { useLocation } from 'react-router-dom'
import useIntersectionObserver from './useIntersectionObserver'

export default function Home() {
    const [movies, setMovies] = useState([]);

    const location = useLocation();
    const [activeCategory, setActiveCategory] = useState('popular');
    const [lastMoviePage, setLastMoviePage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const bottomBoundaryRef = useRef(null);
    const isIntersecting = useIntersectionObserver(bottomBoundaryRef, { threshold: 1 });

    function scrollToTop() {
        console.log("scrool icinde ay qa")
        window.scrollTo({
            top: 0,
            behavior: "smooth"  // for smooth scrolling
        });
    }

    useEffect(() => {
        if (isIntersecting && !isLoading) {
            const fetchMovies = async () => {
                var result = await GetMovies(activeCategory, lastMoviePage + 1);
                setMovies((prevstate) => [...prevstate, ...result.results]);
                setLastMoviePage((prevstate) => prevstate + 1)
            };
            fetchMovies();
        }
    }, [isIntersecting]);


    useEffect(() => {
        const fetchMovies = async () => {
            var result = await GetMovies(activeCategory, 1)
            setMovies([...result.results]);
        };
        fetchMovies();
    }, []);

    // useEffect(() => {
    //   //  scrollToTop();
    // }, [movies]); 

    async function SearchChangeHandle(e) {
        let movietitle = e.target.value;
        if (movietitle) {
            const result = await MovieService.SearchMovies(movietitle, 1);
            setMovies([...result.results]);
            return;
        }
        const result = await MovieService.GetPopularMovies();
        setMovies(result.results);
    }

    async function CategoryChangeHandle(category) {
        if (category != activeCategory) {
            setActiveCategory(category);
            setLastMoviePage(1)
            var result = await GetMovies(category, 1)
            console.log(category)
            console.log(result.results)
            setMovies([...result.results]);
        }
    }

    async function GetMovies(category, page) {
        let result;
        setIsLoading(true);
        switch (category) {
            case "popular":
                result = await MovieService.GetPopularMovies(page);
                break;
            case "now-playing":
                result = await MovieService.GetNowPlayingMovies(page);
                break;
            case "top-rated":
                result = await MovieService.GetTopRatedMovies(page);
                break;
            case "upcoming":
                result = await MovieService.GetUpcomingMovies(page);
                break;
            default:
                result = await MovieService.GetPopularMovies();
                break;
        }
        setIsLoading(false);
        return result;
    }


    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="header-area mb-3            ">
                        <div className="logo">
                            <a href="index-2.html"><img src="/img/logo.png" alt="logo" /></a>
                        </div>
                        <div className="menu-area">
                            <div className="responsive-menu"></div>
                            <div className="mainmenu">
                                <ul id="primary-menu">
                                    <li><a className="active" href="index-2.html">Home</a></li>
                                    <li><a href="movies.html">Movies</a></li>
                                    <li><a href="celebrities.html">CelebritiesList</a></li>
                                    <li><a href="top-movies.html">Top Movies</a></li>
                                    <li><a href="blog.html">News</a></li>
                                    <li><a href="#">Pages <i className="icofont icofont-simple-down"></i></a>
                                        <ul>
                                            <li><a href="blog-details.html">Blog Details</a></li>
                                            <li><a href="movie-details.html">Movie Details</a></li>
                                        </ul>
                                    </li>
                                    <li><a className="theme-btn" href="#"><i className="icofont icofont-ticket"></i> Tickets</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <Carousel movies={movies.slice(0, 6)} />
                </div>
            </header>

            <div className="login-area">
                <div className="login-box">
                    <a href="#"><i className="icofont icofont-close"></i></a>
                    <h2>LOGIN</h2>
                    <form action="#">
                        <h6>USERNAME OR EMAIL ADDRESS</h6>
                        <input type="text" />
                        <h6>PASSWORD</h6>
                        <input type="text" />
                        <div className="login-remember">
                            <input type="checkbox" />
                            <span>Remember Me</span>
                        </div>
                        <div className="login-signup">
                            <span>SIGNUP</span>
                        </div>
                        <a href="#" className="theme-btn">LOG IN</a>
                        <span>Or Via Social</span>
                        <div className="login-social">
                            <a href="#"><i className="icofont icofont-social-facebook"></i></a>
                            <a href="#"><i className="icofont icofont-social-twitter"></i></a>
                            <a href="#"><i className="icofont icofont-social-linkedin"></i></a>
                            <a href="#"><i className="icofont icofont-social-google-plus"></i></a>
                            <a href="#"><i className="icofont icofont-camera"></i></a>
                        </div>
                    </form>

                </div>
            </div>



            <section className="portfolio-area pt-60">
                <div className="container">
                    {/* Latest / Comming Soon / Top Rated / Recently Released */}
                    <div id='searchandfilter'>
                        <div className="row flexbox-center">
                            <div className="header-right">
                                <form action="#">
                                    <select>
                                        <option value="Movies">Movies</option>
                                        <option value="Movies">Tv Series</option>
                                    </select>
                                    <input type="text" onChange={SearchChangeHandle} />
                                    <button><i className="icofont icofont-search"></i></button>
                                </form>
                            </div>
                            <div className="col-lg-6 text-center text-lg-right">
                                <div className="portfolio-menu">
                                    <ul>
                                        <li onClick={() => { CategoryChangeHandle('popular') }}
                                            className={activeCategory === 'popular' ? 'active' : ''}>Popular</li>
                                        <li onClick={() => { CategoryChangeHandle('now-playing') }}
                                            className={activeCategory === 'now-playing' ? 'active' : ''}>Now Playing</li>
                                        <li onClick={() => { CategoryChangeHandle('top-rated') }}
                                            className={activeCategory === 'top-rated' ? 'active' : ''}>Top Rated</li>
                                        <li onClick={() => { CategoryChangeHandle('upcoming') }}
                                            className={activeCategory === 'upcoming' ? 'active' : ''}>Upcoming Movies</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>

                    <div className="d-flex">
                        <div className="col-lg-9 d-flex flex-wrap justify-content-between mx-4">
                            {movies.map((movie) => (
                                <Movie key={movie.id} movie={movie} />
                            ))}
                            <div id='boundary' ref={bottomBoundaryRef}></div>
                        </div>
                        <div className="text-center text-lg-left">
                            <FilterForm setMovies={setMovies} />
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
                            <a href="#">Read More</a>
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
                            <a href="#">Read More</a>
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
                            <a href="#">Read More</a>
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
                                <a href="#">Read More</a>
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
                                <a href="#">Read More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-sm-6">
                            <div className="widget">
                                <img src="/img/logo.png" alt="about" />
                                <p>7th Harley Place, London W1G 8LZ United Kingdom</p>
                                <h6><span>Call us: </span>(+880) 111 222 3456</h6>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="widget">
                                <h4>Legal</h4>
                                <ul>
                                    <li><a href="#">Terms of Use</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                    <li><a href="#">Security</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="widget">
                                <h4>Account</h4>
                                <ul>
                                    <li><a href="#">My Account</a></li>
                                    <li><a href="#">Watchlist</a></li>
                                    <li><a href="#">Collections</a></li>
                                    <li><a href="#">User Guide</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="widget">
                                <h4>Newsletter</h4>
                                <p>Subscribe to our newsletter system now to get latest news from us.</p>
                                <form action="#">
                                    <input type="text" placeholder="Enter your email.." />
                                    <button>SUBSCRIBE NOW</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>
                <div className="copyright">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 text-center text-lg-left">
                                <div className="copyright-content">
                                    <p><a target="_blank" href="https://www.templateshub.net">Templates Hub</a></p>
                                </div>
                            </div>
                            <div className="col-lg-6 text-center text-lg-right">
                                <div className="copyright-content">
                                    <a href="#" className="scrollToTop">
                                        Back to top<i className="icofont icofont-arrow-up"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    )
}
