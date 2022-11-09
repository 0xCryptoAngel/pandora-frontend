import {
    Box,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ActiaveCard from '../cards/ActivateCard';
import { promos } from '../../constants/content';

export default function Promo () {
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    const matchUpSm = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Box
            sx={{
                pt: 12,
                pb: 16,
                px: matchUpMd ? 7.5 : matchUpSm ? 4 : 2,
                bgcolor: '#282433'
            }}
        >
            <Typography variant="h5" sx={{ color: '#C69BFF' }}>People also like these promo codes</Typography>
            <Box sx={{ 
                pt: 5,
                display: 'grid',
                gridTemplateColumns: matchUpMd ? 'repeat(3, 1fr)' :  'repeat(1, 1fr)',
                rowGap: matchUpSm ? 4.5 : 2,
                columnGap: 5
            }}>
            {promos.map((ele,key) => 
                <Box
                    key={key}
                    sx={{
                        background: 'linear-gradient(116.41deg, rgba(103, 103, 103, 0.5) -56.52%, rgba(45, 37, 58, 0.5) 130.2%)',
                        boxShadow: '0px 1.45455px 36.3636px rgba(69, 42, 124, 0.1)',
                        backdropFilter: 'blur(42.5447px)',
                        borderRadius: 3.5,
                        py: 1.5,
                        px: matchUpSm ? 4.5 : 2
                    }}
                >
                    <Typography>{ele}</Typography>
                </Box>
            )}
            </Box>
        </Box>
    )
}