import React from 'react';
import { Box, Container, Grid, Typography, IconButton, Stack, Link } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';

const Footer = () => {
  const links = {
    company: [
        {label:'About', path: '/about-us'}
    ],
    support: [
        {label:'Privacy Policy',  path: '/privacy-policy'},
        {label:'Cancellation/Refund Policy',  path: '/cancel-refund-policy'},
        {label:'Terms and conditions', path: '/terms-and-conditions'}
    ],
    connect: [
        {label: 'Contact Us', path: '/contact-us'}, 
        // {label: 'Blog', path: '/blog'}, 
    ]
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        mt: 'auto',
        borderTop: 1,
        borderColor: 'divider',
        py: 6
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h3" sx={{ mb: 2, color: 'primary.main' }}>
                AIMagicText
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
              Making the world a better place through innovative solutions.
            </Typography>
            <Stack direction="row" spacing={1}>
              {[Facebook, Twitter, LinkedIn, Instagram].map((Icon, index) => (
                <IconButton
                  key={index}
                  sx={{
                    color: 'gray.500',
                    '&:hover': {
                      color: 'primary.main',
                      bgcolor: 'action.hover'
                    }
                  }}
                >
                  <Icon />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {Object.entries(links).map(([category, items]) => (
            <Grid item xs={12} sm={6} md={2.5} key={category}>
              <Typography
                variant="h3"
                sx={{
                  mb: 2,
                  color: 'text.primary',
                  textTransform: 'capitalize'
                }}
              >
                {category}
              </Typography>
              <Stack spacing={1}>
                {items.map((item) => (
                  <Link
                    key={item.label}
                    href={item.path}
                    underline="none"
                    sx={{
                      color: 'text.secondary',
                      '&:hover': {
                        color: 'primary.main'
                      }
                    }}
                  >
                    <Typography variant='link'>{item.label}</Typography>
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Typography
          variant="caption"
          sx={{
            display: 'block',
            textAlign: 'center',
            mt: 6,
            color: 'text.secondary'
          }}
        >
          © {new Date().getFullYear()} AIMagicText. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;