import React from 'react';
import type { ReactElement, ReactNode } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';

import Header from './Header';
import Footer from './Footer';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    }),
);

type LayoutProps = {
    children: ReactNode;
}
  
export default function Layout ({ children }: LayoutProps): ReactElement {  
    const theme = useTheme();
 
    return (
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: theme.palette.background.default
            }}
        >
            <Box>
                <CssBaseline />
                <Header />
                <Main>
                    {children}
                </Main>
                <Footer />
            </Box>
        </Box>
    );
}