import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Container,
  useScrollTrigger,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
// import kleidHome from '../assets/kleidHome.png';
import kleidHome from '../assets/undefined.png';

export default function Header() {
  const theme = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  return (
    <AppBar
      position="fixed"
      sx={{
        background: trigger ? 'rgba(255, 255, 255, 0.82)' : 'transparent',
        backdropFilter: trigger ? 'blur(10px)' : 'none',
        boxShadow: trigger ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none',
        transition: 'all 0.3s ease-out',
        zIndex: 1200,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo & Brand */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <img src={kleidHome} alt="KleidSys" style={{ height: 40, width: 'auto' }} />
            {/* <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color:  theme.palette.primary.main,
                // color: trigger ? theme.palette.primary.main : '#ffffff',
              }}
            >
              KleidSys
            </Typography> */}
          </Box>

          {/* Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
            {/* Solutions , 'Contact' */}
            {['Home', 'About', 'KleidSys', 'Our Partners'].map((item) => (
              <Typography
                key={item}
                sx={{
                  color:theme.palette.text.primary,
                  // color: trigger ? theme.palette.text.primary : '#ffffff',
                  cursor: 'pointer',
                  transition: 'color 0.3s',
                  '&:hover': {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>

          {/* CTA Button */}
          <Button
            variant="contained"
            sx={{
              background: trigger
                ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
                : '#ffffff',
              color: trigger ? '#ffffff' : theme.palette.primary.main,
            }}
          >
            {/* Get Started */}
            Contact Us
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
  
}