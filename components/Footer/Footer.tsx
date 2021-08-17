import React from "react";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return <footer>This is footer</footer>;
};

export default React.memo(Footer);
