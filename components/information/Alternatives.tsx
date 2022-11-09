import {
    Box,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ActiaveCard from '../cards/ActivateCard';

export default function Alternatives () {
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    const matchUpSm = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Box
            sx={{
                pt: 12,
                pb: 16,
                px: matchUpMd ? 7.5 : matchUpSm ? 4 : 2,
                bgcolor: 'rgba(0, 0, 0, 0.18)'
            }}
        >
            <Typography variant="h5" sx={{ color: '#C69BFF' }}>Alternative to AWS Activate</Typography>
            <Box sx={{ 
                pt: 5,
                display: 'grid',
                gridTemplateColumns: matchUpMd ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)',
                rowGap: 4.5,
                columnGap: 5
            }}>
            {[1,2,3,4].map((ele,key) => 
                <ActiaveCard key={key} />
            )}
            </Box>
        </Box>
    )
}