import clsx from "clsx";
import React from "react";

interface SectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ title, children, className }) => {
  return (
    <section className={clsx("section", className)}>
      {title && <h2 className="section__title">{title}</h2>}
      <main className="section__content">{children}</main>
    </section>
  );
};

export default React.memo(Section);
