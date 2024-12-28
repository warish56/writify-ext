import React from 'react';
import { Box, Container, Typography, Paper, Grid, Card, CardContent } from '@mui/material';
import { Psychology, Lightbulb, Speed, Group } from '@mui/icons-material';
import { Metadata } from 'next';
import { aboutUsMetaData } from '@/constants/MetaData/aboutUs';


export const metadata: Metadata = aboutUsMetaData;


const AboutUs = () => {
  const values = [
    {
      icon: <Psychology sx={{ fontSize: 40 }}/>,
      title: 'Innovation First',
      description: 'We push the boundaries of AI technology to create tools that enhance human productivity and creativity.'
    },
    {
      icon: <Lightbulb sx={{ fontSize: 40 }}/>,
      title: 'User-Centric',
      description: 'Every feature we develop stems from real user needs and feedback, ensuring our solution adds genuine value.'
    },
    {
      icon: <Speed sx={{ fontSize: 40 }}/>,
      title: 'Efficiency',
      description: 'We believe in streamlining workflows and making AI assistance accessible with just a few clicks.'
    },
    {
      icon: <Group sx={{ fontSize: 40 }}/>,
      title: 'Community Driven',
      description: 'Our growing community of users helps shape the future of our AI prompt extension.'
    }
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h1" sx={{ 
            color: 'primary.main',
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            mb: 3
          }}>
            About Us
          </Typography>
          <Typography variant="h2" sx={{ 
            color: 'text.secondary',
            maxWidth: '800px',
            mx: 'auto',
            mb: 6
          }}>
            We're a team of AI enthusiasts and developers dedicated to making AI assistance more accessible through browser-based tools.
          </Typography>
        </Box>

        {/* Mission Statement */}
        <Paper elevation={0} sx={{ 
          p: 6,
          mb: 8,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          borderRadius: 2,
          textAlign: 'center'
        }}>
          <Typography variant="h2" sx={{ mb: 3 }}>
            Our Mission
          </Typography>
          <Typography variant="body1" sx={{ 
            maxWidth: '800px',
            mx: 'auto',
            fontSize: '1.2rem'
          }}>
            To empower users with intelligent AI assistance that seamlessly integrates into their browsing experience, enhancing productivity and creativity through contextual AI prompts.
          </Typography>
        </Paper>

        {/* Company Values */}
        <Typography variant="h2" sx={{ 
          textAlign: 'center',
          mb: 4,
          color: 'primary.main'
        }}>
          Our Values
        </Typography>
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {values.map((value, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ 
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': { 
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}>
                <CardContent sx={{ 
                  textAlign: 'center',
                  p: 3
                }}>
                  <Box sx={{ 
                    color: 'primary.main',
                    mb: 2
                  }}>
                    {value.icon}
                  </Box>
                  <Typography variant="h3" sx={{ mb: 1.5 }}>
                    {value.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {value.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Story Section */}
        <Paper sx={{ 
          p: 6,
          mb: 8,
          bgcolor: 'background.paper',
          borderRadius: 2
        }}>
          <Typography variant="h2" sx={{ mb: 4, textAlign: 'center' }}>
            Our Story
          </Typography>
          <Typography variant="body1" sx={{ 
            color: 'text.secondary',
            maxWidth: '800px',
            mx: 'auto',
            textAlign: 'center',
            lineHeight: 1.8
          }}>
            Born from the need to make AI assistance more accessible, our browser extension started as a simple tool to enhance web browsing with AI prompts. Today, we're proud to offer a sophisticated yet simple solution that helps users leverage AI technology effectively in their daily online activities.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default AboutUs;