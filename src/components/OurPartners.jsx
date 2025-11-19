import React, { useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Stack,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ExpandableDock from './dock/ExpandableDock';
import Footer from './Footer';
import gamorgan from '../assets/morgan.png';
import kleidsys from '../assets/kleidsys.png';
import TechnologyPartner from '../assets/technologyPartner.png';
import MarketingPartner from '../assets/marketingPartner.png';

gsap.registerPlugin(ScrollTrigger);

export default function OurPartners() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const partnerRefs = useRef([]);
  const theme = useTheme();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Partner sections with Observer pattern
      partnerRefs.current.forEach((partner, index) => {
        if (partner) {
          const image = partner.querySelector('.partner-image');
          const content = partner.querySelector('.partner-content');
          const logo = partner.querySelector('.partner-logo');
          const details = partner.querySelectorAll('.detail-item');

          // Image animation with parallax
          gsap.fromTo(
            image,
            {
              opacity: 0,
              scale: 1.1,
              x: index === 0 ? 50 : -50,
            },
            {
              opacity: 1,
              scale: 1,
              x: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: partner,
                start: 'top 75%',
                end: 'bottom 25%',
                toggleActions: 'play none none none',
              },
            }
          );

          // Content animation
          gsap.fromTo(
            content,
            {
              opacity: 0,
              x: index === 0 ? -50 : 50,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              delay: 0.2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: partner,
                start: 'top 75%',
              },
            }
          );

          // Logo pop animation
          if (logo) {
            gsap.fromTo(
              logo,
              {
                scale: 0,
                rotation: -180,
              },
              {
                scale: 1,
                rotation: 0,
                duration: 0.8,
                delay: 0.4,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                  trigger: partner,
                  start: 'top 75%',
                },
              }
            );
          }

          // Details stagger animation
          gsap.fromTo(
            details,
            {
              opacity: 0,
              y: 20,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.1,
              delay: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: partner,
                start: 'top 75%',
              },
            }
          );

          // Parallax effect on scroll
          gsap.to(image, {
            y: -30,
            ease: 'none',
            scrollTrigger: {
              trigger: partner,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const partners = [
    {
      type: 'Marketing Partner',
      name: 'GA Morgan Dynamics Private Limited',
      address: '1421, Poorvi - Ground Floor',
      street: '13th Main, B-Block, Sahakar Nagar',
      city: 'Bangalore - 560092, Karnataka, India',
      image: MarketingPartner,
      // 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&auto=format&fit=crop&q=80',
      imageAlt: 'Marketing team collaboration',
      logo: gamorgan,
    },
    {
      type: 'Technology Partner',
      name: 'Kleidsys Technologies Private Limited',
      address: '1421,Old Palace Theater Building - 2nd Floor',
      street: 'Cherry Road Agraharam',
      city: 'Salem - 636008, TamilNadu, India',
      image: TechnologyPartner,
      // 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80',
      imageAlt: 'Technology workspace',
      logo: kleidsys,
    },
  ];

  return (
    <>
      <ExpandableDock />
      <Box
        ref={sectionRef}
        sx={{
          py: { xs: 6, md: 10 },
          background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%)',
          position: 'relative',
          overflow: 'hidden',
          marginTop: { '30px': '0px', 'md': '50px' },
        }}
      >
        <Container maxWidth="lg">
          {/* Section Title */}
          <Box
            ref={titleRef}
            sx={{
              textAlign: 'center',
              marginBottom: { xs: 5, md: 8 },
            }}
          >

            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                fontSize: { xs: '2.1rem', md: '3.5rem' },
                mb: 2,
                color: '#0ea5e9',
                letterSpacing: '-0.5px',
                textAlign: 'center',
                // fontWeight: 700,
                // fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
                // color: '#1e293b',
              }}
            >
              Our Partners
            </Typography>

            <Typography
              variant="overline"
              sx={{
                color: '#3b82f6',
                fontWeight: 600,
                fontSize: '0.875rem',
                letterSpacing: '1.5px',
                display: 'block',
                mb: 1,
              }}
            >
              Strategic Partnerships
            </Typography>
          </Box>

          {/* Partners Sections */}
          <Stack spacing={{ xs: 6, md: 10 }}>
            {partners.map((partner, index) => (
              <Box
                key={index}
                ref={(el) => (partnerRefs.current[index] = el)}
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: index === 0 ? 'row' : 'row-reverse' },
                  gap: { xs: 4, md: 6 },
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                {/* Image Side */}
                <Box
                  className="partner-image"
                  sx={{
                    flex: { xs: '1', md: '0 0 48%' },
                    position: 'relative',
                    width: '100%',
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        // background: 'linear-gradient(135deg, rgba(59, 131, 246, 0.45) 0%, rgba(37, 100, 235, 0.56) 50%)',
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.7) 0%, rgba(37, 100, 235, 0.39) 100%)',
                        // background: `linear-gradient(135deg, rgba(34, 211, 238, 0.4) 0%, #22d3ee79 100%)`,
                        //  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.7) 0%, rgba(37, 99, 235, 0.6) 100%)',
                        zIndex: 1,
                      },
                    }}
                  >
                    <img
                      src={partner.image}
                      alt={partner.imageAlt}
                      style={{
                        width: '100%',
                        height: '400px',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />

                    {/* Logo Overlay */}
                    <Box
                      className="partner-logo"
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 120,
                        height: 120,
                        borderRadius: '50%',
                        background: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '6px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                        zIndex: 2,
                        padding: '10px',
                      }}
                    >
                      {/* Dynamically render different logo based on partner */}
                      <img
                        src={partner.logo}
                        alt={`${partner.name} Logo`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain'
                        }}
                      />
                    </Box>
                  </Box>
                </Box>

                {/* Content Side */}
                <Box
                  className="partner-content"
                  sx={{
                    flex: { xs: '1', md: '0 0 48%' },
                    width: '100%',
                  }}
                >
                  <Stack spacing={3}>
                    {/* Type Badge */}
                    <Box className="detail-item">
                      <Typography
                        variant="overline"
                        sx={{
                          display: 'inline-block',
                          color: '#ffffff',
                          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                          px: 2,
                          py: 0.75,
                          borderRadius: '8px',
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          letterSpacing: '1.2px',
                          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                        }}
                      >
                        {partner.type}
                      </Typography>
                    </Box>

                    {/* Company Name */}
                    <Box className="detail-item">
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 700,
                          color: '#1e293b',
                          fontSize: { xs: '1.5rem', md: '1.75rem' },
                          lineHeight: 1.3,
                          mb: 1,
                        }}
                      >
                        {partner.name}
                      </Typography>
                      <Box
                        sx={{
                          width: '60px',
                          height: '4px',
                          background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)',
                          borderRadius: '2px',
                        }}
                      />
                    </Box>

                    {/* Address Details */}
                    <Stack spacing={2} className="detail-item">
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 1.5,
                          p: 2.5,
                          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(37, 99, 235, 0.02) 100%)',
                          borderRadius: '12px',
                          borderLeft: '4px solid #3b82f6',
                        }}
                      >
                        <LocationOnIcon
                          sx={{
                            color: '#3b82f6',
                            fontSize: '1.5rem',
                            mt: 0.3,
                            flexShrink: 0,
                          }}
                        />
                        <Box>
                          <Typography
                            variant="body1"
                            sx={{
                              color: '#475569',
                              lineHeight: 1.7,
                              fontSize: '0.95rem',
                              fontWeight: 500,
                            }}
                          >
                            {partner.address}
                            <br />
                            {partner.street}
                            <br />
                            {partner.city}
                          </Typography>
                        </Box>
                      </Box>
                    </Stack>

                    {/* Decorative Element */}
                    <Box
                      className="detail-item"
                      sx={{
                        display: { xs: 'none', md: 'block' },
                        width: '80px',
                        height: '3px',
                        background: 'linear-gradient(90deg, #3b82f6 0%, transparent 100%)',
                        borderRadius: '2px',
                        mt: 1,
                      }}
                    />
                  </Stack>
                </Box>
              </Box>
            ))}
          </Stack>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
