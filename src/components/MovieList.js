import React from 'react'
import Movie from './Movie'

export default function MovieList({ movies }) {
    return (
        <div className=" d-flex flex-wrap justify-content-between mx-4">
            {movies.map((movie) => (
                <Movie key={movie.id} movieDetails={movie} />
            ))}
        </div>
    )
}
