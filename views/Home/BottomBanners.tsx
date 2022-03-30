import * as React from "react";
import { Banner, BannerGroup } from "../../components/Banner";
import Section from "../../components/Section/Section";

const BottomBanners = () => {
  return (
    <Section className="bottom-banners">
      <BannerGroup>
        <Banner
          title="Sample banner"
          subTitle="Sample"
          style={{ backgroundImage: "url(/banner-1.jpg)" }}
          size="md"
        />
        <Banner
          title="Sample banner"
          subTitle="Sample"
          style={{ backgroundImage: "url(/banner-2.jpg)" }}
          className="banner--custom"
          size="md"
        />
      </BannerGroup>
    </Section>
  );
};

export default BottomBanners;
