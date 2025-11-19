import React, { useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  Stack,
  Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const theme = useTheme();
  const footerRef = useRef(null);
  const headingRefs = useRef([]);
  const contentRefs = useRef([]);
  const dividerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate headings with stagger
      gsap.fromTo(
        headingRefs.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Animate content with stagger
      gsap.fromTo(
        contentRefs.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Animate divider
      gsap.fromTo(
        dividerRef.current,
        {
          scaleX: 0,
        },
        {
          scaleX: 1,
          duration: 1,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: dividerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const footerLinks = {
    Product: ['Features', 'Pricing', 'Security', 'Integrations'],
    Company: ['About', 'Blog', 'Careers', 'News'],
    Resources: ['Documentation', 'Help Center', 'API'],
    Legal: ['Privacy', 'Terms', 'Cookie Policy'],
  };

  const socialLinks = [
    { icon: FacebookIcon, label: 'Facebook', href: '#' },
    { icon: TwitterIcon, label: 'Twitter', href: '#' },
    { icon: LinkedInIcon, label: 'LinkedIn', href: '#' },
    { icon: InstagramIcon, label: 'Instagram', href: '#' },
  ];

  const addToRefs = (el, refsArray) => {
    if (el && !refsArray.current.includes(el)) {
      refsArray.current.push(el);
    }
  };

  return (
    <Box
      ref={footerRef}
      sx={{
        background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
        color: '#d1d5db',
        py: 8,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #3b82f6, transparent)',
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ marginBottom: 6 }}>
          {/* Brand & Description */}
          <Grid item xs={12} md={4}>
            <Box ref={(el) => addToRefs(el, headingRefs)}>
              <Typography
                variant="h4"
                sx={{
                  background: 'linear-gradient(135deg, #60a5fa 0%, #22d3ee 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 800,
                  marginBottom: 2,
                }}
              >
                KleidSys
              </Typography>
            </Box>
            {/* <Box ref={(el) => addToRefs(el, contentRefs)}>
              <Typography
                variant="body1"
                sx={{
                  color: '#94a3b8',
                  marginBottom: 3,
                  lineHeight: 1.7,
                }}
              >
                AI-Powered ERP Solution for Fashion & Apparel Industry. Streamline your operations with intelligent automation.
              </Typography>
            </Box> */}

            {/* Social Media */}
            <Box ref={(el) => addToRefs(el, contentRefs)}>
              <Typography
                variant="h6"
                sx={{
                  color: '#ffffff',
                  fontWeight: 600,
                  marginBottom: 2,
                  fontSize: '1rem',
                }}
              >
                Follow Us
              </Typography>
              <Stack direction="row" spacing={2}>
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <Box
                    key={label}
                    component="a"
                    href={href}
                    aria-label={label}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(59, 130, 246, 0.1)',
                      color: '#60a5fa',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: '#3b82f6',
                        color: '#ffffff',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 20px rgba(59, 130, 246, 0.4)',
                      },
                    }}
                  >
                    <Icon fontSize="small" />
                  </Box>
                ))}
              </Stack>
            </Box>
          </Grid>

          {/* Quick Links */}
          {/* {Object.entries(footerLinks).map(([title, links]) => (
            <Grid item xs={6} sm={3} md={2} key={title}>
              <Box ref={(el) => addToRefs(el, headingRefs)}>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#ffffff',
                    fontWeight: 600,
                    marginBottom: 2,
                    fontSize: '1rem',
                  }}
                >
                  {title}
                </Typography>
              </Box>
              <Stack spacing={1.5}>
                {links.map((link) => (
                  <Box key={link} ref={(el) => addToRefs(el, contentRefs)}>
                    <Link
                      href="#"
                      sx={{
                        color: '#94a3b8',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        transition: 'all 0.3s ease',
                        display: 'inline-block',
                        '&:hover': {
                          color: '#60a5fa',
                          transform: 'translateX(4px)',
                        },
                      }}
                    >
                      {link}
                    </Link>
                  </Box>
                ))}
              </Stack>
            </Grid>
          ))} */}

          {/* Contact Info */}
          <Grid item xs={12} md={4}
            sx={{ marginLeft: { md: 8 } }}>
            <Box ref={(el) => addToRefs(el, headingRefs)}>
              <Typography
                variant="h6"
                sx={{
                  color: '#ffffff',
                  fontWeight: 600,
                  marginBottom: 3,
                  fontSize: '1rem',
                }}
              >
                CONTACT INFO
              </Typography>
            </Box>

            {/* Offices Grid Layout */}
            <Grid container spacing={3}>
              {/* Head Office - Left */}
              <Grid item xs={12} md={6}>
                <Box ref={(el) => addToRefs(el, contentRefs)} sx={{ marginBottom: 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: '#60a5fa',
                      fontWeight: 600,
                      marginBottom: 1.5,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Head Office
                  </Typography>
                  <Stack spacing={1.5}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                      <LocationOnIcon sx={{ color: '#60a5fa', fontSize: '1.2rem', mt: 0.3 }} />
                      <Typography variant="body2" sx={{ color: '#94a3b8', lineHeight: 1.6 }}>
                        1421, 2<sup>nd</sup> Floor, 13<sup>th</sup> Main, Sahakar Nagar,
                        <br />
                        Bangalore - 560092
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LanguageIcon sx={{ color: '#60a5fa', fontSize: '1.2rem' }} />
                      <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                        www.kleidsys.com
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Grid>

              {/* Branch Office - Right */}
              <Grid item xs={12} md={6}>
                <Box ref={(el) => addToRefs(el, contentRefs)} sx={{ marginBottom: 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: '#22d3ee',
                      fontWeight: 600,
                      marginBottom: 1.5,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Branch Office
                  </Typography>
                  <Stack spacing={1.5}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                      <LocationOnIcon sx={{ color: '#22d3ee', fontSize: '1.2rem', mt: 0.3 }} />
                      <Typography variant="body2" sx={{ color: '#94a3b8', lineHeight: 1.6 }}>
                        Old Palace Theater, Cherry Road Agraharam,
                        <br />
                        Salem, TN - 636008
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Divider */}
        <Box
          ref={dividerRef}
          sx={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #334155, transparent)',
            marginBottom: 4,
            transformOrigin: 'left',
          }}
        />

        {/* Bottom Section */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="body2"
              sx={{
                color: '#64748b',
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              &copy; {new Date().getFullYear()} KleidSys Technology Private Limited. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack
              direction="row"
              spacing={3}
              justifyContent={{ xs: 'center', md: 'flex-end' }}
              sx={{ flexWrap: 'wrap' }}
            >
              <Link
                href="#"
                sx={{
                  color: '#64748b',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transition: 'color 0.3s ease',
                  '&:hover': { color: '#60a5fa' },
                }}
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                sx={{
                  color: '#64748b',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transition: 'color 0.3s ease',
                  '&:hover': { color: '#60a5fa' },
                }}
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                sx={{
                  color: '#64748b',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transition: 'color 0.3s ease',
                  '&:hover': { color: '#60a5fa' },
                }}
              >
                Sitemap
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}