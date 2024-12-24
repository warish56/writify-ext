import { Box, Typography, Stack} from '@mui/material';
import { useUserDetails } from '../../hooks/useUserDetails';
import { PlanCardsSkeleton } from './PlanCardSkeleton';
import { PlanCard } from './PlanCard';

const Plans = {
    FREE: {
        id: 0,
        price: 0,
        credits: 25
    },

    PRO: {
        id: 1,
        price: 5,
        credits: 200
    },

    ELITE: {
        id: 2,
        price: 10,
        credits: 500
    },
};





const PlansPage = () => {
    const {userData, isLoading} = useUserDetails();
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
            }}
        >
            <Typography variant="h1" color="text.primary" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
                Choose Your Plan
            </Typography>
            <Typography
                variant="h3"
                color="text.secondary"
                sx={{ textAlign: 'center', maxWidth: '600px', mb: 5 }}
            >
                Pick the best plan that suits your needs and enjoy the benefits of our service! Upgrade anytime as you grow.
            </Typography>
            <Stack
                direction="row"
                spacing={4}
                sx={{
                    width: '100%',
                    maxWidth: '800px',
                    mt: 2,
                    justifyContent: 'center',
                    alignItems: 'stretch',
                    flexBasis: '400px',
                }}
            >
                {
                    isLoading && <PlanCardsSkeleton />
                }
                {!isLoading && userData &&
                 Object.entries(Plans).map(([name, plan]) => (
                    <PlanCard
                        plan={plan}
                        name={name}
                        key={plan.id}
                        currentPlan={plan.id === userData.account.plan_details.plan_id}
                    />
                ))}
            </Stack>

            <Box
                component="footer"
                sx={{
                    width: '100%',
                    mt: 'auto',
                    py: 3,
                    backgroundColor: 'primary.main',
                    textAlign: 'center',
                    color: 'primary.contrastText',
                }}
            >
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Ready to take your experience to the next level?
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                    Upgrade to a premium plan and enjoy exclusive benefits and more credits!
                </Typography>
            </Box>
        </Box>
    );
};

export default PlansPage;