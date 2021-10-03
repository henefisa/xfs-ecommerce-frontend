import clsx from "clsx";
import React, { useState } from "react";

// components
import Card from "../components/Card/Card";
import Col from "../components/Col/Col";
import Container from "../components/Container/Container";
import Pagination from "../components/Pagination/Pagination";
import Product from "../components/Product/Product";
import Row from "../components/Row/Row";
import CommonLayout from "../layouts/CommonLayout";
import Divider from "../components/Divider/Divider";

interface ProductsProps {}

const SortBy = ["Popular", "Newest", "Bestseller", "Low Price", "High Price"];
const Categories = [
  "Fashion",
  "Bikes",
  "Accessories",
  "Smartphone",
  "Electric",
  "Toys",
  "Pets",
];

const Products: React.FC<ProductsProps> = ({}) => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [sortBy, setSortBy] = useState(0);

  const handleChangeSortBy = (idx: number) => {
    setSortBy(idx);
  };

  const handleChangeCategory = (category: number) => {
    setActiveCategory(category);
  };

  return (
    <CommonLayout>
      <div className="products-page">
        <Container>
          <Row gutter={[16, 8]}>
            <Col md={3}>
              <Card>
                <div className="filter-panel">
                  <div className="category-list">
                    <div
                      className={clsx(
                        "category-list__header",
                        0 === activeCategory && "active"
                      )}
                      onClick={() => handleChangeCategory(0)}
                    >
                      All Categories
                    </div>
                    <Divider />
                    <div className="category-list__body">
                      <ul className="category-list__categories">
                        {Categories.map((category, idx) => (
                          <li
                            className={clsx(
                              "category-list__category",
                              idx + 1 === activeCategory && "active"
                            )}
                            key={idx}
                            onClick={() => handleChangeCategory(idx + 1)}
                          >
                            {category}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col md={9}>
              <Card>
                <div className="sort-bar">
                  <span className="sort-bar__label">Sort by</span>
                  <div className="sort-bar__sort-options">
                    {SortBy.map((type, idx) => (
                      <div
                        className={clsx(
                          "sort-bar__sort-option",
                          idx === sortBy && "active"
                        )}
                        key={idx}
                        onClick={() => handleChangeSortBy(idx)}
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
              <Card>
                <div className="products-list">
                  <Row gutter={[16, 16]}>
                    {[...new Array(10)].map((_, idx) => (
                      <Col key={idx} sm={6} md={4} lg={3}>
                        <Product
                          image={`/product-${(idx % 5) + 1}.jpg`}
                          hoverable
                        />
                      </Col>
                    ))}
                  </Row>
                  <Row className="products-pagination" justify="end">
                    <Pagination current={1} total={100} pageSize={10} />
                  </Row>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </CommonLayout>
  );
};

export default React.memo(Products);
