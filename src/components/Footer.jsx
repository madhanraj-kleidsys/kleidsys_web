import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  Stack,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
  const theme = useTheme();

  const footerLinks = {
    Product: ['Features', 'Pricing', 'Security'],
    Company: ['About', 'Blog', 'Careers'],
    Legal: ['Privacy', 'Terms', 'Contact'],
  };

  return (
    <Box sx={{ background: '#111827', color: '#d1d5db', py: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ marginBottom: 4 }}>
          {/* Brand */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 700, marginBottom: 2 }}>
              KleidSys
            </Typography>
            <Typography variant="body2" sx={{ color: '#9ca3af' }}>
              AI-Powered ERP for Fashion Industry
            </Typography>
          </Grid>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <Grid item xs={12} sm={6} md={3} key={title}>
              <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 700, marginBottom: 2 }}>
                {title}
              </Typography>
              <Stack spacing={1}>
                {links.map((link) => (
                  <Link
                    key={link}
                    href="#"
                    sx={{
                      color: '#9ca3af',
                      textDecoration: 'none',
                      '&:hover': { color: theme.palette.primary.main },
                      fontSize: '0.875rem',
                    }}
                  >
                    {link}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}

          {/* Social */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 700, marginBottom: 2 }}>
              Follow Us
            </Typography>
            <Stack direction="row" spacing={1}>
              <FacebookIcon sx={{ cursor: 'pointer', '&:hover': { color: theme.palette.primary.main } }} />
              <TwitterIcon sx={{ cursor: 'pointer', '&:hover': { color: theme.palette.primary.main } }} />
              <LinkedInIcon sx={{ cursor: 'pointer', '&:hover': { color: theme.palette.primary.main } }} />
            </Stack>
          </Grid>
        </Grid>

        {/* Bottom */}
        <Box sx={{ borderTop: '1px solid #374151', paddingTop: 4, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#6b7280' }}>
            &copy; 2025 KleidSys. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}