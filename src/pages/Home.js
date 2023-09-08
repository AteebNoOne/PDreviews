import React, { useState, useEffect, useRef } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Button, Typography, Box, Grid, Rating } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const carouselContainerStyle = {
  maxWidth: '600px',
  margin: '0 auto',
  textAlign: 'center',
};

const imageStyle = {
  height: '250px', // Set your desired height
  width: '100%', // Maintain the aspect ratio
};

const slideContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const slides = [
  {
    image:
      'https://www.insperity.com/wp-content/uploads/Employee_development_1200x630.png',
    name: 'Slide 1',
    reviewText: 'This is the review text for Slide 1',
    reviewStars: 2,
  },
  {
    image:
      'https://www.pacific-research.com/wp-content/uploads/2020/04/shutterstock_251380513.jpg',
    name: 'Slide 2',
    reviewText: 'This is the review text for Slide 2',
    reviewStars: 3,
  },
  {
    image:
      'https://etimg.etb2bimg.com/photo/84575476.cms',
    name: 'Slide 3',
    reviewText: 'This is the review text for Slide 3',
    reviewStars: 4,
  },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        const nextSlide = (currentSlide + 1) % slides.length;
        setCurrentSlide(nextSlide);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [currentSlide, isHovered]);

  const handlePrevClick = () => {
    const prevSlide = (currentSlide - 1 + slides.length) % slides.length;
    setCurrentSlide(prevSlide);
  };

  const handleNextClick = () => {
    const nextSlide = (currentSlide + 1) % slides.length;
    setCurrentSlide(nextSlide);
  };

  return (
    <div
      style={carouselContainerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Rating
                  name={`stars-${index}`}
                  value={slide.reviewStars}
                  readOnly
                  max={5}
                />
              </Box>
            </div>
          </div>
        ))}
      </Carousel>
      <Box mt={2}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePrevClick}
              startIcon={<KeyboardArrowLeftIcon />}
            >
              Prev
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextClick}
              endIcon={<KeyboardArrowRightIcon />}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Home;
