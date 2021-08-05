import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";

// components
import Container from "../Container/Container";
import Input from "../Input/Input";
import Toggle from "../Toggle/Toggle";

const Header: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  const handleClickToggle = () => {
    setIsActive((prevState) => !prevState);
  };

  useEffect(() => {
    const scroll = () => {
      if (!window.matchMedia("(min-width: 768px)").matches) {
        return;
      }
      if (window.scrollY > 0) {
        headerRef.current?.classList.add("header--scrolled");
      } else {
        headerRef.current?.classList.remove("header--scrolled");
      }
    };
    scroll();
    window.addEventListener("scroll", scroll);
    return () => {
      window.removeEventListener("scroll", scroll);
    };
  }, []);

  return (
    <header
      className={clsx("header", isActive && "header--active")}
      ref={headerRef}
    >
      <div className="header__menu">
        <Container className="header__menu-content">
          <Toggle onClick={handleClickToggle} isActive={isActive} />
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
        <div className="mobile-menu">
          <div className="mobile-menu__overlay" />
          <div className="mobile-menu__container">
            <div className="actions">
              <Input placeholder="Input here" size="large" />
              <Toggle onClick={handleClickToggle} isActive={isActive} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);
