        import React, { useEffect, useState } from 'react'
        import { MovieService } from '../services'
        import { useParams } from 'react-router-dom';
        import Movie from './Movie'
        import './MovieDetails.css'
        import CastMember from './CastMember';
        import Footer from './Footer';
import Navbar from './Navbar';

        export default function MovieDetails() {
            const { id } = useParams();
            const [movie, setMovie] = useState(null);

            function scrollToTop() {
                window.scrollTo({
                    top: 0
                });
            }

            useEffect(() => {
                async function GetMovieDetails() {
                    scrollToTop();
                    const movieDetails = await MovieService.GetMovieDetails(id);
                    const movieCast = await MovieService.GetMovieCast(id);
                    const movieExternalLinks = await MovieService.GetMovieExternalLinks(id);
                    const movieTags = await MovieService.GetMovieTags(id);
                    const movieVideos = await MovieService.GetMovieVideos(id);
                    const similarMovies = await MovieService.GetSimilarMovies(id, 1);
                    let latestTrailer;

                    const movieCrew = movieCast.crew.filter(member => {
                        return member.job === "Director" || member.job === "Writer" || member.job === "Characters";
                    });
                    
                    if (movieVideos.results.length > 0) {
                        const movieTrailers = movieVideos.results.filter((video) => video.type === 'Trailer');
                        if (movieTrailers.length > 0) {
                            latestTrailer = movieTrailers.reduce((prev, current) => {
                                return (new Date(current.published_at) > new Date(prev.published_at)) ? current : prev;
                            });
                        }
                    }

                    console.log(movieDetails)

                    setMovie({
                        ...movieDetails,
                        cast: movieCast.cast,
                        crew: movieCrew,
                        links: movieExternalLinks,
                        tags: movieTags.keywords,
                        similarMovies: similarMovies.results.slice(0, 10),
                        latestTrailer
                    });
                }


                GetMovieDetails();
            }, [id])

            function convertMinutesToHours(minutes) {
                let h = Math.floor(minutes / 60);
                let m = minutes % 60;
                return `${h}h ${m}m`;
            }


            return (
                <>
                    <Navbar />
                    
                    <div className='w-100 bg-red d-flex header' style={
                        {
                            backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movie?.backdrop_path})`
                        }
                    }>
                        <div className='d-flex poster'>
                            <img src={`https://image.tmdb.org/t/p/w300${movie?.poster_path}`} alt='movieposter'></img>

                            <div className='d-flex flex-col flex-wrap px-5 pt-4 details'>
                                <h2>{movie?.title}</h2>
                                <div className='d-flex flex-wrap mt-1'>
                                    <p className='text-base'>{movie?.release_date} </p>
                                    <p className='text-base'>({movie?.original_language?.toUpperCase()})</p>

                                    {movie?.genres?.map((genre) => {
                                        return <p className='text-base' key={genre.id}>• {genre?.name} </p>
                                    })}

                                    <p className='text-base'>• {convertMinutesToHours(movie?.runtime)}</p>
                                </div>
                                <p className='mt-5 text-sm'>{movie?.tagline}</p>
                                <div className='mt-5'>
                                    <p className='text-lg font-bold'>Overview</p>
                                    <p className='mt-2'>{movie?.overview}</p>
                                </div>
                                <div className='d-flex flex-wrap mt-4 justify-between'>
                                    {
                                        movie?.crew?.map((member, index) => (
                                            <div className='my-2' key={index}>
                                                <p className='text-base font-bold'>{member.name}</p>
                                                <p>{member.job}</p>
                                            </div>

                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='d-flex'>
                        <div className='w-3/4 overflow-auto'>
                            <div className='m-5'>
                                <div className='d-flex overflow-auto '>
                                    {movie?.cast?.map((member) => {
                                        return <CastMember key={member.cast_id} castmember={member} />;
                                    })}
                                </div>
                                <div className='mt-4 mx-5'>
                                    {movie?.latestTrailer && (
                                        <iframe
                                            src={`https://www.youtube.com/embed/${movie?.latestTrailer?.key}`}
                                            title="YouTube video player"
                                            allowFullScreen={true}
                                        ></iframe>
                                    )}
                                </div>
                                <div className='mt-5'>
                                    <h2>Similar Movies</h2>
                                    <div className='flex flex-wrap'>
                                        {
                                            movie?.similarMovies?.map((movie) => (
                                                <Movie key={movie.id} movieDetails={movie} />
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='d-flex flex-column flex-grow mt-5 w-1/4'>
                            <div className='d-flex my-3'>
                                <a href={`https://www.facebook.com/${movie?.links?.facebook_id}`} target="_blank" rel="noreferrer">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-7 w-7 mx-2"
                                        fill="currentColor"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                    </svg>
                                </a>

                                <a href={`https://twitter.com/${movie?.links?.twitter_id}`} target="_blank" rel="noreferrer">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-7 w-7  mx-2"
                                        fill="currentColor"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                    </svg>
                                </a>

                                <a href={`https://www.instagram.com/${movie?.links?.instagram_id}`} target="_blank" rel="noreferrer">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-7 w-7  mx-2"
                                        fill="currentColor"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>
                            </div>
                            <div className='ms-4'>
                                <div className='my-3'>
                                    <label className='text-base font-medium'>Status</label>
                                    <p>{movie?.status}</p>
                                </div>
                                <div className='my-3'>
                                    <label className='text-base font-medium'>Original Language</label>
                                    <p>{movie?.original_language}</p>
                                </div>
                                <div className='my-3'>
                                    <label className='text-base font-medium'>Budget</label>
                                    <p>${movie?.budget?.toLocaleString()}</p>
                                </div>
                                <div className='my-3'>
                                    <label className='text-base font-medium'>Revenue</label>
                                    <p>${movie?.revenue?.toLocaleString()}</p>
                                </div>
                            </div>
                            <div className='d-flex flex-wrap w-100'>
                                {
                                    movie?.tags?.map((tag, index) => (
                                        <p className='tag' key={index}>{tag.name}</p>
                                    ))
                                }
                            </div>
                        </div>

                    </div>

                    <Footer />
                </>
            );
        }
