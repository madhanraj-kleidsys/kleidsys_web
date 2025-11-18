import React, { useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Stack,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Draggable from 'gsap/Draggable';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DevicesIcon from '@mui/icons-material/Devices';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

gsap.registerPlugin(ScrollTrigger, Draggable);

export default function FeaturesSection() {
  const featureRef = useRef([]);
  const erpFeatureRef = useRef([]);
  const sectionRef = useRef(null);
  const erpSectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const erpTitleRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ===== WHY CHOOSE US SECTION ANIMATIONS =====
      
      // Title animation
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Feature cards animation with drag functionality
      featureRef.current.forEach((feature, index) => {
        if (feature) {
          // Main card animation
          gsap.fromTo(
            feature,
            {
              opacity: 0,
              y: 60,
              scale: 0.8,
              rotationY: -15,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationY: 0,
              duration: 0.8,
              delay: 0.5 + (index * 0.15),
              ease: 'back.out(1.2)',
              scrollTrigger: {
                trigger: feature,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );

          // Icon animation inside card
          const icon = feature.querySelector('.feature-icon');
          if (icon) {
            gsap.fromTo(
              icon,
              {
                scale: 0,
                rotation: -180,
              },
              {
                scale: 1,
                rotation: 0,
                duration: 0.6,
                delay: 0.7 + (index * 0.15),
                ease: 'back.out(1.7)',
                scrollTrigger: {
                  trigger: feature,
                  start: 'top 85%',
                  toggleActions: 'play none none none',
                },
              }
            );
          }

          // Text animation inside card
          const title = feature.querySelector('.feature-title');
          if (title) {
            gsap.fromTo(
              title,
              {
                opacity: 0,
                x: -20,
              },
              {
                opacity: 1,
                x: 0,
                duration: 0.5,
                delay: 0.9 + (index * 0.15),
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: feature,
                  start: 'top 85%',
                  toggleActions: 'play none none none',
                },
              }
            );
          }

          const description = feature.querySelector('.feature-description');
          if (description) {
            gsap.fromTo(
              description,
              {
                opacity: 0,
                y: 10,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: 1.1 + (index * 0.15),
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: feature,
                  start: 'top 85%',
                  toggleActions: 'play none none none',
                },
              }
            );
          }

          // Animate the top line on scroll for Why Choose Us features
          const topLine = feature.querySelector('.top-line');
          if (topLine) {
            gsap.fromTo(
              topLine,
              {
                scaleX: 0,
              },
              {
                scaleX: 1,
                duration: 0.8,
                delay: 1.3 + (index * 0.15),
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: feature,
                  start: 'top 85%',
                  toggleActions: 'play none none none',
                },
              }
            );
          }

          // Modern drag interaction
          Draggable.create(feature, {
            type: 'x,y',
            edgeResistance: 0.65,
            bounds: sectionRef.current,
            inertia: true,
            onDragStart: function() {
              gsap.to(feature, {
                scale: 1.05,
                boxShadow: '0 25px 50px rgba(59, 130, 246, 0.4)',
                zIndex: 10,
                duration: 0.2,
                ease: 'power2.out',
              });
              if (icon) {
                gsap.to(icon, {
                  scale: 1.2,
                  rotation: 15,
                  duration: 0.3,
                  ease: 'power2.out',
                });
              }
            },
            onDrag: function() {
              const velocity = Math.abs(this.getVelocity('x')) + Math.abs(this.getVelocity('y'));
              const rotation = Math.min(velocity / 100, 5);
              gsap.to(feature, {
                rotation: this.deltaX > 0 ? rotation : -rotation,
                duration: 0.1,
              });
            },
            onDragEnd: function() {
              gsap.to(feature, {
                x: 0,
                y: 0,
                scale: 1,
                rotation: 0,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                zIndex: 1,
                duration: 0.6,
                ease: 'elastic.out(1, 0.5)',
              });
              if (icon) {
                gsap.to(icon, {
                  scale: 1,
                  rotation: 0,
                  duration: 0.5,
                  ease: 'back.out(1.7)',
                });
              }
            },
          });

          // Modern hover animation
          feature.addEventListener('mouseenter', () => {
            gsap.to(feature, {
              y: -10,
              scale: 1.02,
              boxShadow: '0 20px 40px rgba(59, 130, 246, 0.25)',
              duration: 0.4,
              ease: 'power2.out',
            });
            if (icon) {
              gsap.to(icon, {
                scale: 1.15,
                rotation: 10,
                duration: 0.4,
                ease: 'back.out(1.7)',
              });
            }
          });

          feature.addEventListener('mouseleave', () => {
            gsap.to(feature, {
              y: 0,
              scale: 1,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              duration: 0.4,
              ease: 'power2.out',
            });
            if (icon) {
              gsap.to(icon, {
                scale: 1,
                rotation: 0,
                duration: 0.4,
                ease: 'back.out(1.7)',
              });
            }
          });
        }
      });

      // ===== ERP SOLUTIONS SECTION ANIMATIONS =====

      // ERP Title animation
      gsap.fromTo(
        erpTitleRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: erpSectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // ERP Feature cards with wave animation
      erpFeatureRef.current.forEach((erpFeature, index) => {
        if (erpFeature) {
          gsap.fromTo(
            erpFeature,
            {
              opacity: 0,
              scale: 0.7,
              y: 50,
            },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.6,
              delay: (index % 4) * 0.1,
              ease: 'back.out(1.4)',
              scrollTrigger: {
                trigger: erpFeature,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );

          // Hover with magnetic effect
          erpFeature.addEventListener('mouseenter', () => {
            gsap.to(erpFeature, {
              scale: 1.08,
              y: -8,
              boxShadow: '0 15px 35px rgba(59, 130, 246, 0.3)',
              borderColor: theme.palette.primary.main,
              duration: 0.3,
              ease: 'power2.out',
            });
          });

          erpFeature.addEventListener('mouseleave', () => {
            gsap.to(erpFeature, {
              scale: 1,
              y: 0,
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              borderColor: `${theme.palette.primary.main}30`,
              duration: 0.3,
              ease: 'power2.out',
            });
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [theme]);

  const whyChooseUsFeatures = [
    {
      icon: AutoAwesomeIcon,
      title: 'Innovation',
      description: 'We always thrive in updating itself with latest in technologies with continous research and development',
      color: '#3b82f6',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
    },
    {
      icon: DevicesIcon,
      title: 'Ease-of-use',
      description: 'Simplifying the most challenging and complex tasks',
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
    },
    {
      icon: SettingsSuggestIcon,
      title: 'Automation',
      description: 'Optimizing Process efficiency by automating with the innovative softwares and machinaries',
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
    },
    {
      icon: SupportAgentIcon,
      title: 'Services',
      description: 'Experienced expertise in individual applications to provide the best after sales service',
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
    },
  ];

  const erpFeatures = [
    'Time & Action',
    'Sampling & Costing',
    'Production Planning',
    'Quality Control',
    'Inventory Management',
    'Logistics & Shipping',
    'Finance & Accounting',
    'HRMS',
    'E-Commerce',
    'Analytics & BI',
  ];

  return (
    <>
      {/* ===== WHY CHOOSE US SECTION ===== */}
      <Box
        ref={sectionRef}
        sx={{
          py: { xs: 6, md: 2 },
          background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '300px',
            background: 'radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          },
        }}
      >
        <Container maxWidth="lg">
          {/* Section Title */}
          <Box
            ref={titleRef}
            sx={{
              textAlign: 'center',
              marginBottom: 1.5,
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
                background: 'linear-gradient(135deg, #1e293b 0%, #3b82f6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: 1,
              }}
            >
              Why Choose Us
            </Typography>
          </Box>

          {/* Section Subtitle */}
          <Box
            ref={subtitleRef}
            sx={{
              textAlign: 'center',
              marginBottom: { xs: 3, md: 5 },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: '#64748b',
                fontWeight: 400,
                fontSize: { xs: '0.9rem', md: '1.1rem' },
                maxWidth: '700px',
                margin: '0 auto',
                px: 2,
              }}
            >
              Empowering your business with cutting-edge technology and exceptional service
            </Typography>
          </Box>

          {/* Features Grid - Compact 4 boxes in a single row */}
          <Grid 
            container 
            spacing={{ xs: 2, sm: 2, md: 2.5 }}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              maxWidth: '1100px',
              margin: '0 auto',
            }}
          >
            {whyChooseUsFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Grid 
                  item 
                  xs={12}
                  sm={6}
                  md={3}
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Paper
                    ref={(el) => (featureRef.current[index] = el)}
                    elevation={0}
                    sx={{
                      p: { xs: 2.5, md: 2.5 },
                      width: '100%',
                      minHeight: { md: '300px' },
                      maxWidth: { md: '250px' },
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '16px',
                      cursor: 'grab',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'border-color 0.3s ease',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                      '&:active': {
                        cursor: 'grabbing',
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '16px',
                        padding: '1px',
                        background: feature.gradient,
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                      },
                      '&:hover::after': {
                        opacity: 0.3,
                      },
                    }}
                  >
                    {/* Animated Top Line - Only for Why Choose Us */}
                    <Box
                      className="top-line"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '3px',
                        background: feature.gradient,
                        transformOrigin: 'left',
                        transform: 'scaleX(0)',
                      }}
                    />

                    {/* Icon */}
                    <Box
                      className="feature-icon"
                      sx={{
                        width: { xs: 60, md: 65 },
                        height: { xs: 60, md: 65 },
                        borderRadius: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: `linear-gradient(135deg, ${feature.color}15, ${feature.color}25)`,
                        marginBottom: { xs: 1.5, md: 2 },
                        position: 'relative',
                      }}
                    >
                      <IconComponent
                        sx={{
                          fontSize: { xs: '1.75rem', md: '2rem' },
                          color: feature.color,
                        }}
                      />
                    </Box>

                    {/* Title */}
                    <Typography
                      className="feature-title"
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: '#1e293b',
                        marginBottom: 1,
                        fontSize: { xs: '1rem', md: '1.1rem' },
                      }}
                    >
                      {feature.title}
                    </Typography>

                    {/* Description */}
                    <Typography
                      className="feature-description"
                      variant="body2"
                      sx={{
                        color: '#64748b',
                        lineHeight: 1.6,
                        fontSize: { xs: '0.8rem', md: '0.825rem' },
                        flex: 1,
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                      }}
                    >
                      {feature.description}
                    </Typography>

                    {/* Drag Hint */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 6,
                        right: 6,
                        opacity: 0.25,
                        pointerEvents: 'none',
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: feature.color,
                          fontSize: '0.65rem',
                          fontWeight: 500,
                        }}
                      >
                        Drag me
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* ===== COMPLETE ERP SOLUTION SECTION ===== */}
      <Box
        ref={erpSectionRef}
        sx={{
          py: { xs: 6, md: 8 },
          background: '#ffffff',
          position: 'relative',
        }}
      >
        <Container maxWidth="lg">
          {/* ERP Section Title */}
          <Box
            ref={erpTitleRef}
            sx={{
              textAlign: 'center',
              marginBottom: { xs: 4, md: 5 },
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
                color: theme.palette.text.primary,
                marginBottom: 1,
              }}
            >
              Complete{' '}
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                ERP Solution
              </Box>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#64748b',
                fontSize: { xs: '0.875rem', md: '0.95rem' },
                maxWidth: '600px',
                margin: '0 auto',
                px: 2,
              }}
            >
              Comprehensive modules to manage every aspect of your business
            </Typography>
          </Box>

          {/* ERP Features Grid */}
          <Grid container spacing={{ xs: 2, md: 2.5 }}>
            {erpFeatures.map((feature, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <Paper
                  ref={(el) => (erpFeatureRef.current[index] = el)}
                  elevation={0}
                  sx={{
                    p: { xs: 2.5, md: 3 },
                    textAlign: 'center',
                    background: `linear-gradient(135deg, ${theme.palette.primary.light}10 0%, ${theme.palette.secondary.light}10 100%)`,
                    border: `2px solid ${theme.palette.primary.main}30`,
                    borderRadius: '12px',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                      fontSize: { xs: '0.875rem', md: '1rem' },
                    }}
                  >
                    {feature}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}
