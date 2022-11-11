import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise: Stripe | PromiseLike<Stripe | null> | null
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
  }
  return stripePromise;
};

export default getStripe;