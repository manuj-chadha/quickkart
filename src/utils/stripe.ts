// utils/stripe.ts
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

export const redirectToCheckout = async (cartItems: any[]) => {
  const stripe = await stripePromise;

  const res = await fetch('/api/payment/create-stripe-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cartItems }),
  });

  const data = await res.json();

  const result = await stripe?.redirectToCheckout({
    sessionId: data.id,
  });

  if (result?.error) {
    console.error(result.error.message);
  }
};
