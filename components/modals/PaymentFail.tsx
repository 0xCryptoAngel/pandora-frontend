import { useRouter } from 'next/router';
import { MouseEventHandler } from 'react';
import {
    Box,
    Button,
    Stack,
    Typography,
    Modal,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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

type FailsProps = {
    open: boolean;
    handleClose: any;
    msg: string;
}

export default function PaymentFail ({open, handleClose, msg}: FailsProps) {
    const router = useRouter();
    return ( 
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                background: 'rgba(38, 38, 38, 0.51)',
                backdropFilter: 'blur(10px)',
            }}
        >
            <Stack
                sx={style}
            >
                <Stack
                    sx={{
                        position: 'absolute',
                        right: -10,
                        top: -10,
                        bgcolor: '#F2F7F6',
                        borderRadius: '50%',
                        p: .5
                    }}
                >
                    <CloseIcon 
                        fontSize="small" 
                        sx={{ 
                            color: '#555DC2', 
                            cursor: 'pointer' 
                        }}
                        onClick={handleClose}
                    />
                </Stack>
                <Stack 
                    alignItems="center"
                    gap={4.5}
                    sx={{
                        py: 7,
                        background: 'rgba(100, 87, 142, 0.31)',
                        borderRadius: 2
                    }}
                >
                    <Stack sx={{ borderRadius: '50%' }}>
                        <Box 
                            component="img"
                            src="/images/fail.png"
                        />
                    </Stack>
                    <Stack alignItems="center" gap={2} sx={{ maxWidth: 350 }}>
                        <Typography variant="h5" sx={{ 
                            fontFamily: 'Roboto', 
                            fontWeight: 600, 
                            textAlign: 'center',
                        }}>
                        Sorry, { msg }
                        </Typography>
                        <Typography variant="subtitle1" sx={{ textAlign: 'center', fontWeight: 400 }}>
                            so you cannot complete purchase
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Modal>
    )
}