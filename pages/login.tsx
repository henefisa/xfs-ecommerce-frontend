import React from "react";

// components
import CommonLayout from "../layouts/CommonLayout";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  return (
    <CommonLayout>
      <div className="login-page">This is login</div>
    </CommonLayout>
  );
};

export default React.memo(Login);
