import React from "react";
import "../assets/styles/spinner.css";

function LoadingSpinner() {
  return (
    <div className="spinner">
      <div className="double-bounce1"></div>
      <div className="double-bounce2"></div>
    </div>
  );
}
export default LoadingSpinner;
