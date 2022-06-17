import "../assets/styles/loginSignupStyle.css";

function FormLoginSignUp(props) {
  return (
    <div className="mb-4">
      <label htmlFor={props.id} className="text-page">
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
      />
    </div>
  );
}

export default FormLoginSignUp;
