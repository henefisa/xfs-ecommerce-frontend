// icons
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { authActions } from "store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "hooks";

// components
import Badge from "components/common/Badge/Badge";
import Container from "components/common/Container/Container";
import Drawer from "components/common/Drawer/Drawer";
import Dropdown from "components/common/Dropdown/Dropdown";
import Input from "components/common/Input/Input";
import { Menu, MenuItem, SubMenu } from "components/common/Menu";
import Row from "components/common/Row/Row";
import { instance } from "apis";
import { Category } from "models/Category";

const MobileNavbar = ({ categories }: { categories: Category[] }) => {
  return (
    <nav className="mobile-navbar">
      <Drawer handler>
        <div className="mobile-navbar__search-wrap">
          <Input placeholder="Search" className="mobile-navbar__search" />
        </div>
        <Menu>
          <MenuItem>Sample</MenuItem>
          <SubMenu title="Categoires">
            {categories.map((category, idx) => (
              <MenuItem key={idx}>{category.name}</MenuItem>
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
  const token = useAppSelector((state) => state.auth.token);
  const carts = useAppSelector((state) => state.carts.carts);
  const categories = useAppSelector((state) => state.category.categories);

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
                  {categories.map((category, idx) => (
                    <MenuItem key={idx}>{category.name}</MenuItem>
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
                    <Badge value={carts.length}>
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
                      {token ? (
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
        <MobileNavbar categories={categories} />
      </Container>
    </header>
  );
};

export default React.memo(Header);
