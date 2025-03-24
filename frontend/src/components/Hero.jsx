import React from 'react';
import { assest } from '../assets/assest';
import './Hero.css';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Hero = () => {
  const images = [
    assest.hero1,
    assest.hero2,
    assest.hero3,
    assest.hero4,
    assest.hero5,
    assest.hero6,
    assest.hero7
  ];

  return (
    <div className="hero-container">
      <div className="hero-left">
        <div className="hero-content">
          <h1 className="hero-title">Latest Arrivals</h1>
          <p className="hero-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus nisi, eum nesciunt corrupti molestiae sunt voluptatum nemo assumenda?
          </p>
          <div className="hero-cta">
            <p className="hero-cta-text">SHOP NOW</p>
          </div>
        </div>
      </div>

      <div className="hero-right">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt={`Latest Arrivals ${index + 1}`} className="hero-image" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;