import { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import CommonLayout from "layouts/CommonLayout";
import { searchProducts } from "apis";
import Card from "components/common/Card/Card";
import { API_END_POINT } from "constants/env";
import Product from "components/modules/Product/Product";
import { ProductModel } from "models/Product";

const Search: NextPage = () => {
  const router = useRouter();

  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const search = router.query.q as string;

    if (!search) return;

    (async () => {
      const response = await searchProducts(search);

      setProducts(response.data.products);
    })();
  }, [router.query.q]);

  return (
    <CommonLayout>
      <Card>
        {products.map((item: ProductModel) => (
          <Product
            key={item.id}
            direction="horizontal"
            image={`${API_END_POINT}${item.images[0]?.url}`}
            name={item.name}
            price={item.price}
            id={item.id}
            hoverable
          />
        ))}
      </Card>
    </CommonLayout>
  );
};

export default Search;
