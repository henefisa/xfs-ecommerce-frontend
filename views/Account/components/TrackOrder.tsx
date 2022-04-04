import * as React from "react";

import Input from "components/common/Input/Input";
import Button from "components/common/Button/Button";
import { Form, FormItem } from "components/common/Form";

// validation
import * as yup from "yup";

const TrackOrder: React.FC = () => {
  const orderTrackingSchema = React.useMemo(
    () =>
      yup.object().shape({
        orderId: yup.string().required("Order ID is required").trim(),
        billingEmail: yup
          .string()
          .email("Invalid email address")
          .required("Billing email is required"),
      }),
    []
  );

  return (
    <div className="my-account-page__track-your-order">
      <h2 className="my-account-page__title">Order Tracking</h2>
      <p className="my-account-page__description">
        To track your order please enter your OrderID in the box below and press
        &quot;Track&quot; button. This was given to you on your receipt and in
        the confirmation email you should have received.
      </p>
      <Form className="my-account-page__form" schema={orderTrackingSchema}>
        <FormItem name="orderId" label="Order ID">
          <Input placeholder="Found in your order confirm email" />
        </FormItem>
        <FormItem name="billingEmail" label="Billing Email">
          <Input placeholder="Email you used during checkout" />
        </FormItem>
        <Button type="solid">Track</Button>
      </Form>
    </div>
  );
};

export default TrackOrder;
