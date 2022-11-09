import {
    Button,
    Box,
    Typography,
    Stack,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FeedbackCard from '../../components/cards/FeedbackCard';
import { feedbacks } from '../../constants/content';
import HomeContainer from '../../components/containers/HomeContainer';
import Slider from 'react-slick';
const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    centerPadding: '100'
};
export default function Feedback () {
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    const matchUpLg = useMediaQuery(theme.breakpoints.up('lg'));
    const matchUpSm = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <HomeContainer>
            <Typography
                variant="h3"
                sx={{
                    lineHeight: '64px',
                    textAlign: 'center'
                }}
            >What the say about us</Typography>
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
            {matchUpMd 
            ?
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    rowGap: matchUpLg ? 6 : 3,
                    columnGap: matchUpLg ? 8 : 4
                }}
            >
            {/* <Slider {...settings} slidesToShow=> */}
                {feedbacks.map((item, key) =>
                    <FeedbackCard key={key} {...item} />
                )}
            {/* // </Slider> */}
            </Box>
            : 
            <Box sx={{
                '& .slick-dots': {
                    bottom: -64,
                    '& li': {
                        mx: 2,
                        '& button': {
                            p: 0,
                            width: 12,
                            height: 12,
                            bgcolor: 'transparent',
                            border: '1px solid #fff',
                            borderRadius: '50%',
                        }
                    },
                    '& .slick-active': {
                        mx: 2,
                        '& button': {
                            bgcolor: '#fff',
                        }
                    }
                }
            }}>
                <Slider {...settings} slidesToShow={matchUpSm ? 2 : 1}>
                    {feedbacks.map((item, key) =>
                    <FeedbackCard key={key} {...item} />
                )}
                </Slider>
            </Box>
            }

        </HomeContainer>
    )
}