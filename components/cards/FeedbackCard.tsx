import {
    Avatar,
    Box, 
    Stack, 
    Typography, 
    Rating,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

type FeedbackCardProps = {
    img: string;
    content: string;
    client: string;
    clientName: string;
    atLg: Boolean
}

export default function FeedbackCard ({img, content, client, clientName, atLg = false}: FeedbackCardProps) {
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    const matchUpLg = useMediaQuery(theme.breakpoints.up('lg'));
    const matchUpSm = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Box
            sx={{
                height: matchUpLg ? 460 : matchUpMd ? 420 : matchUpSm ? 300 : 211,
                // height: 460,
                mx: matchUpMd ? (atLg ? 2 : 0) : matchUpSm ? 1 : 1,
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                borderRadius: 3.5
            }}
        >
            <Stack
                justifyContent="flex-end"
                sx={{
                    height: '100%',
                    background: 'linear-gradient(360deg, #2C233D 0%, rgba(25, 18, 37, 0.38) 61.19%), url(indieground-plastic-textures-05.jpg)',
                    backgroundBlendMode: 'normal, lighten',
                    borderRadius: 3.5
                }}
            >
                <Stack
                    gap={matchUpSm ? 3.5 : 1.5}
                    sx={{
                        p: matchUpMd ? 4 : 2 
                    }}
                >
                    <Rating name="read-only" value={5} readOnly />
                    <Typography variant="overline" 
                        sx={{ 
                            lineHeight: '155%',
                            maxWidth: 330,
                        }}
                    >{content}</Typography>
                    <Stack
                        flexDirection="row"
                        alignItems="center"
                        gap={2}
                    >

                        <Avatar 
                            src={client}
                        />
                        <Typography>{clientName}</Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
}