'use client';

import { Button, useTheme } from "@mui/material"
import { Typography } from "@mui/material"
import { Container, Stack } from "@mui/material"
import { Box } from "@mui/material"

import Extension from '@mui/icons-material/Extension';

export const CtaSection = () => {
  const theme = useTheme();

  const onInstallExtension = () => {
    window.open(process.env.NEXT_PUBLIC_EXTENSION_URL, '_blank')
  }
    return (
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
            onClick={onInstallExtension}
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
            {`Add to Browser - It's Free`}
          </Button>
        </Stack>
      </Container>
    </Box>
    )
}