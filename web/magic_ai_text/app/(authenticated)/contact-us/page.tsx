import React from 'react';
import { Box, Container, Typography, Paper, TextField, Button, Snackbar, Alert } from '@mui/material';
import { Email, ContentCopy } from '@mui/icons-material';
import { CopyBtn } from './_components/CopyBtn';

const ContactUs = () => {


  return (
    <Box sx={{ bgcolor: 'background.default', py: 8 }}>
      <Container maxWidth="md">
        <Typography variant="h1" sx={{ 
          color: 'primary.main',
          textAlign: 'center',
          mb: 3
        }}>
          Contact Us
        </Typography>
        
        <Typography variant="h2" sx={{ 
          color: 'text.secondary',
          textAlign: 'center',
          mb: 6
        }}>
          We'd love to hear from you
        </Typography>

        <Paper sx={{ 
          p: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3
        }}>
          <Email sx={{ 
            fontSize: 48, 
            color: 'primary.main',
            mb: 3
          }} />

          <Typography variant="h3" sx={{ mb: 2 }}>
            Email Us
          </Typography>

          <Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 3
          }}>
            <Typography variant="h2" sx={{ 
              color: 'primary.main',
              fontFamily: 'monospace'
            }}>
              app@aimagictext.in
            </Typography>
            <CopyBtn/>
          </Box>

          <Typography variant="body1" sx={{ 
            color: 'text.secondary',
            textAlign: 'center',
            maxWidth: '500px'
          }}>
            We aim to respond to all inquiries within 24 hours during business days.
          </Typography>
        </Paper>

    
      </Container>
    </Box>
  );
};

export default ContactUs;