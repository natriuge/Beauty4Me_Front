import React from "react";

const Pagination = ({ pages, currentPage, setCurrentPage }) => {
  return (
    <div>
      {Array.from(Array(pages), (state, index) => {
        return (
          <button
            style={
              index === currentPage ? { backgroundColor: "#b8b5ff" } : null
            }
            className="pagination-btn-css"
            value={index}
            onClick={(e) => setCurrentPage(Number(e.target.value))}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
