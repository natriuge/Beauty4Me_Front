import "../assets/styles/loginSignupStyle.css";

function FormLoginSignUp(props) {
  // // Example starter JavaScript for disabling form submissions if there are invalid fields
  // (function () {
  //   // "use strict";

  //   // Fetch all the forms we want to apply custom Bootstrap validation styles to
  //   var forms = document.querySelectorAll(".needs-validation");

  //   // Loop over them and prevent submission
  //   Array.prototype.slice.call(forms).forEach(function (form) {
  //     form.addEventListener(
  //       "submit",
  //       function (event) {
  //         if (!form.checkValidity()) {
  //           event.preventDefault();
  //           event.stopPropagation();
  //         }

  //         form.classList.add("was-validated");
  //       },
  //       false
  //     );
  //   });
  // })();
  return (
    <div className="mb-4">
      <label htmlFor={props.id} className="text-page form-label">
        {props.label}
      </label>
      <input
        type={props.type}
        name={props.name}
        id={props.id}
        value={props.value}
        error={props.value}
        onChange={props.onChange}
        className="form-control"
        // required
      />
      <span>{props.errorMessage}</span>
      {/* <div className="invalid-feedback">Required information!</div> */}
    </div>
  );
}

export default FormLoginSignUp;
