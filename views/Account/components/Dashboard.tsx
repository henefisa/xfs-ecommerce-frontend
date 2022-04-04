import { InferGetServerSidePropsType } from "next";
import React, { useMemo, useState } from "react";
import { END } from "redux-saga";
import clsx from "clsx";

// components
import Card from "components/common/Card/Card";
import Col from "components/common/Col/Col";
import Container from "components/common/Container/Container";
import Row from "components/common/Row/Row";
import Stars from "components/common/Stars/Stars";
import Product from "components/modules/Product/Product";
import Table from "components/common/Table/Table";
import CommonLayout from "layouts/CommonLayout";
import { Form, FormItem } from "components/common/Form";

// validation
import * as yup from "yup";

// icons
import {
  faBox,
  faMapMarkerAlt,
  faSlidersH,
  faTruckLoading,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "components/common/Input/Input";
import Button from "components/common/Button/Button";

// store
import { SagaStore, wrapper } from "store";
import { authActions } from "store/auth/authSlice";

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

export default Dashboard;
