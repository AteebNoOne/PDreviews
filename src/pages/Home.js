import React, { useState, useEffect, useRef } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {
  Typography,
  Link,
  CircularProgress,
  IconButton, 
  ArrowBack, 
  ArrowForward, 
} from '@mui/material';
import studentsData from '../students.json'

const carouselContainerStyle = {
  maxWidth: '600px',
  margin: '0 auto',
  textAlign: 'center',
  position: 'relative',
};

const imageStyle = {
  height: '230px',
  width: '100%',
};

const slideContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const buttonStyle = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 100,
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  color: 'white',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  fontSize: '18px',
};

const prevButtonStyle = {
  ...buttonStyle,
  left: 0,
};

const nextButtonStyle = {
  ...buttonStyle,
  right: 0,
};

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const carouselRef = useRef(null);
  const slides = studentsData; // Use the imported JSON data

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const interval = setInterval(() => {
      if (!isHovered) {
        const nextSlide = (currentSlide + 1) % slides.length;
        setCurrentSlide(nextSlide);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [currentSlide, isHovered, slides]);

  const handlePrevClick = () => {
    // Move to the previous slide
    const prevSlide = (currentSlide - 1 + slides.length) % slides.length;
    setCurrentSlide(prevSlide);
  };

  const handleNextClick = () => {
    // Move to the next slide
    const nextSlide = (currentSlide + 1) % slides.length;
    setCurrentSlide(nextSlide);
  };

 
  return (
    <div
      style={carouselContainerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Add the "prev" button */}
      <IconButton
        style={prevButtonStyle}
        onClick={handlePrevClick}
      >
        Prev
      </IconButton>

      {isLoading ? (
        <div>
          <CircularProgress size={150} />
          <Typography variant="body2" component="div">
            Loading...
          </Typography>
        </div>
      ) : (
        <div>
          <Carousel
            axis='vertical'
            autoFocus={true}
            centerMode={true}
            dynamicHeight={true}
            showArrows={true}
            showStatus={true}
            showIndicators={true}
            showThumbs={true}
            thumbWidth={275}
            selectedItem={currentSlide}
            ref={carouselRef}
          >
            {slides.map((slide, index) => (
              <div key={index}>
                <img loading='lazy' src={slide.image} alt={slide.name} style={imageStyle} />
                <div style={slideContentStyle}>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    {slide.name}
                  </Typography>
                  <Typography variant="body2" component="div">
                    {slide.reviewText}
                  </Typography>
                </div>
              </div>
            ))}
          </Carousel>

          <Typography variant="body2" component="div">
            By{' '}
            <Link
              href="https://github.com/ateebNoOne/"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
            >
              Atib Ur Rehman 16417
            </Link>{' '}
            with love ❤️
          </Typography>
        </div>
      )}

      {/* Add the "next" button */}
      <IconButton
        style={nextButtonStyle}
        onClick={handleNextClick}
      >
        Next
      </IconButton>
    </div>
  );
};

export default Home;
