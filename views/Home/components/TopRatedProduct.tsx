import * as React from "react";

// components
import Link from "next/link";
import Button from "components/common/Button/Button";
import Product from "components/modules/Product/Product";
import Section from "components/common/Section/Section";

// constants
import { API_END_POINT } from "constants/env";

// store
import { useAppSelector } from "hooks";

const TopRatedProducts = () => {
  const { products } = useAppSelector((state) => state.products);

  return (
    <Section
      className="products"
      title="Top Rated Products"
      extra={
        <Link href="/products">
          <a>
            <Button type="link" color="primary">
              More product
            </Button>
          </a>
        </Link>
      }
    >
      <div className="products__wrap">
        {products.map((e) => (
          <Product
            key={e.id}
            direction="horizontal"
            image={`${API_END_POINT}${e.images[0]?.url}`}
            name={e.name}
            price={e.price}
            id={e.id}
            hoverable
          />
        ))}
      </div>
    </Section>
  );
};

export default TopRatedProducts;
