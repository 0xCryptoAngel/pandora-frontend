import {
    Button,
    Box,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import { useQuery, gql } from '@apollo/client';
import DealCard from  '../../components/cards/DealCard';
import HomeContainer from '../../components/containers/HomeContainer';
import { GET_DEALS } from '../../gql/deals';

export default function HotDeals () {

    const { data } = useQuery(GET_DEALS, {
        variables: {
            perPage: 6
        }
    });

    const theme = useTheme();
    const router = useRouter();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    const matchUpLg = useMediaQuery(theme.breakpoints.up('lg'));

    return (
        <HomeContainer>
            <Typography
                variant="h3"
                sx={{
                    lineHeight: '64px',
                    textAlign: 'center'
                }}
            >Hot Deals</Typography>
            <Stack
                flexDirection="row"
                justifyContent="center"
                sx={{
                    pt: matchUpMd ? 3: 0,
                    pb: matchUpMd ? 7.5: 9
                }}
            >
                <Typography
                    color="text.secondary"
                    sx={{
                        maxWidth: 445,
                        textAlign: 'center'
                    }}
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Integer nec odio. 
                    Praesent libero. 
                </Typography>
            </Stack>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: matchUpLg ? 'repeat(3, 1fr)' : matchUpMd ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)',
                    rowGap: matchUpLg ? 6 : 3,
                    columnGap: matchUpLg ? 8 : 4
                }}
            >
                {data?.deals?.map((element: any, key: number) => 
                    <DealCard key={key} {...element} />
                )}
            </Box>
            <Stack flexDirection="row" justifyContent="center" sx={{ pt: 10 }}>
                <Button 
                    variant="outlined" 
                    sx={{ 
                        px: 4.5, 
                        py: 1.5, 
                        lineHeight: 1,
                        borderRadius: 2.5
                    }}
                    onClick={() => router.push('/deals')}
                >View all deals</Button>
            </Stack>
        </HomeContainer>
    )
}