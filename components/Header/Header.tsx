import React, { useRef } from "react";
import Link from "next/link";

// icons
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import Container from "../Container/Container";
import { Menu, MenuItem, SubMenu } from "../Menu";
import Badge from "../Badge/Badge";
import Row from "../Row/Row";
import Drawer from "../Drawer/Drawer";
import Input from "../Input/Input";

const MobileNavbar = () => {
  return (
    <nav className="mobile-navbar">
      <Drawer handler>
        <div className="mobile-navbar__search-wrap">
          <Input placeholder="Search" className="mobile-navbar__search" />
        </div>
        <Menu>
          <MenuItem>Sample</MenuItem>
          <SubMenu title="Categoires">
            {[
              "Fashion",
              "Bikes",
              "Accessories",
              "Smartphone",
              "Electric",
              "Toys",
              "Pets",
            ].map((category, idx) => (
              <MenuItem key={idx}>{category}</MenuItem>
            ))}
          </SubMenu>
          <SubMenu title="Account">
            <MenuItem>Your account</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem>Logout</MenuItem>
          </SubMenu>
        </Menu>
      </Drawer>
    </nav>
  );
};

const Header: React.FC = () => {
  const headerRef = useRef<HTMLElement>(null);

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row justify="between" align="center" className="header__row">
          <div className="header__left">
            <h1 className="header__logo">
              <Link href="/">
                <a>Ecommerce</a>
              </Link>
            </h1>
            <div className="navbar">
              <Menu mode="vertical" className="navbar__menu">
                <SubMenu title="Categories" portal overlayWidth={300}>
                  {[
                    "Fashion",
                    "Bikes",
                    "Accessories",
                    "Smartphone",
                    "Electric",
                    "Toys",
                    "Pets",
                  ].map((category, idx) => (
                    <MenuItem key={idx}>{category}</MenuItem>
                  ))}
                </SubMenu>
              </Menu>
              <Input placeholder="Search" className="navbar__search" />
            </div>
          </div>
          <div className="header__right">
            <div className="user">
              <div className="user__item">
                <Link href="/cart">
                  <a>
                    <Badge value={1}>
                      <span className="icon">
                        <FontAwesomeIcon icon={faShoppingCart} />
                      </span>
                    </Badge>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </Row>
        <MobileNavbar />
      </Container>
    </header>
  );
};

export default React.memo(Header);
