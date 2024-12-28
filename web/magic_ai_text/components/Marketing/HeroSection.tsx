'use client';

import { Button, Typography, useTheme } from "@mui/material"
import { Container, Stack } from "@mui/material"
import { Box } from "@mui/material"
import Image from "next/image"

import Extension from '@mui/icons-material/Extension';
import HeroImage from '../../asset/hero.png'

export const HeroSection = () => {
  const theme = useTheme();

  const onInstallExtension = () => {
    window.open(process.env.NEXT_PUBLIC_EXTENSION_URL, '_blank')
  }

    return (
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
                color: 'text.secondary',
                mb: 4,
                fontWeight: 'normal',
                lineHeight:'1.6'
              }}
            >
              {`Select text, get AI insights, and enhance your work instantly with our smart browser extension.`}
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                size="large"
                startIcon={<Extension />}
                onClick={onInstallExtension}
                sx={{
                  py: 2,
                  px: 4,
                  borderRadius: 2,
                  boxShadow: `0px 4px 12px ${theme.palette.primary.main}30`,
                }}
              >
                Add to Browser
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

    )
}