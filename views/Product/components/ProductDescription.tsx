import * as React from "react";

// components
import Card from "components/common/Card/Card";

// hooks
import { useAppSelector } from "hooks";

const ProductDescription: React.FC = () => {
  const { productDetail } = useAppSelector((state) => state.products);

  return (
    <Card className="product-description">
      <h4 className="product-description__title">Product Description</h4>
      <div className="product-description__content">
        {productDetail?.description}
      </div>
    </Card>
  );
};

export default ProductDescription;
