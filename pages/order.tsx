import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { updateOrder } from "apis";
import Button from "components/common/Button/Button";
import Card from "components/common/Card/Card";
import CommonLayout from "layouts/CommonLayout";
import { EOrderStatus } from "models/Order";
import { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";

const stripePromise = loadStripe(
  "pk_test_51KhaOaHe3z2D1zkPUddQx9H9tLCYlIhnwBVKP3uum98X3oVByxUkvIFJ139kxJAc3H0yoIauxyjdTUrSdYiJtgr900dtLZsCrS"
);

const PaymentForm = () => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/result",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message || "");
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  };

  React.useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = router.query.intent as string;
    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe, router.query.intent, router.query.orderId]);

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <Button
        className="mt-4"
        type="solid"
        disabled={isLoading || !stripe || !elements}
        loading={isLoading}
      >
        Pay now
      </Button>
      {/* Show any error or success messages */}
      {message && (
        <div className="text-red-500 mt-2" id="payment-message">
          {message}
        </div>
      )}
    </form>
  );
};

const Order: NextPage = () => {
  const [clientSecret, setClientSecret] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    setClientSecret(router.query.intent as string);
  }, [router.query.intent]);

  if (!clientSecret) {
    return <div>Loadings</div>;
  }

  return (
    <CommonLayout>
      <Card className="max-w-3xl mx-auto mt-6">
        <Elements
          options={{
            clientSecret,
            appearance: {
              theme: "stripe",
            },
          }}
          stripe={stripePromise}
        >
          <PaymentForm />
        </Elements>
      </Card>
    </CommonLayout>
  );
};

export default Order;
