import React, { useState } from "react";

const Pagination = ({ pages, currentPage, setCurrentPage }) => {
  const [state, setState] = useState([0, 1, 2, 3]);

  const currentPages = Array.from(state, (currentNumber, index) => {
    return (
      <button
        style={
          currentNumber === currentPage ? { backgroundColor: "#b8b5ff" } : null
        }
        className="pagination-btn-css"
        value={currentNumber}
        onClick={(e) => nextPages(e, index)}
      >
        {currentNumber + 1}
      </button>
    );
  });

  function nextPages(e, index) {
    if (Number(e.target.value) === pages - 2) {
      return null;
    }

    setCurrentPage(Number(e.target.value));

    if (Number(e.target.value) === 0) {
      return null;
    }

    if (state.length - 1 === index) {
      setState(
        state.map((element) => {
          if (element < pages) {
            return element + 1;
          }
          return element;
        })
      );
    }

    if (index === 0) {
      setState(
        state.map((element) => {
          if (element > 0) {
            return element - 1;
          }
          return element;
        })
      );
    }
  }

  return (
    <div>
      {currentPages}
      <span style={{ backgroundColor: "#b8b5ff" }}>...</span>
      <button
        style={
          pages - 1 === currentPage ? { backgroundColor: "#b8b5ff" } : null
        }
        className="pagination-btn-css"
        value={pages - 1}
        onClick={(e) => setCurrentPage(Number(e.target.value))}
      >
        {pages}
      </button>
    </div>
  );
};

export default Pagination;
