import React from "react";

// componenets
import Header from "../components/modules/Header/Header";
import Footer from "../components/modules/Footer/Footer";

interface CommonLayoutProps {
  children: React.ReactNode;
}

const CommonLayout: React.FC<CommonLayoutProps> = ({ children }) => {
  return (
    <div className="common-layout">
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </div>
  );
};

export default React.memo(CommonLayout);
