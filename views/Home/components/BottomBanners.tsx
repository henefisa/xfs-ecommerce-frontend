import * as React from "react";
import { Banner, BannerGroup } from "components/modules/Banner";
import Section from "components/common/Section/Section";
import { useAppSelector } from "hooks";
import { EBannerType } from "models/Banner";
import { API_END_POINT } from "constants/env";

const BottomBanners = () => {
  const banners = useAppSelector((state) => state.banner.banners);

  return (
    <Section className="bottom-banners">
      <BannerGroup>
        {banners
          .filter((item) => item.type === EBannerType.Small)
          .slice(4, 6)
          .map((item) => (
            <Banner
              key={item.id}
              title={item.title}
              subTitle={item.description}
              size="md"
              style={{ backgroundImage: `url(${API_END_POINT}${item.image})` }}
            />
          ))}
      </BannerGroup>
    </Section>
  );
};

export default BottomBanners;
