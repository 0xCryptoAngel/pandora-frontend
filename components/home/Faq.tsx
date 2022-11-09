import * as React from 'react';
import {
    Box, 
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useQuery, gql } from '@apollo/client';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { faqs } from '../../constants/content';
import HomeContainer from '../../components/containers/HomeContainer';

const endPoint = process.env.ENT_POINT ?? 'http://localhost:3000/graphql/';
const FAQ_QUERY = `
{
    
}
`
export default function Faq() {
    const  { data, isLoading, error } = useQuery(gql`
        query faq(page:0, perPage: 8, sortField: createdAt, sortOrder:Desc) {
            _id
            answer
            createdAt
            question
            updatedAt
        }
    `)
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <HomeContainer>
            <Stack alignItems="center" gap={6}>
                <Stack gap={1}>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            textAlign: 'center',
                            textTransform: 'uppercase',
                            background: 'linear-gradient(110.83deg, #CD3FFF 12.82%, #0085FF 120.34%)',
                            backgroundClip: 'text',
                            textFillColor: 'transparent'
                        }}
                    >Faqs</Typography>
                    <Typography
                        variant="h3"
                        sx={{
                            textAlign: 'center',
                            lineHeight: '64px'
                        }}
                    >Looking for Answers?</Typography>
                </Stack>
                <Stack gap={3} sx={{ maxWidth: 740,
                    '& >div.Mui-expanded': {
                        background: 'linear-gradient(110.83deg, rgba(175, 89, 205, 0.25) 12.82%, rgba(3, 96, 183, 0.25) 120.34%)',
                        boxShadow: '0px 16px 40px rgba(175, 89, 206, 0.33)'
                    }
                 }}>
                {data?.faq?.map((item: any, key: number) => 
                    <Accordion key={key}
                        sx={{
                            border: '4px solid #5f596d',
                            background: '#2b2833',
                            borderRadius: '14px !important',
                            px: matchUpMd ? 4.5 : 0,
                            py: matchUpMd ? 2 : 0,
                            '&::before': {
                                display: 'none'
                            }
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography variant="subtitle1" color="text.secondary" sx={{ textTransform: 'capitalize' }}>{item.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography color="text.secondary">{item.answer}</Typography>
                        </AccordionDetails>
                    </Accordion>
                )}
                </Stack>
            </Stack>
        </HomeContainer>
    )
}