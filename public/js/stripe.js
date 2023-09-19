import axios from 'axios';
import { showAlert } from './alert';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51NrfuISAQZVJaek8PPiz0AkmjIpy4SDDNnSdfRPYMACSQcCVAYZtx9mR4vuj9dHlPWZms7t8iZ8qKzE3AGUAtMoc00kHLUI5qg'
  );
  try {
    //1) Get the session for the server
    const session = await axios(
      `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    //2)Create checkout form + charge the credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
