import React from "react";
import clsx from "clsx";
import Link from "next/link";

// componenets
import Image from "next/image";
import Rating from "../../common/Rating/Rating";

interface SellerProps {
  name: string;
  logo: string;
  rating: number;
  products: string[];
  hoverable?: boolean;
  bordered?: boolean;
  stats?: boolean;
  direction?: "vertical" | "horizontal";
}

const Seller: React.FC<SellerProps> = ({
  name,
  logo,
  rating,
  products,
  hoverable,
  bordered,
  stats,
  direction = "horizontal",
}) => {
  return (
    <div
      className={clsx(
        "seller",
        hoverable && `seller--hoverable`,
        bordered && `seller--bordered`,
        direction !== "horizontal" && `seller--${direction}`
      )}
    >
      <div className="seller__details">
        <div className="seller__logo">
          <Link href="/seller/sample_seller_id">
            <a>
              <Image
                layout="fill"
                src={logo}
                alt={name}
                objectFit="contain"
                objectPosition="center"
              />
            </a>
          </Link>
        </div>
        <div className="seller__personal">
          <h5 className="seller__name">
            <Link href="/seller/sample_seller_id">
              <a>{name}</a>
            </Link>
          </h5>
          <Rating value={rating} size="small" />
        </div>
      </div>
      {stats && (
        <div className="seller__stats">
          <div className="seller__stats-item">
            <div className="title">111</div>
            <div className="sub-title">Follower</div>
          </div>
          <div className="seller__stats-item">
            <div className="title">100%</div>
            <div className="sub-title">Chat Response</div>
          </div>
        </div>
      )}
      <div className="seller__products">
        {products.map((product, idx) => (
          <div className="seller__product" key={idx}>
            <Link href="/product/sample_product_id">
              <a>
                <Image
                  layout="fill"
                  src={product}
                  objectFit="contain"
                  objectPosition="center"
                  alt={product}
                />
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Seller);
