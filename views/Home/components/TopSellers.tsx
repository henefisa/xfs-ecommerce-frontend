import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import Section from "../../components/common/Section/Section";
import Seller from "../../components/modules/Seller/Seller";

const TopSellers = () => {
  const nextEl = React.useRef<HTMLDivElement | null>(null);
  const prevEl = React.useRef<HTMLDivElement | null>(null);

  return (
    <Section className="top-sellers" title="Top Weekly Sellers">
      <Swiper
        slidesPerView={1}
        spaceBetween={16}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1536: { slidesPerView: 4 },
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
        <SwiperSlide>
          <Seller
            bordered
            hoverable
            name="Sample"
            rating={4}
            logo="/vendor-1.jpg"
            products={["/product-1.jpg", "/product-2.jpg", "/product-3.jpg"]}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Seller
            bordered
            hoverable
            name="Sample"
            rating={4}
            logo="/vendor-2.jpg"
            products={["/product-4.jpg", "/product-5.jpg", "/product-2.jpg"]}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Seller
            bordered
            hoverable
            name="Sample"
            rating={4}
            logo="/vendor-3.jpg"
            products={["/product-2.jpg", "/product-3.jpg", "/product-4.jpg"]}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Seller
            bordered
            hoverable
            name="Sample"
            rating={4}
            logo="/vendor-4.jpg"
            products={["/product-2.jpg", "/product-1.jpg", "/product-5.jpg"]}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Seller
            bordered
            hoverable
            name="Sample"
            rating={4}
            logo="/slide-image-1.png"
            products={["/product-5.jpg", "/product-2.jpg", "/product-1.jpg"]}
          />
        </SwiperSlide>
      </Swiper>
    </Section>
  );
};

export default TopSellers;
