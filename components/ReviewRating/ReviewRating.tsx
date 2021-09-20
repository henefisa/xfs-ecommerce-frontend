import React from "react";

// icons
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ReviewRatingProps {}

const ReviewRating: React.FC<ReviewRatingProps> = ({}) => {
  return (
    <div className="review-rating">
      <div className="review-rating__inner">
        <div className="review-rating__summary">
          <div className="review-rating__point">4.9</div>
          <div className="review-rating__stars">
            <div className="stars">
              <span className="star active">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="star active">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="star active">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="star active">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="star">
                <FontAwesomeIcon icon={faStar} />
              </span>
            </div>
            <div className="review-rating__total">25 Review</div>
          </div>
        </div>
        <div className="review-rating__details">
          <div className="review-rating__level">
            <div className="stars">
              <span className="star active">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="star active">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="star active">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="star active">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="star active">
                <FontAwesomeIcon icon={faStar} />
              </span>
            </div>
            <div className="review-rating__process">
              <div style={{ width: "80%" }} />
            </div>
            <div className="review-rating__number">10</div>
          </div>
          <div className="review-rating__level">
            <div className="stars">
              <span className="star active">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="star active">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="star active">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="star active">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="star">
                <FontAwesomeIcon icon={faStar} />
              </span>
            </div>
            <div className="review-rating__process">
              <div style={{ width: "20%" }} />
            </div>
            <div className="review-rating__number">6</div>
          </div>
          <div className="review-rating__level">
            <div className="stars">
              <span className="star active">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="star active">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="star active">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="star">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="star">
                <FontAwesomeIcon icon={faStar} />
              </span>
            </div>
            <div className="review-rating__process">
              <div style={{ width: "30%" }} />
            </div>
            <div className="review-rating__number">3</div>
          </div>
          <div className="review-rating__level">
            <div className="stars">
              <span className="star active">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="star active">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="star">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="star">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="star">
                <FontAwesomeIcon icon={faStar} />
              </span>
            </div>
            <div className="review-rating__process">
              <div style={{ width: "40%" }} />
            </div>
            <div className="review-rating__number">2</div>
          </div>
          <div className="review-rating__level">
            <div className="stars">
              <span className="star active">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="star">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="star">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="star">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="star">
                <FontAwesomeIcon icon={faStar} />
              </span>
            </div>
            <div className="review-rating__process">
              <div style={{ width: "10%" }} />
            </div>
            <div className="review-rating__number">4</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ReviewRating);
