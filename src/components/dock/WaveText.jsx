import React, { useEffect, useRef } from 'react';
import { Typography } from '@mui/joy';
import { gsap } from 'gsap';

const WaveText = ({ text }) => {
  const containerRef = useRef(null);
  const charsRef = useRef([]);

  useEffect(() => {
    const chars = text.split('');
    const increase = (Math.PI * 2) / chars.length;
    let counters = chars.map((_, i) => increase * i);

    const animate = () => {
      charsRef.current.forEach((char, i) => {
        if (char) {
          const weight = 100 + 900 * (Math.sin(counters[i]) / 2 + 0.5);
          char.style.fontVariationSettings = `"wght" ${weight}`;
          counters[i] -= increase * 0.02;
        }
      });
      requestAnimationFrame(animate);
    };

    animate();
  }, [text]);

  return (
    <Typography
      ref={containerRef}
      level="h3"
      sx={{
        fontWeight: 700,
        fontSize: { xs: '1.5rem', md: '2rem' },
        color: '#002060',
        fontFamily: '"Inter Variable", system-ui, sans-serif',
        letterSpacing: '0.5px',
        transition: 'all 0.3s',
        cursor: 'pointer',
        display: 'inline-flex',
        '&:hover': {
          color: '#00aff0',
          transform: 'translateX(10px)',
        },
      }}
    >
      {text.split('').map((char, i) => (
        <span
          key={i}
          ref={(el) => (charsRef.current[i] = el)}
          style={{
            display: 'inline-block',
            willChange: 'font-variation-settings',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </Typography>
  );
};

export default WaveText;