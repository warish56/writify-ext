import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import { Box, GlobalStyles, ThemeProvider } from '@mui/material'

import { AppTheme } from "@/services/theme";
import { RootMetaData } from "@/constants/MetaData/root";
import type { Viewport } from 'next'


const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto',
});
  
export const metadata: Metadata = RootMetaData;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <ThemeProvider theme={AppTheme}>
          <GlobalStyles styles={{
            '*': {
              boxSizing: 'border-box',
              padding: 0,
              margin: 0,
            }
          }}/>
          <Box sx={{
            bgcolor: 'white'
          }}>
          {children}
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
