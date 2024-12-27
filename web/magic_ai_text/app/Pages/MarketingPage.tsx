'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  Stack,
  useTheme,
} from '@mui/material';
import {
  Extension,
  Search,
  AutoAwesome,
  Edit,
  Speed,
} from '@mui/icons-material';

import Image from 'next/image';


import OptionsImage from '@/assets/options.png'
import HeroImage from '@/assets/hero.png'

export const MarketingPage = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <Search sx={{ fontSize: 40 }} />,
      title: 'Smart Selection Search',
      description: 'Simply select any text on your browser and let AI analyze and enhance it instantly.',
    },
    {
      icon: <AutoAwesome sx={{ fontSize: 40 }} />,
      title: 'Pre-defined Prompts',
      description: 'Access a curated library of prompts for common tasks like summarization, analysis, and more.',
    },
    {
      icon: <Edit sx={{ fontSize: 40 }} />,
      title: 'Custom Prompts',
      description: 'Create and save your own custom prompts tailored to your specific needs.',
    },
    {
      icon: <Speed sx={{ fontSize: 40 }} />,
      title: 'Lightning Fast',
      description: 'Get AI-powered responses in seconds, right within your browser.',
    },
  ];

  const useCases = [
    {
      title: 'Research',
      description: 'Quickly analyze and summarize academic papers, articles, and research materials.',
    },
    {
      title: 'Content Creation',
      description: 'Generate ideas, outlines, and variations for your content.',
    },
    {
      title: 'Learning',
      description: `Get explanations and insights about any topic you're studying.`,
    },
    {
      title: 'Professional Work',
      description: 'Enhance emails, reports, and business documents with AI assistance.',
    },
  ];

  return (
    <Box>      
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(45deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          <Stack 
            direction={{ xs: 'column', md: 'row' }} 
            spacing={4} 
            alignItems="center"
            justifyContent="space-between"
          >
            <Box flex={1}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 700,
                  mb: 2,
                  background: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Transform Your Browsing with AI Power
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                  color: 'text.secondary',
                  mb: 4,
                  fontWeight: 'normal',
                }}
              >
                Select text, get AI insights, and enhance your work instantly with our smart browser extension.
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Extension />}
                  sx={{
                    py: 2,
                    px: 4,
                    borderRadius: 2,
                    boxShadow: `0px 4px 12px ${theme.palette.primary.main}30`,
                  }}
                >
                  Add to Browser
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    py: 2,
                    px: 4,
                    borderRadius: 2,
                  }}
                >
                  Learn More
                </Button>
              </Stack>
            </Box>
            <Box flex={1} sx={{
                boxShadow: 6,
                borderRadius: 2,
                overflow: 'hidden',
                transform: 'skewY(5deg)'
            }}>
              <Image
                src={HeroImage}
                alt="AIMagicText Demo"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 4,
                }}
              />
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Typography
          variant="h2"
          align="center"
          sx={{ mb: 6 }}
        >
          Powerful Features at Your Fingertips
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          flexWrap="wrap"
          spacing={4}
          sx={{ mx: -2 }}
        >
          {features.map((feature, index) => (
            <Box
              key={index}
              sx={{
                flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 32px)', md: '1 1 calc(25% - 32px)' },
                px: 2,
              }}
            >
              <Card
                sx={{
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  backgroundColor: 'background.paper',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <Box sx={{ mb: 2, color: 'primary.main' }}>
                  {feature.icon}
                </Box>
                <Typography variant="h3" sx={{ mb: 2 }}>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </Card>
            </Box>
          ))}
        </Stack>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ backgroundColor: 'background.paper', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" sx={{ mb: 6 }}>
            How It Works
          </Typography>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={4}
            alignItems="center"
          >
            <Box flex={1}>
                <Box sx={{
                    width:'fit-content',
                    boxShadow: 6,
                    borderRadius: 2,
                    overflow: 'hidden',
                    transform: 'skewY(-5deg)'
                }}>
                <Image
                    src={OptionsImage}
                    alt="How it works"
                    style={{
                    width: '400px',
                    height: 'auto',
                    borderRadius: 4,
                    }}
                />
              </Box>
            </Box>
            <Stack spacing={4} flex={1}>
              <Box>
                <Typography variant="h3" sx={{ mb: 2 }}>
                  1. Install & Select
                </Typography>
                <Typography>
                  Add AIMagicText to your browser and select any text you want to analyze or enhance.
                </Typography>
              </Box>
              <Box>
                <Typography variant="h3" sx={{ mb: 2 }}>
                  2. Choose Your Prompt
                </Typography>
                <Typography>
                  Pick from our pre-defined prompts or use your custom ones for specific tasks.
                </Typography>
              </Box>
              <Box>
                <Typography variant="h3" sx={{ mb: 2 }}>
                  3. Get AI-Powered Results
                </Typography>
                <Typography>
                  Instantly receive AI-generated responses, suggestions, and insights.
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Use Cases Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Typography variant="h2" align="center" sx={{ mb: 6 }}>
          Perfect For Every Need
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          flexWrap="wrap"
          spacing={0}
          sx={{ gap:'30px' }}
        >
          {useCases.map((useCase, index) => (
            <Box
              key={index}
              sx={{
                flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 32px)' },
                px: 2,
              }}
            >
              <Card
                sx={{
                  p: 4,
                  height: '100%',
                  backgroundColor: 'background.paper',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Typography variant="h3" sx={{ mb: 2 }}>
                  {useCase.title}
                </Typography>
                <Typography color="text.secondary">
                  {useCase.description}
                </Typography>
              </Card>
            </Box>
          ))}
        </Stack>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          py: { xs: 8, md: 12 },
          color: 'white',
        }}
      >
        <Container maxWidth="md">
          <Stack spacing={4} alignItems="center" textAlign="center">
            <Typography variant="h2">
              Ready to Transform Your Browsing Experience?
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 'normal' }}>
              Join thousands of users who are already using AIMagicText to enhance their productivity.
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<Extension />}
              sx={{
                py: 2,
                px: 6,
                backgroundColor: 'white',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'background.paper',
                },
              }}
            >
              Add to Browser - It's Free
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};
