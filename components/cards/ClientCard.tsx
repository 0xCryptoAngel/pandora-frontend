import {
    Avatar,
    Box,
    Stack,
    Typography
} from '@mui/material';

type ClientCardProps = {
    img: string;
    title: string;
    name: string;
    position: string;
}

export default function ClientCard ({img, title, name, position}: ClientCardProps) {
    return (
        <Stack flexDirection="row" gap={2}>
            <Avatar src={img} />
            <Stack gap={1.5}>
                <Typography>{title}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                    {name}
                    <span style={{ fontWeight: 400 }}>{position}</span>
                </Typography>
            </Stack>
        </Stack>
    )
}