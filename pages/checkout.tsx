import React from 'react';
import {
    Box, 
    Button,
    Checkbox,
    Divider,
    OutlinedInput, 
    Select, 
    Stack,
    Typography,
    useMediaQuery,
    Radio
} from '@mui/material';
import { PaymentElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51M0tGvLfvWjhJ7QMfYrRkJY5acXGSSPjJYub52MIfIaIZSNh120WGHWqqqNXLdKQ81LnHfdygO6OaqYicMcRDTec006TrmUzNT');
import { useTheme } from '@mui/material/styles';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import HomeContainer from '../components/containers/HomeContainer';
import PaymentComplete from '../components/modals/PaymentComplete';
import PricingPattern from '../components/patterns/PricingPattern';
import Layout from '../layouts';

const Checkout = () => {
    const options = {
        clientSecret:"{{CLIENT_SECRET}}"
    }
    const theme = useTheme();
    const matchUpLg = useMediaQuery(theme.breakpoints.up('lg'));
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    const matchUpSm = useMediaQuery(theme.breakpoints.up('sm'));
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState('a');
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedValue(event.target.value);
    };
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    return (
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
            <HomeContainer>
                <Box
                    sx={{ 
                        pt: 20,
                        pb: 21
                    }}
                >
                    <Stack gap={2}>
                        <Typography variant="h1" sx={{ textAlign: 'center' }}>Checkout</Typography>
                        <Stack>
                            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                            Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit, sed do eiusmod tempor incididunt
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack
                        flexDirection={matchUpMd ? "row" : "column"}
                        alignItems="flex-start"
                        gap={matchUpLg ? 6 : 4}
                        sx={{
                            pt: 16.5,
                        }}
                    >
                        <Box
                            flex={3}
                            sx={{
                                width: '100%',
                                background: 'linear-gradient(116.41deg, rgba(103, 103, 103, 0.35) -56.52%, rgba(45, 37, 58, 0.35) 130.2%)',
                                boxShadow: '0px 1.45455px 36.3636px rgba(69, 42, 124, 0.1)',
                                backdropFilter: 'blur(42.5447px)',
                                borderRadius: 3.5,
                                px: matchUpLg ? 7 : matchUpSm ? 4 : 2,
                                py: matchUpMd ? 6 : 4
                            }}
                        >
                            <Stack gap={6}>
                                <Typography variant="h5" sx={{ fontWeight: 600 }}>Start saving on AWS Activate</Typography>
                                <Stack gap={3.5}>
                                    <Stack 
                                        flexDirection="row" 
                                        justifyContent="space-between" 
                                        gap={matchUpMd ? 6 : matchUpSm ? 4 : 2}
                                    >
                                        <Stack 
                                            flexDirection="row"
                                            alignItems="flex-start" 
                                            gap={2.5}
                                        >
                                            <Radio
                                                checked={selectedValue === 'a'}
                                                onChange={handleChange}
                                                value="a"
                                                name="radio-buttons"
                                                inputProps={{ 'aria-label': 'A' }}
                                                sx={{ p: 0 }}
                                            />
                                            <Stack gap={.5}>
                                                <Typography variant="body2" sx={{ color: '#C090FF', fontWeight: 700 }}>Pay only for the AWS Activate deal</Typography>
                                                <Typography variant="caption">Pay only 149$ to get access to the AWS Activate deal</Typography>
                                            </Stack>
                                        </Stack>
                                        <Typography variant="body2" sx={{ fontWeight: 800 }}>$149</Typography>
                                    </Stack>
                                    <Stack 
                                        flexDirection="row" 
                                        justifyContent="space-between" 
                                        gap={matchUpMd ? 6 : matchUpSm ? 4 : 2}
                                    >
                                        <Stack 
                                            flexDirection="row"
                                            alignItems="flex-start" 
                                            gap={2.5}
                                        >
                                            <Radio
                                                checked={selectedValue === 'b'}
                                                onChange={handleChange}
                                                value="b"
                                                name="radio-buttons"
                                                inputProps={{ 'aria-label': 'B' }}
                                                sx={{ p: 0 }}
                                            />
                                            <Stack gap={.5}>
                                                <Typography variant="body2" sx={{ color: '#C090FF', fontWeight: 700 }}>Unlimited access to all deals</Typography>
                                                <Typography variant="caption">Get access to all our deals including AWS Activate with our Unlimited subscription</Typography>
                                            </Stack>
                                        </Stack>
                                        <Typography variant="body2" sx={{ fontWeight: 800 }}>$199/y</Typography>
                                    </Stack>
                                </Stack>
                                <Stack gap={3.5}>
                                    <Stack gap={.5}>
                                        <Typography variant="caption">Company*</Typography>
                                        <OutlinedInput size="small" />
                                    </Stack>
                                    <Stack gap={.5}>
                                        <Typography variant="caption">Country*</Typography>
                                        <Select
                                            native
                                            size="small"
                                        >
                                            <option>United States</option>
                                        </Select>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Box sx={{ pt: 8, pb: 6 }}>
                                <Divider />
                            </Box>
                            <Stack gap={4}>
                                <Typography variant="h5" sx={{ fontFamily: 'Roboto', fontWeight: 600 }}>Payment Details</Typography>
                                <Stack gap={.5}>
                                    <Typography variant="caption">Credit Card*</Typography>
                                    <OutlinedInput 
                                        startAdornment={
                                            <CreditCardIcon sx={{ color: theme.palette.text.secondary, mr: 1 }} />
                                        }
                                        endAdornment={
                                            <Stack flexDirection="row" alignItems="center" gap={4}>
                                                <Typography sx={{ whiteSpace: 'nowrap', lineHeight: 1 }}>MM / YY</Typography>
                                                <Typography color="text.secondary">CVC</Typography>
                                            </Stack>
                                        }
                                        size="small"
                                        placeholder="Card Number"
                                    />
                                </Stack>
                                <Stack 
                                    flexDirection="row" 
                                    alignItems="flex-start"
                                    gap={2}
                                >
                                    <Checkbox sx={{  p: 0 }}  /> 
                                    <Typography variant="caption">By clicking on the next button you accept our Terms of Use and confirm that you have read our Privacy Policy</Typography>
                                </Stack>
                                <Button
                                    fullWidth
                                    sx={{
                                        background: 'linear-gradient(110.83deg, #AF59CD 12.82%, #0360B7 120.34%)',
                                        borderRadius: 2,
                                        py: 1.5
                                    }}
                                    onClick={handleOpen}
                                >
                                    Complete Purchase
                                </Button>
                            </Stack>
                        </Box>
                        <Stack
                            flex={2}
                            gap={6}
                            sx={{
                                width: '100%',
                                background: 'linear-gradient(110.83deg, rgba(175, 89, 205, 0.25) 12.82%, rgba(3, 96, 183, 0.25) 120.34%)',
                                boxShadow: '0px 16px 40px rgba(175, 89, 206, 0.33)',
                                borderRadius: 3.5,
                                px: matchUpLg ? 7 : matchUpSm ? 4 : 2,
                                py: matchUpMd ? 6 : 4
                            }}
                        >
                            <Typography variant="h4" sx={{ fontFamily: 'Roboto', fontWeight: 600 }}>Order Summary</Typography>
                            <Stack gap={1} sx={{ pt: 6 }}>
                                <Stack 
                                    flexDirection="row" 
                                    alignItems="center"
                                    justifyContent="space-between" 
                                    sx={{ py: 2,
                                        borderBottom: '1px solid rgba(255, 255, 255, 0.15)'
                                    }}
                                >
                                    <Typography variant="body2" sx={{ fontWeight: 400, color: '#CAAFED' }}>Subtotal</Typography>
                                    <Typography>$199</Typography>
                                </Stack>
                                <Stack
                                    flexDirection="row" 
                                    alignItems="center"
                                    justifyContent="space-between" 
                                    sx={{ py: 2,
                                        borderBottom: '1px solid rgba(255, 255, 255, 0.15)'
                                    }}
                                >
                                    <Typography variant="body2" sx={{ fontWeight: 400, color: '#CAAFED' }}>VAT</Typography>
                                    <Typography variant="body2">$0</Typography>
                                </Stack>
                                <Stack 
                                    flexDirection="row" 
                                    alignItems="center"
                                    justifyContent="space-between" 
                                    sx={{ py: 2 }}
                                >
                                    <Typography variant="subtitle1" sx={{ color: '#AE70FF' }}>Total</Typography>
                                    <Typography variant="subtitle1">$199</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                    <PaymentComplete 
                        open={open}
                        handleClose={handleClose}
                    />
                </Box>
            </HomeContainer>
            <PricingPattern />
            <Elements stripe={stripePromise} options={options}>
                <form>
                    <PaymentElement />
                    <button>Submit</button>
                </form>
            </Elements>
        </Box>
    );
}

Checkout.layout = Layout;

export default Checkout;