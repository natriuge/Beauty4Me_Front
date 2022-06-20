import React from "react";

const PaginationSelector = ({ productsPerPage, setProductsPerPage }) => {
  return (
    <div className="mb-4 d-flex justify-content-end selector-css">
      Products by page
      <select
        className="selector-box"
        value={productsPerPage}
        onChange={(e) => setProductsPerPage(Number(e.target.value))}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
      </select>
    </div>
  );
};

export default PaginationSelector;
