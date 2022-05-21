import { instance } from "apis";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// store
import { SagaStore, wrapper } from "store";
import { addBanners } from "store/banner/bannerSlice";
import { addCategories } from "store/category/categorySlice";
import { productsActions } from "store/product/productSlice";

// utils
import { fetchStaticProps } from "utils/fetchStaticProps";

// views
import HomeView from "views/Home/Home";

const Home: NextPage = ({}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const [categories] = (await fetchStaticProps()).map((item) => item.data);
      const response = await instance.get("/banner");

      dispatch(addBanners(response.data));
      dispatch(addCategories(categories));
      dispatch(productsActions.getProductsRequest());
    })();
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <HomeView />
    </>
  );
};

export default Home;
