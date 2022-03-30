import * as React from "react";

// layout
import CommonLayout from "../../layouts/CommonLayout";

// components
import Container from "../../components/common/Container/Container";
import Introduction from "./components/Introduction";
import Services from "./components/Services";
import TopBanners from "./components/TopBanners";
import TopSellers from "./components/TopSellers";
import Deals from "./components/Deals";
import BottomBanners from "./components/BottomBanners";
import TopRatedProducts from "./components/TopRatedProduct";

const HomeView: React.FC = () => {
  return (
    <CommonLayout>
      <div className="home-page">
        <Container>
          <Introduction />
          <Services />
          <TopBanners />
          <TopSellers />
          <Deals />
          <BottomBanners />
          <TopRatedProducts />
        </Container>
      </div>
    </CommonLayout>
  );
};

export default HomeView;
