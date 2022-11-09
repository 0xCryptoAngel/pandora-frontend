import {
    Box,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material';
import Alternatives from './Alternatives';
import Content from './Content';
import Promo from './Promo';
import Contact from './Contact';

export default function Information ({data}: any) {
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <Box
            // sx={{
            //     background: matchUpMd ? 'linear-gradient(116.41deg, rgba(103, 103, 103, 0.25) -56.52%, rgba(45, 37, 58, 0.25) 130.2%)': 'unset',
            //     boxShadow: matchUpMd ?'0px 1.45455px 36.3636px rgba(69, 42, 124, 0.1)': 'unset',
            //     backdropFilter: matchUpMd ?'blur(42.5447px)': 'unset',
            //     borderRadius: matchUpMd ?3.5: 'unset',
            //     border: matchUpMd ? '4px solid #57516a':'unset'
            // }}
        >
            <Content data={data} />
            {/* <Alternatives /> */}
            {/* <Promo /> */}
            <Contact />
        </Box>
    )
}