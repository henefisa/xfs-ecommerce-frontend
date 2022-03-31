import * as React from "react";

// components
import Card from "components/common/Card/Card";

interface ProductDescriptionProps {
  description: string;
}

const ProductDescription = (props: ProductDescriptionProps) => {
  const { description } = props;
  return (
    <Card className="product-description">
      <h4 className="product-description__title">Product Description</h4>
      <div className="product-description__content">{description}</div>
    </Card>
  );
};

export default ProductDescription;
