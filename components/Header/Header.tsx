import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// icons
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
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

const Navbar: React.FC = () => {
  const stickyRef = useRef<HTMLDivElement>(null);

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
        <li className="navbar__list-item"></li>
        <li className="navbar__list-item">Home</li>
        <li className="navbar__list-item">About</li>
        <li className="navbar__list-item">Blog</li>
        <li className="navbar__list-item">Contact</li>
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
            <Menu className="navbar__menu" mode="transparent" onClick={onClick}>
              <MenuItem id="home">Home</MenuItem>
              <MenuItem id="about">About</MenuItem>
              <MenuItem id="Sample 1">Sample 1</MenuItem>
              <MenuItem id="Sample 2">Sample 2</MenuItem>
            </Menu>
          </SwiperSlide>
        </Carousel>
      </div>
    </nav>
  );
};

const Header: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

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

  useEffect(() => {
    const scroll = () => {
      const rect = headerRef.current?.getBoundingClientRect().height || 0;
      if (window.scrollY > rect / 2) {
        headerRef.current?.classList.add("header--scrolled");
      } else {
        headerRef.current?.classList.remove("header--scrolled");
      }
    };
    scroll();
    window.addEventListener("scroll", scroll, false);
    return () => {
      window.removeEventListener("scroll", scroll, false);
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
          <h1 className="header__logo">Ecommerce</h1>
          <Navbar />
        </div>
        <div className="header__right">
          <div className="user">
            <div className="user__item">
              <span className="icon">
                <FontAwesomeIcon icon={faShoppingCart} />
              </span>
            </div>
          </div>
        </div>
        <MobileNavbar isActive={isActive} onClick={handleToggleNavbar} />
      </Container>
    </header>
  );
};

export default React.memo(Header);
