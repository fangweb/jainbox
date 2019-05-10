import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ResultsPerPage } from '../const';

function Pagination({ page, totalResults }) {
  const startDisplayOfResults = ( page - 1 ) * ResultsPerPage + 1;
  if ( startDisplayOfResults > totalResults ) {
    throw new Error("The page can not exist");
  }
  let endDisplayOfResults = startDisplayOfResults + ResultsPerPage - 1;
  if ( endDisplayOfResults > totalResults ) {
    endDisplayOfResults = totalResults;
  }
  const displayString = `Displaying ${startDisplayOfResults}-${endDisplayOfResults} of ${totalResults}`;
  return (
    <div className="pagination">
      <span>{displayString}</span>
      <button className="prev-page">
        <i className="fas fa-angle-left" />
      </button>
      <button className="next-page">
        <i className="fas fa-angle-right" />
      </button>
    </div>
  );
}

Pagination.propTypes = {
  page: PropTypes.number,
  results: PropTypes.number.isRequired,
  onNextPage: PropTypes.func.isRequired,
  onPreviousPage: PropTypes.func.isRequired
};

Pagination.defaultProps = {
  page: 1
};

export default Pagination;
