import React from "react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

// utils
import { currencyFormat } from "../../utils/currencyFormat";

interface ProductProps {
  direction?: "vertical" | "horizontal";
  image?: string;
  hoverable?: boolean;
  showPrice?: boolean;
}

const Product: React.FC<ProductProps> = ({
  direction = "vertical",
  image,
  hoverable,
  showPrice = true,
}) => {
  return (
    <div
      className={clsx(
        "product",
        direction !== "vertical" && `product--${direction}`,
        hoverable && "product--hoverable"
      )}
    >
      <div className="product__image">
        <Link href="/product/sample_product_id">
          <a>
            <Image
              layout="fill"
              alt="Sample product"
              src={image || "/product-1.jpg"}
              objectFit="cover"
              objectPosition="center"
            />
          </a>
        </Link>
      </div>
      <div className="product__details">
        <h3 className="product__name">
          <Link href="/product/sample_product_id">
            <a>Sample product</a>
          </Link>
        </h3>
        {showPrice && (
          <div className="product__price">
            <p className="product__price-current">
              {currencyFormat.format(300000)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Product);
