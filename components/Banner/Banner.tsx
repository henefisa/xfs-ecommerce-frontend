import React from "react";

// components
import Image from "next/image";
import Container from "../Container/Container";

// images
import bg from "../../public/bg.jpg";

const Banner: React.FC = () => {
  return (
    <div className="banner">
      <div className="banner__background">
        <Image
          src={bg}
          alt="Banner background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <Container className="banner__content">
        <h1 className="banner__title">Sample title</h1>
        <p className="banner__sub-title">Sample subtitle</p>
      </Container>
    </div>
  );
};

export default React.memo(Banner);
