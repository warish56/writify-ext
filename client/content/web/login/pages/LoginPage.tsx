import { Box, Button, Container, Paper, Stack, TextField } from '@mui/material';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormHeading } from '../components/FormHeading';
import { useSnackbar } from '../hooks/useSnackbar';
import { useLogin } from '../hooks/useLogin';
import { sendTrackingEvent } from '../utils';
import { WEB_EVENTS } from '../constants/Events';

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const {showSnackbar} = useSnackbar(); 
    const {loginUser, isLoading} = useLogin();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        loginUser(email).then((response) => {
            const [_, error] = response
          
            if(error ){
                showSnackbar({
                    message: error?.message || '',
                    autoHide: 3000,
                    type: 'error'
                })
            }else{
                navigate(`/auth/otp?email=${email}`)
                showSnackbar({
                    message: 'OTP sent to your email',
                    autoHide: 3000,
                    type: 'info'
                })
                sendTrackingEvent(WEB_EVENTS.OPT_SENT, {email})
            }
        })
    };

    return (
        <Box sx={{
            minHeight: '90vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default'
        }}>
            <Container maxWidth="sm">
                <Paper elevation={0} sx={() => ({
                    p: 4,
                    py: 8,
                    borderRadius: 2,
                    boxShadow: 4,
                })}>
                    <Stack spacing={4}>
                       <FormHeading/>
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={3}>
                                <TextField
                                    variant="outlined"
                                    id="email"
                                    autoFocus
                                    type="email"
                                    label="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />

                                <Button
                                    disabled={isLoading}
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        py: 1.5,
                                        bgcolor: 'primary.main',
                                        '&:hover': { bgcolor: 'primary.dark' }
                                    }}
                                >
                                    {isLoading ? 'Please wait ...' : 'Send Otp'}
                                </Button>
                            </Stack>
                        </form>
                    </Stack>
                </Paper>
            </Container>
        </Box>
    );
};