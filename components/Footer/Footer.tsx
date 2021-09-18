import React from "react";

// components
import Container from "../Container/Container";
import Row from "../Row/Row";

// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <Container>
        <Row justify="between" align="center">
          <div className="footer__left">
            © 2021 Henefisa. All rights reserved.
          </div>
          <div className="footer__right">
            <div className="social">
              <div className="social__item facebook" title="Henefisa facebook">
                <a
                  href="https://fb.com/henefisa"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
              </div>
              <div className="social__item github">
                <a
                  href="https://github.com/henefisa"
                  title="Henefisa github"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </footer>
  );
};

export default React.memo(Footer);
