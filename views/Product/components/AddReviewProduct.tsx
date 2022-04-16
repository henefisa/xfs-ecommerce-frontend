import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Button from "components/common/Button/Button";
import Label from "components/common/Label/Label";
import Stars from "components/common/Stars/Stars";
import TextArea from "components/common/TextArea/TextArea";
import { useAppDispatch, useAppSelector } from "hooks";
import { cloneDeep } from "lodash";
import Router from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RootState } from "store";
import { productsActions } from "store/product/productSlice";
import { ReviewProduct } from "store/types/products";
import { compileFormData } from "utils/formData";
import { v4 as uuidv4 } from "uuid";

interface Props {
  onCloseModal: () => void;
}

type FileInput = File & { id?: string; src?: string };

const AddReviewProduct = (props: Props) => {
  const { isLoading } = useAppSelector((state: RootState) => state.products);
  const id = useAppSelector(
    (state: RootState) => state.products.productDetail?.id
  );

  // useEffect(() => {
  //   const item = localStorage.getItem("accessToken");
  //   if (item) {
  //     setIsAccessToken(item);
  //   }
  // }, []);

  const dispatch = useAppDispatch();
  const [files, setFiles] = useState<FileInput[]>([]);
  const [startSelect, setStartSelect] = useState<number>(0);
  const [contentReview, setContentReview] = useState<string>("");
  const { onCloseModal } = props;

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

  const handleSubmit = () => {
    if (!id) {
      return;
    }

    const request: ReviewProduct = {
      content: contentReview,
      rating: 5,
      images: files.map((e) => {
        delete e.id;
        delete e.src;
        return e;
      }),
    };
    let body: any = request;
    body = compileFormData(body);
    body.append("_method", "POST");

    console.log("RUN");

    dispatch(
      productsActions.createReviewProductRequest({
        id,
        body,
      })
    );
    handleClose();
  };

  const handleClose = () => {
    setFiles([]);
    setStartSelect(0);
    setContentReview("");
    onCloseModal();
  };

  return (
    <div className="review-rating-product">
      <h2 className="review-rating-product__title">Review Product</h2>

      <div className="review-rating-product__stars">
        <div className="review-rating-product__stars--title">
          <Label forLabel="star-select" label="Select star" isRequired />
        </div>

        <Stars
          isHover
          startSelect={startSelect}
          setStartSelect={setStartSelect}
          active={startSelect}
        />
      </div>

      <div className="review-rating-product__content-review">
        <TextArea
          label="Content review"
          forLabel="comment"
          value={contentReview}
          setValue={setContentReview}
          isRequired
        />
      </div>
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
      </div>
      <div className="flex justify-end mt-2 space-x-2">
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
        <Button htmlType="button" loading={isLoading} onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AddReviewProduct;
