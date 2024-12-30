import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import BugReportIcon from '@mui/icons-material/BugReport';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  id: string
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }



  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo, {
      id: this.props.id
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} onReset={this.handleReset} id={this.props.id} />;
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error?: Error;
  onReset: () => void;
  id: string;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, onReset }) => {
  return (
    <Box
      sx={{
        //minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
        bgcolor: 'background.default',
      }}
    >
      <Paper
        elevation={4}
        sx={{
          maxWidth: 600,
          width: '100%',
          overflow: 'hidden',
          bgcolor: 'background.paper',
          borderTop: 5,
          borderColor: 'primary.main',
        }}
      >
        <Box
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <BugReportIcon 
            sx={{ 
              fontSize: 64,
              color: 'primary.main',
              mb: 3,
            }} 
          />

          <Typography 
            variant="h1" 
            sx={{ 
              mb: 2,
              color: 'text.primary',
            }}
          >
            Oops! Something went wrong
          </Typography>

          <Typography 
            variant="body1" 
            sx={{ 
              mb: 4,
              color: 'text.secondary',
              maxWidth: 450,
            }}
          >
            We apologize for the inconvenience. An unexpected error has occurred and our team has been notified.
          </Typography>

          {error && (
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                mb: 4,
                width: '100%',
                bgcolor: 'gray.100',
                borderColor: 'gray.300',
              }}
            >
              <Typography 
                variant="caption" 
                component="pre"
                sx={{
                  fontFamily: 'monospace',
                  color: 'gray.600',
                  wordBreak: 'break-word',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {error.message}
              </Typography>
            </Paper>
          )}

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<RefreshIcon />}
              onClick={onReset}
              sx={{
                px: 4,
                py: 1,
                fontWeight: 600,
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              Try Again
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

