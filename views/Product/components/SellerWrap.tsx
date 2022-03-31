import * as React from "react";
import clsx from "clsx";
import { SwiperOptions } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// utils
import { debounce } from "utils/debounce";

// components
import Seller from "components/modules/Seller/Seller";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faChevronLeft,
  faChevronRight,
  faComments,
  faMoneyCheckAlt,
  faShippingFast,
} from "@fortawesome/free-solid-svg-icons";
import Service from "components/modules/Service/Service";

interface SellerWrapProps {
  className?: string;
  breakpoints?: SwiperOptions["breakpoints"];
  query: string;
  name?: string;
  image?: string;
}

const SellerWrap: React.FC<SellerWrapProps> = ({
  className,
  breakpoints,
  query,
  name,
  image,
}) => {
  const nextEl = React.useRef<HTMLDivElement | null>(null);
  const prevEl = React.useRef<HTMLDivElement | null>(null);

  const [isMatches, setIsMatches] = React.useState(false);

  React.useEffect(() => {
    const resize = () => {
      if (query && window.matchMedia(query).matches) {
        setIsMatches(true);
      } else {
        setIsMatches(false);
      }
    };
    resize();
    const debouncedResize = debounce(resize, 300);
    window.addEventListener("resize", debouncedResize, false);
    return () => {
      window.removeEventListener("resize", debouncedResize, false);
    };
  }, [query]);

  if (!isMatches) {
    return null;
  }

  return (
    <div className={clsx("seller-wrap", className)}>
      <Seller
        name={name || "sample"}
        rating={4}
        logo="/vendor-1.jpg"
        products={["/product-1.jpg", "/product-2.jpg", "/product-3.jpg"]}
        bordered
      />
      <div className="slides seller-wrap__slides">
        <div
          className="slides__navigation slides__navigation--next"
          ref={nextEl}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
        <div
          className="slides__navigation slides__navigation--prev"
          ref={prevEl}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <Swiper
          slidesPerView={1}
          spaceBetween={16}
          loop
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            nextEl: nextEl.current,
            prevEl: prevEl.current,
          }}
          breakpoints={breakpoints}
          onInit={(swiper) => {
            if (
              typeof swiper.params.navigation !== "boolean" &&
              swiper.params.navigation
            ) {
              swiper.params.navigation.prevEl = prevEl.current;
              swiper.params.navigation.nextEl = nextEl.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }
          }}
        >
          <SwiperSlide>
            <Service
              icon={<FontAwesomeIcon icon={faShippingFast} />}
              title="Free shippings and Return"
              description="For all order over 99$"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Service
              icon={<FontAwesomeIcon icon={faMoneyCheckAlt} />}
              title="Money back guarantee"
              description="Any back within 30 days"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Service
              icon={<FontAwesomeIcon icon={faComments} />}
              title="Customer Support"
              description="Call or mail us 24/7"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Service
              icon={<FontAwesomeIcon icon={faBriefcase} />}
              title="Secure payment"
              description="We ensure secure payment"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default SellerWrap;
