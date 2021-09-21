import React from "react";

// components
import Card from "../components/Card/Card";
import Col from "../components/Col/Col";
import Container from "../components/Container/Container";
import Pagination from "../components/Pagination/Pagination";
import Product from "../components/Product/Product";
import Row from "../components/Row/Row";
import CommonLayout from "../layouts/CommonLayout";

interface ProductsProps {}

const Products: React.FC<ProductsProps> = ({}) => {
  return (
    <CommonLayout>
      <div className="products-page">
        <Container>
          <Row gutter={[16, 8]}>
            <Col md={3}>
              <Card>
                <div className="filter-panel">
                  <div className="category-list">
                    <div className="category-list__header">All Categories</div>
                    <div className="category-list__body">
                      <ul className="category-list__categories">
                        <li className="category-list__category">
                          Sample category
                        </li>
                        <li className="category-list__category">
                          Sample category
                        </li>
                        <li className="category-list__category">
                          Sample category
                        </li>
                        <li className="category-list__category">
                          Sample category
                        </li>
                        <li className="category-list__category">
                          Sample category
                        </li>
                        <li className="category-list__category">
                          Sample category
                        </li>
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
                    <div className="sort-bar__sort-option active">Popular</div>
                    <div className="sort-bar__sort-option">Newest</div>
                    <div className="sort-bar__sort-option">Bestseller</div>
                    <div className="sort-bar__sort-option">Low Price</div>
                    <div className="sort-bar__sort-option">High Price</div>
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
                  <Pagination current={1} total={100} pageSize={10} />
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
