import { Card, CardContent, Typography, Stack, Button, Chip } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

type planCardProps = {
    plan: {
        price: number;
        credits: number;
    };
    name: string;
    currentPlan: boolean
}

export const PlanCard = ({ plan, name, currentPlan }: planCardProps) => {
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
                    label="Current Plan"
                    color="secondary"
                    size="small"
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        fontWeight: 'bold',
                        border: `1px white solid`
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
                        / per day
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