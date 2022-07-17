import React from "react";
import { Carousel } from "react-bootstrap";

const Banner = () => {
  return (
    <Carousel>
      <Carousel.Item>       
          <img
            className="d-block w-100"
            src="/images/bannerinis.jpg"
            alt="banner1"
          />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/banner2.jpg"
          alt="banner2"
        />
       
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/banner3.png"
          alt="banner3"
        />    
      </Carousel.Item>
    </Carousel>
  );
};

export default Banner;
