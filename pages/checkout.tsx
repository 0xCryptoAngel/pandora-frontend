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
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '');
import { useTheme } from '@mui/material/styles';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { useMutation, gql } from '@apollo/client';
import HomeContainer from '../components/containers/HomeContainer';
import PaymentComplete from '../components/modals/PaymentComplete';
import PaymentFail from '../components/modals/PaymentFail';
import PricingPattern from '../components/patterns/PricingPattern';
import Layout from '../layouts';
import { PROCESS_PAYMENT } from '../gql/stripe';
import { countries } from '../constants/country';

const PurchaseForm = () => {
    const cardElementOptions = {
        style: {
            base: {
                color: "#fff",
                fontSize: "18px",
            },
            invalid: {
                color: "#fa755a",
            }
        }
    }

    const [checked, setChecked] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [openFailModal, setOpenFailModal] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState('');
    const [validNumber, setValidNumber] = React.useState(false);
    const [validExpiry, setValidExpiry] = React.useState(false);
    const [validCvc, setValidCvc] = React.useState(false);

    const handleCheck = () => setChecked(!checked)
    const handleClose = () => setOpen(false);
    const handleFailModalClose = () => setOpenFailModal(false);

    const [processPayment] = useMutation(PROCESS_PAYMENT)

    const stripe = useStripe();
    const elements = useElements();
    const cardNumber : any = elements?.getElement(CardNumberElement);
    const cardExpiry : any = elements?.getElement(CardExpiryElement);
    const cardCvc: any = elements?.getElement(CardCvcElement);

    cardNumber?.on('change', (event: any) => setValidNumber(event.error? false: true))
    cardExpiry?.on('change', (event: any) => setValidExpiry(event.error? false: true))
    cardCvc?.on('change', (event: any) => setValidCvc(event.error? false: true))
  
    const handlePurchase = async (event: any) => {
        event.preventDefault();

        try {
            const { error, paymentMethod }: any = await stripe?.createPaymentMethod({
                type: 'card',
                card: cardNumber
            });

            if(paymentMethod) {
                try {
                    const { data } = await processPayment({
                        variables: {
                            paymentMethodId: paymentMethod.id,
                        }
                    })
    
                    setOpen(true);
                } catch (e) {
                    setErrorMsg('we could not process your subscription')
                    setOpenFailModal(true)
                }
            }
        } catch(e: any) {
            setErrorMsg(e.message)
            setOpenFailModal(true)
        }
    };
  
    return (
       <>
            <div style={{border: "1px solid #ffffff33", borderRadius: "4px", padding: "8px"}}>
                <CardNumberElement options={cardElementOptions}/>
            </div>
            <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                <div style={{flex: "1", border: "1px solid #ffffff33", borderRadius: "4px", padding: "8px"}}>
                    <CardExpiryElement options={cardElementOptions}/>
                </div>
                <div style={{flex: "1", border: "1px solid #ffffff33", borderRadius: "4px", padding: "8px"}}>
                    <CardCvcElement options={cardElementOptions}/>
                </div>
            </div>
            <Stack 
                flexDirection="row" 
                alignItems="flex-start"
                gap={2}
            >
                <Checkbox sx={{  p: 0 }} checked={checked} onChange={handleCheck}  /> 
                <Typography variant="caption" style={{fontSize: "16px"}}>By clicking on the next button you accept our Terms of Use and confirm that you have read our Privacy Policy</Typography>
            </Stack>
            <Button
                fullWidth
                sx={{
                    background: 'linear-gradient(110.83deg, #AF59CD 12.82%, #0360B7 120.34%)',
                    borderRadius: 2,
                    py: 1.5
                }}
                onClick={handlePurchase}
                disabled={!stripe || !elements || !checked || !validNumber || !validExpiry || !validCvc}
            >
                Complete Purchase
            </Button>
            <PaymentComplete 
                open={open}
                handleClose={handleClose}
            />
            <PaymentFail 
                open={openFailModal}
                handleClose={handleFailModalClose}
                msg={errorMsg}
            />
       </>
    );
  };

const Checkout = () => {
    const theme = useTheme();
    const matchUpLg = useMediaQuery(theme.breakpoints.up('lg'));
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    const matchUpSm = useMediaQuery(theme.breakpoints.up('sm'));

    const [selectedValue, setSelectedValue] = React.useState('a');
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedValue(event.target.value);
    };
  
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
                                {/* <Stack gap={3.5}>
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
                                </Stack> */}
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
                                            {countries.map((country: any, index: number) => (
                                                <option key={index}>{country.name}</option>
                                            ))}
                                        </Select>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Box sx={{ pt: 8, pb: 6 }}>
                                <Divider />
                            </Box>
                            <Stack gap={4}>
                                <Typography variant="h5" sx={{ fontFamily: 'Roboto', fontWeight: 600 }}>Payment Details</Typography>
                                {/* <Stack gap={.5}>
                                    <Typography variant="caption">Credit Card*</Typography>
                                    <OutlinedInput 
                                        startAdornment={
                                            <CreditCardIcon sx={{ color: theme.palette.text.secondary, mr: 1 }} />
                                        }
                                        size="small"
                                        placeholder="Card Number"
                                    />
                                </Stack>
                                <Stack 
                                    flexDirection="row" 
                                    justifyContent="space-between"
                                    gap={.5}
                                >
                                    <OutlinedInput 
                                        size="small"
                                        placeholder="MM / YY"
                                    />
                                    <OutlinedInput 
                                        size="small"
                                        placeholder="CVC"
                                    />
                                </Stack> */}
                                <Elements stripe={stripePromise}>
                                    <PurchaseForm />
                                </Elements>
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
                                    <Typography>&euro;199</Typography>
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
                                    <Typography variant="body2">&euro;0</Typography>
                                </Stack>
                                <Stack 
                                    flexDirection="row" 
                                    alignItems="center"
                                    justifyContent="space-between" 
                                    sx={{ py: 2 }}
                                >
                                    <Typography variant="subtitle1" sx={{ color: '#AE70FF' }}>Total</Typography>
                                    <Typography variant="subtitle1">&euro;199</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </Box>
            </HomeContainer>
            <PricingPattern />
        </Box>
    );
}

Checkout.layout = Layout;

export default Checkout;