import { Box, Card, CardContent, Typography, Stack, Button, Chip } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

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

type planCardProps = {
    plan: {
        price: number;
        credits: number;
    };
    name: string;
    currentPlan: boolean
}

const PlanCard = ({ plan, name, currentPlan }: planCardProps) => {
    return (
        <Card
            sx={{
                backgroundColor: currentPlan ? 'primary.light' : 'background.paper',
                color: currentPlan ? 'primary.contrastText' : 'text.primary',
                boxShadow: currentPlan ? 8 : 3,
                borderRadius: 3,
                p: 3,
                position: 'relative',
                border: currentPlan ? '2px solid' : 'none',
                borderColor: currentPlan ? 'primary.main' : 'transparent',
                '&:hover': {
                    boxShadow: 10,
                    transform: 'scale(1.03)',
                    transition: 'all 0.2s ease-in-out',
                },
            }}
        >
            {currentPlan && (
                <Chip
                    label="Your Current Plan"
                    color="secondary"
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        fontWeight: 'bold',
                    }}
                />
            )}
            <CardContent
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxSizing: 'border-box',
                }}
            >
                <Typography variant="h2" color="inherit" gutterBottom>
                    {name}
                </Typography>
                <Typography variant="h3" color="inherit">
                    ${plan.price} / month
                </Typography>

                <Stack
                    sx={{
                        gap: '20px',
                        mt: 4,
                    }}
                >
                    <StarIcon
                        sx={{
                            color: currentPlan ? '#FFD700' : '#f3b70c',
                            width: '50px',
                            height: '50px',
                            transform: 'scale(1.5)',
                        }}
                    />
                    <Typography variant="h4" color="inherit">
                        {plan.credits} Credits
                    </Typography>
                    <Typography
                        variant="caption"
                        color={currentPlan ? 'primary.contrastText' : 'text.secondary'}
                    >
                        / per month
                    </Typography>
                </Stack>

                <Button
                    variant={currentPlan ? 'outlined' : 'contained'}
                    color={currentPlan ? 'secondary' : 'primary'}
                    sx={{
                        mt: 4,
                        textTransform: 'capitalize',
                        borderColor: currentPlan ? 'primary.contrastText' : undefined,
                        color: currentPlan ? 'primary.contrastText' : undefined,
                    }}
                >
                    {currentPlan ? 'Current Plan' : 'Choose Plan'}
                </Button>
            </CardContent>
        </Card>
    );
};

const PlansPage = () => {
    const currentPlanId = 1; // Example: PRO plan is the current plan

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
                {Object.entries(Plans).map(([name, plan]) => (
                    <PlanCard
                        plan={plan}
                        name={name}
                        key={plan.id}
                        currentPlan={plan.id === currentPlanId}
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