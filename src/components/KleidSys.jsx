import React, { useEffect, useRef } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, Stack, Typography, Sheet, Container, Grid } from '@mui/joy';
import gsap from 'gsap';
import ExpandableDock from './dock/ExpandableDock';
import Footer from '../components/Footer';

const KleidSys = () => {
  const heroRef = useRef(null);
  const contactBoxRef = useRef(null);
 
  return (
    <>
          <ExpandableDock />
    <Box
      sx={{
        minHeight: '100vh',
        background: '#ffffff',
        py: 8,
        marginTop: '20px',
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        display:'flex'
      }}
    >
  kleidsys
    </Box>
      <Footer />
    </>    
  );
};

export default KleidSys;