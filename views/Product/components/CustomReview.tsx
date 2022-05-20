import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

// components
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "components/common/Card/Card";
import Col from "components/common/Col/Col";
import ReviewRating from "components/common/ReviewRating/ReviewRating";
import Row from "components/common/Row/Row";
import Image from "next/image";
import Avatar from "components/common/Avatar/Avatar";
import Button from "components/common/Button/Button";
import Stars from "components/common/Stars/Stars";
import { useAppSelector } from "hooks";
import { RootState } from "store";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { API_END_POINT } from "constants/env";
import { useDispatch } from "react-redux";
import { productsActions } from "store/product/productSlice";

const CustomerReview = () => {
  const productDetail = useAppSelector(
    (state: RootState) => state.products.productDetail!
  );
  const dispatch = useDispatch();

  const viewRating = () => {
    const newInfoRating: { rating: number; total: number }[] = [
      {
        rating: 1,
        total: 0,
      },
      {
        rating: 2,
        total: 0,
      },
      {
        rating: 3,
        total: 0,
      },
      {
        rating: 4,
        total: 0,
      },
      {
        rating: 5,
        total: 0,
      },
    ];
    if (productDetail.reviews) {
      productDetail.reviews.map((e) => {
        const index = newInfoRating.findIndex(
          (el) => Number(e.rating) === Number(el.rating)
        );
        if (index > -1) {
          newInfoRating[index].total = newInfoRating[index].total + 1;
        }
      });
    }
    return newInfoRating;
  };

  const listAllsImage = productDetail?.reviews
    ?.map((e) => {
      if (e.images?.length) {
        return e.images;
      }
    })
    .flat()
    .filter(Boolean);

  const handleLikeReview = (id: string) => {
    dispatch(
      productsActions.likeReviewRequest({
        id,
        productId: productDetail.id,
      })
    );
  };

  return (
    <Card className="customer-review">
      <Row gutter={[16, 16]} className="customer-review__top">
        <Col md={5} lg={4} xl={3}>
          <ReviewRating listItemInfoRating={viewRating()} />
        </Col>
        {!!productDetail.reviews?.length && (
          <Col md={7} lg={8} xl={9}>
            <div className="review-images">
              <div className="review-images__title">All Images</div>
              {listAllsImage?.length ? (
                <div className="review-images__wrap">
                  <Swiper slidesPerView="auto">
                    {listAllsImage.map((e, idx) => (
                      <SwiperSlide key={idx}>
                        <div className="review-images__item">
                          <Image
                            src={`${API_END_POINT}${e?.url}`}
                            layout="fill"
                            objectFit="cover"
                            objectPosition="center"
                            alt="Review Images"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              ) : null}
            </div>
          </Col>
        )}
      </Row>
      {!productDetail.reviews?.length ? (
        <div>No reviews</div>
      ) : (
        <div className="review-comment-wrap">
          {productDetail?.reviews?.map((e, idx) => (
            <Row className="review-comment" gutter={[16, 16]} key={idx}>
              <Col md={5} lg={4} xl={3}>
                <div className="review-comment__user">
                  <div className="review-comment__user-inner">
                    <div className="review-comment__user-avatar">
                      <Avatar src="/vendor-1.jpg" size="small" />
                    </div>
                    <div>
                      <div className="review-comment__user-name">
                        {e.user.firstName + " " + e.user.lastName}
                      </div>
                      <div className="review-comment__user-date">
                        {formatDistanceToNow(new Date(e.user.createdAt), {
                          addSuffix: true,
                        })}
                      </div>
                    </div>
                  </div>
                  {/* <div className="review-comment__user-info">
                    <FontAwesomeIcon icon={faCommentAlt} />
                    Writen:
                    <span>14 Review</span>
                  </div> */}
                  <div className="review-comment__user-info">
                    <FontAwesomeIcon icon={faThumbsUp} />
                    Received:
                    <span>{e.count}</span>
                  </div>
                </div>
              </Col>
              <Col md={7} lg={8} xl={9}>
                <div className="review-comment__content-wrap">
                  <div className="review-comment__rating">
                    <Stars active={e.rating} type="solid" />
                  </div>
                  <div className="review-comment__content">{e.content}</div>
                  <div className="review-comment__images">
                    {e.images?.map((e, idx) => (
                      <div className="review-comment__image" key={idx}>
                        <Image
                          src={`${API_END_POINT}${e.url}`}
                          layout="fill"
                          objectFit="cover"
                          objectPosition="center"
                          alt="Review Images"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="review-comment__created-date">
                    <div className="review-comment__attributes">
                      <div className="review-comment__attribute">
                        Color: Purple
                      </div>
                      <div className="review-comment__attribute">
                        Size: Large
                      </div>
                    </div>
                    <span>
                      Review:{" "}
                      {formatDistanceToNow(new Date(e.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <Button
                    className="review-comment__thank"
                    onClick={() => handleLikeReview(e.id)}
                  >
                    <FontAwesomeIcon icon={faThumbsUp} />
                    {`Useful (${e.count || 0})`}
                  </Button>
                </div>
              </Col>
            </Row>
          ))}
        </div>
      )}
    </Card>
  );
};

export default CustomerReview;
