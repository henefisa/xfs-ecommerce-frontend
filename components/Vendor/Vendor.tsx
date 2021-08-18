import React, { useEffect, useState } from "react";

// componenets
import Image from "next/image";
import Rating from "../Rating/Rating";

interface VendorProps {
  name: string;
  logo: string;
  rating: number;
  products: string[];
}

const Vendor: React.FC<VendorProps> = ({ name, logo, rating, products }) => {
  return (
    <div className="vendor">
      <div className="vendor__details">
        <div className="vendor__logo">
          <Image
            layout="fill"
            src={logo}
            alt={name}
            objectFit="contain"
            objectPosition="center"
          />
        </div>
        <div className="vendor__personal">
          <h5 className="vendor__name">{name}</h5>
          <Rating value={rating} />
        </div>
      </div>
      <div className="vendor__products">
        {products.map((product, idx) => (
          <div className="vendor__product" key={idx}>
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

export default React.memo(Vendor);
