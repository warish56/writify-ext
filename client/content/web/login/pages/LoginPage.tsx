import { Box, Button, Container, Paper, Stack, TextField } from '@mui/material';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormHeading } from '../components/FormHeading';
import { useSnackbar } from '../hooks/useSnackbar';
import { useLogin } from '../hooks/useLogin';

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const {showSnackbar} = useSnackbar(); 
    const {loginUser, isLoading} = useLogin();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        loginUser(email).then((response) => {
            const [result, error] = response
          
            if(error || result?.error){
                showSnackbar({
                    message: result?.error?.message || error?.message || '',
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
            }
        })
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default'
        }}>
            <Container maxWidth="sm">
                <Paper elevation={0} sx={{
                    p: 4,
                    borderRadius: 2,
                    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.05)'
                }}>
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