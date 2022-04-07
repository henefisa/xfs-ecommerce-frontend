import * as React from "react";

import Table from "components/common/Table/Table";
import { useAppSelector, useAppDispatch } from "hooks";
import { RootState, SagaStore, wrapper } from "store";
import { API_END_POINT } from "constants/env";
import { productsActions } from "store/product/productSlice";
import Image from "next/image";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { END } from "redux-saga";
import { InferGetStaticPropsType, NextPage } from "next";
import Pagination from "components/common/Pagination/Pagination";
import Modal from "components/common/Modal/Modal";
import CreateNewProduct from "./CreateProduct";
import { ProductModel } from "models/Product";
import Button from "components/common/Button/Button";

export const getStaticProps = wrapper.getStaticProps(
  (store) => async (context) => {
    store.dispatch(productsActions.getProductsRequest());
    store.dispatch(END);
    await (store as SagaStore).sagaTask?.toPromise();

    return {
      props: {},
      revalidate: 3,
    };
  }
);

type ManagementProducts = InferGetStaticPropsType<typeof getStaticProps>;

const ManagementProducts: NextPage<ManagementProducts> = () => {
  const { products } = useAppSelector((state: RootState) => state.products);
  const dispatch = useAppDispatch();
  const [data, setData] = React.useState<
    {
      stt: number | string;
      name: string;
      description: string;
      details: string;
      stock: number;
      price: number;
      images: JSX.Element;
      actions: JSX.Element;
    }[]
  >([]);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [productItem, setProductItem] = React.useState<
    ProductModel | undefined
  >(undefined);

  React.useEffect(() => {
    setData(
      products.map((e, idx) => {
        return {
          stt: idx + 1,
          name: e.name,
          description: e.description,
          details: e.details ?? (
            <div className="flex">
              {Object.keys(JSON.parse(e.details)).map((el, idx) => (
                <p key={idx}>{el}</p>
              ))}
              {Object.values(JSON.parse(e.details)).map((el, idx) => (
                <p key={idx}>{el as string}</p>
              ))}
            </div>
          ),
          stock: e.stock,
          price: e.price,
          images: (
            <div className="flex flex-wrap w-full">
              {e.images.map((e, idx) => (
                <div key={idx}>
                  {e.url ? (
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        position: "relative",
                        marginRight: 5,
                        marginTop: 5,
                      }}
                    >
                      <Image
                        src={`${API_END_POINT}${e.url}`}
                        layout="fill"
                        alt="Product"
                        objectFit="cover"
                        objectPosition="center"
                      />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          ),
          actions: (
            <div className="flex">
              <span
                onClick={() => {
                  setIsOpen(true);
                  setProductItem(e);
                }}
                className="cursor-pointer"
                style={{ marginRight: 10 }}
              >
                <FontAwesomeIcon icon={faPen} />
              </span>
              <span
                className="cursor-pointer"
                onClick={() => handleDeleteProduct(e.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </span>
            </div>
          ),
        };
      })
    );
  }, [products]);

  const columns = React.useMemo(
    () => [
      {
        Header: "STT",
        accessor: "stt",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Details",
        accessor: "details",
      },
      {
        Header: "Stock",
        accessor: "stock",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Images",
        accessor: "images",
      },
      {
        Header: "Actions",
        accessor: "actions",
      },
    ],
    []
  );

  const handleDeleteProduct = (id: string) => {
    if (window.confirm("Are you sure want delete product?") == true) {
      dispatch(productsActions.deleteProductRequest(id));
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setProductItem(undefined);
  };

  return (
    <div className="my-account-page__orders">
      <div className="flex justify-between">
        <h2 className="my-account-page__title">Managament Products</h2>
        <Button onClick={() => setIsOpen(true)}>Create New Product</Button>
      </div>
      <div className="my-account-page__content"></div>
      <Table columns={columns} data={data} />
      <Pagination current={1} total={data.length} pageSize={10} />
      <Modal isOpen={isOpen} onClose={handleClose} size="md">
        <CreateNewProduct
          itemProduct={productItem}
          onCloseModal={handleClose}
        />
      </Modal>
    </div>
  );
};

export default ManagementProducts;
