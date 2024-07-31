import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/system';

const BannerContainer = styled('div')({
  width: '100%',
  height: '522px',
  overflow: 'hidden',
  position: 'relative',
  margin: '0 auto',
  border: '1px solid black',
});

const SliderWrapper = styled('div')({
  display: 'flex',
  transition: 'transform 0.5s ease-in-out',
  height: '100%',
});

const Slide = styled('div')<SlideProps>(({ backgroundColor }) => ({
  minWidth: '100%',
  height: '100%',
  backgroundColor,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '24px',
  color: '#fff',
}));

const IndicatorContainer = styled('div')({
  position: 'absolute',
  bottom: '20px',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
});

const Indicator = styled('img')({
  width: '12px',
  height: '12px',
});

interface SlideProps {
  backgroundColor: string;
}

const MarketingBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const colors = ['#FF5733', 'gray', '#3357FF', 'gray']; // Example colors for slides

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % colors.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [colors.length]);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  }, [currentSlide]);

  return (
    <BannerContainer>
      <SliderWrapper ref={sliderRef}>
        {colors.map((color, index) => (
          <Slide key={index} backgroundColor={color}>
            Slide {index + 1}
          </Slide>
        ))}
      </SliderWrapper>
      <IndicatorContainer>
        {colors.map((_, index) => (
          <Indicator
            key={index}
            src={
              index === currentSlide
                ? '/images/MarketingBanner/SlickActive.svg'
                : '/images/MarketingBanner/Slickinactive.svg'
            }
            alt={
              index === currentSlide ? 'Active Indicator' : 'Inactive Indicator'
            }
          />
        ))}
      </IndicatorContainer>
    </BannerContainer>
  );
};

export default MarketingBanner;
