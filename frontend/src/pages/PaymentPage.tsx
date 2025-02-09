import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress,
} from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../components/store/cartSlice';

// Stripe 公钥 (环境变量)

console.log('Stripe Public Key:', process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLIC_KEY || 'missing_key'
);

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const items = useSelector(selectCartItems);

  const [cardholderName, setCardholderName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const subtotal = items.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );
  const tax = subtotal * 0.15;
  const shipping = 10;
  const total = subtotal + tax + shipping;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    if (!stripe || !elements) {
      setError('Stripe is not loaded yet.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        'http://localhost:5001/payments/create-payment-intent',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items }),
        }
      );

      const { clientSecret } = await response.json();

      const cardNumberElement = elements.getElement(CardNumberElement);
      if (!cardNumberElement) {
        setError('Card details are incomplete.');
        setLoading(false);
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumberElement,
          billing_details: { name: cardholderName },
        },
      });

      if (result.error) {
        setError(result.error.message || 'Payment failed');
      } else {
        alert('Payment successful!');
      }
    } catch (err) {
      setError('Error processing payment');
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: 480,
          padding: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: 'white',
        }}
      >
        {/* Logo */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <img
            src="/images/logo.png"
            alt="Company Logo"
            style={{ width: '120px' }}
          />
        </Box>

        <Typography
          variant="h5"
          sx={{ textAlign: 'center', fontWeight: 'bold', mb: 2 }}
        >
          Secure Payment
        </Typography>

        {/* 订单摘要 */}
        <Box
          sx={{
            mb: 3,
            padding: 2,
            backgroundColor: '#f9f9f9',
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            Order Summary
          </Typography>
          <Typography sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Subtotal:</span> <b>${subtotal.toFixed(2)}</b>
          </Typography>
          <Typography sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Tax (15%):</span> <b>${tax.toFixed(2)}</b>
          </Typography>
          <Typography sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Shipping:</span> <b>${shipping.toFixed(2)}</b>
          </Typography>
          <Typography
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 1,
              fontWeight: 'bold',
            }}
          >
            <span>Total:</span> <b>${total.toFixed(2)}</b>
          </Typography>
        </Box>

        {/* 支付表单 */}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Cardholder Name"
            variant="outlined"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Box
            sx={{
              mb: 2,
              border: '1px solid #ccc',
              padding: '12px',
              borderRadius: '6px',
            }}
          >
            <CardNumberElement
              options={{ style: { base: { fontSize: '16px' } } }}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Box
              sx={{
                flex: 1,
                border: '1px solid #ccc',
                padding: '12px',
                borderRadius: '6px',
              }}
            >
              <CardExpiryElement
                options={{ style: { base: { fontSize: '16px' } } }}
              />
            </Box>
            <Box
              sx={{
                flex: 1,
                border: '1px solid #ccc',
                padding: '12px',
                borderRadius: '6px',
              }}
            >
              <CardCvcElement
                options={{ style: { base: { fontSize: '16px' } } }}
              />
            </Box>
          </Box>

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!stripe || loading}
            sx={{
              mt: 3,
              backgroundColor: '#000',
              fontSize: '16px',
              fontWeight: 'bold',
              padding: '12px',
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: 'white' }} />
            ) : (
              'Pay Now'
            )}
          </Button>
        </form>

        {/* 支付方式支持 */}
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            We accept:
          </Typography>
          <Box
            sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 1 }}
          >
            <img src="/images/Checkout/visa.svg" alt="Visa" width={45} />
            <img
              src="/images/Checkout/masterCard.svg"
              alt="MasterCard"
              width={45}
            />
            <img src="/images/Checkout/paypal.svg" alt="PayPal" width={45} />
            <img
              src="/images/Checkout/applePay.svg"
              alt="Apple Pay"
              width={45}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const PaymentPage: React.FC = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default PaymentPage;
