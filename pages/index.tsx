import { InferGetStaticPropsType, NextPage } from "next";
import { END } from "redux-saga";

// store
import { SagaStore, wrapper } from "store";
import { productsActions } from "store/product/productSlice";

// views
import HomeView from "views/Home";

export const getStaticProps = wrapper.getStaticProps(
  (store) => async (context) => {
    store.dispatch(productsActions.getProductsRequest());
    store.dispatch(END);
    await (store as SagaStore).sagaTask?.toPromise();

    return {
      props: {},
      revalidate: 3,
    };
  }
);

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<HomeProps> = ({}) => {
  return <HomeView />;
};

export default Home;
