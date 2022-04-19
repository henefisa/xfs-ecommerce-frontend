import * as React from "react";

// components
import { Banner, BannerGroup, BannerProps } from "components/modules/Banner";
import Button from "components/common/Button/Button";
import Section from "components/common/Section/Section";
import { useAppSelector } from "hooks";
import { EBannerType } from "models/Banner";
import { API_END_POINT } from "constants/env";

const sizes = ["lg", "md", "sm", "sm"];

const TopBanners: React.FC = () => {
  const banners = useAppSelector((state) => state.banner.banners);

  return (
    <Section className="top-banners">
      <BannerGroup>
        {banners
          .filter((item) => item.type === EBannerType.Small)
          .slice(0, 4)
          .map((item, idx) => (
            <Banner
              key={item.id}
              title={item.title}
              subTitle={item.description}
              size={sizes[idx] as BannerProps["size"]}
              // extra={<Button>Sample button</Button>}
              style={{ backgroundImage: `url(${API_END_POINT}${item.image})` }}
            />
          ))}
      </BannerGroup>
    </Section>
  );
};

export default TopBanners;
