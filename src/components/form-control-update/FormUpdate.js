import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function FormUpdate(props) {
  return (
    <div className="mb-4">
      <label htmlFor={props.id} className="form-label">
        {props.label}
      </label>
      <textarea
        type={props.type}
        name={props.name}
        rows="3"
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        className="form-control"
      />
    </div>
  );
}

export default FormUpdate;
