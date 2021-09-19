import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import chroma from "chroma-js";
import Image from "next/image";

// components
import { SwiperOptions } from "swiper";
import Select, { StylesConfig } from "react-select";
import { Swiper, SwiperSlide } from "swiper/react";
import Container from "../../components/Container/Container";
import Row from "../../components/Row/Row";
import Col from "../../components/Col/Col";
import CommonLayout from "../../layouts/CommonLayout";
import Rating from "../../components/Rating/Rating";
import InputNumber from "../../components/InputNumber/InputNumber";
import Button from "../../components/Button/Button";
import Divider from "../../components/Divider/Divider";
import Service from "../../components/Service/Service";
import Seller from "../../components/Seller/Seller";
import Product from "../../components/Product/Product";

// utils
import { currencyFormat } from "../../utils/currencyFormat";
import { debounce } from "../../utils/debounce";

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

interface ProductPageProps {}

interface SellerWrapProps {
  className?: string;
  breakpoints?: SwiperOptions["breakpoints"];
  query: string;
}

type ColorOption = {
  label: string;
  value: string;
  color: string;
};

type SizeOption = {
  label: string;
  value: string;
  abbreviation: string;
};

const dot = (color = "#ccc") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const size = (size = "") => ({
  display: "flex",
  alignItems: "center",
  ":before": {
    backgroundColor: "#ccc",
    content: `"${size}"`,
    display: "flex",
    marginRight: 8,
    height: 18,
    width: 32,
    paddingInline: "4px",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
  },
});

const colorOptions: ColorOption[] = [
  { label: "Blue", value: "Blue", color: "#3B82F6" },
  { label: "Red", value: "Red", color: "#EF4444" },
  { label: "Purple", value: "Purple", color: "#8B5CF6" },
];

const sizeOptions: SizeOption[] = [
  { label: "Small", value: "Small", abbreviation: "SM" },
  { label: "Medium", value: "Medium", abbreviation: "MD" },
  { label: "Large", value: "Large", abbreviation: "LG" },
];

const colorSelectStyle: StylesConfig<ColorOption, boolean> = {
  container: (styles) => ({ ...styles, maxWidth: 200, width: "100%" }),
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : null,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : data.color,
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor:
          !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
      },
    };
  },
  menuPortal: (styles) => ({ ...styles, zIndex: 9999 }),
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({
    ...styles,
    ...dot(),
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};

const sizeSelectStyle: StylesConfig<SizeOption, boolean> = {
  container: (styles) => ({ ...styles, maxWidth: 200, width: "100%" }),
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { isDisabled }) => ({
    ...styles,
    cursor: isDisabled ? "not-allowed" : "default",
  }),
  menuPortal: (styles) => ({ ...styles, zIndex: 9999 }),
  input: (styles) => ({ ...styles, ...size() }),
  placeholder: (styles) => ({
    ...styles,
    ...size(),
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    ...size(data.abbreviation),
  }),
};

const SellerWrap: React.FC<SellerWrapProps> = ({
  className,
  breakpoints,
  query,
}) => {
  const nextEl = useRef<HTMLDivElement | null>(null);
  const prevEl = useRef<HTMLDivElement | null>(null);

  const [isMatches, setIsMatches] = useState(false);

  useEffect(() => {
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
        name="Sample"
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

const ProductView: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [selectRoot, setSelectRoot] = useState<HTMLElement | null>(null);

  const handleChangeImage = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    setSelectRoot(document.getElementById("select-root"));
  }, []);

  return (
    <div className="product-view">
      <Row gutter={[32, 16]}>
        <Col sm={6} lg={4}>
          <div className="product-view__image-wrap">
            <div className="product-view__thumbnail">
              <Image
                src={`/product-${currentIndex}.jpg`}
                layout="fill"
                alt="Product"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
            <div className="product-view__image-list">
              {[...new Array(4)].map((_, idx) => (
                <a
                  className={clsx(
                    "product-view__image",
                    idx + 1 === currentIndex && `active`
                  )}
                  onClick={() => handleChangeImage(idx + 1)}
                  key={idx}
                >
                  <Image
                    src={`/product-${idx + 1}.jpg`}
                    layout="fill"
                    alt="Product"
                    objectFit="cover"
                    objectPosition="center"
                  />
                </a>
              ))}
            </div>
          </div>
        </Col>
        <Col sm={6} lg={8}>
          <div className="product-view__details">
            <h3 className="product-view__title">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum nam quis ipsa neque impedit accusantium saepe
            </h3>
            <Rating value={4} size="small" />
          </div>
          <Row gutter={[16, 16]}>
            <Col lg={6} xl={7}>
              <div className="product-view__price-wrap">
                <div className="product-view__price">
                  {currencyFormat.format(300000)}
                </div>
              </div>
              <Divider />
              <div className="product-view__colors">
                <div className="colors__title">Colors: </div>
                <div className="colors__select">
                  <Select
                    options={colorOptions}
                    styles={colorSelectStyle}
                    placeholder="Select color"
                    menuPortalTarget={selectRoot}
                  />
                </div>
              </div>
              <div className="product-view__sizes">
                <div className="sizes__title">Sizes: </div>
                <div className="sizes__select">
                  <Select
                    options={sizeOptions}
                    styles={sizeSelectStyle}
                    placeholder="Select size"
                    menuPortalTarget={selectRoot}
                  />
                </div>
              </div>
              <Divider />
              <div className="product-view__quantity">
                <div className="quantity__title">Quantity: </div>
                <InputNumber min={1} max={99} defaultValue={1} />
              </div>
              <div className="product-view__actions">
                <Button type="solid" color="error">
                  Add to cart
                </Button>
              </div>
            </Col>
            <Col lg={6} xl={5}>
              <SellerWrap query="(min-width:1024px)" />
            </Col>
          </Row>
        </Col>
      </Row>
      <SellerWrap
        query="(max-width:1023px)"
        breakpoints={{ 640: { slidesPerView: 2 } }}
      />
    </div>
  );
};

const SimilarProduct: React.FC = () => {
  const nextEl = useRef<HTMLDivElement | null>(null);
  const prevEl = useRef<HTMLDivElement | null>(null);

  return (
    <div className="similar-products">
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
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1536: { slidesPerView: 5 },
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            nextEl: nextEl.current,
            prevEl: prevEl.current,
          }}
        >
          <SwiperSlide>
            <Product hoverable image="/product-1.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <Product hoverable image="/product-2.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <Product hoverable image="/product-3.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <Product hoverable image="/product-4.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <Product hoverable image="/product-5.jpg" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

const Details: React.FC = () => {
  return (
    <div className="details">
      <h4 className="details__title">Details</h4>
      <div className="details__table-wrap">
        <table className="details__table">
          <tbody>
            <tr>
              <td>Trademark</td>
              <td>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi
                iusto porro qui blanditiis consequuntur itaque reprehenderit vel
                corporis labore sequi temporibus sit cumque minima adipisci
                totam asperiores, consequatur nobis. Sint.
              </td>
            </tr>
            <tr>
              <td>Origin</td>
              <td>Viet Nam</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ProductDescription: React.FC = () => {
  return (
    <div className="product-description">
      <h4 className="product-description__title">Product Description</h4>
      <div className="product-description__content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi expedita
        dicta facere adipisci iure eveniet magni quisquam fuga voluptatibus,
        earum ea sunt! Iusto asperiores eligendi blanditiis voluptate dicta est
        numquam?
      </div>
    </div>
  );
};

const ProductPage: React.FC<ProductPageProps> = ({}) => {
  return (
    <CommonLayout>
      <div className="product-page">
        <Container>
          <ProductView />
          <SimilarProduct />
          <Details />
          <ProductDescription />
        </Container>
      </div>
    </CommonLayout>
  );
};

export default React.memo(ProductPage);
