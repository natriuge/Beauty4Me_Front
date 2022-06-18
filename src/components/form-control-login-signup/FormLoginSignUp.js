import "../form-control-login-signup/loginSignupStyle.css";

function FormLoginSignUp(props) {
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
        onChange={props.onChange}
        className="form-control"
        required={props.required}
      />
      {props.error ? <div>{props.error}</div> : null}
    </div>
  );
}

export default FormLoginSignUp;
