import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../../apis/api";

import { AuthContext } from "../../contexts/authContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/loginSignupStyle.css";

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
      [event.currentTarget.name]: event.currentTarget.value,
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
      setErrors({ ...err.response.data.errors });
    }
  }

  return (
    //navbar
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <h1 className="mb-5 h1-title">Login</h1>

        <div class="row mb-5">
          <label
            htmlFor="loginFormEmail"
            className="col-sm-2 col-form-label text-page"
          >
            E-mail Address
          </label>
          <div className="col-sm-3">
            <input
              type="email"
              name="email"
              id="loginFormEmail"
              value={state.email}
              error={errors.email}
              onChange={handleChange}
              className="form-control"
              placeholder="your.name@email.com"
            />
          </div>
        </div>

        <div className="row mb-3">
          <label
            htmlFor="loginFormPassword"
            className="col-sm-2 col-form-label text-page"
          >
            Password
          </label>
          <div className="col-sm-3">
            <input
              type="password"
              name="password"
              id="loginFormPassword"
              value={state.password}
              error={errors.password}
              onChange={handleChange}
              className="form-control"
              placeholder="your password"
            />
          </div>
        </div>

        <div className="mb-5 mt-5">
          <button
            className="btn-login-signup btn-lg border border-4 rounded-pill"
            type="submit"
          >
            Login!
          </button>
        </div>

        <div className="mb-5">
          <Link className="link-decoration" to="/signup">
            Don't have an account? Click here to signup!
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
