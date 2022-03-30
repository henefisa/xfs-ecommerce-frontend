import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import Image from "next/image";
import { Form, FormItem } from "../../components/Form";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

const Introduction: React.FC = () => {
  const nextEl = React.useRef<HTMLDivElement>(null);
  const prevEl = React.useRef<HTMLDivElement>(null);

  return (
    <section className="introduction">
      <Swiper
        navigation={{
          nextEl: nextEl.current,
          prevEl: prevEl.current,
        }}
        onInit={(swiper) => {
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation !== "boolean"
          ) {
            swiper.params.navigation.nextEl = nextEl.current;
            swiper.params.navigation.prevEl = prevEl.current;
            swiper.init();
            swiper.update();
          }
        }}
        pagination={{
          clickable: true,
          bulletClass: "introduction__slide-pagination",
          bulletActiveClass: "active",
        }}
      >
        <SwiperSlide>
          <div className="introduction__slide">
            <div
              className="introduction__slide-image"
              style={{ overflow: "hidden", borderRadius: "24px" }}
            >
              <Image
                src="/images/home/slider-1.jpg"
                layout="fill"
                alt="Slide image 1"
                objectFit="cover"
                objectPosition="center"
                quality="100"
              />
            </div>
            <div className="introduction__slide-content">
              <h1 className="introduction__slide-content-title">
                Don&apos;t miss <br /> amazing deals
              </h1>
              <h4 className="introduction__slide-content-subtitle">
                Subscribe for newsletter
              </h4>
              <Form className="introduction__slide-content-form" type="inline">
                <FormItem name="email">
                  <Input type="email" placeholder="Email..." />
                </FormItem>
                <Button htmlType="submit" type="solid" color="success">
                  Subscribe
                </Button>
              </Form>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="introduction__slide">
            <div className="introduction__slide-image">
              <Image
                src="/images/home/slider-2.jpg"
                layout="fill"
                alt="Slide image 2"
                objectFit="cover"
                objectPosition="center"
                quality="100"
              />
            </div>
            <div className="introduction__slide-content">
              <h1 className="introduction__slide-content-title">
                Dress like it is <br /> your day
              </h1>
              <h4 className="introduction__slide-content-subtitle">
                Subscribe for newsletter
              </h4>
              <Form className="introduction__slide-content-form" type="inline">
                <FormItem name="email">
                  <Input type="email" placeholder="Email..." />
                </FormItem>
                <Button htmlType="submit" type="solid" color="success">
                  Subscribe
                </Button>
              </Form>
            </div>
          </div>
        </SwiperSlide>
        <div className="introduction__navigation">
          <div className="introduction__navigation-item" ref={prevEl}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
          <div className="introduction__navigation-item" ref={nextEl}>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </div>
      </Swiper>
    </section>
  );
};

export default Introduction;
