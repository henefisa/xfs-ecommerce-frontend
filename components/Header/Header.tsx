import React, { useEffect, useRef } from "react";

// components
import Container from "../Container/Container";

const Header: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroll = () => {
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
    <header className="header" ref={headerRef}>
      <div className="header__menu">
        <Container className="header__menu-content">
          <h1 className="header__logo">Ecommerce</h1>
          <nav>
            <ul className="menu">
              <li className="menu__item">Sample</li>
              <li className="menu__item">Sample</li>
              <li className="menu__item">Sample</li>
              <li className="menu__item">Sample</li>
              <li className="menu__item">Sample</li>
            </ul>
          </nav>
        </Container>
      </div>
    </header>
  );
};

export default React.memo(Header);
