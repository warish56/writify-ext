import { Box, Typography, Stack} from '@mui/material';
import { Plans } from '@/constants/Plans';
import { PlanCard } from './_components/PlanCard';


export default function PlansPage(){
    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: 'background.default',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                py: 4,
                gap: '15px'
            }}
        >
            <Typography variant="h1" color="text.primary" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
                Choose Your Plan
            </Typography>
            <Typography
                variant="h3"
                color="text.secondary"
                sx={{ textAlign: 'center', maxWidth: '600px', mb: 1 }}
            >
                Pick the best plan that suits your needs and enjoy the benefits of our service! Upgrade anytime as you grow.
            </Typography>
            
            
            <Stack
                direction="row"
                spacing={4}
                sx={{
                    scrollSnapType: 'x mandatory',
                    width: 'min(800px, 100vw)',
                    mt: 2,  
                    padding: {
                        xs: '20px'
                    },
                    justifyContent: {
                        sm: 'flex-start',
                        md:'center'
                    },
                    alignItems: 'stretch',
                    flexBasis: '400px',
                    overflow:{
                        xs:'auto',
                        md: 'visible'
                    }
                }}
            >
               
                {
                 Object.entries(Plans).map(([name, plan]) => (
                    <PlanCard
                        plan={plan}
                        id={plan.id}
                        name={name}
                        key={plan.id}
                        currentPlan={plan.id === 0}
                    />
                ))}
            </Stack>
        </Box>
    );
};