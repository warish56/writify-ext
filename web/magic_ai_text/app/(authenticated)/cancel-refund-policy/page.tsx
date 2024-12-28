import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
} from '@mui/material';
import { refundMetaData } from '@/constants/MetaData/refundPolicy';
import { Metadata } from 'next';

export const metadata: Metadata = refundMetaData;


const RefundPolicy = () => {
  const sections = [
    {
      title: "Premium Features & Refunds",
      content: `• Our extension offers free usage with limited credits
      • Upgrading to premium plans is completely optional and at user's discretion
      • Payments are non-refundable except for service issues from our side
      • Refunds will be processed if our service causes significant user experience issues
      • All payments are processed in Indian Rupees (INR)`
    },
    {
      title: "Usage Limits",
      content: `Our service operates with the following daily credit limits:
      • Free Plan: 25 credits per day
      • Pro Plan: 300 credits per day
      • Elite Plan: 500 credits per day
      
      Users can try the service completely free within these limits before deciding to upgrade.`
    },
    {
      title: "Account Termination",
      content: `We reserve the right to terminate accounts for:
      • Any misuse of the application
      • Mischievous activities
      • Activities deemed harmful to the service
      • Violation of our terms of service
      
      Terminated accounts are not eligible for refunds.`
    },
    {
      title: "User Rights",
      content: `• Users retain all rights to their custom-created prompts
      • We do not claim any intellectual property rights over user-created prompts
      • You can freely share, modify, or delete your custom prompts at any time
      • Users are responsible for the content of their custom prompts`
    },
    {
      title: "Governing Law",
      content: `• This refund policy and all terms are governed by the laws of India
      • Any disputes will be subject to the jurisdiction of courts in India
      • All transactions are processed in Indian Rupees (INR)`
    },
    {
      title: "Refund Process",
      content: `To request a refund for service issues:
      • Email app@aimagictext.in with your order details
      • Include description of the service issue encountered
      • Provide relevant screenshots or error messages if applicable
      • Refund requests are reviewed on a case-by-case basis
      • Approved refunds are processed within 5-7 business days`
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
            Cancellation & Refund Policy
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
              For refund requests or questions about this policy
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

export default RefundPolicy;