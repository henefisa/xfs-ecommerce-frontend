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

interface RegisterProps {}

interface RegisterInputs {
  username: string;
  email: string;
  password: string;
}

const registerSchema = yup.object().shape({
  username: yup.string().required("Username is required!"),
  email: yup.string().email("Invalid email!").required("Email is required!"),
  password: yup.string().required("Password is required!"),
});

const Register: React.FC<RegisterProps> = ({}) => {
  const handleSubmit = (values: RegisterInputs) => {
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
              <FormItem name="username" label="Username">
                <Input />
              </FormItem>
              <FormItem name="email" label="Email">
                <Input />
              </FormItem>
              <FormItem name="password" label="Password">
                <Input type="password" />
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
