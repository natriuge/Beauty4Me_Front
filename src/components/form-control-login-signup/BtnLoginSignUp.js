import "../form-control-login-signup/loginSignupStyle.css";

function BtnLoginSignUp({ children }) {
  return (
    <div className="mb-5 mt-5">
      <button
        className="btn-login-signup btn-login-signup-responsive"
        type="submit"
      >
        {children}
      </button>
    </div>
  );
}

export default BtnLoginSignUp;
