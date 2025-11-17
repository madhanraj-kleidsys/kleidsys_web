import React, { useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturesSection() {
  const featureRef = useRef([]);
  const theme = useTheme();

  useEffect(() => {
    featureRef.current.forEach((feature, index) => {
      gsap.fromTo(
        feature,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          delay: (index % 3) * 0.1,
          scrollTrigger: {
            trigger: feature,
            start: 'top 85%',
            markers: false,
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, []);

  const features = [
    'Time & Action',
    'Sampling & Costing',
    'Production Planning',
    'Quality Control',
    'Inventory Management',
    'Logistics & Shipping',
    'Finance & Accounting',
    'HRMS',
    'E-Commerce',
    'Analytics & BI',
  ];

  return (
    <Box sx={{ py: 10, background: '#ffffff' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            marginBottom: 6,
            fontWeight: 700,
            color: theme.palette.text.primary,
          }}
        >
          Complete <span style={{ color: theme.palette.primary.main }}>ERP Solution</span>
        </Typography>

        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Paper
                ref={(el) => (featureRef.current[index] = el)}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  background: `linear-gradient(135deg, ${theme.palette.primary.light}15 0%, ${theme.palette.secondary.light}15 100%)`,
                  border: `2px solid ${theme.palette.primary.main}30`,
                  borderRadius: '8px',
                  transition: 'all 0.3s ease-out',
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                  }}
                >
                  {feature}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}