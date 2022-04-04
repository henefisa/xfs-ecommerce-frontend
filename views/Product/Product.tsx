import * as React from "react";

// hooks
import { useAppSelector } from "hooks";

// layout
import CommonLayout from "layouts/CommonLayout";
import Container from "components/common/Container/Container";
import ProductOverview from "./components/ProductOverview";
import SimilarProducts from "./components/SimilarProducts";
import Details from "./components/Details";
import ProductDescription from "./components/ProductDescription";
import CustomerReview from "./components/CustomReview";

const ProductView: React.FC = () => {
  return (
    <CommonLayout>
      <div className="product-page">
        <Container>
          <ProductOverview />
          <SimilarProducts />
          <Details />
          <ProductDescription />
          <CustomerReview />
        </Container>
      </div>
    </CommonLayout>
  );
};
export default ProductView;
