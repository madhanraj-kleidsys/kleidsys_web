import { Box } from '@mui/material';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import AboutUs from './components/AboutUs';
import OurPartners from './components/OurPartners';
import ContactUs from './components/ContactUs';
import ExpandableDock from './components/dock/ExpandableDock';
import ShutterScreen from './components/shutters/ShutterScreen';
function App() {
  return (
    <Router>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(180deg, #8d8383ff 0%, #f8fafb 50%, #5aa1e9d8 100%)',
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ShutterScreen />
                <HeroSection />
              </>
            }
          />
          {/* <Route path="/" element={<HeroSection />} /> */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/kleidsys" element={<div>KleidSys Page</div>} />
          <Route path="/partners" element={<OurPartners />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;