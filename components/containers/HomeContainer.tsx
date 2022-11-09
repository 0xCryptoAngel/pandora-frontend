import { ReactNode } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

type HomeContainerProps = {
    children: ReactNode;
}

export default function HomeContainer ({children}: HomeContainerProps) {
    const theme = useTheme();
    const matchUpSm = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Box
            sx={{
                px: matchUpSm ? 5 : 2,
                position: 'relative',
                zIndex: 2
            }}
        >
            <Box
                sx={{
                    ml: 'auto',
                    mr: 'auto',
                    maxWidth: 1280,
                    width: '100%'
                }}
            >
                {children}
            </Box>
        </Box>
    )
}