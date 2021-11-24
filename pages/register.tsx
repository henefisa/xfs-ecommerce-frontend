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

// store
import { wrapper } from "../store";
import { Creators } from "../store/actions/authAction";

// models
import { RegisterPayload } from "../models/AuthModel";
import Col from "../components/Col/Col";

interface RegisterProps {}

const registerSchema = yup.object().shape({
  username: yup.string().required("Username is required!"),
  email: yup.string().email("Invalid email!").required("Email is required!"),
  password: yup.string().required("Password is required!"),
  passwordConfirm: yup
    .string()
    .required("Password confirm is required!")
    .oneOf([yup.ref("password"), null], "Password must match!"),
  firstName: yup.string().required("First name is required!"),
  lastName: yup.string().required("Last name is required!"),
  birthday: yup.date().required("Birthday is required"),
});

const Register: React.FC<RegisterProps> = ({}) => {
  const handleSubmit = (values: RegisterPayload) => {
    console.log(values);
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
            <Form onSubmit={handleSubmit} schema={registerSchema} name="login">
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
              <FormItem name="password" label="Password">
                <Input type="password" />
              </FormItem>
              <FormItem name="passwordConfirm" label="Password Confirm">
                <Input type="password" />
              </FormItem>
              <FormItem name="birthday" label="Birthday">
                <Input type="date" />
              </FormItem>
              <Row justify="between" gutter={[0, 12]}>
                <Button type="link" className="login-register-box__btn">
                  <Link href="/login">
                    <a>Have an account? Login now</a>
                  </Link>
                </Button>
                <Button htmlType="submit">Register</Button>
              </Row>
            </Form>
          </div>
        </Container>
      </div>
    </CommonLayout>
  );
};

export default React.memo(Register);

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  store.dispatch(Creators.registerRequest());

  return {
    props: {},
  };
});
