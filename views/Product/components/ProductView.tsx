import * as React from "react";
import clsx from "clsx";
import Image from "next/image";
import chroma from "chroma-js";

// hooks
import { useAppDispatch } from "hooks";

// stores
import { cartActions } from "store/cart/cartSlice";

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

interface ProductViewProps {
  price?: number;
  image?: string;
  description?: string;
  stock?: number;
  name?: string;
  id?: string;
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

const ProductView = (props: ProductViewProps) => {
  const { price, image, description, stock, name, id } = props;
  const [currentIndex, setCurrentIndex] = React.useState(1);
  const [selectRoot, setSelectRoot] = React.useState<HTMLElement | null>(null);
  const [quantity, setQuantity] = React.useState<number>(1);
  const dispatch = useAppDispatch();

  const imageDisplay = image ?? `/product-${currentIndex}.jpg`;

  const handleChangeImage = (index: number) => {
    setCurrentIndex(index);
  };

  React.useEffect(() => {
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

export default ProductView;
