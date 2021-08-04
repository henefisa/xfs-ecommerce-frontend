import Header from "../components/Header/Header";
import Banner from "../components/Banner/Banner";
import Product from "../components/Product/Product";
import Container from "../components/Container/Container";
import { useState } from "react";
import clsx from "clsx";

const categories = [
  "All",
  "Accessories",
  "Electronics",
  "Men",
  "Women",
  "Shoes",
];

export default function Home() {
  const [category, setCategory] = useState(0);

  const handleChangeCategory = (idx: number) => {
    setCategory(idx);
  };

  return (
    <div className="home-page">
      <Header />
      <Banner />
      <div className="home-page__products">
        <Container className="products">
          <div className="category">
            <p className="category__title">Shop by:</p>
            <ul className="category__list">
              {categories.map((value, idx) => (
                <li
                  className={clsx(
                    "category__list-item",
                    category === idx && "active"
                  )}
                  key={idx}
                  onClick={() => handleChangeCategory(idx)}
                >
                  {value}
                </li>
              ))}
            </ul>
          </div>
          <div className="products__list">
            {[...new Array(10)].map((_, idx) => (
              <Product key={idx} />
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}
