import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Stack, Sheet } from '@mui/joy';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ExpandableDock from './dock/ExpandableDock';
import Footer from './Footer';
import Abtfoundation from '../assets/Abtfoundation.png';
import Abtvision from '../assets/Abtvisions4.0.png';
import Abtimplement2 from '../assets/Abtimplement2.png';
import Abdigitali from '../assets/Abdigital.png';

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    // Smooth skew effect like the CodePen example
    let proxy = { skew: 0 },
      skewSetter = gsap.quickSetter('.skew-section', 'skewY', 'deg'),
      clamp = gsap.utils.clamp(-20, 20);

    let scrollDist = 0;
    let requestId = null;

    function onScroll() {
      scrollDist = window.scrollY || window.pageYOffset;
      if (!requestId) {
        requestAnimationFrame(applySkew);
      }
    }

    function applySkew() {
      let lastScroll = scrollDist,
        current = window.scrollY || window.pageYOffset,
        velocity = current - lastScroll;
      proxy.skew = clamp(velocity * 0.13);
      skewSetter(proxy.skew);
      requestId = null;
    }

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fade-in GSAP on sections & image
  useEffect(() => {
    gsap.utils.toArray('.reveal-section').forEach((section) => {
      gsap.fromTo(
        section,
        { autoAlpha: 0, y: 70 },
        {
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
          duration: 1,
          autoAlpha: 1,
          y: 0,
          ease: 'power3.out',
        }
      );
    });
    gsap.utils.toArray('.about-img').forEach(img => {
      gsap.fromTo(img, { autoAlpha: 0, y: 40, scale: 0.97 }, {
        scrollTrigger: {
          trigger: img,
          start: 'top 85%',
          end: 'bottom 40%',
          toggleActions: 'play none none reverse',
        },
        duration: 1.2,
        autoAlpha: 1,
        y: 0,
        scale: 1,
        ease: 'power2.out',
      });
    });
  }, []);

  return (
    <>
      <ExpandableDock />
      <Box
        ref={wrapperRef}
        sx={{
          minHeight: '100vh',
          background: '#fcfdff',
          color: '#334155',
          marginTop: {'30px': '0px', 'md': '50px' },
          pt: { xs: 2, md: 7 },
          pb: 10,
          px: { xs: 1, md: 0 },
        }}
      >
        <Container sx={{ mb: 10 }}>
          <Typography
            level="h1"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '2.1rem', md: '3.8rem' },
              mb: 2,
              color: '#0ea5e9',
              letterSpacing: '-0.5px',
              textAlign: 'center',
            }}
          >
            About Us
          </Typography>
          <Typography
            level="body-lg"
            sx={{
              maxWidth: '716px',
              mx: 'auto',
              color: '#64748b',
              textAlign: 'center',
              fontSize: { xs: 18, md: 22 },
              fontWeight: 500,
              mb: 4,
            }}
          >
            We're a technology-driven team with decades of industry expertise, helping organizations succeed through innovation, transparency, and smart implementation.
          </Typography>
        </Container>

        {/* Foundation Section */}
        <Container className="reveal-section skew-section" sx={{ mb: 14 }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            alignItems="center"
            spacing={{ xs: 5, md: 8 }}
          >
            <Box flex={1}>
              <Typography
                level="h2"
                sx={{
                  fontWeight: 800,
                  color: '#0ea5e9',
                  mb: 2,
                  fontSize: { xs: '1.5rem', md: '2.4rem' },
                }}
              >
                Foundation
              </Typography>
              <Typography
                level="body-lg"
                sx={{
                  color: '#334155',
                  fontSize: { xs: 16, md: 20 },
                }}
              >
                FashionONE ERP is a creation of more than 20 years experienced experts in Apparel Industry domain together with highly skilled software coding team ready to challenge the new technology innovations in Software industry that helps today’s manufacturing simplified.
              </Typography>
            </Box>
            <Box flex={1} textAlign="center">
              <img src={Abtfoundation}
                alt="Modern ERP Foundation"
                className="about-img"
                style={{ width: '85%', borderRadius: 18, boxShadow: '0 6px 40px #bae6fd88' }}
              />
            </Box>
          </Stack>
        </Container>

        {/* Our Vision Section */}
        <Container className="reveal-section skew-section" sx={{ mb: 14 }}>
          <Stack
            direction={{ xs: 'column-reverse', md: 'row' }}
            alignItems="center"
            spacing={{ xs: 5, md: 8 }}
          >
            <Box flex={1} textAlign="center">
              <img src={Abtvision}
                alt="Team vision analytics"
                className="about-img"
                style={{ width: '85%', borderRadius: 18, boxShadow: '0 6px 40px #bae6fd60' }}
              />
            </Box>
            <Box flex={1}>
              <Typography
                level="h2"
                sx={{
                  fontWeight: 800,
                  color: '#0ea5e9',
                  mb: 2,
                  fontSize: { xs: '1.5rem', md: '2.4rem' },
                }}
              >
                Our Vision
              </Typography>
              <Typography
                level="body-lg"
                sx={{
                  color: '#334155',
                  fontSize: { xs: 16, md: 20 },
                }}
              >
                To bring the best innovative, modern technology machineries and software together to optimize factory manufacturing process through IoT and Data Analytic, thus enabling smart factory (Industry 4.0) in action for Apparel Industry.
              </Typography>
            </Box>
          </Stack>
        </Container>

        {/* Implementation Section */}
        <Container className="reveal-section skew-section" sx={{ mb: 14 }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            alignItems="center"
            spacing={{ xs: 5, md: 8 }}
          >
            <Box flex={1}>
              <Typography
                level="h2"
                sx={{
                  fontWeight: 800,
                  color: '#0ea5e9',
                  mb: 2,
                  fontSize: { xs: '1.5rem', md: '2.4rem' },
                }}
              >
                {/* Implementation */}
                Digitilization
              </Typography>
              <Typography
                level="body-lg"
                sx={{
                  color: '#334155',
                  fontSize: { xs: 16, md: 20 },
                }}
              >
                Digital technologies are transforming the apparel supply chain and manufacturing by challenging old operating models. We Kleidsys Technologies transforming the apparel supply chain from design, manufacturing, distribution and sales into digital technology
                {/* Our expertise and Engineering team will study in deep of each application and process to recommend the most suitable automation solution based on your need and budget and get it implemented at its best efficiency. */}
              </Typography>
            </Box>
            <Box flex={1} textAlign="center">
              {/* <img src={Abtimplement2} */}
              <img src={Abdigitali}
                alt="Implementation consulting illustration"
                className="about-img"
                style={{ width: '85%', borderRadius: 18, boxShadow: '0 6px 40px #bae6fd75' }}
              />
            </Box>
          </Stack>
        </Container>

        <Container className="reveal-section skew-section"
        //  sx={{ mb: 1 }}
         >
          <Stack
            direction={{ xs: 'column-reverse', md: 'row' }}
            alignItems="center"
            spacing={{ xs: 5, md: 8 }}
          >
            <Box flex={1} textAlign="center">
              <img src={Abtimplement2}
                alt="Team vision analytics"
                className="about-img"
                style={{ width: '80%', borderRadius: 18, boxShadow: '0 6px 40px #bae6fd60' }}
              />
            </Box>
            <Box flex={1}>
              <Typography
                level="h2"
                sx={{
                  fontWeight: 800,
                  color: '#0ea5e9',
                  mb: 2,
                  fontSize: { xs: '1.5rem', md: '2.4rem' },
                }}
              >
                Implementation
              </Typography>
              <Typography
                level="body-lg"
                sx={{
                  color: '#334155',
                  fontSize: { xs: 16, md: 20 },
                }}
              >
                {/* Digital technologies are transforming the apparel supply chain and manufacturing by challenging old operating models. We Kleidsys Technologies transforming the apparel supply chain from design, manufacturing, distribution and sales into digital technology           
                 */}
                Our expertise and Engineering team will study in deep of each application and process to recommend the most suitable automation solution based on your need and budget and get it implemented at its best efficiency.
              </Typography>
            </Box>
          </Stack>
        </Container>

        {/* Footer section for some polish */}
        {/* <Box sx={{ mt: 20, textAlign: 'center', color: '#7dd3fc', fontWeight: 500 }}>
          &copy; {new Date().getFullYear()} KleidSys Technology Private Limited. All rights reserved.
        </Box> */}
      </Box>
      <Footer />
    </>
  );
};

export default AboutUs;
