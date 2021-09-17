import React from "react";
import { UnpackNestedValue, useForm } from "react-hook-form";

// validation
import * as yup from "yup";

// components
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import CommonLayout from "../layouts/CommonLayout";
import { Form, FormItem } from "../components/Form";

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
  return (
    <CommonLayout>
      <div className="login-page">
        <div className="login-box">
          <Form
            onSubmit={(values: LoginInputs) => {
              console.log(values);
            }}
            schema={loginSchema}
          >
            <FormItem name="username">
              <Input placeholder="Username" />
            </FormItem>
            <FormItem name="password">
              <Input placeholder="Password" type="password" />
            </FormItem>
            <Button htmlType="submit">Submit</Button>
          </Form>
          {/* <form onSubmit={handleSubmit((value) => console.log(value))}>
            <label className="">
              <div>Username</div>
              <Input {...register("username", { required: true })} />
            </label>
            <label>
              <div>Password</div>
              <Input
                {...register("username", { required: true })}
                type="password"
              />
            </label>
            
          </form> */}
        </div>
      </div>
    </CommonLayout>
  );
};

export default React.memo(Login);
