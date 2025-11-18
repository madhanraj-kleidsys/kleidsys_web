// import React from 'react';
// import { ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import { Box } from '@mui/material';
// import { theme } from './theme/theme';
import React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import { CssBaseline, Box } from '@mui/joy';
import ExpandableDock from './components/dock/ExpandableDock';

import ShutterScreen from './components/shutters/ShutterScreen.jsx';
import Header from './components/Header'
import HeroSection from './components/HeroSection';
import BenefitsSection from './components/BenefitsSection';
import FeaturesSection from './components/FeaturesSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

import Navbar from './components/NavBar';

function App() {
  return (
    <>
      <CssVarsProvider>
        <CssBaseline />
        <Box
          sx={{
            minHeight: '100vh',
            background: 'linear-gradient(180deg, #8d8383ff 0%, #f8fafb 50%, #5aa1e9d8 100%)',
          }}
        >
          <ExpandableDock />
          {/* <HeroSection /> */}
        </Box>
      </CssVarsProvider>


      {/* <Navbar /> */}
      {/* < ShutterScreen /> */}
      {/* <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ width: '100%', minHeight: '100vh' }}>
        <Header />
        <HeroSection />
        <BenefitsSection />
        <FeaturesSection />
        <CTASection />
        <Footer />
      </Box>
    </ThemeProvider>     */}
    </>
  );
}

export default App;