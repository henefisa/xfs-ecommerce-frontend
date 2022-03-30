// icons
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useRef } from "react";
import { RootState } from "../../store";
import { authActions } from "../../store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Badge from "../Badge/Badge";
// components
import Container from "../Container/Container";
import Drawer from "../Drawer/Drawer";
import Dropdown from "../Dropdown/Dropdown";
import Input from "../Input/Input";
import { Menu, MenuItem, SubMenu } from "../Menu";
import Row from "../Row/Row";

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

const Header = () => {
  const isAuthenticated = useAppSelector(
    (state: RootState) => !!state.auth.user
  );
  const dispatch = useAppDispatch();
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
                      {isAuthenticated ? (
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
                          <MenuItem
                            onClick={() =>
                              dispatch(authActions.logoutRequest({}))
                            }
                          >
                            Logout
                          </MenuItem>
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
