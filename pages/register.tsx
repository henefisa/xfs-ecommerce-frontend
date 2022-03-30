import React from "react";
import Link from "next/link";

// validation
import * as yup from "yup";

// components
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import CommonLayout from "../layouts/CommonLayout";
import { Form, FormItem } from "../components/Form";
import Container from "../components/Container/Container";
import Row from "../components/Row/Row";
import Col from "../components/Col/Col";

// store

// models
import { RegisterPayload } from "../models/AuthModel";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store";
import { authActions } from "../store/auth/authSlice";

type RegisterInputs = RegisterPayload & { birthday: Date };

const phoneRegex =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const registerSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required!")
    .min(4)
    .max(32)
    .trim(),
  email: yup.string().email("Invalid email!").required("Email is required!"),
  password: yup.string().required("Password is required!").min(4).trim(),
  passwordConfirm: yup
    .string()
    .required("Password confirm is required!")
    .oneOf([yup.ref("password"), null], "Password must match!")
    .min(4)
    .trim(),
  firstName: yup.string().required("First name is required!").trim(),
  lastName: yup.string().required("Last name is required!").trim(),
  phoneNumber: yup.string().matches(phoneRegex, "Phone number is not valid"),
  birthday: yup
    .date()
    .required("Birthday is required!")
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr)),
});

const Register = () => {
  const authSelector = useAppSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (values: RegisterInputs) => {
    dispatch(
      authActions.registerRequest({
        ...values,
        birthday: values.birthday.toISOString(),
      })
    );
  };

  return (
    <CommonLayout>
      <div
        className="login-register-page"
        style={{ backgroundImage: `url("/login-bg.jpg")` }}
      >
        <Container>
          <div className="login-register-box">
            <div className="login-register-box__title">Register</div>
            <Form
              onSubmit={handleSubmit}
              schema={registerSchema}
              name="login"
              errors={authSelector.errors}
            >
              <Row gutter={12}>
                <Col span={12} md={6}>
                  <FormItem name="firstName" label="First name">
                    <Input />
                  </FormItem>
                </Col>
                <Col span={12} md={6}>
                  <FormItem name="lastName" label="Last name">
                    <Input />
                  </FormItem>
                </Col>
              </Row>
              <FormItem name="username" label="Username">
                <Input />
              </FormItem>
              <FormItem name="email" label="Email">
                <Input />
              </FormItem>
              <FormItem name="phoneNumber" label="Phone number">
                <Input />
              </FormItem>
              <FormItem name="birthday" label="Birthday">
                <Input type="date" />
              </FormItem>
              <FormItem name="password" label="Password">
                <Input type="password" />
              </FormItem>
              <FormItem name="passwordConfirm" label="Password Confirm">
                <Input type="password" />
              </FormItem>
              <Row justify="between" gutter={[0, 12]}>
                <Button type="link" className="login-register-box__btn">
                  <Link href="/login">
                    <a>Have an account? Login now</a>
                  </Link>
                </Button>
                <Button htmlType="submit" loading={authSelector.isLoading}>
                  Register
                </Button>
              </Row>
            </Form>
          </div>
        </Container>
      </div>
    </CommonLayout>
  );
};

export default Register;
