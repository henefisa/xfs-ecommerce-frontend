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
import { store } from "../store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { initialInterceptor, instance } from "../apis";
import ProtectedRoute from "../routes/ProtectedRoute";

config.autoAddCss = false;
initialInterceptor(instance);

const persistor = persistStore(store);

SwiperCore.use([Pagination, Navigation, Autoplay]);

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} />
      {/* <ProtectedRoute router={router}> */}
      <Component {...pageProps} />
      {/* </ProtectedRoute> */}

      <ToastContainer />
    </Provider>
  );
}

export default MyApp;
