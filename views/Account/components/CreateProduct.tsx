import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Button from "components/common/Button/Button";
import Col from "components/common/Col/Col";
import Container from "components/common/Container/Container";
import { Form, FormItem } from "components/common/Form";
import Input from "components/common/Input/Input";
import Row from "components/common/Row/Row";
import { useAppDispatch, useAppSelector } from "hooks";
import { cloneDeep } from "lodash";
import { ProductModel } from "models/Product";
import { useState } from "react";
import { RootState } from "store";
import { productsActions } from "store/product/productSlice";
import { CreateProductRequest } from "store/types/products";
import { compileFormData } from "utils/formData";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";

interface Props {
  itemProduct?: ProductModel;
  onCloseModal: () => void;
}

const updateInfomationSchema = yup.object().shape({});

type FileInput = File & { id?: string; src?: string };

const CreateNewProduct = (props: Props) => {
  const { isLoading } = useAppSelector((state: RootState) => state.products);
  const dispatch = useAppDispatch();
  const [files, setFiles] = useState<FileInput[]>([]);
  const { itemProduct, onCloseModal } = props;

  const fileSelectedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentFiles: FileInput[] = cloneDeep(files);
    if (event.target.files?.length) {
      for (const [, file] of Object.entries(event.target.files)) {
        const newFile: any = file;
        newFile.id = uuidv4();
        newFile.src = URL.createObjectURL(file);
        currentFiles.push(newFile);
      }
    }

    setFiles(currentFiles);
    event.target.value = "";
  };

  const handleRemove = (id: string) => {
    const items = files?.filter((e) => e.id !== id);
    setFiles && setFiles(items || []);
  };

  const handleSubmit = (values: CreateProductRequest) => {
    const request: CreateProductRequest = {
      name: values.name,
      description: values.description,
      details: {},
      stock: Number(values.stock),
      price: Number(values.price),
      categories: [],
      images: files.map((e) => {
        delete e.id;
        delete e.src;
        return e;
      }),
    };

    let body: any = request;
    body = compileFormData(body);
    body.append("_method", `${itemProduct ? "PATCH" : "POST"}`);

    if (!itemProduct) {
      dispatch(productsActions.createProductRequest(body));
    } else {
      dispatch(
        productsActions.updateProductRequest({
          id: itemProduct.id,
          body,
        })
      );
    }
    setFiles([]);
    onCloseModal();
  };

  return (
    <div className="my-account-page__account-details">
      <h2 className="my-account-page__title">
        {itemProduct ? "Update Product" : "Create New Product"}
      </h2>

      <Container>
        <Form
          className="my-account-page__form"
          schema={updateInfomationSchema}
          onSubmit={handleSubmit}
          name="account"
        >
          <Row gutter={12}>
            <Col span={12} md={12}>
              <FormItem name="name" label="Name">
                <Input placeholder="Enter your name" />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={12} md={12}>
              <FormItem name="description" label="Description">
                <Input placeholder="Enter your description" />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={12} md={6}>
              <FormItem name="price" label="Price">
                <Input placeholder="Enter your price" />
              </FormItem>
            </Col>
            <Col span={12} md={6}>
              <FormItem name="stock" label="Stock">
                <Input placeholder="Enter your stock" />
              </FormItem>
            </Col>
          </Row>
          {/* <Row gutter={12}>
            <Col span={12} md={6}>
              <FormItem name="details" label="Details">
                <Input placeholder="Enter your details" />
              </FormItem>
            </Col>
          </Row> */}
          <FormItem name="images" label="Images">
            <div className="relative">
              <div className="flex flex-wrap">
                {files.length > 0
                  ? files.map((e, idx) => (
                      <div
                        key={idx}
                        className="relative"
                        style={{ marginRight: 20, marginTop: 20 }}
                      >
                        <img
                          src={e.src}
                          key={idx}
                          alt="attachment"
                          style={{
                            height: 100,
                            width: "100%",
                          }}
                        />

                        <div
                          className="absolute cursor-pointer"
                          onClick={() => handleRemove(e.id || "")}
                          style={{
                            top: -12,
                            right: -4,
                          }}
                        >
                          <span className="text-red-400">
                            <FontAwesomeIcon icon={faTimes} />
                          </span>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
              <div className="flex justify-between px-[10px] py-[10px]">
                <div className="flex items-center">
                  <input
                    id="attachment"
                    multiple
                    onChange={fileSelectedHandler}
                    accept={"image/*"}
                    type="file"
                    key="change Photo"
                    style={{ display: "none" }}
                  />

                  <label htmlFor="attachment">
                    <div
                      className={clsx(
                        "button",
                        `button--type-outline`,
                        `button--color-primary`
                      )}
                    >
                      Add File
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </FormItem>
          <div className="flex justify-end">
            <Button htmlType="submit" loading={isLoading}>
              Submit
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default CreateNewProduct;
