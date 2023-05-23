import React, { useEffect, useState } from 'react'
import { MovieService } from '../services'
import { useParams } from 'react-router-dom';
import './MovieDetails.css'
import CastMember from './CastMember';

export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        async function GetMovieDetails() {
            const result = await MovieService.GetMovieDetails(id);
            console.log(result);
            setMovie(result);
        }

        async function GetMovieCast() {
            const result = await MovieService.GetMovieCast(id);
            setMovie(prevMovie => ({
                ...prevMovie,
                cast: result.cast,
            }));
        }

        GetMovieDetails();
        GetMovieCast();
    }, [])

    function convertMinutesToHours(minutes) {
        let h = Math.floor(minutes / 60);
        let m = minutes % 60;
        return `${h}h ${m}m`;
    }


    return (
        <>
            <div className='w-100 bg-red d-flex header' style={
                {
                    backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movie?.backdrop_path})`
                }
            }>
                <div className='d-flex poster'>
                    <img src={`https://image.tmdb.org/t/p/w300${movie?.poster_path}`}></img>

                    <div className='d-flex flex-col flex-wrap px-5 pt-4 details'>
                        <h2>{movie?.title}</h2>
                        <div className='d-flex flex-wrap'>
                            <p>{movie?.release_date} </p>
                            <p>({movie?.original_language?.toUpperCase()})</p>

                            {movie?.genres?.map((genre) => {
                                return <p>• {genre?.name} </p>
                            })}

                            <p>• {convertMinutesToHours(movie?.runtime)}</p>
                        </div>
                        <p className='mt-5'>{movie?.tagline}</p>
                        <p className='mt-5'>{movie?.overview}</p>
                    </div>
                </div>
            </div>

            <div className='d-flex'>
                <div className='d-flex m-5 overflow-auto'>
                    {movie?.cast?.map((member) => {
                        return <CastMember castmember={member} />
                    })}
                </div>
                <div className='d-flex'>

                </div>
            </div>
        </>
    );
}
