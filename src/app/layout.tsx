import './styles/globals.css';
import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../theme/theme';
import { CartProvider } from '../context/CartContext';
import Navbar from '@/components/Navbar';


export const metadata = {
  title: 'Pizza Ordering App',
  description: 'Order your favorite pizza online',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <CartProvider>
            <Navbar />
            {children}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}