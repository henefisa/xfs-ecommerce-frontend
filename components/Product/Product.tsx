import React from "react";

// components
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShoppingBag,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

// mock
import pr from "../../public/product.jpeg";
import { currencyFormat } from "../../utils/currencyFormat";

interface ProductProps {}

const Product: React.FC<ProductProps> = ({}) => {
  return (
    <div className="product">
      <div className="product__image">
        <div className="product__actions">
          <button className="action" title="Add to cart">
            <FontAwesomeIcon icon={faShoppingBag} />
          </button>
          <button className="action" title="Add to wishlist">
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </div>
        <button className="product__quick-view">Quickview</button>
        <Image
          src={pr}
          alt="Sample product"
          layout="fill"
          objectFit="contain"
          objectPosition="center"
        />
      </div>
      <div className="product__body">
        <h3 className="product__title">Sample product title</h3>
        <p className="product__price">{currencyFormat.format(300000)}</p>
      </div>
    </div>
  );
};

export default React.memo(Product);
