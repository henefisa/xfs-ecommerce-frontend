import * as React from "react";

// layout
import CommonLayout from "../../layouts/CommonLayout";

// components
import Container from "../../components/Container/Container";
import Introduction from "./Introduction";
import Services from "./Services";
import TopBanners from "./TopBanners";
import TopSellers from "./TopSellers";
import Deals from "./Deals";
import BottomBanners from "./BottomBanners";
import TopRatedProducts from "./TopRatedProduct";

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
