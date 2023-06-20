import { useMutation } from "@apollo/client";
import { useStripe } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import React from "react";
import { CREATE_CHECKOUT_SESSION } from "../utils/mutations";

const Footer = () => {
  const stripe = useStripe();
  const { loggedInUser } = useSelector((state) => state.user);
  const [createCheckoutSession, { loading, error }] = useMutation(
    CREATE_CHECKOUT_SESSION
  );

  // Function to handle the payment process
  const handlePayment = async () => {
    try {
      const { data } = await createCheckoutSession({
        variables: { email: loggedInUser?.email },
      });
      const { sessionID } = data.createCheckoutSession;
      await stripe.redirectToCheckout({
        sessionId: sessionID,
      });
    } catch (error) {
      console.error("Payment error:", error);
    }
  };
  return (
    <div className="bg-gray-200 py-8">
      <div className="container mx-auto flex flex-col items-center">
        <p className="text-gray-600">© 2023</p>
        <div className="donate-section text-center mt-8">
          <h3 className="text-lg font-bold">Donate for Greenpeace</h3>
          <p className="text-gray-700 mb-4">
            Support Greenpeace in their mission to protect the environment and
            promote sustainability.
          </p>
          <button
            onClick={handlePayment}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
          >
            Donate Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
