import React, { useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ThunderboltIcon from '@mui/icons-material/Bolt';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import LinkIcon from '@mui/icons-material/Link';

gsap.registerPlugin(ScrollTrigger);

export default function BenefitsSection() {
  const cardsRef = useRef([]);
  const theme = useTheme();

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            markers: false,
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, []);

  const benefits = [
    {
      icon: ThunderboltIcon,
      title: '5+ Years Expertise',
      description: 'Trusted by 100+ fashion brands worldwide',
    },
    {
      icon: SmartToyIcon,
      title: 'AI-Powered Intelligence',
      description: 'Predictive analytics & smart automation',
    },
    {
      icon: LinkIcon,
      title: 'Real-Time Integration',
      description: 'Seamless connection across all systems',
    },
  ];

  return (
    <Box sx={{ py: 10, background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            marginBottom: 6,
            fontWeight: 700,
            color: theme.palette.text.primary,
          }}
        >
          Why Choose <span style={{ color: theme.palette.primary.main }}>KleidSys?</span>
        </Typography>

        <Grid container spacing={4}>
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  ref={(el) => (cardsRef.current[index] = el)}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <CardContent sx={{ flex: 1 }}>
                    <Box sx={{ marginBottom: 2 }}>
                      <Icon
                        sx={{
                          fontSize: '2.5rem',
                          color: theme.palette.primary.main,
                        }}
                      />
                    </Box>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{
                        fontWeight: 700,
                        marginBottom: 1,
                        color: theme.palette.text.primary,
                      }}
                    >
                      {benefit.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ lineHeight: 1.6 }}
                    >
                      {benefit.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}