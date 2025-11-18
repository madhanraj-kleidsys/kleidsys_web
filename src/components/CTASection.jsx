import React, { useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const containerRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          markers: false,
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, []);

  return (
    <Box
      sx={{
        py: 10,
        // background: `linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)`,
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
      }}
    >
      <Container maxWidth="md">
        <Box
          ref={containerRef}
          sx={{
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: '#ffffff',
              fontWeight: 700,
              marginBottom: 2,
            }}
          >
            Ready to Transform Your Business?
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: 4,
              fontWeight: 400,
            }}
          >
            Join 500+ fashion brands already using KleidSys
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#ffffff',
                color: theme.palette.primary.main,
                fontWeight: 700,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
                fontWeight: 700,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: '#ffffff',
                },
              }}
            >
             Contact Us
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}