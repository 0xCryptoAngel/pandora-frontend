import { useRouter } from 'next/router';
import {
    Box,
    Button,
    Stack,
    Typography,
    Modal,
} from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: 454,
    background: 'linear-gradient(110.83deg, rgba(175, 89, 205, 0.25) 12.82%, rgba(3, 96, 183, 0.25) 120.34%)',
    boxShadow: '0px 16px 40px rgba(175, 89, 206, 0.33)',
    borderRadius: 3.5,
    p: .5
};

type GetDetailProps = {
    open: boolean;
    handleClose: any;
}

export default function GetDeal ({open, handleClose}: GetDetailProps) {
    const router = useRouter();
    return ( 
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                background: 'rgba(38, 38, 38, 0.31)',
                backdropFilter: 'blur(10px)',
                px: 3
            }}
        >
            <Stack
                sx={style}
            >
                <Stack 
                    alignItems="center"
                    gap={8}
                    sx={{
                        py: 7,
                        px: 2,
                        background: 'rgba(100, 87, 142, 0.31)',
                        borderRadius: 2
                    }}
                    
                >
                    <Typography variant="h5" sx={{ 
                        fontFamily: 'Roboto', 
                        fontWeight: 600, 
                        textAlign: 'center',
                        maxWidth: 360
                    }}>
                        Do you confirm you wish to get access to this deal ? 
                    </Typography>
                    <Stack flexDirection="row" justifyContent="center" gap={3}>
                        <Button
                            onClick={() => router.push('/')}
                            size="small"
                            variant="outlined"
                            sx={{
                                borderRadius: 2.5,
                                px: 3.5,
                                py: 1
                            }}
                        >No</Button>
                        <Button
                            onClick={() => router.push('/')}
                            size="small"
                            sx={{
                                background: 'linear-gradient(110.83deg, #AF59CD 12.82%, #0360B7 120.34%)',
                                borderRadius: 2.5,
                                px: 3.5,
                                py: 1
                            }}
                        >Yes</Button>
                    </Stack>
                </Stack>
            </Stack>
        </Modal>
    )
}