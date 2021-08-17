import React from "react";

// componenets
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

interface CommonLayoutProps {
  children: React.ReactNode;
}

const CommonLayout: React.FC<CommonLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </>
  );
};

export default React.memo(CommonLayout);
