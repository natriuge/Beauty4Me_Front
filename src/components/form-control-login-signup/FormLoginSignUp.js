import "../form-control-login-signup/loginSignupStyle.css";

function FormLoginSignUp(props) {
  return (
    <div className="mb-4">
      <label htmlFor={props.id} className="form-label">
        <strong>{props.label}</strong>
      </label>
      <input
        type={props.type}
        name={props.name}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        className="form-control"
      />
      {props.error ? <div className="msg-err-css">{props.error}</div> : null}
    </div>
  );
}

export default FormLoginSignUp;
