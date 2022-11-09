import {
    Avatar,
    Box, 
    Stack, 
    Typography, 
    Rating,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { StringLiteral } from 'typescript';

type TestimonialCardProps = {
    img: string;
    title: string;
    content: string;
    client: string;
    clientName: string;
    position: string;   
}
export default function TestimonialCard ({img, title, content, client, clientName, position}: TestimonialCardProps) {
    const theme = useTheme();
    const matchUpSm = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Box
            sx={{
                height: 460,
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
                    gap={3.5}
                    sx={{
                        p: matchUpSm ? 4 : 2
                    }}
                >
                    <Box>
                        <Typography variant="h5">{title}</Typography>
                        <Rating name="read-only" value={5} readOnly />
                    </Box>
                    <Typography variant="caption"
                    >{content}</Typography>
                    <Stack
                        flexDirection="row"
                        alignItems="center"
                        gap={2}
                    >

                        <Avatar 
                            src={client}
                        />
                        <Stack gap={.5}>
                            <Typography>{clientName}</Typography>
                            { position ?
                                <Typography variant="caption" color="text.secondary">{position}</Typography>
                                :
                                <></>
                            }
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
}