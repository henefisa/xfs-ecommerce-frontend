import type { AppProps } from "next/app";
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

// wrapper
import { wrapper } from "../store";

config.autoAddCss = false;

SwiperCore.use([Pagination, Navigation, Autoplay]);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}

export default wrapper.withRedux(MyApp);
