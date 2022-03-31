import * as React from "react";

// hooks
import { useAppSelector } from "hooks";

// layout
import CommonLayout from "layouts/CommonLayout";
import Container from "components/common/Container/Container";
import ProductView from "./components/ProductView";
import SimilarProducts from "./components/SimilarProducts";
import Details from "./components/Details";
import ProductDescription from "./components/ProductDescription";
import CustomerReview from "./components/CustomReview";

// constants
import { DEFAULT_URL_BE } from "constants/env";

const ProductDetail: React.FC = () => {
  const { productDetail } = useAppSelector((state) => state.products);

  return (
    <CommonLayout>
      <div className="product-page">
        <Container>
          <ProductView
            description={productDetail?.description}
            image={
              productDetail?.images.length
                ? `${DEFAULT_URL_BE}${productDetail.images[0]?.url}`
                : undefined
            }
            price={productDetail?.price}
            stock={productDetail?.stock}
            name={productDetail?.name}
            id={productDetail?.id}
          />
          <SimilarProducts
            image={
              productDetail?.images.length
                ? `${DEFAULT_URL_BE}${productDetail.images[0]?.url}`
                : undefined
            }
          />
          <Details description={productDetail?.description} />
          <ProductDescription description={productDetail?.description || ""} />
          <CustomerReview
            images={
              productDetail?.images.length
                ? `${DEFAULT_URL_BE}${productDetail.images[0]?.url}`
                : undefined
            }
          />
        </Container>
      </div>
    </CommonLayout>
  );
};
export default ProductDetail;
