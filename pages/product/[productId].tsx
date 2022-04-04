import * as React from "react";

import { SagaStore, wrapper } from "../../store";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { productsActions } from "../../store/product/productSlice";
import { END } from "redux-saga";
import ProductView from "views/Product/Product";

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const { productId } = context.params!;

    if (!productId) {
      return {
        redirect: {
          destination: "/404",
          permanent: true,
        },
      };
    }

    store.dispatch(
      productsActions.getProductDetailRequest(productId as string)
    );
    store.dispatch(END);
    await (store as SagaStore).sagaTask?.toPromise();

    return {
      props: {},
    };
  });

type ProductDetailProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

const ProductPage: NextPage<ProductDetailProps> = () => {
  return <ProductView />;
};

export default React.memo(ProductPage);
