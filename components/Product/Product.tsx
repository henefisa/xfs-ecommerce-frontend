import React from "react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

// utils
import { currencyFormat } from "../../utils/currencyFormat";

interface ProductProps {
  id?: string;
  direction?: "vertical" | "horizontal";
  image?: string;
  name?: string;
  price?: number;
  hoverable?: boolean;
  showPrice?: boolean;
}

const Product: React.FC<ProductProps> = ({
  id,
  direction = "vertical",
  image,
  hoverable,
  name,
  price,
  showPrice = true,
}) => {
  const myLoader = (item: { src: any }) => {
    return item.src;
  };

  return (
    <div
      className={clsx(
        "product",
        direction !== "vertical" && `product--${direction}`,
        hoverable && "product--hoverable"
      )}
    >
      <div className="product__image">
        <Link href={`/product/${id}`}>
          <a>
            <Image
              loader={myLoader || ""}
              layout="fill"
              alt="Sample product"
              src={`${image}` || "/product-1.jpg"}
              objectFit="cover"
              objectPosition="center"
            />
          </a>
        </Link>
      </div>
      <div className="product__details">
        <h3 className="product__name">
          <Link
            href={{
              pathname: `/product/${id}`,
              query: { prodId: id },
            }}
          >
            <a>{name}</a>
          </Link>
        </h3>
        {showPrice && (
          <div className="product__price">
            <p className="product__price-current">
              {currencyFormat.format(price || 0)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Product);
