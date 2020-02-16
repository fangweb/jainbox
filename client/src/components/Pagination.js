import React from 'react';
import PropTypes from 'prop-types';
import { ResultsPerPage } from '../config';
import '../assets/css/pagination.css';

function Pagination({
  page,
  totalResults,
  onNextPage,
  onPreviousPage,
  loading
}) {
  const startDisplayOfResults = (page - 1) * ResultsPerPage + 1;
  const disableNextPage =
    page * ResultsPerPage + 1 > totalResults || loading || totalResults <= 0;
  const disablePrevPage =
    startDisplayOfResults - ResultsPerPage < 1 || loading || totalResults <= 0;
  const bothButtonsDisabled = disableNextPage && disablePrevPage;
  if (startDisplayOfResults > totalResults && totalResults > 0) {
    throw new Error('The page can not exist');
  }
  let endDisplayOfResults = startDisplayOfResults + ResultsPerPage - 1;
  if (endDisplayOfResults > totalResults) {
    endDisplayOfResults = totalResults;
  }
  
  let displayString;
  if (totalResults > 0) {
    displayString = `Displaying ${startDisplayOfResults}-${endDisplayOfResults} of ${totalResults} result(s).`;
  } else {
    displayString = '';
  }
  const nextPage = () => {
    if (disableNextPage) {
      return;
    }
    onNextPage();
  };
  const prevPage = () => {
    if (disablePrevPage) {
      return;
    }
    onPreviousPage();
  };

  return (
    <div className="pagination">
      <span>{!loading && displayString}</span>
      <button
        disabled={disablePrevPage}
        onClick={prevPage}
        className="pagination-btn prev-page"
      >
        <i className="fas fa-angle-left" />
      </button>
      <button
        disabled={disableNextPage}
        onClick={nextPage}
        className="pagination-btn next-page"
      >
        <i className="fas fa-angle-right" />
      </button>
    </div>
  );
}

Pagination.propTypes = {
  page: PropTypes.number,
  totalResults: PropTypes.number.isRequired,
  onNextPage: PropTypes.func.isRequired,
  onPreviousPage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

Pagination.defaultProps = {
  page: 1
};

export default Pagination;
