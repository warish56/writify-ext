'use client';

import { Alert, Button, Snackbar } from "@mui/material";
import { useState } from "react";
import ContentCopy from '@mui/icons-material/ContentCopy';

export const CopyBtn = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const copyEmail = () => {
        navigator.clipboard.writeText('app@aimagictext.in');
        setOpenSnackbar(true);
    };
    return (
  
        <>
         <Button
              startIcon={<ContentCopy />}
              onClick={copyEmail}
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main'
                }
              }}
            >
              Copy
            </Button>
            <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={() => setOpenSnackbar(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity="success" sx={{ width: '100%' }}>
                    Email copied to clipboard!
                </Alert>
            </Snackbar>
        </>
    )
}