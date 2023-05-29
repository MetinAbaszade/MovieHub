import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Movie from './Movie';

export default function Carousel({ movies }) {
    const responsive = {
        0: {
            items: 1,
            slidesToSlide: 1 // <-- slides to slide on extra small devices
        },
        568: {
            items: 2,
            slidesToSlide: 2 // <-- slides to slide on small devices
        },
        1024: {
            items: 3,
            slidesToSlide: 3 // <-- slides to slide on large devices
        },
    };

    const items = movies.map((movie) => (
        <Movie key={movie.id} movieDetails={movie} />
    ));


    return(
        <AliceCarousel 
            items={items}
            responsive={responsive}
            autoPlay
            autoPlayInterval={2000}
            controlsStrategy="responsive"
            infinite
            disableButtonsControls 
        />
    );
}
