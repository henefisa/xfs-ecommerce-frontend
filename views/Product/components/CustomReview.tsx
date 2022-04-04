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

interface CustomerReviewProps {
  images?: string;
}

const CustomerReview = (props: CustomerReviewProps) => {
  const { images } = props;
  return (
    <Card className="customer-review">
      <Row gutter={[16, 16]} className="customer-review__top">
        <Col md={5} lg={4} xl={3}>
          <ReviewRating />
        </Col>
        <Col md={7} lg={8} xl={9}>
          <div className="review-images">
            <div className="review-images__title">All Images</div>
            <div className="review-images__wrap">
              {/*TODO: Click on review image open modal*/}
              <Swiper slidesPerView="auto">
                {[...new Array(5)].map((_, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="review-images__item">
                      <Image
                        src={"/product-1.jpg"}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        alt="Review Images"
                      />
                    </div>
                  </SwiperSlide>
                ))}

                <SwiperSlide>
                  <div className="review-images__item">
                    <Image
                      src="/product-2.jpg"
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                      alt="Review Images"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="review-images__item">
                    <Image
                      src="/product-3.jpg"
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                      alt="Review Images"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="review-images__item">
                    <Image
                      src="/product-4.jpg"
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                      alt="Review Images"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="review-images__item">
                    <Image
                      src="/product-5.jpg"
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                      alt="Review Images"
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </Col>
      </Row>
      <div className="review-comment-wrap">
        <Row className="review-comment" gutter={[16, 16]}>
          <Col md={5} lg={4} xl={3}>
            <div className="review-comment__user">
              <div className="review-comment__user-inner">
                <div className="review-comment__user-avatar">
                  <Avatar src="/vendor-1.jpg" size="small" />
                </div>
                <div>
                  <div className="review-comment__user-name">
                    Sample username
                  </div>
                  <div className="review-comment__user-date">
                    Joined 2 years ago
                  </div>
                </div>
              </div>
              <div className="review-comment__user-info">
                <FontAwesomeIcon icon={faCommentAlt} />
                Writen:
                <span>14 Review</span>
              </div>
              <div className="review-comment__user-info">
                <FontAwesomeIcon icon={faThumbsUp} />
                Received:
                <span>43 Like</span>
              </div>
            </div>
          </Col>
          <Col md={7} lg={8} xl={9}>
            <div className="review-comment__content-wrap">
              <div className="review-comment__rating">
                <Stars active={4} type="solid" />
              </div>
              <div className="review-comment__content">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam
                excepturi, doloribus officiis quaerat dicta odio facere magnam
                optio voluptatum laboriosam nemo aperiam temporibus at! Enim
                esse fuga ipsam ipsa ad.
              </div>
              <div className="review-comment__images">
                <div className="review-comment__image">
                  <Image
                    src="/product-1.jpg"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    alt="Review Images"
                  />
                </div>
                <div className="review-comment__image">
                  <Image
                    src="/product-1.jpg"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    alt="Review Images"
                  />
                </div>
                <div className="review-comment__image">
                  <Image
                    src="/product-1.jpg"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    alt="Review Images"
                  />
                </div>
                <div className="review-comment__image">
                  <Image
                    src="/product-1.jpg"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    alt="Review Images"
                  />
                </div>
              </div>
              <div className="review-comment__created-date">
                <div className="review-comment__attributes">
                  <div className="review-comment__attribute">Color: Purple</div>
                  <div className="review-comment__attribute">Size: Large</div>
                </div>
                <span>Review: 1 month ago</span>
              </div>
              <Button className="review-comment__thank">
                <FontAwesomeIcon icon={faThumbsUp} /> Useful (100)
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default CustomerReview;
