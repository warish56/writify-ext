import { Box, Button, Typography } from '@mui/material';
import UpgradeImage from '@/assets/upgrade.png';

export const UpgradePrompt = ({ onUpgradeClick }: { onUpgradeClick: () => void }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 4,
                backgroundColor: 'transparent',
                borderRadius: 3,
                textAlign: 'center',
            }}
        >
            <img
                src={UpgradeImage}
                alt="Upgrade"
                style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    marginBottom: '20px',
                }}
            />
            <Typography
                variant="h3"
                color="text.primary"
                sx={{ fontWeight: 'bold', mb: 2 }}
            >
                You've Used Up All Your Credits!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Upgrade your plan now to continue enjoying our premium features and get more credits.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={onUpgradeClick}
                sx={{
                    textTransform: 'capitalize',
                    px: 5,
                    py: 1.5,
                    fontSize: '1rem',
                    borderRadius: 2,
                }}
            >
                Upgrade Now
            </Button>
        </Box>
    );
};

export default UpgradePrompt;
