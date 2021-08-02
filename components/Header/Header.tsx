import React from "react";

// components

import Container from "../Container/Container";

const Header: React.FC = () => {
  return (
    <header className="header">
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
