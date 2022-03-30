import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  faBriefcase,
  faChevronLeft,
  faChevronRight,
  faComments,
  faMoneyCheckAlt,
  faShippingFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import Section from "components/common/Section/Section";
import Service from "components/modules/Service/Service";

const Services = () => {
  const nextEl = React.useRef<HTMLDivElement | null>(null);
  const prevEl = React.useRef<HTMLDivElement | null>(null);

  return (
    <Section className="services">
      <div className="navigation navigation--next" ref={nextEl}>
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
      <div className="navigation navigation--prev" ref={prevEl}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
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
    </Section>
  );
};

export default Services;
