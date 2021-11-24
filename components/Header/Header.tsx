import React, { useRef, useState } from "react";
import Link from "next/link";

// icons
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import Container from "../Container/Container";
import { Menu, MenuItem, SubMenu } from "../Menu";
import Badge from "../Badge/Badge";
import Row from "../Row/Row";
import Drawer from "../Drawer/Drawer";
import Input from "../Input/Input";
import Dropdown from "../Dropdown/Dropdown";

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
              "All Categories",
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
            <MenuItem>
              <Link href="/account/me">
                <a>Your account</a>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="/account/settings">
                <a>Settings</a>
              </Link>
            </MenuItem>
            <MenuItem>Logout</MenuItem>
          </SubMenu>
        </Menu>
      </Drawer>
    </nav>
  );
};

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
                    "All Categories",
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
              <div className="user__item">
                <Dropdown
                  overlay={
                    <Menu>
                      {isLoggedIn ? (
                        <>
                          <MenuItem>
                            <Link href="/account/me">
                              <a>Your account</a>
                            </Link>
                          </MenuItem>
                          <MenuItem>
                            <Link href="/account/settings">
                              <a>Settings</a>
                            </Link>
                          </MenuItem>
                          <MenuItem>Logout</MenuItem>
                        </>
                      ) : (
                        <>
                          <MenuItem>
                            <Link href="/login">
                              <a>Login</a>
                            </Link>
                          </MenuItem>
                          <MenuItem>
                            <Link href="/register">
                              <a>Register</a>
                            </Link>
                          </MenuItem>
                        </>
                      )}
                    </Menu>
                  }
                  onClickOverlay={() => true}
                  overlayWidth={200}
                  triggers="click"
                >
                  <FontAwesomeIcon icon={faUser} />
                </Dropdown>
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
