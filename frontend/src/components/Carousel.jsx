import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, // optional, hides prev/next buttons
  };

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <Slider {...settings}>
        <div>
          <img
            src="./images/carousel1.jpg"
            alt="slide1"
            style={{ width: "100%", height: "500px", objectFit: "cover" }}
          />
        </div>
        <div>
          <img
            src="./images/carousel2.jpg"
            alt="slide2"
            style={{ width: "100%", height: "500px", objectFit: "cover" }}
          />
        </div>
        <div>
          <img
            src="./images/carousel3.jpg"
            alt="slide3"
            style={{ width: "100%", height: "500px", objectFit: "cover" }}
          />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
