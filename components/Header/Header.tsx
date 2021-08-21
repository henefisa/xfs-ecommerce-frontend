import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// icons
import {
  faLaptop,
  faShoppingCart,
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
      <div className="navbar__top" ref={stickyRef}>
        <ul className="navbar__list">
          <li className="navbar__list-item">Home</li>
          <li className="navbar__list-item">About</li>
          <li className="navbar__list-item">Blog</li>
          <li className="navbar__list-item">Contact</li>
        </ul>
        <div className="user">
          <div className="user__item">
            <span className="icon">
              <FontAwesomeIcon icon={faUser} />
            </span>
            <span className="name">User name</span>
          </div>
          <div className="user__item">
            <span className="icon">
              <FontAwesomeIcon icon={faShoppingCart} />
            </span>
          </div>
        </div>
      </div>
      <div className="navbar__bottom">
        <ul className="categories">
          <li className="category">
            <div className="category__icon">
              <FontAwesomeIcon icon={faLaptop} />
            </div>
            <div className="category__name">Computers</div>
          </li>
          <li className="category">
            <div className="category__icon">
              <FontAwesomeIcon icon={faLaptop} />
            </div>
            <div className="category__name">Computers</div>
          </li>
          <li className="category">
            <div className="category__icon">
              <FontAwesomeIcon icon={faLaptop} />
            </div>
            <div className="category__name">Computers</div>
          </li>
          <li className="category">
            <div className="category__icon">
              <FontAwesomeIcon icon={faLaptop} />
            </div>
            <div className="category__name">Computers</div>
          </li>
          <li className="category">
            <div className="category__icon">
              <FontAwesomeIcon icon={faLaptop} />
            </div>
            <div className="category__name">Computers</div>
          </li>
        </ul>
      </div>
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
      const height = headerRef.current?.getBoundingClientRect().height || 0;
      if (window.scrollY > height) {
        headerRef.current?.classList.add("shadow-md");
      } else {
        headerRef.current?.classList.remove("shadow-md");
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
      <Container>
        <div className="header__top">
          <Toggle
            isActive={isActive}
            onClick={handleToggleNavbar}
            className="header__toggle"
          />
          <h1 className="header__logo">Ecommerce</h1>
          <div className="user">
            <div className="user__item">
              <span className="icon">
                <FontAwesomeIcon icon={faShoppingCart} />
              </span>
            </div>
          </div>
        </div>
        <div className="header__bottom">
          <Navbar />
          <MobileNavbar isActive={isActive} onClick={handleToggleNavbar} />
        </div>
      </Container>
    </header>
  );
};

export default React.memo(Header);
