import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import Countdown from "components/common/Countdown/Countdown";
import Section from "components/common/Section/Section";
import Product from "components/modules/Product/Product";

// stores
import { useAppSelector } from "hooks";

// constants
import { DEFAULT_URL_BE } from "constants/env";

const Deals = () => {
  const nextEl = React.useRef<HTMLDivElement | null>(null);
  const prevEl = React.useRef<HTMLDivElement | null>(null);

  const { products } = useAppSelector((state) => state.products);

  return (
    <Section
      className="deals"
      title="Hot deals"
      extra={<Countdown duration={3600} />}
    >
      <Swiper
        autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
        loop
        slidesPerView={1}
        spaceBetween={16}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1536: { slidesPerView: 5 },
        }}
        navigation={{
          nextEl: nextEl.current,
          prevEl: prevEl.current,
        }}
        onInit={(swiper) => {
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation !== "boolean"
          ) {
            swiper.params.navigation.nextEl = nextEl.current;
            swiper.params.navigation.prevEl = prevEl.current;
            swiper.init();
            swiper.update();
          }
        }}
      >
        <div className="navigation navigation--next" ref={nextEl}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
        <div className="navigation navigation--prev" ref={prevEl}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>

        {products.map((e) => (
          <SwiperSlide key={e.id}>
            <Product
              direction="horizontal"
              image={`${DEFAULT_URL_BE}${e.images[0].url}`}
              name={e.name}
              price={e.price}
              id={e.id}
              hoverable
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
};

export default Deals;
