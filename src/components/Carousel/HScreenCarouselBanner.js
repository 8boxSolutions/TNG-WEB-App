import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdArrowBack, MdArrowBackIos, MdArrowForward, MdArrowForwardIos } from 'react-icons/md';
import "./carousel.css"
import { useRef } from 'react';
import { useEffect } from 'react';

export function HScreenCarouselBanner({items}) {
    const videoRef = useRef(null);

    const PrevArrow = (props) => (
        <button {...props} className="slick-arrow slick-prev">
            <MdArrowBackIos color='black'/>
        </button>
    );
      
    const NextArrow = (props) => (
        <button {...props} className="slick-arrow slick-next">
            <MdArrowForwardIos color='black'/>
        </button>
    );
      
    const settings = {
        dots: true,
        infinite: true,
        speed: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PrevArrow/>,
        nextArrow: <NextArrow/>,
    };
    useEffect(() => {
      const videoElement = videoRef.current;
  
      if (videoElement) {
          const playPromise = videoElement.play();
  
          playPromise.catch(error => {
              if (error.name === "NotAllowedError" || error.name === "NotSupportedError") {
                  // Handle error cases where autoplay is not allowed or not supported
                  console.error("Video playback error:", error.message);
              } else if (error.name === "AbortError") {
                  // Video playback was interrupted
                  console.error("Video playback was interrupted:", error.message);
              } else {
                  // Other types of errors
                  console.error("An error occurred during video playback:", error);
              }
          });
      }
    }, []);
  
    return (
        <Slider {...settings}>
          {items.map((item) => (
            <div key={item.id} className="h-screen">
              {item.type === 'img' ? (
                <img src={item.imageSrc} alt={item.id} className="carousel-image" />
              ) : (
                <video ref={videoRef} autoPlay muted className="carousel-video">
                  <source src={item.imageSrc} type="video/mp4" />
                </video>
              )}
            </div>
          ))}
        </Slider>
    )
}
