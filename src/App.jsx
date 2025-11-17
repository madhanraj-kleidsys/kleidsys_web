// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import TransitionUp from './components/shutters/TransitionUp.jsx'
// import ShutterScreen from './components/shutters/ShutterScreen.jsx'
// import Transition from './components/transition';
// import HomePage from './components/HomePage.jsx'
// function App() {
//   return (
//     <>
//       {/* <ShutterScreen/> */}
      
//     </>
//   )
// }

// export default App

import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { theme } from './theme/theme';
import ShutterScreen from './components/shutters/ShutterScreen.jsx';
import Header from './components/Header'
import HeroSection from './components/HeroSection';
import BenefitsSection from './components/BenefitsSection';
import FeaturesSection from './components/FeaturesSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

function App() {
  return (
    <>
    {/* < ShutterScreen /> */}

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ width: '100%', minHeight: '100vh' }}>
        <Header />
        <HeroSection />
        <BenefitsSection />
        <FeaturesSection />
        <CTASection />
        <Footer />
      </Box>
    </ThemeProvider>  
    </>

  );
}

export default App;