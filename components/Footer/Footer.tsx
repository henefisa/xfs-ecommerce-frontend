import React from "react";
import Container from "../Container/Container";

// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <Container flex justify="between" items="center">
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
      </Container>
    </footer>
  );
};

export default React.memo(Footer);
