import { Stack, Paper, TextField, Button, Container } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';

import { FormHeading } from '../components/FormHeading'
import { useOtp } from '../hooks/useOtp';
import { useSnackbar } from '../hooks/useSnackbar';
import { sendMessageToWorker, sendTrackingEvent } from '../utils';
import { BG_FETCH_USER_DETAILS } from '../constants/worker';
import { WorkerResponse } from '../types/worker';
import { ServerError } from '../types/api';
import { WEB_EVENTS } from '../constants/Events';
import { useUserDetails } from '@/hooks/useUserDetails';

export const OtpPage = () => {
    const [otp, setOtp] = useState('');
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');
    const {verifyOtp, isLoading} = useOtp();  
    const {showSnackbar} = useSnackbar();
    const navigate = useNavigate();
    const {getUserDetailsFromStore} = useUserDetails();



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await verifyOtp(email || '', otp)
        const [__, error] = response

        if(error){
            showSnackbar({
                message: error?.message || '',
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
            await getUserDetailsFromStore();
            navigate('/plans',{
                replace: true
            });
            sendTrackingEvent(WEB_EVENTS.LOGGED_IN)
        }
        
    }

    return (
        <Stack direction="row" sx={{
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '90vh'
        }}>

            <Container maxWidth="sm">
                <Paper elevation={0} sx={{
                    p: 4,
                    py: 8,
                    borderRadius: 2,
                    boxShadow: 4
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