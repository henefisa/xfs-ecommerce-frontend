import React, { useState } from "react";
import clsx from "clsx";

// components
import Card from "../../components/Card/Card";
import Col from "../../components/Col/Col";
import Container from "../../components/Container/Container";
import Row from "../../components/Row/Row";
import CommonLayout from "../../layouts/CommonLayout";

// icons
import {
  faBox,
  faMapMarkerAlt,
  faSlidersH,
  faTruckLoading,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Stars from "../../components/Stars/Stars";
import Product from "../../components/Product/Product";

const Dashboard: React.FC = () => {
  return (
    <div className="my-account-page__dashboard">
      <h2 className="my-account-page__title">Overview</h2>
      <div className="my-account-page__content">
        <Row className="my-account-page__dashboard-statistic" gutter={[16, 16]}>
          <Col span={6} lg={3}>
            <div className="my-account-page__dashboard-statistic-item my-account-page__dashboard-statistic-item--red">
              <div className="my-account-page__dashboard-statistic-title">
                Total Orders
              </div>
              <div className="my-account-page__dashboard-statistic-content">
                30
              </div>
            </div>
          </Col>
          <Col span={6} lg={3}>
            <div className="my-account-page__dashboard-statistic-item my-account-page__dashboard-statistic-item--green">
              <div className="my-account-page__dashboard-statistic-title">
                In Shipping
              </div>
              <div className="my-account-page__dashboard-statistic-content">
                10
              </div>
            </div>
          </Col>
          <Col span={6} lg={3}>
            <div className="my-account-page__dashboard-statistic-item my-account-page__dashboard-statistic-item--yellow">
              <div className="my-account-page__dashboard-statistic-title">
                Delivered
              </div>
              <div className="my-account-page__dashboard-statistic-content">
                10
              </div>
            </div>
          </Col>
          <Col span={6} lg={3}>
            <div className="my-account-page__dashboard-statistic-item my-account-page__dashboard-statistic-item--indigo">
              <div className="my-account-page__dashboard-statistic-title">
                Reviewed
              </div>
              <div className="my-account-page__dashboard-statistic-content">
                10
              </div>
            </div>
          </Col>
        </Row>
        <Row gutter={[32, 32]}>
          <Col span={12} lg={8}>
            <div className="my-account-page__dashboard-review">
              <h4 className="my-account-page__dashboard-review-title">
                My Reviews
              </h4>
              <ul className="my-account-page__dashboard-review-list">
                <li className="my-account-page__dashboard-review-list-item">
                  <div>
                    <div className="my-account-page__dashboard-review-content">
                      This is sample reviews
                    </div>
                    <div className="my-account-page__dashboard-review-meta">
                      <div className="my-account-page__dashboard-review-date">
                        October 10, 2021
                      </div>
                      <div className="my-account-page__dashboard-review-rate">
                        <span className="my-account-page__dashboard-review-rate-value">
                          4
                        </span>
                        <Stars active={4} length={5} />
                      </div>
                    </div>
                  </div>
                </li>
                <li className="my-account-page__dashboard-review-list-item">
                  <div>
                    <div className="my-account-page__dashboard-review-content">
                      This is sample reviews
                    </div>
                    <div className="my-account-page__dashboard-review-meta">
                      <div className="my-account-page__dashboard-review-date">
                        October 10, 2021
                      </div>
                      <div className="my-account-page__dashboard-review-rate">
                        <span className="my-account-page__dashboard-review-rate-value">
                          4
                        </span>
                        <Stars active={4} length={5} />
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </Col>
          <Col span={12} lg={4}>
            <div className="my-account-page__dashboard-recently-product">
              <h4 className="my-account-page__dashboard-recently-product-title">
                Recently Product
              </h4>
              <div className="my-account-page__dashboard-recently-product-list">
                <Product direction="horizontal" />
                <Product direction="horizontal" />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const Orders: React.FC = () => {
  return (
    <div className="my-account-page__orders">
      <h2 className="my-account-page__title">Orders</h2>
    </div>
  );
};

const TrackYourOrder: React.FC = () => {
  return (
    <div className="my-account-page__track-your-order">
      <h2 className="my-account-page__title">Track Your Order</h2>
    </div>
  );
};

const MyAddress: React.FC = () => {
  return (
    <div className="my-account-page__my-address">
      <h2 className="my-account-page__title">My Address</h2>
    </div>
  );
};

const AccountDetails: React.FC = () => {
  return (
    <div className="my-account-page__account-details">
      <h2 className="my-account-page__title">Account Details</h2>
    </div>
  );
};

const Menu = [
  { title: "Dashboard", icon: faSlidersH, content: <Dashboard /> },
  { title: "Orders", icon: faBox, content: <Orders /> },
  {
    title: "Track Your Order",
    icon: faTruckLoading,
    content: TrackYourOrder,
  },
  { title: "My Address", icon: faMapMarkerAlt, content: <MyAddress /> },
  { title: "Account Details", icon: faUser, content: <AccountDetails /> },
];

const MyAccount: React.FC = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleChangeTab = (idx: number) => {
    setActiveTabIndex(idx);
  };

  return (
    <CommonLayout>
      <div className="my-account-page">
        <Container>
          <Row gutter={[16, 16]}>
            <Col span={12} md={4} lg={3}>
              <Card>
                <ul className="my-account-page__menu">
                  {Menu.map((item, idx) => (
                    <li
                      className={clsx(
                        "my-account-page__menu-item",
                        activeTabIndex === idx && "active"
                      )}
                      key={idx}
                      onClick={() => handleChangeTab(idx)}
                    >
                      <span>
                        <FontAwesomeIcon icon={item.icon} />
                      </span>
                      <span>{item.title}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Col>
            <Col span={12} md={8} lg={9}>
              <Card>{Menu[activeTabIndex].content}</Card>
            </Col>
          </Row>
        </Container>
      </div>
    </CommonLayout>
  );
};

export default MyAccount;
