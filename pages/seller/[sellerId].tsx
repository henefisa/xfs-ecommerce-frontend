import React, { useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";

// components
import CommonLayout from "../../layouts/CommonLayout";
import Container from "../../components/common/Container/Container";
import Avatar from "../../components/common/Avatar/Avatar";
import Row from "../../components/common/Row/Row";
import Col from "../../components/common/Col/Col";
import Card from "../../components/common/Card/Card";
import Product from "../../components/modules/Product/Product";
import Pagination from "../../components/common/Pagination/Pagination";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faTshirt,
  faUser,
  faUserCheck,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { faCommentDots } from "@fortawesome/free-regular-svg-icons";

interface SellerPageProps {}

const SortBy = ["Popular", "Newest", "Bestseller", "Low Price", "High Price"];

const SellerPage: React.FC<SellerPageProps> = () => {
  const [sortBy, setSortBy] = useState(0);

  const handleChangeSortBy = (idx: number) => {
    setSortBy(idx);
  };

  return (
    <CommonLayout>
      <div className="seller-page">
        <Container>
          <Card className="seller-page__info">
            <div className="section-seller-overview">
              <Row gutter={[16, 16]}>
                <Col span={12} md={5} lg={4}>
                  <div className="section-seller-overview__leading">
                    <Image
                      className="section-seller-overview__leading-background"
                      src="/night-sky.jpg"
                      alt="Seller background"
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center bottom"
                    />
                    <div className="section-seller-overview__leading-mask"></div>
                    <div className="section-seller-overview__leading-content">
                      <div className="section-seller-overview__seller-portrait">
                        <Link href="/seller/sample_seller_id">
                          <a className="section-seller-overview__seller-portrait-link">
                            <Avatar src="/vendor-1.jpg" />
                          </a>
                        </Link>
                        <div className="section-seller-overview__seller-portrait-info">
                          <h1 className="section-seller-overview__seller-portrait-name">
                            Sample seller name
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col span={12} md={7} lg={8}>
                  <div className="section-seller-overview__info-list">
                    <div className="section-seller-overview__item">
                      <div className="section-seller-overview__item-icon">
                        <FontAwesomeIcon icon={faTshirt} />
                      </div>
                      <div className="section-seller-overview__item-text">
                        <span>Products: </span>
                        <span>14</span>
                      </div>
                    </div>
                    <div className="section-seller-overview__item">
                      <div className="section-seller-overview__item-icon">
                        <FontAwesomeIcon icon={faUser} />
                      </div>
                      <div className="section-seller-overview__item-text">
                        <span>Following: </span>
                        <span>1</span>
                      </div>
                    </div>
                    <div className="section-seller-overview__item">
                      <div className="section-seller-overview__item-icon">
                        <FontAwesomeIcon icon={faCommentDots} />
                      </div>
                      <div className="section-seller-overview__item-text">
                        <span>Response rate: </span>
                        <span>90%</span>
                      </div>
                    </div>
                    <div className="section-seller-overview__item">
                      <div className="section-seller-overview__item-icon">
                        <FontAwesomeIcon icon={faUsers} />
                      </div>
                      <div className="section-seller-overview__item-text">
                        <span>Follower: </span>
                        <span>9000</span>
                      </div>
                    </div>
                    <div className="section-seller-overview__item">
                      <div className="section-seller-overview__item-icon">
                        <FontAwesomeIcon icon={faStar} />
                      </div>
                      <div className="section-seller-overview__item-text">
                        <span>Rating: </span>
                        <span>4.5</span>
                      </div>
                    </div>
                    <div className="section-seller-overview__item">
                      <div className="section-seller-overview__item-icon">
                        <FontAwesomeIcon icon={faUserCheck} />
                      </div>
                      <div className="section-seller-overview__item-text">
                        <span>Joined: </span>
                        <span>2 Month Ago</span>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Card>
          <Card className="sort-bar">
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
          </Card>
          <Card className="seller-page__content">
            <div className="products-list">
              <Row gutter={[16, 16]}>
                {[...new Array(10)].map((_, idx) => (
                  <Col key={idx} sm={6} md={4} lg={3} xl={2}>
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
        </Container>
      </div>
    </CommonLayout>
  );
};

export default React.memo(SellerPage);
