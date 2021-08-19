import React from "react";

// components
import Image from "next/image";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faHeart,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";

// utils
import { currencyFormat } from "../../utils/currencyFormat";
import clsx from "clsx";

interface ProductProps {
  direction?: "vertical" | "horizontal";
  image?: string;
}

const Product: React.FC<ProductProps> = ({ direction = "vertical", image }) => {
  return (
    <div
      className={clsx(
        "product",
        direction !== "vertical" && `product--${direction}`
      )}
    >
      <div className="product__image">
        <Image
          layout="fill"
          alt="Sample product"
          src={image || "/product.jpeg"}
          objectFit="cover"
          objectPosition="center"
        />
        {direction === "vertical" && (
          <div className="product__actions">
            <div className="product__actions-item">
              <button className="product__actions-button" title="Add to cart">
                <FontAwesomeIcon icon={faShoppingBag} />
              </button>
            </div>
            <div className="product__actions-item">
              <button
                className="product__actions-button"
                title="Add to favorite"
              >
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </div>
            <div className="product__actions-item">
              <button className="product__actions-button" title="Quick view">
                <FontAwesomeIcon icon={faEye} />
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="product__details">
        <h3 className="product__name">Sample product</h3>
        <div className="product__price">
          <p className="product__price-current">
            {currencyFormat.format(300000)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Product);
