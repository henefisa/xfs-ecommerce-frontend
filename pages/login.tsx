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

interface LoginProps {}

interface LoginInputs {
  username: string;
  password: string;
}

const loginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const Login: React.FC<LoginProps> = ({}) => {
  const handleSubmit = (values: LoginInputs) => {
    console.log(values);
  };

  return (
    <CommonLayout>
      <div
        className="login-page"
        style={{ backgroundImage: `url("/login-bg.jpg")` }}
      >
        <Container>
          <div className="login-box">
            <Form onSubmit={handleSubmit} schema={loginSchema} name="login">
              <FormItem name="username" label="Username">
                <Input placeholder="Username" />
              </FormItem>
              <FormItem name="password" label="Password">
                <Input placeholder="Password" type="password" />
              </FormItem>
              <Row justify="between" gutter={[0, 12]}>
                <Button type="link" className="register-btn">
                  <Link href="/register">
                    <a>Doesn&apos;t have an account? Register now</a>
                  </Link>
                </Button>
                <Button htmlType="submit">Login</Button>
              </Row>
            </Form>
          </div>
        </Container>
      </div>
    </CommonLayout>
  );
};

export default React.memo(Login);
