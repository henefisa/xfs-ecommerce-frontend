import * as React from "react";
import clsx from "clsx";
import Image from "next/image";
import chroma from "chroma-js";

// hooks
import { useAppDispatch, useAppSelector } from "hooks";

// components
import Select, { StylesConfig } from "react-select";
import Card from "components/common/Card/Card";
import Row from "components/common/Row/Row";
import Col from "components/common/Col/Col";
import Rating from "components/common/Rating/Rating";
import Divider from "components/common/Divider/Divider";
import Button from "components/common/Button/Button";
import InputNumber from "components/common/InputNumber/InputNumber";
import SellerWrap from "./SellerWrap";

// utils
import { currencyFormat } from "utils";

import { API_END_POINT } from "constants/env";
import { cartActions } from "store/cart/cartSlice";
import { toast } from "react-toastify";

const ProductView: React.FC = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [quantity, setQuantity] = React.useState<number>(1);
  const { productDetail } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.carts.carts);

  const isAlreadyInCart =
    cart.findIndex((item) => item.id === productDetail?.id) !== -1;

  const handleChangeImage = (index: number) => {
    setCurrentIndex(index);
  };

  const handleAddToCart = () => {
    if (!productDetail) return;

    if (isAlreadyInCart) {
      toast.error("Product already in cart");

      return;
    }

    dispatch(
      cartActions.addProductToCart({
        id: productDetail.id,
        image: productDetail.images[0].url,
        name: productDetail.name,
        price: productDetail.price,
        quantity,
      })
    );

    toast.success("Added to cart");
  };

  return (
    <Card className="product-view">
      <Row gutter={[32, 16]}>
        <Col sm={6} lg={4}>
          <div className="product-view__image-wrap">
            <div className="product-view__thumbnail">
              <Image
                src={`${API_END_POINT}${productDetail?.images?.[currentIndex]?.url}`}
                layout="fill"
                alt="Product"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
            <div className="product-view__image-list">
              {productDetail?.images?.map((item, idx) => (
                <a
                  className={clsx(
                    "product-view__image",
                    idx === currentIndex && `active`
                  )}
                  onClick={() => handleChangeImage(idx)}
                  key={idx}
                >
                  <Image
                    src={`${API_END_POINT}${item.url}`}
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
              {productDetail?.description}
            </h3>
            <Rating value={4} size="small" />
          </div>
          <Row gutter={[16, 16]}>
            <Col lg={6} xl={7}>
              <div className="product-view__price-wrap">
                <div className="product-view__price">
                  {currencyFormat.format(productDetail?.price || 0)}
                </div>
              </div>
              <Divider />
              <div className="product-view__quantity">
                <div className="quantity__title">Quantity: </div>
                <InputNumber
                  value={quantity}
                  min={1}
                  max={productDetail?.stock || 100000}
                  defaultValue={1}
                  onChange={setQuantity}
                />
              </div>
              <div className="product-view__actions">
                <Button
                  type="solid"
                  disabled={!isAlreadyInCart}
                  color="error"
                  onClick={handleAddToCart}
                >
                  {isAlreadyInCart ? "Already in cart" : "Add to cart"}
                </Button>
              </div>
            </Col>
            <Col lg={6} xl={5}>
              <SellerWrap
                query="(min-width:1024px)"
                name={productDetail?.name}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      {/* <SellerWrap
        query="(max-width:1023px)"
        breakpoints={{ 640: { slidesPerView: 2 } }}
        name={productDetail?.name}
      /> */}
    </Card>
  );
};

export default ProductView;
