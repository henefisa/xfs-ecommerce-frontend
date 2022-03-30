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
import ReviewRating from "../../components/ReviewRating/ReviewRating";
import Avatar from "../../components/Avatar/Avatar";
import Stars from "../../components/Stars/Stars";
import Card from "../../components/Card/Card";

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
import { faCommentAlt, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { RootState } from "../../store";
import { ProductModel } from "../../models/ProductModel";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { DEFAULT_URL_BE } from "../../constants/env";
import { productsActions } from "../../store/product/productSlice";
import { LOCAL_STORAGE } from "../../constants/localStorage";
import { cartActions } from "../../store/cart/cartSlice";

interface ProductPageProps {}

interface SellerWrapProps {
  className?: string;
  breakpoints?: SwiperOptions["breakpoints"];
  query: string;
  name?: string;
  image?: string;
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
  name,
  image,
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

interface ProductViewProps {
  price?: number;
  image?: string;
  description?: string;
  stock?: number;
  name?: string;
  id?: string;
}

const ProductView = (props: ProductViewProps) => {
  const { price, image, description, stock, name, id } = props;
  const [currentIndex, setCurrentIndex] = useState(1);
  const [selectRoot, setSelectRoot] = useState<HTMLElement | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useAppDispatch();

  const imageDisplay = image ?? `/product-${currentIndex}.jpg`;

  const handleChangeImage = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    setSelectRoot(document.getElementById("select-root"));
  }, []);

  const handleAddToCard = () => {
    console.log("quantiy", quantity);
    dispatch(
      cartActions.addProductToCart({
        id: id || "",
        name: name || "",
        quantity,
        price: price || 0,
        image: imageDisplay,
      })
    );
  };

  return (
    <Card className="product-view">
      <Row gutter={[32, 16]}>
        <Col sm={6} lg={4}>
          <div className="product-view__image-wrap">
            <div className="product-view__thumbnail">
              <Image
                src={`${imageDisplay}`}
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
                    src={`${imageDisplay}`}
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
            <h3 className="product-view__title">{description}</h3>
            <Rating value={4} size="small" />
          </div>
          <Row gutter={[16, 16]}>
            <Col lg={6} xl={7}>
              <div className="product-view__price-wrap">
                <div className="product-view__price">
                  {currencyFormat.format(price || 0)}
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
                <InputNumber
                  value={quantity}
                  min={1}
                  max={stock || 100000}
                  defaultValue={1}
                  onChange={setQuantity}
                />
              </div>
              <div className="product-view__actions">
                <Button type="solid" color="error" onClick={handleAddToCard}>
                  Add to cart
                </Button>
              </div>
            </Col>
            <Col lg={6} xl={5}>
              <SellerWrap query="(min-width:1024px)" name={name} />
            </Col>
          </Row>
        </Col>
      </Row>
      <SellerWrap
        query="(max-width:1023px)"
        breakpoints={{ 640: { slidesPerView: 2 } }}
        name={name}
      />
    </Card>
  );
};

interface SimilarProductsProps {
  image?: string;
}

const SimilarProduct = (props: SimilarProductsProps) => {
  const nextEl = useRef<HTMLDivElement | null>(null);
  const prevEl = useRef<HTMLDivElement | null>(null);
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

interface DetailsProps {
  description?: string;
}

const Details = (props: DetailsProps) => {
  const { description } = props;
  return (
    <Card className="details">
      <h4 className="details__title">Details</h4>
      <div className="details__table-wrap">
        <table className="details__table">
          <tbody>
            <tr>
              <td>Trademark</td>
              <td>{description || "Lorem isum"}</td>
            </tr>
            <tr>
              <td>Origin</td>
              <td>Viet Nam</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
};

interface ProductDescriptionProps {
  description: string;
}

const ProductDescription = (props: ProductDescriptionProps) => {
  const { description } = props;
  return (
    <Card className="product-description">
      <h4 className="product-description__title">Product Description</h4>
      <div className="product-description__content">{description}</div>
    </Card>
  );
};

interface CustomerReviewProps {
  images?: string;
}

const CustomerReview = (props: CustomerReviewProps) => {
  const { images } = props;
  return (
    <Card className="customer-review">
      <Row gutter={[16, 16]} className="customer-review__top">
        <Col md={5} lg={4} xl={3}>
          <ReviewRating />
        </Col>
        <Col md={7} lg={8} xl={9}>
          <div className="review-images">
            <div className="review-images__title">All Images</div>
            <div className="review-images__wrap">
              {/*TODO: Click on review image open modal*/}
              <Swiper slidesPerView="auto">
                {[...new Array(5)].map((_, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="review-images__item">
                      <Image
                        src={images ? `${images}` : "/product-1.jpg"}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        alt="Review Images"
                      />
                    </div>
                  </SwiperSlide>
                ))}

                <SwiperSlide>
                  <div className="review-images__item">
                    <Image
                      src="/product-2.jpg"
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                      alt="Review Images"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="review-images__item">
                    <Image
                      src="/product-3.jpg"
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                      alt="Review Images"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="review-images__item">
                    <Image
                      src="/product-4.jpg"
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                      alt="Review Images"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="review-images__item">
                    <Image
                      src="/product-5.jpg"
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                      alt="Review Images"
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </Col>
      </Row>
      <div className="review-comment-wrap">
        <Row className="review-comment" gutter={[16, 16]}>
          <Col md={5} lg={4} xl={3}>
            <div className="review-comment__user">
              <div className="review-comment__user-inner">
                <div className="review-comment__user-avatar">
                  <Avatar src="/vendor-1.jpg" size="small" />
                </div>
                <div>
                  <div className="review-comment__user-name">
                    Sample username
                  </div>
                  <div className="review-comment__user-date">
                    Joined 2 years ago
                  </div>
                </div>
              </div>
              <div className="review-comment__user-info">
                <FontAwesomeIcon icon={faCommentAlt} />
                Writen:
                <span>14 Review</span>
              </div>
              <div className="review-comment__user-info">
                <FontAwesomeIcon icon={faThumbsUp} />
                Received:
                <span>43 Like</span>
              </div>
            </div>
          </Col>
          <Col md={7} lg={8} xl={9}>
            <div className="review-comment__content-wrap">
              <div className="review-comment__rating">
                <Stars active={4} type="solid" />
              </div>
              <div className="review-comment__content">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam
                excepturi, doloribus officiis quaerat dicta odio facere magnam
                optio voluptatum laboriosam nemo aperiam temporibus at! Enim
                esse fuga ipsam ipsa ad.
              </div>
              <div className="review-comment__images">
                <div className="review-comment__image">
                  <Image
                    src="/product-1.jpg"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    alt="Review Images"
                  />
                </div>
                <div className="review-comment__image">
                  <Image
                    src="/product-1.jpg"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    alt="Review Images"
                  />
                </div>
                <div className="review-comment__image">
                  <Image
                    src="/product-1.jpg"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    alt="Review Images"
                  />
                </div>
                <div className="review-comment__image">
                  <Image
                    src="/product-1.jpg"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    alt="Review Images"
                  />
                </div>
              </div>
              <div className="review-comment__created-date">
                <div className="review-comment__attributes">
                  <div className="review-comment__attribute">Color: Purple</div>
                  <div className="review-comment__attribute">Size: Large</div>
                </div>
                <span>Review: 1 month ago</span>
              </div>
              <Button className="review-comment__thank">
                <FontAwesomeIcon icon={faThumbsUp} /> Useful (100)
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const productId = context.params?.productId;
  return {
    props: {
      productId,
    },
  };
};

type ProductDetailProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

const ProductPage: React.FC<ProductDetailProps> = ({ productId }) => {
  const dispatch = useAppDispatch();
  const product = useAppSelector((state: RootState) => state.products);

  const [productDetail, setProductDetail] = useState<ProductModel>({
    categories: [],
    name: "",
    stock: 0,
    price: 0,
    description: "",
    details: "",
    images: [],
    deleteDate: "",
    id: "",
    createdAt: "",
    updatedAt: "",
  });

  useEffect(() => {
    if (productId) {
      dispatch(productsActions.getProductDetailRequest(productId));
    }
  }, [productId]);

  useEffect(() => {
    if (product.productDetail) {
      setProductDetail(product.productDetail);
    }
  }, [product]);

  return (
    <CommonLayout>
      <div className="product-page">
        <Container>
          <ProductView
            description={productDetail.description}
            image={
              productDetail.images.length
                ? `${DEFAULT_URL_BE}${productDetail.images[0]?.url}`
                : undefined
            }
            price={productDetail.price}
            stock={productDetail.stock}
            name={productDetail.name}
            id={productDetail.id}
          />
          <SimilarProduct
            image={
              productDetail.images.length
                ? `${DEFAULT_URL_BE}${productDetail.images[0]?.url}`
                : undefined
            }
          />
          <Details description={productDetail.description} />
          <ProductDescription description={productDetail.description} />
          <CustomerReview
            images={
              productDetail.images.length
                ? `${DEFAULT_URL_BE}${productDetail.images[0]?.url}`
                : undefined
            }
          />
        </Container>
      </div>
    </CommonLayout>
  );
};

export default React.memo(ProductPage);
