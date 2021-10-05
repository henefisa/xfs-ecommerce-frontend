import React from "react";

// components
import CommonLayout from "../../layouts/CommonLayout";

interface EventPageProps {}

const EventPage: React.FC<EventPageProps> = ({}) => {
  return <CommonLayout>This is event page</CommonLayout>;
};

export default React.memo(EventPage);
