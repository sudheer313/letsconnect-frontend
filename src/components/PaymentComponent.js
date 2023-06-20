import { useMutation } from "@apollo/client";
import { CREATE_PAYMENT_INTENT } from "./mutations";

const PaymentComponent = () => {
  const [createPaymentIntent, { data, loading, error }] = useMutation(CREATE_PAYMENT_INTENT);

  // Function to handle the payment process
  const handlePayment = async () => {
    try {
      const amount = 1000; // Example amount in cents
      const { data } = await createPaymentIntent({ variables: { amount } });
      const { id, client_secret } = data.createPaymentIntent;
      // Use the payment details (id and client_secret) to proceed with the payment on the frontend
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <div>
      {/* Render your payment UI here */}
      <button onClick={handlePayment}>Make Payment</button>
    </div>
  );
};

export default PaymentComponent;
