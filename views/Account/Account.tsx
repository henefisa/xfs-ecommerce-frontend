import { useEffect, useState } from "react";
import clsx from "clsx";

// components
import Card from "components/common/Card/Card";
import Col from "components/common/Col/Col";
import Container from "components/common/Container/Container";
import Row from "components/common/Row/Row";
import CommonLayout from "layouts/CommonLayout";
import Dashboard from "./components/Dashboard";
import Orders from "./components/Orders";
import TrackOrder from "./components/TrackOrder";
import Addresses from "./components/Addresses";
import AccountDetails from "./components/AccountDetails";

// icons
import {
  faBox,
  faMapMarkerAlt,
  faSlidersH,
  faTruckLoading,
  faUser,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateNewProduct from "./components/CreateProduct";
import ManagementProducts from "./components/ManagementProducts";
import { useAppSelector } from "hooks";
import { useRouter } from "next/router";

const Menu = [
  { title: "Dashboard", icon: faSlidersH, content: <Dashboard /> },
  {
    title: "Create Product",
    icon: faPlus,
    content: <CreateNewProduct onCloseModal={() => {}} />,
  },
  {
    title: "Managements Product",
    icon: faPlus,
    content: <ManagementProducts />,
  },
  { title: "Orders", icon: faBox, content: <Orders /> },
  {
    title: "Track Your Order",
    icon: faTruckLoading,
    content: <TrackOrder />,
  },
  { title: "My Address", icon: faMapMarkerAlt, content: <Addresses /> },
  { title: "Account Details", icon: faUser, content: <AccountDetails /> },
];

const AccountView: React.FC = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();

  const handleChangeTab = (idx: number) => {
    setActiveTabIndex(idx);
  };

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

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

export default AccountView;
