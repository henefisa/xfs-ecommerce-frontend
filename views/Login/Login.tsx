import Link from "next/link";

// validation
import * as yup from "yup";

// components
import Input from "components/common/Input/Input";
import Button from "components/common/Button/Button";
import CommonLayout from "layouts/CommonLayout";
import { Form, FormItem } from "components/common/Form";
import Container from "components/common/Container/Container";
import Row from "components/common/Row/Row";

// hooks
import { useAppDispatch, useAppSelector } from "hooks";

// stores
import { authActions } from "store/auth/authSlice";
import Head from "next/head";

interface LoginInputs {
  username: string;
  password: string;
}

const loginSchema = yup.object().shape({
  username: yup.string().required("Username is required!").trim(),
  password: yup.string().required("Password is required!").trim(),
});

const LoginView = () => {
  const authSelector = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

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
      <Head>
        <title>Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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
    </>
  );
};

export default LoginView;
