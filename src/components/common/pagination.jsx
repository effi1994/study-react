/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import _ from "lodash";
import PropTypes from 'prop-types';
const Pagination = ({ itemsCount, pageSize,currentPage ,onPageChange}) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  if(pageCount ===1) return null;
  const pages = _.range(1, pageCount + 1);
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li key={page} className={page === currentPage ? 'page-itme active' : 'page-itme'}>
            <a className="page-link" onClick={()=> onPageChange(page)}>{page}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
       itemsCount:PropTypes.number.isRequired, 
       pageSize:PropTypes.number.isRequired,
       currentPage:PropTypes.number.isRequired 
       ,onPageChange:PropTypes.func.isRequired   
}

export default Pagination;
