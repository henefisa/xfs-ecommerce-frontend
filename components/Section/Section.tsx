import clsx from "clsx";
import React from "react";

interface SectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  extra?: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({
  title,
  children,
  className,
  extra,
}) => {
  return (
    <section className={clsx("section", className)}>
      {(title || extra) && (
        <header className="section__header">
          <h2 className="section__title">{title}</h2>
          <div className="secion__extra">{extra}</div>
        </header>
      )}
      <main className="section__content">{children}</main>
    </section>
  );
};

export default React.memo(Section);
