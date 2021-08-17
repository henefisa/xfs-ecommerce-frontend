import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
import "../styles/global.scss";

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default MyApp;
