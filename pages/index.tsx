import { useEffect, useState } from "react";

// components
import Image from "next/image";
import Header from "../components/Header/Header";
import Button from "../components/Button/Button";
import Container from "../components/Container/Container";
import SwiperCore, { Pagination, Swiper as S } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import clsx from "clsx";

const categories = [
  "All",
  "Accessories",
  "Electronics",
  "Men",
  "Women",
  "Shoes",
];

SwiperCore.use([Pagination]);

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
            style={{ backgroundImage: `url(/slide.jpg)` }}
          >
            <Container className="introduction__banner-container">
              <div className="introduction__banner-content">
                <h5 className="subtitle">Sample subtitle</h5>
                <h2 className="title">Sample title</h2>
                <Button>Sample button</Button>
              </div>
              <div className="introduction__banner-image">
                <Image
                  src="/slide-image.png"
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
            style={{ backgroundImage: `url(/slide.jpg)` }}
          >
            <Container className="introduction__banner-container">
              <div className="introduction__banner-content">
                <h5 className="subtitle">Sample subtitle</h5>
                <h2 className="title">Sample title</h2>
                <Button>Sample button</Button>
              </div>
              <div className="introduction__banner-image">
                <Image
                  src="/slide-image.png"
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
            style={{ backgroundImage: `url(/slide.jpg)` }}
          >
            <Container className="introduction__banner-container">
              <div className="introduction__banner-content">
                <h5 className="subtitle">Sample subtitle</h5>
                <h2 className="title">Sample title</h2>
                <Button>Sample button</Button>
              </div>
              <div className="introduction__banner-image">
                <Image
                  src="/slide-image.png"
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
            style={{ backgroundImage: `url(/slide.jpg)` }}
          >
            <Container className="introduction__banner-container">
              <div className="introduction__banner-content">
                <h5 className="subtitle">Sample subtitle</h5>
                <h2 className="title">Sample title</h2>
                <Button>Sample button</Button>
              </div>
              <div className="introduction__banner-image">
                <Image
                  src="/slide-image.png"
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
              src="/slide-image.png"
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

export default function Home() {
  const [category, setCategory] = useState(0);

  const handleChangeCategory = (idx: number) => {
    setCategory(idx);
  };

  return (
    <div className="home-page">
      <Header />
      {/* <Banner /> */}
      <Introduction />
      {/* <div className="home-page__products">
        <Container className="products">
          <div className="category">
            <p className="category__title">Shop by:</p>
            <ul className="category__list">
              {categories.map((value, idx) => (
                <li
                  className={clsx(
                    "category__list-item",
                    category === idx && "active"
                  )}
                  key={idx}
                  onClick={() => handleChangeCategory(idx)}
                >
                  {value}
                </li>
              ))}
            </ul>
          </div>
          <div className="products__list">
            {[...new Array(100)].map((_, idx) => (
              <Product key={idx} />
            ))}
          </div>
        </Container>
      </div> */}
    </div>
  );
}
