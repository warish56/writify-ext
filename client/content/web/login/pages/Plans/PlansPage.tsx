import { Box, Typography, Stack} from '@mui/material';
import { useUserDetails } from '../../hooks/useUserDetails';
import { PlanCardsSkeleton } from './PlanCardSkeleton';
import { PlanCard } from './PlanCard';
import { usePurchasePlan } from '../../hooks/usePurchasePlan';
import { useEffect, useState } from 'react';
import { useSnackbar } from '../../hooks/useSnackbar';
import { PaymentWaitingModal } from '../../components/PaymentWaitingModal';
import { Plans } from '../../constants/Plans';
import { daysDifference, sendTrackingEvent } from '../../utils';
import { PlanExpiredBanner } from './PlanExpiredBanner';
import { PlanTypes } from '../../types/plans';
import { AccountSuspendedBanner } from '../../components/AccountSuspended';
import { WEB_EVENTS } from '../../constants/Events';



export const PlansPage = () => {
    const {userData, isLoading, isAccountSuspended} = useUserDetails();
    const [pollingModalVisible, setPollingModalVisible] = useState(false);
    const {isLoading: isMakingAPurchase , makePurchase, selectedPlan, error, data} = usePurchasePlan();
    const {showSnackbar} = useSnackbar();

    const hasCurrentPlanExpired = userData?.account.payment_date ? daysDifference(userData?.account.payment_date) > 28 : false
    const currentPlanName = Object.keys(Plans).find((planName) => Plans[planName as PlanTypes].id === userData?.account.plan_details.plan_id)

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
            const link = data?.payment_link;
            if(link){
                window.open(link, '_self')
            }
        }
    }, [error, data])

    useEffect(() => {
        if(isAccountSuspended){
            sendTrackingEvent(WEB_EVENTS.ACCOUNT_SUSPENDED);
        }
    }, [])


    if(data && !pollingModalVisible){
        setPollingModalVisible(true);
    }


    if(isAccountSuspended){
        return  (
            <Box
            sx={{
                minHeight: '50vh',
                backgroundColor: 'background.default',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: 4,
                gap: '15px'
            }}
            >
                <AccountSuspendedBanner/>
            </Box>
        )
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
            
            {hasCurrentPlanExpired && <PlanExpiredBanner expiredPlan={currentPlanName || ''} />}
            
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
                        onClick={() => {
                            makePurchase(userData.id, plan.id);
                            sendTrackingEvent(WEB_EVENTS.BUY_PLAN_CLICKED, {planId: plan.id, planName: name});
                        }}
                        key={plan.id}
                        currentPlan={plan.id === userData.account.plan_details.plan_id}
                        currentPlanExpired={hasCurrentPlanExpired}
                    />
                ))}
            </Stack>

            <Box
                component="footer"
                sx={{
                    width: '100%',
                    mt: 5,
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