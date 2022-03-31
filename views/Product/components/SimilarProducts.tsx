import * as React from "react";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "components/common/Card/Card";
import Product from "components/modules/Product/Product";

interface SimilarProductsProps {
  image?: string;
}

const SimilarProducts = (props: SimilarProductsProps) => {
  const nextEl = React.useRef<HTMLDivElement | null>(null);
  const prevEl = React.useRef<HTMLDivElement | null>(null);
  const { image } = props;

  return (
    <Card className="similar-products">
      <h4 className="similar-products__title">Similar Products</h4>
      <div className="slides similar-products__slides">
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
          breakpoints={{
            640: { slidesPerView: 3, autoplay: false },
            1024: {
              slidesPerView: 4,
              autoplay: {
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
                delay: 2000,
              },
            },
            1536: { slidesPerView: 5 },
          }}
          navigation={{
            prevEl: prevEl.current,
            nextEl: nextEl.current,
          }}
          loop
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
          {[...new Array(5)].map((_, idx) => {
            <SwiperSlide key={idx}>
              <Product hoverable image={image ? image : "/product-1.jpg"} />
            </SwiperSlide>;
          })}
        </Swiper>
      </div>
    </Card>
  );
};

export default SimilarProducts;
