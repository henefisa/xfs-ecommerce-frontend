import React, { Dispatch } from "react";
import Link from "next/link";
import { connect, ConnectedProps } from "react-redux";
import { NextPage } from "next";
import { AnyAction } from "redux";

// validation
import * as yup from "yup";

// components
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import CommonLayout from "../layouts/CommonLayout";
import { Form, FormItem } from "../components/Form";
import Container from "../components/Container/Container";
import Row from "../components/Row/Row";

// stores
import { RootState } from "../store/reducers";
import { Creators } from "../store/actions/authAction";

interface LoginInputs {
  username: string;
  password: string;
}

const loginSchema = yup.object().shape({
  username: yup.string().required("Username is required!"),
  password: yup.string().required("Password is required!"),
});

const Login: NextPage<LoginProps> = ({ isLoading, loginRequest }) => {
  const handleSubmit = (values: LoginInputs) => {
    loginRequest(values.username, values.password);
  };

  return (
    <CommonLayout>
      <div
        className="login-register-page"
        style={{ backgroundImage: `url("/login-bg.jpg")` }}
      >
        <Container>
          <div className="login-register-box">
            <div className="login-register-box__title">Login</div>
            <Form onSubmit={handleSubmit} schema={loginSchema} name="login">
              <FormItem name="username" label="Username">
                <Input />
              </FormItem>
              <FormItem name="password" label="Password">
                <Input type="password" />
              </FormItem>
              <Row justify="between" gutter={[0, 12]}>
                <Button type="link" className="login-register-box__btn">
                  <Link href="/register">
                    <a>Doesn&apos;t have an account? Register now</a>
                  </Link>
                </Button>
                <Button loading={isLoading}>Login</Button>
              </Row>
            </Form>
          </div>
        </Container>
      </div>
    </CommonLayout>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    isLoading: state.auth.isLoading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    loginRequest: (username: string, password: string) => {
      dispatch(Creators.loginRequest({ username, password }));
    },
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type LoginProps = ConnectedProps<typeof connector>;
export default connector(Login);
