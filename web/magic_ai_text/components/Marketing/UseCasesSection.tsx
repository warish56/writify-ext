import { Card } from "@mui/material"
import { Box } from "@mui/material"
import { Stack } from "@mui/material"
import { Typography } from "@mui/material"
import { Container } from "@mui/material"
import { useCases } from "./FeaturesData"

export const UseCasesSection = () => {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
      <Typography variant="h2" align="center" sx={{ mb: 6, color:'primary.main' }}>
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
    )
}