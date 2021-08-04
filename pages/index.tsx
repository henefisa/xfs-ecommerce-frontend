import Header from "../components/Header/Header";
import Banner from "../components/Banner/Banner";
import Product from "../components/Product/Product";
import Container from "../components/Container/Container";

export default function Home() {
  return (
    <div className="home-page">
      <Header />
      <Banner />
      <div className="products">
        <Container>
          <Product />
        </Container>
      </div>
    </div>
  );
}
