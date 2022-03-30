import * as React from "react";

// components
import Link from "next/link";
import Button from "../../components/Button/Button";
import Product from "../../components/Product/Product";
import Section from "../../components/Section/Section";

// constants
import { DEFAULT_URL_BE } from "../../constants/env";

// store
import { useAppSelector } from "../../store/hooks";

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
            image={`${DEFAULT_URL_BE}${e.images[0].url}`}
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
