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
      <div className="vender__details">
        <div className="vendor__logo">
          <Image layout="fill" src={logo} alt={name} />
        </div>
        <div className="vendor__personal">
          <h5 className="vendor__name">{name}</h5>
          <Rating />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Vendor);
