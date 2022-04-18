import type { AppInitialProps, AppProps } from "next/app";
import App from "next/app";
import { ToastContainer } from "react-toastify";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";

// icons css
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

// swiper css
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/navigation/navigation.scss";

// global css
import "react-toastify/dist/ReactToastify.css";
import "../styles/global.scss";
import "tailwindcss/tailwind.css";

// font
import "typeface-roboto";

// stores
import { wrapper } from "../store";
import { addCategories } from "store/category/categorySlice";

import { fetchStaticProps } from "utils/fetchStaticProps";

config.autoAddCss = false;

SwiperCore.use([Pagination, Navigation, Autoplay]);

class MyApp extends App<AppInitialProps> {
  public static getInitialProps = wrapper.getInitialAppProps(
    (store) =>
      async ({ Component, ctx }) => {
        const [categories] = (
          await fetchStaticProps(ctx.req?.headers.authorization)
        ).map((item) => item.data);
        store.dispatch(addCategories(categories));

        let pageProps = {};
        if (Component.getInitialProps) {
          pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
      }
  );

  public render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Component {...pageProps} />
        <ToastContainer />
      </>
    );
  }
}

export default wrapper.withRedux(MyApp);
