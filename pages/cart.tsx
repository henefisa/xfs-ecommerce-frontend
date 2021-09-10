import React from "react";

// components
import CommonLayout from "../layouts/CommonLayout";

interface CartProps {}

const Cart: React.FC<CartProps> = ({}) => {
  return (
    <CommonLayout>
      <div className="cart-page">This is cart page</div>
    </CommonLayout>
  );
};

export default React.memo(Cart);
