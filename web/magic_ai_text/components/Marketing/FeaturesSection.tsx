import { Card } from "@mui/material"
import { Box } from "@mui/material"
import { Stack } from "@mui/material"
import { Typography } from "@mui/material"
import { Container } from "@mui/material"
import { features } from "./FeaturesData"

export const FeaturesSection = () => {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
      <Typography
        variant="h2"
        align="center"
        sx={{ mb: 6, color:'primary.main' }}
      >
        Powerful Features at Your Fingertips
      </Typography>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        flexWrap="wrap"
        sx={{ mx: -2, gap: '20px' }}
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
    )
}