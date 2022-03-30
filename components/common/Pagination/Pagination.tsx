import React, { useState } from "react";
import clsx from "clsx";

interface PaginationProps {
  current?: number;
  total?: number;
  pageSize?: number;
  onChange?: (page: number) => void;
}

const calculatePage = (total: number, pageSize: number) => {
  return ~~((total - 1) / pageSize) + 1;
};

const Pagination: React.FC<PaginationProps> = ({
  current = 1,
  total = 10,
  pageSize = 10,
  onChange,
}) => {
  const [page, setPage] = useState(current);
  const allPages = calculatePage(total, pageSize);
  const pager = [];
  const pageBufferSize = 2;
  let left = Math.max(1, page - pageBufferSize);
  let right = Math.min(page + pageBufferSize, allPages);

  const isValid = (current: number) => current !== page;

  const hasPrev = page > 1;
  const hasNext = page < allPages;

  const handlePrev = () => {
    if (hasPrev) {
      handleChange(page - 1);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      handleChange(page + 1);
    }
  };

  const handleChange = (current: number) => {
    let page = current;
    if (isValid(current)) {
      if (current > allPages) {
        page = allPages;
      } else if (current < 1) {
        page = 1;
      }
      setPage(page);
      onChange?.(page);
    }
    return page;
  };

  //if the page buffer size is to large
  if (allPages <= 3 + pageBufferSize * 2) {
    //just push the length of all pages into pager
    for (let i = 1; i <= allPages; ++i) {
      pager.push(
        <li
          className={clsx({
            pagination__item: true,
            active: page === i,
          })}
          key={i}
          title={"" + i}
          onClick={() => handleChange(i)}
        >
          {i}
        </li>
      );
    }
  } else {
    //create item when page nearly end or start
    if (page - 1 <= pageBufferSize) {
      right = 1 + pageBufferSize * 2;
    }

    if (allPages - page <= pageBufferSize) {
      left = allPages - pageBufferSize * 2;
    }

    for (let i = left; i <= right; ++i) {
      pager.push(
        <li
          className={clsx({
            "pagination__item": true,
            "pagination__item--active": page === i,
          })}
          key={i}
          title={"" + i}
          onClick={() => handleChange(i)}
        >
          {i}
        </li>
      );
    }
  }

  return (
    <ul className="pagination">
      <li
        className={clsx({
          pagination__item: true,
          "pagination__item--disabled": !hasPrev,
        })}
        title="Previous"
        onClick={handlePrev}
      >
        «
      </li>
      {pager}
      <li
        className={clsx({
          pagination__item: true,
          "pagination__item--disabled": !hasNext,
        })}
        title="Next"
        onClick={handleNext}
      >
        »
      </li>
    </ul>
  );
};

export default React.memo(Pagination);
