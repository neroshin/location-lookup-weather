import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';
import './pagination.scss';
const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {

    // console.log(currentPage === lastPage)
    if(currentPage === lastPage)return;
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    console.log(currentPage);
    if(currentPage <= 1)return;
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      // className={classnames('pagination-container', { [className]: className })}
      className={classnames('pagination', { [className]: className })}
    >
      <li
        className={classnames('page-item', {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
        {/* <div className="arrow left" /> */}
        <a className="page-link" href="javascript:void(0)" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
          <span className="sr-only">Previous</span>
        </a>
      </li>
      {paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return <li className="page-item dots">&#8230;</li>;
        }

        return (
          <li
            className={classnames('page-item', {
              selected: pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            <a className="page-link" href="javascript:void(0)">{pageNumber}</a>
          </li>
        );
      })}
      <li
        className={classnames('page-item', {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <a className="page-link" href="javascript:void(0)" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
          <span className="sr-only">Next</span>
        </a>
      </li>
    </ul>
  );
};

export default Pagination;
