import { Box, Typography, Stack} from '@mui/material';
import { useUserDetails } from '../../hooks/useUserDetails';
import { PlanCardsSkeleton } from './PlanCardSkeleton';
import { PlanCard } from './PlanCard';
import { usePurchasePlan } from '../../hooks/usePurchasePlan';
import { useEffect, useState } from 'react';
import { useSnackbar } from '../../hooks/useSnackbar';
import { PaymentWaitingModal } from '../../components/PaymentWaitingModal';

const Plans = {
    FREE: {
        id: 0,
        price: 0,
        credits: 25
    },

    PRO: {
        id: 1,
        price: 250,
        credits: 300
    },

    ELITE: {
        id: 2,
        price: 350,
        credits: 500
    },
};





export const PlansPage = () => {
    const {userData, isLoading} = useUserDetails();
    const [pollingModalVisible, setPollingModalVisible] = useState(false);
    const {isLoading: isMakingAPurchase , makePurchase, selectedPlan, error, data} = usePurchasePlan();
    const {showSnackbar} = useSnackbar();

    const handleCloseOfPollingModal = () => {
        setPollingModalVisible(val => !val)
    }

    useEffect(() => {
        if(error){
            showSnackbar({
                message: error.message ?? 'Something went wrong',
                type: 'error'
            })
        }else{
            const link = data?.data.payment_link;
            if(link){
                window.open(link, '_self')
            }
        }
    }, [error, data])


    if(data && !pollingModalVisible){
        console.log(data)
        setPollingModalVisible(true);
    }

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
                        id={plan.id}
                        name={name}
                        loading={isMakingAPurchase && selectedPlan === plan.id}
                        disabled={isMakingAPurchase}
                        onClick={() => makePurchase(userData.id, plan.id)}
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
            <PaymentWaitingModal onClose={(_, reason) => {
                if(reason !== 'backdropClick'){
                    handleCloseOfPollingModal();
                }
            }} open={pollingModalVisible} />  
        </Box>
    );
};