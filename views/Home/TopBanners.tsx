import * as React from "react";

// components
import { Banner, BannerGroup } from "../../components/Banner";
import Button from "../../components/Button/Button";
import Section from "../../components/Section/Section";

const TopBanners: React.FC = () => {
  return (
    <Section className="top-banners">
      <BannerGroup>
        <Banner
          title="Sample title"
          subTitle="Sample sub title"
          size="lg"
          extra={<Button>Sample button</Button>}
          style={{ backgroundImage: "url(/banner-1.jpg)" }}
        />
        <Banner
          title="Sample title"
          subTitle="Sample sub title"
          size="md"
          style={{ backgroundImage: "url(/banner-2.jpg)" }}
          className="banner--custom"
        />
        <Banner
          title="Sample title"
          subTitle="Sample sub title"
          size="sm"
          className="banner--custom"
          style={{ backgroundImage: "url(/banner-3.jpg)" }}
        />
        <Banner
          title="Sample title"
          subTitle="Sample sub title"
          size="sm"
          style={{ backgroundImage: "url(/banner-4.jpg)" }}
        />
      </BannerGroup>
    </Section>
  );
};

export default TopBanners;
