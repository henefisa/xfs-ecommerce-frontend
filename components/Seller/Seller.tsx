import React, { useEffect, useState } from "react";

// componenets
import Image from "next/image";
import Rating from "../Rating/Rating";

interface SellerProps {
  name: string;
  logo: string;
  rating: number;
  products: string[];
}

const Seller: React.FC<SellerProps> = ({ name, logo, rating, products }) => {
  return (
    <div className="seller">
      <div className="seller__details">
        <div className="seller__logo">
          <Image
            layout="fill"
            src={logo}
            alt={name}
            objectFit="contain"
            objectPosition="center"
          />
        </div>
        <div className="seller__personal">
          <h5 className="seller__name">{name}</h5>
          <Rating value={rating} size="small" />
        </div>
      </div>
      <div className="seller__products">
        {products.map((product, idx) => (
          <div className="seller__product" key={idx}>
            <Image
              layout="fill"
              src={product}
              objectFit="contain"
              objectPosition="center"
              alt={product}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Seller);
