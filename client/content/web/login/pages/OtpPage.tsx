import { Stack, Paper, TextField, Button, Container } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';

import { FormHeading } from '../components/FormHeading'
import { useOtp } from '../hooks/useOtp';
import { useSnackbar } from '../hooks/useSnackbar';
import { sendMessageToWorker } from '../utils';
import { BG_FETCH_USER_DETAILS } from '../constants/worker';
import { WorkerResponse } from '../types/worker';
import { ServerError } from '../types/api';

export const OtpPage = () => {
    const [otp, setOtp] = useState('');
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');
    const {verifyOtp, isLoading} = useOtp();  
    const {showSnackbar} = useSnackbar();
    const navigate = useNavigate();



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await verifyOtp(email || '', otp)
        const [result, error] = response

        if(error || result?.error){
            showSnackbar({
                message: result?.error?.message || error?.message || '',
                autoHide: 3000,
                type: 'error'
            })
            return;
        }

       const workerResponse =  await sendMessageToWorker<WorkerResponse<[unknown, ServerError]>>(BG_FETCH_USER_DETAILS,{email});
        const {success, data: serverResponse} = workerResponse;
        const [_, serverError] = serverResponse ?? [];
        if(!success || serverError){
                showSnackbar({
                    message: serverError.message ??  'Something went wrong in user',
                    autoHide: 3000,
                    type: 'error'
                })
        }else{
            navigate('/plans',{
                replace: true
            });
        }
        
    }

    return (
        <Stack direction="row" sx={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>

            <Container maxWidth="sm">
                <Paper elevation={0} sx={{
                    p: 4,
                    borderRadius: 2,
                    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.05)'
                }}>
                <Stack spacing={4}>
                    <FormHeading/>
                    <Stack sx={{
                        gap: '20px'
                    }}>
                    <form onSubmit={handleSubmit}>
                            <Stack spacing={3}>
                                <TextField
                                    variant="outlined"
                                    id="otp"
                                    autoFocus
                                    type="text"
                                    label="OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={isLoading}
                                    sx={{
                                        py: 1.5,
                                        bgcolor: 'primary.main',
                                        '&:hover': { bgcolor: 'primary.dark' }
                                    }}
                                >
                                    {isLoading ? 'Please wait ...' : 'Verify Otp'}
                                </Button>
                            </Stack>
                            </form>
                        </Stack>
                    </Stack>
                </Paper>
            </Container>
        </Stack>
    )
}