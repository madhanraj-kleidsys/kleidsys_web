import React, { useEffect, useRef } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, Stack, Typography, Sheet, Container, Grid } from '@mui/joy';
import gsap from 'gsap';
import ExpandableDock from './dock/ExpandableDock';
import Footer from '../components/Footer';
import contactUs from '../assets/contactUs.png';
const ContactUs = () => {
  const heroRef = useRef(null);
  const contactBoxRef = useRef(null);
  const infoCardsRef = useRef(null);

  useEffect(() => {
    // Hero title animation
    gsap.fromTo(heroRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    // Contact box animation
    gsap.fromTo(contactBoxRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
    );

    // Info cards stagger animation
    const cards = infoCardsRef.current?.querySelectorAll('.info-card');
    gsap.fromTo(cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
      }
    );
  }, []);

  const handleInputFocus = (e) => {
    gsap.to(e.target, {
      borderColor: '#06b6d4',
      boxShadow: '0 0 0 3px rgba(6, 182, 212, 0.1)',
      duration: 0.3,
    });
  };

  const handleInputBlur = (e) => {
    gsap.to(e.target, {
      borderColor: '#e2e8f0',
      boxShadow: 'none',
      duration: 0.3,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const button = e.target.querySelector('button[type="submit"]');
    
    gsap.timeline()
      .to(button, { scale: 0.95, duration: 0.1 })
      .to(button, { scale: 1, duration: 0.2 });
  };

  return (
    <>
          <ExpandableDock />
    <Box
      sx={{
        minHeight: '100vh',
        background: '#ffffff',
        py: 8,
        marginTop:{ '20px': '0px', 'md': '50px' },
      }}
    >
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box
          ref={heroRef}
          sx={{
            textAlign: 'center',
            mb: 3,
          }}
        >
          <Typography
            level="h1"
            sx={{
              fontSize: { xs: '36px', md: '45px' },
              fontWeight: 800,
              color: '#0f172a',
              // mb: 2,
              letterSpacing: '-0.5px',
            }}
          >
            Get in Touch
          </Typography>
          <Typography
            level="body-lg"
            sx={{
              fontSize: '18px',
              color: '#64748b',
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </Typography>
        </Box>

        {/* Contact Form + Image Box */}
        <Sheet
          ref={contactBoxRef}
          sx={{
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
            padding: { xs: '32px', md: '48px' },
            mb: 8,
            boxShadow: '0 20px 60px rgba(6, 182, 212, 0.2)',
          }}
        >
          <Grid
            container
            spacing={4}
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              alignItems: 'center',
            }}
          >
            {/* Contact Form */}
            <Box>
              <Typography
                level="h2"
                sx={{
                  fontSize: { xs: '28px', md: '32px' },
                  fontWeight: 700,
                  color: 'white',
                  mb: 3,
                }}
              >
                Contact Us
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={2.5}>
                  {/* Name & Email Row */}
                  <Grid container spacing={2} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                    <FormControl>
                      <FormLabel sx={{ color: 'white', fontWeight: 600, mb: 0.5, fontSize: '14px' }}>
                        Name <span style={{ color: '#fef3c7' }}>*</span>
                      </FormLabel>
                      <Input
                        placeholder="Your name"
                        required
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        sx={{
                          borderRadius: '10px',
                          padding: '12px 16px',
                          fontSize: '14px',
                          background: 'white',
                          border: '2px solid transparent',
                          transition: 'all 0.3s ease',
                          '&::placeholder': {
                            color: '#cbd5e1',
                          },
                        }}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel sx={{ color: 'white', fontWeight: 600, mb: 0.5, fontSize: '14px' }}>
                        Email <span style={{ color: '#fef3c7' }}>*</span>
                      </FormLabel>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        required
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        sx={{
                          borderRadius: '10px',
                          padding: '12px 16px',
                          fontSize: '14px',
                          background: 'white',
                          border: '2px solid transparent',
                          transition: 'all 0.3s ease',
                          '&::placeholder': {
                            color: '#cbd5e1',
                          },
                        }}
                      />
                    </FormControl>
                  </Grid>

                  {/* Website */}
                  <FormControl>
                    <FormLabel sx={{ color: 'white', fontWeight: 600, mb: 0.5, fontSize: '14px' }}>
                      Website
                    </FormLabel>
                    <Input
                      type="url"
                      placeholder="https://example.com"
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      sx={{
                        borderRadius: '10px',
                        padding: '12px 16px',
                        fontSize: '14px',
                        background: 'white',
                        border: '2px solid transparent',
                        transition: 'all 0.3s ease',
                        '&::placeholder': {
                          color: '#cbd5e1',
                        },
                      }}
                    />
                  </FormControl>

                  {/* Message */}
                  <FormControl>
                    <FormLabel sx={{ color: 'white', fontWeight: 600, mb: 0.5, fontSize: '14px' }}>
                      Add Your Comment
                    </FormLabel>
                    <Textarea
                      placeholder="Your message here..."
                      minRows={4}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      sx={{
                        borderRadius: '10px',
                        padding: '12px 16px',
                        fontSize: '14px',
                        background: 'white',
                        border: '2px solid transparent',
                        fontFamily: 'inherit',
                        transition: 'all 0.3s ease',
                        '&::placeholder': {
                          color: '#cbd5e1',
                        },
                      }}
                    />
                  </FormControl>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    sx={{
                      background: 'white',
                      color: '#0ea5e9',
                      fontWeight: 700,
                      fontSize: '14px',
                      padding: '12px 32px',
                      borderRadius: '10px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      cursor: 'pointer',
                      border: 'none',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                      '&:hover': {
                        background: '#f0f9ff',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
                      },
                      '&:active': {
                        transform: 'translateY(0)',
                      },
                    }}
                  >
                    Send Message
                  </Button>
                </Stack>
              </Box>
            </Box>

            {/* Image */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                component="img"
                src={contactUs}
                // "https://user-gen-media-assets.s3.amazonaws.com/gemini_images/a75641b4-d1d9-4925-bec9-873ca0865a3a.png"
                alt="Contact illustration"
                sx={{
                  width: '100%',
                  maxWidth: '450px',
                  height: 'auto',
                  borderRadius: '16px',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
                }}
              />
            </Box>
          </Grid>
        </Sheet>

        {/* Info Cards Section */}
        <Box ref={infoCardsRef}>
          <Typography
            level="h2"
            sx={{
              fontSize: { xs: '28px', md: '36px' },
              fontWeight: 700,
              color: '#0f172a',
              textAlign: 'center',
              mb: 5,
            }}
          >
            Operating Office
          </Typography>

          <Grid
            container
            spacing={3}
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
              gap: 3,
            }}
          >
            {/* Address Card */}
            <Sheet
              className="info-card"
              sx={{
                padding: '32px',
                borderRadius: '16px',
                background: '#ffffff',
                border: '2px solid #e2e8f0',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: '#06b6d4',
                  boxShadow: '0 10px 40px rgba(6, 182, 212, 0.15)',
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <Box
                sx={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  mb: 2,
                  mx: 'auto',
                }}
              >
                📍
              </Box>
              <Typography
                level="title-md"
                sx={{
                  color: '#0f172a',
                  fontWeight: 700,
                  mb: 1.5,
                  fontSize: '18px',
                }}
              >
                Address
              </Typography>
              <Typography
                level="body-md"
                sx={{
                  color: '#64748b',
                  lineHeight: 1.7,
                  fontSize: '15px',
                }}
              >
                1421, 2<sup>nd</sup> Floor, 13<sup>th</sup> Main,
                <br />
                Sahakar Nagar,
                <br />
                Bangalore - 560092
              </Typography>
            </Sheet>

            {/* Email Card */}
            <Sheet
              className="info-card"
              sx={{
                padding: '32px',
                borderRadius: '16px',
                background: '#ffffff',
                border: '2px solid #e2e8f0',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: '#06b6d4',
                  boxShadow: '0 10px 40px rgba(6, 182, 212, 0.15)',
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <Box
                sx={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  mb: 2,
                  mx: 'auto',
                }}
              >
                ✉️
              </Box>
              <Typography
                level="title-md"
                sx={{
                  color: '#0f172a',
                  fontWeight: 700,
                  mb: 1.5,
                  fontSize: '18px',
                }}
              >
                Email
              </Typography>
              <Stack spacing={0.5}>
                <Typography
                  level="body-md"
                  sx={{
                    color: '#64748b',
                    fontSize: '15px',
                    transition: 'color 0.2s ease',
                    '&:hover': {
                      color: '#06b6d4',
                    },
                  }}
                >
                  info@kleidsys.com
                </Typography>
                <Typography
                  level="body-md"
                  sx={{
                    color: '#64748b',
                    fontSize: '15px',
                    transition: 'color 0.2s ease',
                    '&:hover': {
                      color: '#06b6d4',
                    },
                  }}
                >
                  info@gamorgan.in
                </Typography>
              </Stack>
            </Sheet>

            {/* Working Hours Card */}
            <Sheet
              className="info-card"
              sx={{
                padding: '32px',
                borderRadius: '16px',
                background: '#ffffff',
                border: '2px solid #e2e8f0',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: '#06b6d4',
                  boxShadow: '0 10px 40px rgba(6, 182, 212, 0.15)',
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <Box
                sx={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  mb: 2,
                  mx: 'auto',
                }}
              >
                🕐
              </Box>
              <Typography
                level="title-md"
                sx={{
                  color: '#0f172a',
                  fontWeight: 700,
                  mb: 1.5,
                  fontSize: '18px',
                }}
              >
                Working Hours
              </Typography>
              <Stack spacing={1}>
                <Box>
                  <Typography
                    level="body-sm"
                    sx={{
                      color: '#0f172a',
                      fontWeight: 600,
                      fontSize: '15px',
                    }}
                  >
                    Monday - Friday
                  </Typography>
                  <Typography
                    level="body-sm"
                    sx={{
                      color: '#64748b',
                      fontSize: '14px',
                    }}
                  >
                    9am to 5pm
                  </Typography>
                </Box>
                <Box sx={{ mt: 1 }}>
                  <Typography
                    level="body-sm"
                    sx={{
                      color: '#0f172a',
                      fontWeight: 600,
                      fontSize: '15px',
                    }}
                  >
                    Saturday & Sunday
                  </Typography>
                  <Typography
                    level="body-sm"
                    sx={{
                      color: '#64748b',
                      fontSize: '14px',
                    }}
                  >
                    Closed
                  </Typography>
                </Box>
              </Stack>
            </Sheet>
          </Grid>
        </Box>
      </Container>
    </Box>
      <Footer />
    </>    
  );
};

export default ContactUs;