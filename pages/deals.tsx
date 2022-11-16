import React from 'react';
import {
    Box, 
    Button,
    Stack,
    Typography,
    OutlinedInput,
    useMediaQuery,
    Select
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import DealCard from '../components/cards/DealCard';
import { categories } from '../constants/content';
import HomeContainer from '../components/containers/HomeContainer';
import ExplorerPattern from '../components/patterns/ExplorerPattern';
import Layout from '../layouts';
import { GET_CATEGORIES } from '../gql/categories';
import { GET_DEALS } from '../gql/deals';

const Deals = () => {
    const theme = useTheme();
    const matchUpLg = useMediaQuery(theme.breakpoints.up('lg'));
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    const matchUpSm = useMediaQuery(theme.breakpoints.up('sm'));
    const router = useRouter();
    const {c} = router.query;
    const filter = c ? { categoriesIds: [c] } : {};

    const [order, setOrder] = React.useState('createdAt');
    const [direction, setDirection] = React.useState('Desc');
    const [page, setPage] = React.useState(0);

    const handleOrder = (e:any) => {
        if (e.target.value === '2') {
            setOrder('createdAt');
            setDirection('Desc');
        } else if (e.target.value === '3') {
            setOrder('name');
            setDirection('Desc');
        } else {
            setOrder('name');
            setDirection('Asc');
        }
    }

    const categories = useQuery(GET_CATEGORIES, {
        variables: {
            page: 0,
            perPage: 50,
            sortField: 'createdAt',
            sortOrder: 'Desc', 
            filter: {
                ids: [c]
            }
        }
    })

    const  {data, loading, refetch} = useQuery(GET_DEALS, {
        variables: {
            filter: filter,
            page: page,
            perPage: 50,
            sortOrder: direction,
            sortField: order
        }
    })

    React.useEffect(() => {
        refetch();
        categories?.refetch();
    }, [order, direction, c])

    return (
        <Box sx={{ 
                position: 'relative', 
                overflow: 'hidden' 
            }}
        >
            <HomeContainer>
                <Box
                    sx={{
                        pt: 6,
                        pb: 24,
                    }}
                >
                    <Stack flexDirection="row">
                        <Box
                            component="img"
                            src="/images/spark.png"
                            sx={{
                                position: 'relative',
                                left: -20
                            }}
                        />
                    </Stack>
                    <Typography 
                        variant="h1" 
                        sx={{ 
                            textTransform: 'uppercase' 
                        }}
                    >{c ? categories?.data?.categories?.[0]?.name : "All Deals"}</Typography>
                    <Stack
                        flexDirection={matchUpMd ? "row" : "column"} 
                        justifyContent="space-between"
                        alignItems={matchUpMd ? "center": "flex-start"}
                        gap={5}
                        sx={{
                            pt: matchUpMd ? 3.5 : 1.5,
                            pb: 11
                        }}
                    >
                        <Typography variant="body2" color="text.secondary" 
                            sx={{ fontStyle: 'italic'}}
                        >{data && data.deals && data.deals.length ? `${data.deals.length} Deals Available` : 'No Deals Available'}</Typography>
                        <Stack
                            flexDirection={matchUpSm ? "row" : "column"}
                            justifyContent={matchUpMd ? 'inherit' : 'space-between'}
                            gap={matchUpMd ? 8 :  4}
                        >
                            <Stack
                                flexDirection={matchUpMd ? "row" : "column"}
                                alignItems={matchUpMd ? "center" : "flex-start"}
                                gap={matchUpMd ? 2 : 0.5}
                            >
                                <Typography variant="body2" color="text.secondary">Order By:</Typography>
                                <Select native
                                    size="small"
                                    onClick={handleOrder}
                                >
                                    <option value="1">Most recent first</option>
                                    <option value="2">A - Z first</option>
                                    <option value="3">Z - A first</option>
                                </Select>
                            </Stack>
                        </Stack>
                    </Stack>
                    {loading
                    ?
                        <Typography>Loading...</Typography>
                    :
                    (data && data.deals && data.deals.length 
                    ?
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: matchUpLg 
                                                ? 'repeat(3, 1fr)' 
                                                : matchUpMd 
                                                ? 'repeat(2, 1fr)' 
                                                : 'repeat(1, 1fr)',
                            rowGap: matchUpLg ? 6 : 3,
                            columnGap: matchUpLg ? 8 : 4
                        }}
                    >
                        {data.deals.map((element: any, key: number) =>
                            <DealCard key={key} {...element} />
                        )}
                    </Box>
                    :
                        <Stack
                            alignItems="center"
                            justifyContent="center"
                            sx={{
                                py: 30
                            }}
                        >
                            <Stack gap={5}>
                                <Stack gap={2}>
                                    <Typography variant="h1">Sorry, No Result found ☹️</Typography>
                                    <Typography variant="h5" color="text.secondary" sx={{ fontWeight: 500 }}>We’re sorry what you’re looking for; please try another way</Typography>
                                </Stack>
                                <Stack flexDirection="row">
                                    <Button variant="outlined" onClick={() => router.push('/')}>Back to Home</Button>
                                </Stack>
                            </Stack>
                        </Stack>
                    )   
                    }
                </Box>
            </HomeContainer>
            <ExplorerPattern />
        </Box>
    );
}

Deals.layout = Layout;

export default Deals;