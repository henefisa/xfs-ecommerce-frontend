import React, { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// components
import Container from "../components/Container/Container";
import Divider from "../components/Divider/Divider";
import InputNumber from "../components/InputNumber/InputNumber";
import Product from "../components/Product/Product";
import Row from "../components/Row/Row";
import Col from "../components/Col/Col";
import Button from "../components/Button/Button";
import CommonLayout from "../layouts/CommonLayout";
import Card from "../components/Card/Card";

// icons
import { faArrowRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// utils
import { currencyFormat } from "../utils/currencyFormat";

interface CartProps {}

const Cart: React.FC<CartProps> = ({}) => {
  const [products, setProducts] = useState<
    { price: number; quantity: number }[]
  >([
    {
      price: 300000,
      quantity: 1,
    },
    {
      price: 300000,
      quantity: 1,
    },
    {
      price: 300000,
      quantity: 1,
    },
    {
      price: 300000,
      quantity: 1,
    },
  ]);

  const handleQuantityChange = useCallback((value: number, idx: number) => {
    setProducts((prevState) => {
      prevState[idx] = {
        ...prevState[idx],
        quantity: value,
      };
      return [...prevState];
    });
  }, []);

  const handleDelete = (idx: number) => {
    setProducts((prevState) => prevState.filter((_, i) => i !== idx));
  };

  const handleDeleteAll = () => {
    setProducts([]);
  };

  const subTotal = products.reduce(
    (acc, val) => acc + val.price * val.quantity,
    0
  );

  return (
    <CommonLayout>
      <div className="cart-page">
        <Container>
          <div className="cart">
            {!products.length ? (
              <Card className="cart__empty">
                <h5>Your cart is empty</h5>
                <Button>
                  <Link href="/">Continue shopping</Link>
                </Button>
                <div className="cart__empty-image">
                  <Image
                    src="/empty-cart.gif"
                    alt="Empty cart"
                    layout="fill"
                    objectPosition="center"
                    objectFit="cover"
                  />
                </div>
              </Card>
            ) : (
              <>
                <Row gutter={[32, 16]}>
                  <Col span={12} md={7} lg={8}>
                    <Card>
                      <h4 className="cart__title">Your Cart</h4>
                      <div className="products">
                        <table className="products-table">
                          <thead>
                            <tr>
                              <th className="products-table__product">
                                Product
                              </th>
                              <th className="products-table__price">Price</th>
                              <th className="products-table__quantity">
                                Quantity
                              </th>
                              <th className="products-table__subtotal">
                                Subtotal
                              </th>
                              <th className="products-table__delete">
                                <Button
                                  type="link"
                                  color="error"
                                  onClick={handleDeleteAll}
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </Button>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {products.map((product, idx) => (
                              <tr key={idx}>
                                <td className="products-table__product">
                                  <Product
                                    direction="horizontal"
                                    showPrice={false}
                                  />
                                </td>
                                <td className="products-table__price">
                                  {currencyFormat.format(product.price)}
                                </td>
                                <td className="products-table__quantity">
                                  <InputNumber
                                    min={1}
                                    max={99}
                                    value={product.quantity}
                                    onChange={(value: number) =>
                                      handleQuantityChange(value, idx)
                                    }
                                  />
                                </td>
                                <td className="products-table__subtotal">
                                  {currencyFormat.format(
                                    product.price * product.quantity
                                  )}
                                </td>
                                <td className="products-table__delete">
                                  <Button
                                    type="link"
                                    color="error"
                                    onClick={() => handleDelete(idx)}
                                  >
                                    <FontAwesomeIcon icon={faTrash} />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Card>
                  </Col>
                  <Col span={12} md={5} lg={4}>
                    <Card className="summary">
                      <h4 className="summary__title">Summary</h4>
                      <div className="summary__subtotal summary__price">
                        <span>Subtotal</span>
                        <span>{currencyFormat.format(subTotal)}</span>
                      </div>
                      <div className="summary__shipping-fee summary__price">
                        <span>Shipping Fee</span>
                        <span>{currencyFormat.format(30000)}</span>
                      </div>
                      <Divider />
                      <div className="summary__total summary__price">
                        <span>Total</span>
                        <span>{currencyFormat.format(subTotal + 30000)}</span>
                      </div>
                      <Link href="/checkout">
                        <a>
                          <Button type="solid" className="summary__button">
                            <span>Proceed to checkout</span>
                            <FontAwesomeIcon
                              icon={faArrowRight}
                              className="summary__button-icon"
                            />
                          </Button>
                        </a>
                      </Link>
                    </Card>
                  </Col>
                </Row>
              </>
            )}
          </div>
        </Container>
      </div>
    </CommonLayout>
  );
};

export default React.memo(Cart);
