import React, { useState } from "react";

// components
import Stars from "../Stars/Stars";

// icons
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import AddReviewProduct from "views/Product/components/AddReviewProduct";
import { useAppSelector } from "hooks";

interface ReviewRatingProps {
  listItemInfoRating: { rating: number; total: number }[];
}

const ReviewRating: React.FC<ReviewRatingProps> = ({ listItemInfoRating }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [numberRatingTallest, setNumberRatingTatllest] = useState<number>(0);
  const token = useAppSelector((state) => state.auth.token);

  React.useEffect(() => {
    if (listItemInfoRating) {
      let numberQuantityTallest: number = 0;
      listItemInfoRating.forEach((e, idx) => {
        if (e.total > numberQuantityTallest) {
          numberQuantityTallest = e.total;
        }
      });
      setNumberRatingTatllest(numberQuantityTallest);
    }
  }, [listItemInfoRating]);

  const handleClose = () => {
    setIsOpenModal(false);
  };

  const averagedTotalRating = () => {
    let count = 0;
    const sum = listItemInfoRating.reduce(
      (
        currentValue: number,
        item: { rating: number; total: number },
        index
      ) => {
        count += item.total;
        return currentValue + item.total * (index + 1);
      },
      0
    );

    if (count === 0) return 0;

    return sum / count;
  };

  return (
    <div className="review-rating">
      <div className="review-rating__inner">
        <div className="review-rating__summary">
          <div className="review-rating__point">
            {averagedTotalRating().toFixed(1)}
          </div>
          <div className="review-rating__stars">
            <Stars active={averagedTotalRating()} />
            <div className="review-rating__total">
              {listItemInfoRating.reduce((previousValue, currentValue) => {
                return previousValue + currentValue.total;
              }, 0)}{" "}
              Review
            </div>
          </div>
        </div>
        <div className="review-rating__details">
          {listItemInfoRating
            .sort((a, b) => b.rating - a.rating)
            .map((e, idx) => (
              <div className="review-rating__level" key={idx}>
                <Stars active={e.rating} type="solid" />
                <div className="review-rating__process">
                  <div
                    style={{
                      width: `${
                        e.total === numberRatingTallest
                          ? "100%"
                          : `${(e.total / numberRatingTallest) * 100}%`
                      } `,
                    }}
                  />
                </div>
                <div className="review-rating__number">{e.total || 0}</div>
              </div>
            ))}
        </div>
        {token && (
          <Button onClick={() => setIsOpenModal(true)}>Review Product</Button>
        )}
      </div>
      {token && (
        <Modal isOpen={isOpenModal} onClose={handleClose} size="md">
          <AddReviewProduct onCloseModal={handleClose} />
        </Modal>
      )}
    </div>
  );
};

export default React.memo(ReviewRating);
