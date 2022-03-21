import React, { Dispatch, useEffect, useLayoutEffect } from "react";
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

// stores
import { RootState } from "../store";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { authActions } from "../store/auth/authSlice";
import Router from "next/router";

interface LoginInputs {
  username: string;
  password: string;
}

const loginSchema = yup.object().shape({
  username: yup.string().required("Username is required!").trim(),
  password: yup.string().required("Password is required!").trim(),
});

const Login = () => {
  const authSelector = useAppSelector((state: RootState) => state.auth);
  const isAuthenticated = useAppSelector(
    (state: RootState) => !!state.auth.user
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      Router.push("/");
    }
  }, [isAuthenticated]);

  const handleSubmit = (values: LoginInputs) => {
    dispatch(
      authActions.loginRequest({
        username: values.username,
        password: values.password,
      })
    );
  };

  return (
    <>
      {isAuthenticated ? null : (
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
                    <Button loading={authSelector.isLoading}>Login</Button>
                  </Row>
                </Form>
              </div>
            </Container>
          </div>
        </CommonLayout>
      )}
    </>
  );
};

export default Login;
