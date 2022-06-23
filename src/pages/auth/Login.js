import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../../apis/api";
import { AuthContext } from "../../contexts/authContext";
import FormLoginSignUp from "../../components/form-control-login-signup/FormLoginSignUp";
import Button from "react-bootstrap/Button";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../components/form-control-login-signup/loginSignupStyle.css";

function Login(props) {
  const authContext = useContext(AuthContext);

  const [state, setState] = useState({ password: "", email: "" });
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  function handleChange(event) {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value, //event.currentTarget.name está entre chaves para indicar que é ele quem vai para o value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post("/login", state);
      console.log(response.data);

      authContext.setLoggedInUser({ ...response.data }); //35--> estou atualizando o usuário logado para a app toda
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ ...response.data })
      ); // 36-39--> armazenando os dados do user logado de frma persistente no pc do user
      setErrors({ password: "", email: "" });
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err.response);
      setErrors({ ...err.response.data });
    }
  }

  return (
    <div className="container mt-5">
      <div className="row css-responsive justify-content-center">
        <div className="col-6">
          <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <h5 className="mb-5">
              <strong className="text-background">LOGIN</strong>
            </h5>

            <FormLoginSignUp
              label="E-mail Address"
              type="email"
              name="email"
              id="loginFormEmail"
              value={state.email}
              error={errors.notRegister ? errors.notRegister : errors.notEmail}
              onChange={handleChange}
              errorMessage="It should be a valid email address"
            />

            <FormLoginSignUp
              label="Password"
              type="password"
              name="password"
              id="loginFormPassword"
              value={state.password}
              error={
                errors.wrongPassord ? errors.wrongPassord : errors.loginPassword
              }
              onChange={handleChange}
            />
            <Button
              className="mb-5 mt-1"
              variant="outline-secondary"
              size="sm"
              border="none"
              onClick={handleSubmit}
            >
              <strong>Let me in!</strong>
            </Button>

            <div className="mb-5 link-decoration">
              <Link className="link-effect" to="/signup">
                Don't have an account? Click here to sign up!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
