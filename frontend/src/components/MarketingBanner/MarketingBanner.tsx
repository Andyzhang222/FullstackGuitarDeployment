import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';

interface SlideProps {
  backgroundColor: string;
}

const BannerContainer = styled('div')({
  width: '100%',
  height: '522px',
  backgroundColor: '#D9D9D9',
  position: 'relative',
  overflow: 'hidden',
  margin: '0 auto',
});

const Slide = styled('div')<SlideProps>(({ backgroundColor }) => ({
  width: '100%',
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

const MarketingBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33']; // Example colors for slides

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % colors.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <BannerContainer>
      {colors.map((color, index) => (
        <Slide
          key={index}
          backgroundColor={color}
          style={{ display: index === currentSlide ? 'flex' : 'none' }}
        >
          Slide {index + 1}
        </Slide>
      ))}
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
