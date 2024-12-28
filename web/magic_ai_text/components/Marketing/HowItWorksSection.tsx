import { Stack, Typography } from "@mui/material"
import { Container } from "@mui/material"
import { Box } from "@mui/material"
import Image from "next/image"

import OptionsImage from '@/asset/options.png'


export const HowItWorksSection = () => {
    return (
      <Box sx={{ 
        backgroundColor: 'background.paper', 
        py: { xs: 8, md: 12 } 
      }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" sx={{ mb: 6, color:'primary.main' }}>
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
            <Stack spacing={4} flex={1} sx={{
                color:'text.secondary',
              }}>
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

    )
}