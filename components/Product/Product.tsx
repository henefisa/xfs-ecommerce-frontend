import React from "react";

// components
import Image from "next/image";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShoppingBag,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

// utils
import { currencyFormat } from "../../utils/currencyFormat";

interface ProductProps {}

const Product: React.FC<ProductProps> = ({}) => {
  return (
    <div className="product">
      <div className="product__image">
        <Image
          layout="fill"
          alt="Sample product"
          src="/product.jpeg"
          objectFit="contain"
          objectPosition="center"
        />
        <div className="product__actions">
          <div className="product__actions-item">
            <button className="product__actions-button">
              <FontAwesomeIcon icon={faShoppingBag} />
            </button>
          </div>
          <div className="product__actions-item">
            <button className="product__actions-button">
              <FontAwesomeIcon icon={faShoppingBag} />
            </button>
          </div>
          <div className="product__actions-item">
            <button className="product__actions-button">
              <FontAwesomeIcon icon={faShoppingBag} />
            </button>
          </div>
          <div className="product__actions-item">
            <button className="product__actions-button">
              <FontAwesomeIcon icon={faShoppingBag} />
            </button>
          </div>
        </div>
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
