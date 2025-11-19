import { Box } from '@mui/joy';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import AboutUs from './components/AboutUs';
import KleidSys from './components/KleidSys'; 
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
          <Route path="/" element={<HeroSection showShutter={true} />} />
          <Route path="/about" element={<AboutUs showShutter={false} />} />
          <Route path="/kleidsys" element={<KleidSys showShutter={false} />} />
          <Route path="/partners" element={<OurPartners showShutter={false} />} />
          <Route path="/contact" element={<ContactUs showShutter={false} />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;