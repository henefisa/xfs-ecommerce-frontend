import * as React from "react";

import { Form, FormItem } from "components/common/Form";
import Input from "components/common/Input/Input";
import Button from "components/common/Button/Button";

// validation
import * as yup from "yup";

const AccountDetails: React.FC = () => {
  const accountDetailsSchema = React.useMemo(
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
    <div className="my-account-page__account-details">
      <h2 className="my-account-page__title">Account Details</h2>
      <Form className="my-account-page__form" schema={accountDetailsSchema}>
        <FormItem name="userName" label="User Name">
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

export default AccountDetails;
