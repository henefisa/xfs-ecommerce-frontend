import clsx from "clsx";
import React, { useEffect, useState } from "react";

// components
import Card from "../components/common/Card/Card";
import Col from "../components/common/Col/Col";
import Container from "../components/common/Container/Container";
import Pagination from "../components/common/Pagination/Pagination";
import Product from "../components/modules/Product/Product";
import Row from "../components/common/Row/Row";
import CommonLayout from "../layouts/CommonLayout";
import Divider from "../components/common/Divider/Divider";
import { SagaStore, wrapper } from "store";
import { fetchStaticProps } from "utils/fetchStaticProps";
import { addCategories } from "store/category/categorySlice";
import { productsActions } from "store/product/productSlice";
import { END } from "redux-saga";
import { useAppSelector } from "hooks";
import { API_END_POINT } from "constants/env";
import { getProductsByCategory } from "apis";
import { useRouter } from "next/router";
import Head from "next/head";

interface ProductsProps {}

const SortBy = ["Newest", "Low Price", "High Price"];

export const getStaticProps = wrapper.getStaticProps(
  (store) => async (context) => {
    const [categories] = (await fetchStaticProps()).map((item) => item.data);
    store.dispatch(addCategories(categories));
    store.dispatch(productsActions.getProductsRequest());
    store.dispatch(END);
    await (store as SagaStore).sagaTask?.toPromise();

    return {
      props: {},
      revalidate: 3,
    };
  }
);

const Products: React.FC<ProductsProps> = ({}) => {
  const [activeCategory, setActiveCategory] = useState("");
  const [sortBy, setSortBy] = useState(0);
  const categories = useAppSelector((state) => state.category.categories);
  const prds = useAppSelector((state) => state.products.products);
  const [products, setProducts] = useState(prds);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await getProductsByCategory(activeCategory);

      setProducts(response.data);
    })();
  }, [activeCategory]);

  useEffect(() => {
    const categoryQuery = router.query.category;

    const category = categories.find((item) => item.id === categoryQuery);

    if (!category) return;

    setActiveCategory(category.id);
  }, [router.query, categories]);

  const handleChangeSortBy = (idx: number) => {
    setSortBy(idx);
  };

  const handleChangeCategory = (id: string) => {
    setActiveCategory(id);
  };

  let sorted = [...products];

  switch (sortBy) {
    case 0:
      // newest
      sorted = sorted.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

    case 1:
      // low to high
      sorted = sorted.sort((a, b) => a.price - b.price);
    case 2:
      // high to low
      sorted = sorted.sort((a, b) => b.price - a.price);
  }

  return (
    <CommonLayout>
      <Head>
        <title>Product</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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
                        "" === activeCategory && "active"
                      )}
                      onClick={() => handleChangeCategory("")}
                    >
                      All Categories
                    </div>
                    <Divider />
                    <div className="category-list__body">
                      <ul className="category-list__categories">
                        {categories.map((category, idx) => (
                          <li
                            className={clsx(
                              "category-list__category",
                              category.id === activeCategory && "active"
                            )}
                            key={idx}
                            onClick={() => handleChangeCategory(category.id)}
                          >
                            {category.name}
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
                  {!!products.length ? (
                    <Row gutter={[16, 16]}>
                      {sorted.map((item) => (
                        <Col key={item.id} sm={6} md={4}>
                          <Product
                            key={item.id}
                            direction="horizontal"
                            image={`${API_END_POINT}${item.images[0]?.url}`}
                            name={item.name}
                            price={item.price}
                            id={item.id}
                            hoverable
                          />
                        </Col>
                      ))}
                    </Row>
                  ) : (
                    <h3 className="text-xl">There are no products</h3>
                  )}
                  {/* <Row className="products-pagination" justify="end">
                    <Pagination current={1} total={100} pageSize={10} />
                  </Row> */}
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
