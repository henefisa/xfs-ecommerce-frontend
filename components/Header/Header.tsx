import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import clsx from "clsx";

// icons
import {
  faCog,
  faShoppingCart,
  faSignInAlt,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import Container from "../Container/Container";
import Toggle from "../Toggle/Toggle";
import { Menu, MenuItem } from "../Menu";
import { Swiper as Carousel, SwiperSlide } from "swiper/react";
import { Swiper } from "swiper";

// utils
import { debounce } from "../../utils/debounce";
import Dropdown from "../Dropdown/Dropdown";

interface MobileNavbarProps {
  isActive?: boolean;
  onClick?: () => void;
}

// constants
const TABS = ["Menu", "Categories", "Account"];
const NAVBAR = [
  { path: "/", title: "Home" },
  { path: "/about", title: "About" },
  { path: "/blog", title: "Blog" },
  { path: "/contact", title: "Contact" },
];

const Navbar: React.FC = () => {
  const stickyRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useEffect(() => {
    const scroll = () => {
      const top = stickyRef.current?.getBoundingClientRect().top || 0;
      if (top <= 0) {
        stickyRef.current?.classList.add("navbar__top--sticky");
      } else {
        stickyRef.current?.classList.remove("navbar__top--sticky");
      }
    };

    scroll();
    window.addEventListener("scroll", scroll, false);
    return () => {
      window.removeEventListener("scroll", scroll, false);
    };
  }, []);

  return (
    <nav className="navbar">
      <ul className="navbar__list">
        {NAVBAR.map((item) => (
          <li
            className={clsx(
              "navbar__list-item",
              item.path === router.asPath && "active"
            )}
            key={item.path}
          >
            <Link href={item.path}>
              <a>{item.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const MobileNavbar: React.FC<MobileNavbarProps> = ({
  isActive = false,
  onClick,
}) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [swiper, setSwiper] = useState<Swiper>();

  const handleSelectTab = (idx: number) => {
    setCurrentTab(idx);
    swiper?.slideTo(idx);
  };

  return (
    <nav className={clsx("navbar navbar--mobile", isActive && "active")}>
      <ul className="navbar__tabs">
        {TABS.map((val, idx) => (
          <li
            key={idx}
            className={clsx(
              "navbar__tabs-item",
              idx === currentTab && "active"
            )}
            onClick={() => handleSelectTab(idx)}
          >
            {val}
          </li>
        ))}
      </ul>
      <div className="navbar__content">
        <Carousel
          className="navbar__slide"
          onSwiper={setSwiper}
          onSlideChange={(swiper) => {
            setCurrentTab(swiper.activeIndex);
          }}
        >
          <SwiperSlide>
            <Menu className="navbar__menu" mode="transparent" onClick={onClick}>
              <MenuItem id="home">Home</MenuItem>
              <MenuItem id="about">About</MenuItem>
              <MenuItem id="Sample 1">Sample 1</MenuItem>
              <MenuItem id="Sample 2">Sample 2</MenuItem>
            </Menu>
          </SwiperSlide>
          <SwiperSlide>
            <Menu className="navbar__menu" mode="transparent" onClick={onClick}>
              <MenuItem id="home">Home</MenuItem>
              <MenuItem id="about">About</MenuItem>
              <MenuItem id="Sample 1">Sample 1</MenuItem>
              <MenuItem id="Sample 2">Sample 2</MenuItem>
            </Menu>
          </SwiperSlide>
          <SwiperSlide>
            <Menu
              trackingActive={false}
              className="navbar__menu"
              mode="transparent"
              onClick={onClick}
            >
              <MenuItem id="account" icon={<FontAwesomeIcon icon={faUser} />}>
                Account
              </MenuItem>
              <MenuItem id="settings" icon={<FontAwesomeIcon icon={faCog} />}>
                Settings
              </MenuItem>
              <MenuItem
                id="logout"
                icon={<FontAwesomeIcon icon={faSignOutAlt} />}
              >
                Logout
              </MenuItem>
            </Menu>
          </SwiperSlide>
        </Carousel>
      </div>
    </nav>
  );
};

const Header: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const handleToggleNavbar = () => {
    setIsActive((prevState) => !prevState);
  };

  useEffect(() => {
    if (isActive) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isActive]);

  useEffect(() => {
    const resize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setIsActive(false);
      }
    };
    resize();
    const debouncedResize = debounce(resize, 300);
    window.addEventListener("resize", debouncedResize, false);
    return () => {
      window.removeEventListener("resize", debouncedResize, false);
    };
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <Container flex justify="between" items="center">
        <div className="header__left">
          <Toggle
            isActive={isActive}
            onClick={handleToggleNavbar}
            className="header__toggle"
          />
        </div>
        <div className="header__center">
          <h1 className="header__logo">
            <Link href="/">
              <a>Ecommerce</a>
            </Link>
          </h1>
          <Navbar />
        </div>
        <div className="header__right">
          <div className="user">
            <div className="user__item">
              <Dropdown
                triggers="click"
                onClickOverlay={() => true}
                overlay={<div className="cart">This is cart</div>}
              >
                <span className="icon">
                  <FontAwesomeIcon icon={faShoppingCart} />
                </span>
              </Dropdown>
            </div>
            {isLoggedIn ? (
              <Dropdown
                placement="bottom"
                triggers="click"
                overlayWidth={200}
                onClickOverlay={() => true}
                overlay={
                  <Menu trackingActive={false}>
                    <MenuItem
                      id="account"
                      icon={<FontAwesomeIcon icon={faUser} />}
                    >
                      Account
                    </MenuItem>
                    <MenuItem
                      id="settings"
                      icon={<FontAwesomeIcon icon={faCog} />}
                    >
                      Settings
                    </MenuItem>
                    <MenuItem
                      id="logout"
                      icon={<FontAwesomeIcon icon={faSignOutAlt} />}
                      onClick={() => setIsLoggedIn(false)}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                }
              >
                <div className="user__item account">
                  <span className="name">Username</span>
                </div>
              </Dropdown>
            ) : (
              <div className="user__item">
                <span className="icon">
                  <FontAwesomeIcon icon={faSignInAlt} />
                </span>
                <span className="name">
                  <Link href="/login">
                    <a onClick={() => setIsLoggedIn(true)}>Login</a>
                  </Link>
                </span>
              </div>
            )}
          </div>
        </div>
        <MobileNavbar isActive={isActive} onClick={handleToggleNavbar} />
      </Container>
    </header>
  );
};

export default React.memo(Header);
