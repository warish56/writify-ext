import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
} from '@mui/material';
import { privacyPolicyMetaData } from '@/constants/MetaData/privacyPolicy';
import { Metadata } from 'next';

export const metadata: Metadata = privacyPolicyMetaData;


const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Introduction",
      content: `Welcome to our AI Prompt Search Extension ("we," "our," or "us"). This Privacy Policy explains how we collect, use, and protect your information when you use our browser extension. By using our extension, you agree to the collection and use of information in accordance with this policy. This extension is intended for users above 8 years of age.`
    },
    {
      title: "Information We Collect",
      content: `We collect and store:
      • Email address: For account management and communications
      • User preferences: Your custom prompts and settings
      
      We do not store:
      • Your search history
      • Selected text from your browser
      • Browser history or browsing data`
    },
    {
      title: "Third-Party Services",
      content: `We use the following third-party services:
      • Appwrite: For secure database management
      • SendGrid: For email communications
      • RazorPay: For processing payments
      • ChatGPT: For AI prompt processing
      
      Each third-party service has its own Privacy Policy governing the use of your information. We encourage you to review their respective privacy policies.`
    },
    {
      title: "Subscription and Payments",
      content: `Our extension offers both free and premium features:
      • Basic features are available free of charge
      • Premium features require a paid subscription
      
      Payment information is processed securely through RazorPay. We do not store your payment details on our servers.`
    },
    {
      title: "Data Security",
      content: `We implement industry-standard security measures to protect your information:
      • Email data is encrypted during transmission
      • User data is stored securely on Appwrite's servers
      • Regular security audits and updates
      • Secure payment processing through RazorPay`
    },
    {
      title: "Your Rights",
      content: `You have the right to:
      • Access your stored information
      • Update your email address
      • Delete your account and associated data
      • Cancel your subscription
      • Request information about stored data`
    }
  ];

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 8, minHeight: '100vh' }}>
        <Paper
          elevation={0}
          sx={{
            backgroundColor: 'background.paper',
            borderRadius: 2,
            p: { xs: 3, md: 6 },
            mb: 4,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: 'primary.main',
              mb: 4,
              textAlign: 'center',
            }}
          >
            Privacy Policy
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              mb: 6,
              textAlign: 'center',
            }}
          >
            Last updated: {new Date(2024,11,27).toLocaleDateString()}
          </Typography>

          {sections.map((section, index) => (
            <Box key={index} sx={{ mb: 6 }}>
              <Typography
                variant="h2"
                sx={{
                  color: 'text.primary',
                  mb: 2,
                }}
              >
                {section.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  whiteSpace: 'pre-line',
                }}
              >
                {section.content}
              </Typography>
              {index !== sections.length - 1 && (
                <Divider sx={{ my: 4, borderColor: 'divider' }} />
              )}
            </Box>
          ))}

          <Box
            sx={{
              mt: 8,
              p: 3,
              backgroundColor: 'action.hover',
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: 'primary.main',
                mb: 2,
              }}
            >
              Contact Us
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
              }}
            >
              If you have any questions about this Privacy Policy 
              <Typography>
              please contact us at:
              <a href='mailto:app@aimagictext.in'>
                    <Typography sx={{color:'info.main'}}>
                        app@aimagictext.in
                    </Typography>
                </a>
              </Typography>
               
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;