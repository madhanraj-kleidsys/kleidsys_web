
import React, { useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Paper,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import kleidHome from '../assets/kleidHome1.png';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    const image = imageRef.current;
    const textOverlay = textRef.current;
    const overlay = overlayRef.current;

    gsap.to(image, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
        pin: true,
        markers: false,
      },
      scale: 0.3 + 1.2,
      y: -100,
      ease: 'none',
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(image, {
          scale: 0.3 + progress * 1.2,
          y: -100 * progress,
        });
        gsap.set(textOverlay, {
          opacity: 1 - progress * 1.2,
          y: 50 * progress,
        });
        gsap.set(overlay, {
          opacity: 0.5 - progress * 0.2, // Overlay fades as you scroll
        });
      },
    });

    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '60px',
      }}
    >
      {/* Full-Size Hero Image */}
      <Box
        ref={imageRef}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          overflow: 'hidden',
          transformOrigin: 'center center',
        }}
      >
        <img
          src={kleidHome}
          alt="KleidSys Hero"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </Box>

      {/* Black Overlay */}
      <Box
        ref={overlayRef}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 2,
          transition: 'opacity 0.3s ease-out',
        }}
      />

      {/* Centered Text Overlay */}
      <Box
        ref={textRef}
        sx={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
          maxWidth: '900px',
          px: 4,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            background: `linear-gradient(135deg, #60a5fa 0%, #22d3ee 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: 2,
            fontWeight: 800,
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem', lg: '5rem' },
          }}
        >
          KleidSys
        </Typography>

        <Typography
          variant="h4"
          sx={{
            color: '#e0e7ff',
            marginBottom: 1,
            fontWeight: 600,
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
          }}
        >
          AI-Powered ERP Solution
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: '#cbd5e1',
            marginBottom: 4,
            fontWeight: 400,
            fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
            maxWidth: '700px',
          }}
        >
          Enterprise Resource Planning for Fashion & Apparel Industry
        </Typography>

        {/* CTA Buttons */}
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={2} 
          justifyContent="center" 
          sx={{ flexWrap: 'wrap' }}
        >
          <Button
            variant="contained"
            size="large"
            sx={{
              background: `linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)`,
              boxShadow: '0 10px 30px rgba(14, 165, 233, 0.3)',
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              '&:hover': {
                boxShadow: '0 15px 40px rgba(14, 165, 233, 0.4)',
                transform: 'scale(1.05)',
              },
            }}
          >
            Explore Now
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{
              borderColor: '#ffffff',
              color: '#ffffff',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderColor: '#ffffff',
              },
            }}
          >
            Contact Us
          </Button>
        </Stack>
      </Box>

      {/* Scroll Indicator */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.875rem' }}>
          Scroll to explore
        </Typography>
        <Box
          sx={{
            animation: 'bounce 2s infinite',
            '@keyframes bounce': {
              '0%, 100%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(-10px)' },
            },
          }}
        >
          <ArrowDownwardIcon sx={{ color: '#ffffff', fontSize: '1.5rem' }} />
        </Box>
      </Box>
    </Box>
  );
}


