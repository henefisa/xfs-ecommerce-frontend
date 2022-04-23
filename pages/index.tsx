import { instance } from "apis";
import { InferGetStaticPropsType, NextPage } from "next";
import { END } from "redux-saga";

// store
import { SagaStore, wrapper } from "store";
import { addBanners } from "store/banner/bannerSlice";
import { addCategories } from "store/category/categorySlice";
import { productsActions } from "store/product/productSlice";

// utils
import { fetchStaticProps } from "utils/fetchStaticProps";

// views
import HomeView from "views/Home/Home";

export const getStaticProps = wrapper.getStaticProps(
  (store) => async (context) => {
    const [categories] = (await fetchStaticProps()).map((item) => item.data);
    const response = await instance.get("/banner");

    store.dispatch(addBanners(response.data));
    store.dispatch(addCategories(categories));
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
