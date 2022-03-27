import { InferGetServerSidePropsType } from "next";
import React, { useMemo, useState } from "react";
import { END } from "redux-saga";
import clsx from "clsx";

// components
import Card from "../../components/Card/Card";
import Col from "../../components/Col/Col";
import Container from "../../components/Container/Container";
import Row from "../../components/Row/Row";
import Stars from "../../components/Stars/Stars";
import Product from "../../components/Product/Product";
import Table from "../../components/Table/Table";
import CommonLayout from "../../layouts/CommonLayout";
import { Form, FormItem } from "../../components/Form";

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
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

// store
import { SagaStore, wrapper } from "../../store";
import { authActions } from "../../store/auth/authSlice";

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
  const columns = useMemo(
    () => [
      {
        Header: "Order ID",
        accessor: "orderId",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Total",
        accessor: "total",
      },
      {
        Header: "Actions",
        accessor: "actions",
      },
    ],
    []
  );

  const data = useMemo(
    () => [
      {
        orderId: "123",
        date: new Date().toLocaleString(),
        status: "Inprogress",
        total: 100000,
        actions: (
          <>
            <button>hello</button>
          </>
        ),
      },
      {
        orderId: "123",
        date: new Date().toLocaleString(),
        status: "Inprogress",
        total: 100000,
        actions: (
          <>
            <button>hello</button>
          </>
        ),
      },
      {
        orderId: "123",
        date: new Date().toLocaleString(),
        status: "Inprogress",
        total: 100000,
        actions: (
          <>
            <button>hello</button>
          </>
        ),
      },
    ],
    []
  );

  return (
    <div className="my-account-page__orders">
      <h2 className="my-account-page__title">Orders</h2>
      <div className="my-account-page__content"></div>
      <Table columns={columns} data={data} />
    </div>
  );
};

const TrackYourOrder: React.FC = () => {
  const orderTrackingSchema = useMemo(
    () =>
      yup.object().shape({
        orderId: yup.string().required("Order ID is required").trim(),
        billingEmail: yup
          .string()
          .email("Invalid email address")
          .required("Billing email is required"),
      }),
    []
  );

  return (
    <div className="my-account-page__track-your-order">
      <h2 className="my-account-page__title">Order Tracking</h2>
      <p className="my-account-page__description">
        To track your order please enter your OrderID in the box below and press
        &quot;Track&quot; button. This was given to you on your receipt and in
        the confirmation email you should have received.
      </p>
      <Form className="my-account-page__form" schema={orderTrackingSchema}>
        <FormItem name="orderId" label="Order ID">
          <Input placeholder="Found in your order confirm email" />
        </FormItem>
        <FormItem name="billingEmail" label="Billing Email">
          <Input placeholder="Email you used during checkout" />
        </FormItem>
        <Button type="solid">Track</Button>
      </Form>
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
  const accountDetailsSchema = useMemo(
    () =>
      yup.object().shape({
        orderId: yup.string().required("Order ID is required").trim(),
        billingEmail: yup
          .string()
          .email("Invalid email address")
          .required("Billing email is required"),
      }),
    []
  );

  return (
    <div className="my-account-page__account-details">
      <h2 className="my-account-page__title">Account Details</h2>
      <Form className="my-account-page__form" schema={accountDetailsSchema}>
        <FormItem name="userName" label="User Name">
          <Input placeholder="Found in your order confirm email" />
        </FormItem>
        <FormItem name="billingEmail" label="Billing Email">
          <Input placeholder="Email you used during checkout" />
        </FormItem>
        <Button type="solid">Track</Button>
      </Form>
    </div>
  );
};

const Menu = [
  { title: "Dashboard", icon: faSlidersH, content: <Dashboard /> },
  { title: "Orders", icon: faBox, content: <Orders /> },
  {
    title: "Track Your Order",
    icon: faTruckLoading,
    content: <TrackYourOrder />,
  },
  { title: "My Address", icon: faMapMarkerAlt, content: <MyAddress /> },
  { title: "Account Details", icon: faUser, content: <AccountDetails /> },
];

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(authActions.getUserInfoRequest());
    store.dispatch(END);
    await (store as SagaStore).sagaTask?.toPromise();

    if (store.getState().auth.user) {
      return {
        props: {},
      };
    }

    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
);

type AccountProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const MyAccount: React.FC<AccountProps> = () => {
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
