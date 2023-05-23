import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Item from './Item';

export default function Carousel() {
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

    const items = [
        <Item backgroundImage={"url(/img/slide1.png)"}/>,
        <Item backgroundImage={"url(/img/slide2.png)"} />,
        <Item backgroundImage={"url(/img/slide3.png)"} />,
        <Item backgroundImage={"url(/img/slide4.jpg)"} />,
        <Item backgroundImage={"url(/img/hero-area.png)"} />,
        <Item backgroundImage={"url(/img/slide2.png)"} />
    ];

    return(
        <AliceCarousel 
            items={items}
            responsive={responsive}
            autoPlay
            autoPlayInterval={1000}
            controlsStrategy="responsive"
            infinite
            disableButtonsControls 
        />
    );
}
