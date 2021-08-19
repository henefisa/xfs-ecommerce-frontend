import { useRef, useState } from "react";
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
import Vendor from "../components/Vendor/Vendor";
import Section from "../components/Section/Section";
import Product from "../components/Product/Product";
import Countdown from "../components/Countdown/Countdown";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons";

const Introduction = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [swiper, setSwiper] = useState<S>();

  const handleChangeSlide = (idx: number) => {
    swiper?.slideTo(idx);
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
        <SwiperSlide>
          <div
            className="introduction__banner"
            style={{ backgroundImage: `url(/slide-1.jpg)` }}
          >
            <Container className="introduction__banner-container">
              <div className="introduction__banner-content">
                <h5 className="subtitle">Sample subtitle</h5>
                <h2 className="title">Sample title</h2>
                <Button>Sample button</Button>
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
                <Button>Sample button</Button>
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
                <Button>Sample button</Button>
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
                <Button>Sample button</Button>
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
  return (
    <Section className="services">
      <Swiper
        slidesPerView={1}
        spaceBetween={16}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1536: { slidesPerView: 4 },
        }}
      >
        <SwiperSlide>
          <Service
            icon={<FontAwesomeIcon icon={faCar} />}
            title="Free shippings and Return"
            description="For all order over 99$"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Service
            icon={<FontAwesomeIcon icon={faCar} />}
            title="Free shippings and Return"
            description="For all order over 99$"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Service
            icon={<FontAwesomeIcon icon={faCar} />}
            title="Free shippings and Return"
            description="For all order over 99$"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Service
            icon={<FontAwesomeIcon icon={faCar} />}
            title="Free shippings and Return"
            description="For all order over 99$"
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
          description="Sample description"
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

const TopVendors = () => {
  return (
    <Section className="top-vendors" title="Top Weekly Vendors">
      <Swiper
        slidesPerView={1}
        spaceBetween={16}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1536: { slidesPerView: 4 },
        }}
      >
        <SwiperSlide>
          <Vendor
            name="Sample"
            rating={4}
            logo="/vendor-1.jpg"
            products={["/product-1.jpg", "/product-2.jpg", "/product-3.jpg"]}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Vendor
            name="Sample"
            rating={4}
            logo="/vendor-2.jpg"
            products={["/product-4.jpg", "/product-5.jpg", "/product-2.jpg"]}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Vendor
            name="Sample"
            rating={4}
            logo="/vendor-3.jpg"
            products={["/product-2.jpg", "/product-3.jpg", "/product-4.jpg"]}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Vendor
            name="Sample"
            rating={4}
            logo="/vendor-4.jpg"
            products={["/product-2.jpg", "/product-1.jpg", "/product-5.jpg"]}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Vendor
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
  return (
    <Section
      className="deals"
      title="Hot deals"
      extra={<Countdown duration={3600} />}
    >
      <Swiper
        slidesPerView={1}
        spaceBetween={16}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1536: { slidesPerView: 5 },
        }}
      >
        <SwiperSlide>
          <Product image="/product-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <Product image="/product-2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <Product image="/product-3.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <Product image="/product-4.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <Product image="/product-5.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <Product image="/product-2.jpg" />
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

const Products = () => {
  return (
    <Section
      className="products"
      title="Products"
      extra={<Button>More product</Button>}
    >
      <div className="products__wrap">
        <Product direction="horizontal" image="/product-1.jpg" />
        <Product direction="horizontal" image="/product-2.jpg" />
        <Product direction="horizontal" image="/product-3.jpg" />
        <Product direction="horizontal" image="/product-4.jpg" />
        <Product direction="horizontal" image="/product-5.jpg" />
        <Product direction="horizontal" image="/product-4.jpg" />
        <Product direction="horizontal" image="/product-1.jpg" />
        <Product direction="horizontal" image="/product-2.jpg" />
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
          <TopVendors />
          <Deals />
          <BottomBanners />
          <Products />
        </Container>
      </div>
    </CommonLayout>
  );
}
