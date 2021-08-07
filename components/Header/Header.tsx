import React, { useEffect, useRef, useState } from "react";

// icons
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import Container from "../Container/Container";
import Toggle from "../Toggle/Toggle";
import clsx from "clsx";

interface MobileNavbarProps {
  isActive?: boolean;
}

// constants
const TABS = ["Menu", "Categories", "Account"];

const Navbar: React.FC = () => {
  return <div className="navbar"></div>;
};

const MobileNavbar: React.FC<MobileNavbarProps> = ({ isActive = false }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const currentTabRef = useRef<HTMLLIElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);

  const styleMarker = (left: number, width: number) => {
    if (!markerRef.current) return;
    markerRef.current.style.left = left - 16 + "px";
    markerRef.current.style.width = width + "px";
  };

  const handleSelectTab = (idx: number, event: React.MouseEvent) => {
    setCurrentTab(idx);
    if (!markerRef.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    styleMarker(rect.left, rect.width);
  };

  const handleTransitionEnd = () => {
    if (!currentTabRef.current || !markerRef.current || !isActive) return;
    const rect = currentTabRef.current.getBoundingClientRect();
    styleMarker(rect.left, rect.width);
  };

  useEffect(() => {
    const resize = () => {
      if (!currentTabRef.current || !markerRef.current) return;
      const rect = currentTabRef.current.getBoundingClientRect();
      styleMarker(rect.left, rect.width);
    };
    resize();
    window.addEventListener("resize", resize, false);
    return () => {
      window.removeEventListener("resize", resize, false);
    };
  }, []);

  return (
    <div
      className={clsx("navbar navbar--mobile", isActive && "active")}
      onTransitionEnd={handleTransitionEnd}
    >
      <ul className="navbar__tabs">
        {TABS.map((val, idx) => (
          <li
            ref={idx === currentTab ? currentTabRef : undefined}
            key={idx}
            className={clsx(
              "navbar__tabs-item",
              idx === currentTab && "active"
            )}
            onClick={(e) => handleSelectTab(idx, e)}
          >
            {val}
          </li>
        ))}
        <div id="tabs-item-marker" ref={markerRef} />
      </ul>
    </div>
  );
};

const Header: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  const handleToggleNavbar = () => {
    setIsActive((prevState) => !prevState);
  };

  useEffect(() => {
    const resize = () => {
      if (window.matchMedia('("min-width: 768px")').matches) {
        setIsActive(false);
      }
    };
    resize();
    window.addEventListener("resize", resize, false);
    return () => {
      window.removeEventListener("resize", resize, false);
    };
  }, []);

  return (
    <header className="header">
      <div className="header__menu">
        <Container className="header__menu-content">
          <Toggle
            isActive={isActive}
            onClick={handleToggleNavbar}
            className="header__toggle"
          />
          <h1 className="header__logo">Ecommerce</h1>
          <div className="header__user-wrap">
            <div className="header__user">
              <FontAwesomeIcon icon={faUser} />
              <div className="name">User name</div>
            </div>
            <div className="header__cart">
              <FontAwesomeIcon icon={faShoppingCart} />
            </div>
          </div>
        </Container>
        <MobileNavbar isActive={isActive} />
      </div>
    </header>
  );
};

export default React.memo(Header);
