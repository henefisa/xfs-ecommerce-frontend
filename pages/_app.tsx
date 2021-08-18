import type { AppProps } from "next/app";

import SwiperCore, { Navigation, Pagination, Swiper as S } from "swiper";

// icons css
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

// swiper css
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/navigation/navigation.scss";

// global css
import "../styles/global.scss";
import "tailwindcss/tailwind.css";

config.autoAddCss = false;

SwiperCore.use([Pagination, Navigation]);

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default MyApp;
