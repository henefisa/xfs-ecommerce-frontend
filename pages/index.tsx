import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  faBriefcase,
  faChevronLeft,
  faChevronRight,
  faComments,
  faMoneyCheckAlt,
  faShippingFast,
} from "@fortawesome/free-solid-svg-icons";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";

// components
import Image from "next/image";
import Link from "next/link";
import { Banner, BannerGroup } from "../components/Banner";
import Button from "../components/Button/Button";
import Container from "../components/Container/Container";
import Countdown from "../components/Countdown/Countdown";
import { Form, FormItem } from "../components/Form";
import Input from "../components/Input/Input";
import Product from "../components/Product/Product";
import Section from "../components/Section/Section";
import Seller from "../components/Seller/Seller";
import Service from "../components/Service/Service";
import CommonLayout from "../layouts/CommonLayout";

// store
import { RootState } from "../store";
import { authActions } from "../store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";

const Introduction = () => {
  const nextEl = useRef<HTMLDivElement>(null);
  const prevEl = useRef<HTMLDivElement>(null);

  return (
    <section className="introduction">
      <Swiper
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
        pagination={{
          clickable: true,
          bulletClass: "introduction__slide-pagination",
          bulletActiveClass: "active",
        }}
      >
        <SwiperSlide>
          <div className="introduction__slide">
            <div
              className="introduction__slide-image"
              style={{ overflow: "hidden", borderRadius: "24px" }}
            >
              <Image
                src="/images/home/slider-1.jpg"
                layout="fill"
                alt="Slide image 1"
                objectFit="cover"
                objectPosition="center"
                quality="100"
              />
            </div>
            <div className="introduction__slide-content">
              <h1 className="introduction__slide-content-title">
                Don&apos;t miss <br /> amazing deals
              </h1>
              <h4 className="introduction__slide-content-subtitle">
                Subscribe for newsletter
              </h4>
              <Form className="introduction__slide-content-form" type="inline">
                <FormItem name="email">
                  <Input type="email" placeholder="Email..." />
                </FormItem>
                <Button htmlType="submit" type="solid" color="success">
                  Subscribe
                </Button>
              </Form>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="introduction__slide">
            <div className="introduction__slide-image">
              <Image
                src="/images/home/slider-2.jpg"
                layout="fill"
                alt="Slide image 2"
                objectFit="cover"
                objectPosition="center"
                quality="100"
              />
            </div>
            <div className="introduction__slide-content">
              <h1 className="introduction__slide-content-title">
                Dress like it is <br /> your day
              </h1>
              <h4 className="introduction__slide-content-subtitle">
                Subscribe for newsletter
              </h4>
              <Form className="introduction__slide-content-form" type="inline">
                <FormItem name="email">
                  <Input type="email" placeholder="Email..." />
                </FormItem>
                <Button htmlType="submit" type="solid" color="success">
                  Subscribe
                </Button>
              </Form>
            </div>
          </div>
        </SwiperSlide>
        <div className="introduction__navigation">
          <div className="introduction__navigation-item" ref={prevEl}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
          <div className="introduction__navigation-item" ref={nextEl}>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </div>
      </Swiper>
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

const Home: NextPage = ({}) => {
  return (
    <CommonLayout>
      <div className="home-page">
        <Container>
          <Introduction />
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
};

export default Home;
