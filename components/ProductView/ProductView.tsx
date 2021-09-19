import React, { useEffect, useState } from "react";
import chroma from "chroma-js";

// components
import Image from "next/image";
import Select, { StylesConfig } from "react-select";
import { Swiper, SwiperSlide } from "swiper/react";
import Divider from "../Divider/Divider";
import Rating from "../Rating/Rating";
import InputNumber from "../InputNumber/InputNumber";
import Button from "../Button/Button";

// utils
import { currencyFormat } from "../../utils/currencyFormat";

interface ProductViewProps {
  showDescription?: boolean;
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

const ProductView: React.FC<ProductViewProps> = ({ showDescription }) => {
  const [image, setImage] = useState("/product-1.jpg");
  const [selectRoot, setSelectRoot] = useState<HTMLElement | null>(null);

  const setCurrentImage = (image: string) => {
    setImage(image);
  };

  useEffect(() => {
    setSelectRoot(document.getElementById("select-root"));
  }, []);

  return (
    <div className="product-view">
      <div className="product-view__image-container">
        <div className="product-view__image product-view__image--main">
          <Image
            src={image}
            layout="fill"
            alt="Sample product"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <Swiper
          className="product-view__image-select"
          slidesPerView="auto"
          spaceBetween={16}
        >
          <SwiperSlide>
            <div
              className="product-view__image"
              onClick={() => setCurrentImage("/product-1.jpg")}
            >
              <Image
                src="/product-1.jpg"
                layout="fill"
                alt="Sample product"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="product-view__image"
              onClick={() => setCurrentImage("/product-2.jpg")}
            >
              <Image
                src="/product-2.jpg"
                layout="fill"
                alt="Sample product"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="product-view__image"
              onClick={() => setCurrentImage("/product-3.jpg")}
            >
              <Image
                src="/product-3.jpg"
                layout="fill"
                alt="Sample product"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="product-view__image"
              onClick={() => setCurrentImage("/product-4.jpg")}
            >
              <Image
                src="/product-4.jpg"
                layout="fill"
                alt="Sample product"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="product-view__details">
        <h2 className="product-view__title">Sample product</h2>
        <Divider />
        <div className="product-view__price">
          {currencyFormat.format(200000)}
        </div>
        <Rating size="small" value={4.5} />
        {showDescription && (
          <p className="product-view__description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas
            reiciendis laboriosam modi nemo aspernatur necessitatibus beatae
            similique sed, blanditiis cum aperiam dignissimos fuga soluta
            temporibus nobis! Distinctio at ut laboriosam.
          </p>
        )}
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
        <div className="product-view__actions">
          <div className="product-view__quantity">
            <div className="quantity__title">Quantity: </div>
            <InputNumber min={1} max={99} defaultValue={0} />
          </div>
          <Button type="solid">Add to cart</Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductView);
