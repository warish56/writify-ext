import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
} from '@mui/material';

const TermsAndConditions = () => {
  const sections = [
    {
      title: "Agreement to Terms",
      content: `By installing and using our AI Prompt Search Extension, you agree to these Terms and Conditions. These terms are governed by the laws of India. If you disagree with any part, please uninstall the extension immediately.`
    },
    {
      title: "Usage Limits",
      content: `Daily credit limits per plan:
      • Free Plan: 25 credits per day
      • Pro Plan: 300 credits per day
      • Elite Plan: 500 credits per day
      
      Credits reset at the beginning of each day.`
    },
    {
      title: "Payments and Refunds",
      content: `• The extension offers free usage up to the specified credit limit
      • Upgrade to paid plans is optional and at user's discretion
      • Payments are non-refundable except for service issues from our side
      • Refunds will be processed if our service causes significant user experience issues
      • All payments are processed in Indian Rupees (INR)`
    },
    {
      title: "User Content",
      content: `• Users retain all rights to their custom-created prompts
      • You may freely share, modify, or delete your custom prompts
      • We do not claim ownership of user-created prompts
      • You are responsible for the content of your custom prompts`
    },
    {
      title: "Account Termination",
      content: `We reserve the right to terminate accounts for:
      • Misuse of the extension
      • Malicious activities
      • Attempting to bypass usage limits
      • Violation of these terms
      • Any activity deemed harmful to the service or other users`
    },
    {
      title: "Service Usage",
      content: `• The extension must comply with browser store policies
      • Users must not attempt to reverse engineer the extension
      • Automated data collection is prohibited
      • Users must not interfere with service functionality`
    },
    {
      title: "Disclaimer",
      content: `The service is provided "as is" without warranties. We're not responsible for:
      • AI-generated content accuracy
      • Service interruptions
      • Third-party service issues
      • Data loss`
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
            Terms and Conditions
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
              For questions about these terms
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

export default TermsAndConditions;