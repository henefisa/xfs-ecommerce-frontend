import { useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";

// components
import Image from "next/image";
import Button from "../components/Button/Button";
import Container from "../components/Container/Container";
import { Swiper as S } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Banner, BannerGroup } from "../components/Banner";
import Service from "../components/Service/Service";
import CommonLayout from "../layouts/CommonLayout";
import Seller from "../components/Seller/Seller";
import Section from "../components/Section/Section";
import Product from "../components/Product/Product";
import Countdown from "../components/Countdown/Countdown";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faChevronLeft,
  faChevronRight,
  faComments,
  faMoneyCheckAlt,
  faShippingFast,
} from "@fortawesome/free-solid-svg-icons";

const Introduction = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [swiper, setSwiper] = useState<S>();

  const handleChangeSlide = (idx: number) => {
    swiper?.slideTo(idx);
  };

  const handleNextSlide = () => {
    swiper?.slideNext();
  };

  const handlePrevSlide = () => {
    swiper?.slidePrev();
  };

  return (
    <section className="introduction">
      <Swiper
        className="carousel"
        onSwiper={setSwiper}
        onSlideChange={(swiper) => {
          setActiveSlide(swiper.activeIndex);
        }}
      >
        <div className="navigation navigation--next" onClick={handleNextSlide}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
        <div className="navigation navigation--prev" onClick={handlePrevSlide}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <SwiperSlide>
          <div
            className="introduction__banner"
            style={{ backgroundImage: `url(/slide-1.jpg)` }}
          >
            <Container className="introduction__banner-container">
              <div className="introduction__banner-content">
                <h5 className="subtitle">Sample subtitle</h5>
                <h2 className="title">Sample title</h2>
                <Button type="outline">Sample button</Button>
              </div>
              <div className="introduction__banner-image">
                <Image
                  src="/slide-image-1.png"
                  layout="fill"
                  alt="Sample image"
                  objectFit="contain"
                  objectPosition="center"
                />
              </div>
            </Container>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="introduction__banner"
            style={{ backgroundImage: `url(/slide-2.jpg)` }}
          >
            <Container className="introduction__banner-container">
              <div className="introduction__banner-content">
                <h5 className="subtitle">Sample subtitle</h5>
                <h2 className="title">Sample title</h2>
                <Button type="outline">Sample button</Button>
              </div>
              <div className="introduction__banner-image">
                <Image
                  src="/slide-image-2.png"
                  layout="fill"
                  alt="Sample image"
                  objectFit="contain"
                  objectPosition="center"
                />
              </div>
            </Container>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="introduction__banner"
            style={{ backgroundImage: `url(/slide-3.jpg)` }}
          >
            <Container className="introduction__banner-container">
              <div className="introduction__banner-content">
                <h5 className="subtitle">Sample subtitle</h5>
                <h2 className="title">Sample title</h2>
                <Button type="outline">Sample button</Button>
              </div>
              <div className="introduction__banner-image">
                <Image
                  src="/slide-image-3.png"
                  layout="fill"
                  alt="Sample image"
                  objectFit="contain"
                  objectPosition="center"
                />
              </div>
            </Container>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="introduction__banner"
            style={{ backgroundImage: `url(/slide-1.jpg)` }}
          >
            <Container className="introduction__banner-container">
              <div className="introduction__banner-content">
                <h5 className="subtitle">Sample subtitle</h5>
                <h2 className="title">Sample title</h2>
                <Button type="outline">Sample button</Button>
              </div>
              <div className="introduction__banner-image">
                <Image
                  src="/slide-image-1.png"
                  layout="fill"
                  alt="Sample image"
                  objectFit="contain"
                  objectPosition="center"
                />
              </div>
            </Container>
          </div>
        </SwiperSlide>
      </Swiper>
      <ul className="carousel__dots-custom">
        {[...new Array(4)].map((_, idx) => (
          <li
            key={idx}
            className={clsx(
              "carousel__dots-custom-item",
              idx === activeSlide && "active"
            )}
            onClick={() => handleChangeSlide(idx)}
          >
            <Image
              src={`/slide-image-${(idx % 3) + 1}.png`}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              alt="Custom dots image"
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

const Services = () => {
  const nextEl = useRef<HTMLDivElement | null>(null);
  const prevEl = useRef<HTMLDivElement | null>(null);

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

const TopBanners = () => {
  return (
    <Section className="top-banners">
      <BannerGroup>
        <Banner
          title="Sample title"
          subTitle="Sample sub title"
          size="lg"
          extra={<Button>Sample button</Button>}
          style={{ backgroundImage: "url(/banner-1.jpg)" }}
        />
        <Banner
          title="Sample title"
          subTitle="Sample sub title"
          size="md"
          style={{ backgroundImage: "url(/banner-2.jpg)" }}
          className="banner--custom"
        />
        <Banner
          title="Sample title"
          subTitle="Sample sub title"
          size="sm"
          className="banner--custom"
          style={{ backgroundImage: "url(/banner-3.jpg)" }}
        />
        <Banner
          title="Sample title"
          subTitle="Sample sub title"
          size="sm"
          style={{ backgroundImage: "url(/banner-4.jpg)" }}
        />
      </BannerGroup>
    </Section>
  );
};

const TopSellers = () => {
  const nextEl = useRef<HTMLDivElement | null>(null);
  const prevEl = useRef<HTMLDivElement | null>(null);

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

const Deals = () => {
  const nextEl = useRef<HTMLDivElement | null>(null);
  const prevEl = useRef<HTMLDivElement | null>(null);

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

        <SwiperSlide>
          <Product image="/product-1.jpg" hoverable />
        </SwiperSlide>
        <SwiperSlide>
          <Product image="/product-2.jpg" hoverable />
        </SwiperSlide>
        <SwiperSlide>
          <Product image="/product-3.jpg" hoverable />
        </SwiperSlide>
        <SwiperSlide>
          <Product image="/product-4.jpg" hoverable />
        </SwiperSlide>
        <SwiperSlide>
          <Product image="/product-5.jpg" hoverable />
        </SwiperSlide>
        <SwiperSlide>
          <Product image="/product-2.jpg" hoverable />
        </SwiperSlide>
      </Swiper>
    </Section>
  );
};

const BottomBanners = () => {
  return (
    <Section className="bottom-banners">
      <BannerGroup>
        <Banner
          title="Sample banner"
          subTitle="Sample"
          style={{ backgroundImage: "url(/banner-1.jpg)" }}
          size="md"
        />
        <Banner
          title="Sample banner"
          subTitle="Sample"
          style={{ backgroundImage: "url(/banner-2.jpg)" }}
          className="banner--custom"
          size="md"
        />
      </BannerGroup>
    </Section>
  );
};

const TopRatedProducts = () => {
  return (
    <Section
      className="products"
      title="Top Rated Products"
      extra={
        <Link href="/products">
          <a>
            <Button type="link" color="primary">
              More product
            </Button>
          </a>
        </Link>
      }
    >
      <div className="products__wrap">
        <Product direction="horizontal" image="/product-1.jpg" hoverable />
        <Product direction="horizontal" image="/product-2.jpg" hoverable />
        <Product direction="horizontal" image="/product-3.jpg" hoverable />
        <Product direction="horizontal" image="/product-4.jpg" hoverable />
        <Product direction="horizontal" image="/product-5.jpg" hoverable />
        <Product direction="horizontal" image="/product-4.jpg" hoverable />
        <Product direction="horizontal" image="/product-1.jpg" hoverable />
        <Product direction="horizontal" image="/product-2.jpg" hoverable />
      </div>
    </Section>
  );
};

export default function Home() {
  return (
    <CommonLayout>
      <div className="home-page">
        <Introduction />
        <Container>
          <Services />
          <TopBanners />
          <TopSellers />
          <Deals />
          <BottomBanners />
          <TopRatedProducts />
        </Container>
      </div>
    </CommonLayout>
  );
}
