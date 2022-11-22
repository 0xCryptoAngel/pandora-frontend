import React from 'react';
import {
    Box,
    Button,
    OutlinedInput,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import Link from 'next/link';
import WarningIcon from '@mui/icons-material/Warning';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import GoogleIcon from '@mui/icons-material/Google';
import { invests } from '../constants/content';
import DetailPattern from '../components/patterns/DetailPattern';
import HomeContainer from '../components/containers/HomeContainer';
import Layout from '../layouts';

const Login = () => {
    const { data: session, status } = useSession()
    const router = useRouter();
    const { error } = router.query;
    const theme = useTheme();
    const matchUpLg = useMediaQuery(theme.breakpoints.up('lg'));
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    const matchUpSm = useMediaQuery(theme.breakpoints.up('sm'));

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [emailErrorShow, setEmailErrorShow] = React.useState(false);
    const [passwordErrorShow, setPasswordErrorShow] = React.useState(false);

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handle = async (event: any) => {
        event.preventDefault();

        if (!email) {
            setEmailErrorShow(true);
            return
        }

        if (!password) {
            setPasswordErrorShow(true);
            return
        }

        const response = await signIn('credentials', {
            redirect: true,
            callbackUrl: '/profile',
            email: email,
            password: password
        })

        if (response?.error) {
            setEmailErrorShow(true);
            setPasswordErrorShow(true);
        }
    }

    React.useEffect(() => {
        if (session?.user) {
            router.push('/profile');
        }
    }, [session?.user])
    return (
        <Box
            sx={{
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <HomeContainer>
                <Box sx={{ pt: 12, pb: 25 }}>
                    <Stack flexDirection={matchUpMd ? "row" : "column"}
                        justifyContent="space-between"
                        gap={matchUpMd ? 5 : 8}>
                        <Stack flex={1} gap={12}>
                            <Stack
                                gap={2}
                            >
                                <Typography variant="h2">Savings start here.</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 480 }}>
                                    Join Secret to access big savings on the best tools to kickstart or grow your business.
                                </Typography>
                            </Stack>
                            <Box
                                sx={{
                                    display: matchUpMd ? 'grid' : 'none',
                                    gridTemplateColumns: 'repeat(4, 1fr)',
                                    columnGap: 2.5,
                                    rowGap: 3.5
                                }}
                            >
                                {invests.map((item: any, key: number) =>
                                    <Stack
                                        key={key}
                                        alignItems="center"
                                        justifyContent="center"
                                        sx={{
                                            height: 120,
                                            bgcolor: '#fff',
                                            boxShadow: '-2px 3px 10px rgba(0, 0, 0, 0.09)',
                                            borderRadius: 3,
                                            border: '4px solid #524c56'
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={item}
                                            sx={{
                                                maxHeight: '100%'
                                            }}
                                        />

                                    </Stack>
                                )}
                            </Box>
                        </Stack>
                        <Stack flex={1} flexDirection="row" justifyContent="flex-end">
                            <Box
                                component="form"
                                onSubmit={handle}
                                sx={{
                                    maxWidth: matchUpMd ? 576 : '100%',
                                    width: '100%',
                                    background: 'linear-gradient(110.83deg, rgba(175, 89, 205, 0.25) 12.82%, rgba(3, 96, 183, 0.25) 120.34%);',
                                    boxShadow: '0px 16px 40px rgba(175, 89, 206, 0.33)',
                                    border: '4px solid #6a5cc4',
                                    borderRadius: 3.5
                                }}
                            >
                                <Stack
                                    sx={{
                                        pt: 6,
                                        px: matchUpLg ? 6.5 : matchUpSm ? 4 : 2,
                                        pb: 10
                                    }}
                                >
                                    <Stack gap={2.5}>
                                        <Typography variant="h4">Log in</Typography>
                                        <Typography variant="caption"
                                            sx={{
                                                maxWidth: 324
                                            }}
                                        >Connect your account with Google (business account preferred) or Linkedin:</Typography>
                                    </Stack>
                                    <Stack flexDirection="row" sx={{ pt: 4 }}>
                                        <Button
                                            variant="outlined"
                                            onClick={() => {
                                                signIn('google', {
                                                    callbackUrl: 'http://localhost:3000/login'
                                                });
                                                // router.push('/')
                                            }}
                                            startIcon={
                                                <Stack flexDirection="row"
                                                    sx={{
                                                        bgcolor: '#fff',
                                                        p: .5,
                                                        borderRadius: 1
                                                    }}
                                                >
                                                    <GoogleIcon fontSize="small" sx={{ color: '#442950' }} />
                                                </Stack>}
                                        >
                                            <Typography variant="caption">Sign in with Google</Typography>
                                        </Button>
                                    </Stack>
                                    <Stack gap={3.5} sx={{ pt: 6 }}>
                                        <Stack gap={.5}>
                                            <Typography variant="caption">Professional email*</Typography>
                                            <OutlinedInput
                                                fullWidth
                                                onChange={handleEmail}
                                                value={email}
                                                placeholder='test@email'
                                                size="small"
                                            />
                                            {
                                                (emailErrorShow || error) &&
                                                (<Stack
                                                    flexDirection="row"
                                                    alignItems="center"
                                                    gap={1}
                                                    sx={{
                                                        color: '#FF6565',
                                                        pt: .5
                                                    }}
                                                >
                                                    <WarningIcon fontSize="small" sx={{ fontSize: 16 }} />
                                                    <Typography variant="caption" sx={{ lineHeight: 1 }}>Please enter a valid email address</Typography>
                                                </Stack>)
                                            }
                                        </Stack>
                                        <Stack gap={.5}>
                                            <Typography variant="caption">Password (6 characters minimum)*</Typography>
                                            <OutlinedInput
                                                onChange={handlePassword}
                                                value={password}
                                                fullWidth
                                                size="small"
                                                type="password"
                                                endAdornment={
                                                    <RemoveRedEyeIcon sx={{ color: 'rgba(255, 255, 255, 0.63)' }} />
                                                }
                                            />
                                            {
                                                (passwordErrorShow || error) &&
                                                (<Stack
                                                    flexDirection="row"
                                                    alignItems="center"
                                                    gap={1}
                                                    sx={{
                                                        color: '#FF6565',
                                                        pt: .5
                                                    }}
                                                >
                                                    <WarningIcon fontSize="small" sx={{ fontSize: 16 }} />
                                                    <Typography variant="caption" sx={{ lineHeight: 1 }}>Please enter a valid password</Typography>
                                                </Stack>)
                                            }
                                        </Stack>
                                    </Stack>
                                    <Stack flexDirection="row" alignItems="center" sx={{ pt: 4.5 }}>
                                        {/* <Checkbox size='small' /> */}
                                        <Typography variant="caption" sx={{ lineHeight: 1 }}>
                                            Forgot your password? &nbsp;
                                            <Link href="/">Retrieve</Link>
                                        </Typography>
                                    </Stack>
                                    <Box sx={{ pt: 7.5 }}>
                                        <Button
                                            fullWidth
                                            type="submit"
                                            size="small"
                                            sx={{
                                                background: 'linear-gradient(110.83deg, #AF59CD 12.82%, #0360B7 120.34%)',
                                                borderRadius: 2,
                                                py: 1.5
                                            }}
                                        >Log in</Button>
                                    </Box>
                                    <Box sx={{ pt: 5 }}>
                                        <Typography variant="caption">Not Signed up? &nbsp;
                                            <Link href="/register" style={{ color: 'inherit', fontWeight: 700 }}>Sign up now</Link>
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Box>
                        </Stack>

                        <Box
                            sx={{
                                display: matchUpMd ? 'none' : 'grid',
                                gridTemplateColumns: matchUpMd ? 'repeat(4, 1fr)' : matchUpSm ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)',
                                columnGap: 2.5,
                                rowGap: 3.5
                            }}
                        >
                            {invests.map((item: any, key: number) =>
                                <Stack
                                    key={key}
                                    alignItems="center"
                                    justifyContent="center"
                                    sx={{
                                        height: 120,
                                        bgcolor: '#fff',
                                        boxShadow: '-2px 3px 10px rgba(0, 0, 0, 0.09)',
                                        borderRadius: 3,
                                        border: '4px solid #524c56'
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={item}
                                        sx={{
                                            maxHeight: '100%'
                                        }}
                                    />
                                </Stack>
                            )}
                        </Box>
                    </Stack>
                </Box>
            </HomeContainer>
            <DetailPattern />
        </Box>
    );
}

Login.layout = Layout;

export default Login;