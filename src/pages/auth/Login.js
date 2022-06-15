import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../../apis/api";

import { AuthContext } from "../../contexts/authContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/loginSignupStyle.css";
import Navbar from "../../components/Navbar";
import hands from "../../assets/images/hands.jpg";

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
    <div className="container mt-5">
      <Navbar />
      <div className="row css-responsive">
        <div className="col-6">
          <form onSubmit={handleSubmit}>
            <h1 className="mb-5 h1-title">Login</h1>

            <div className="mb-5">
              <label htmlFor="loginFormEmail" className="text-page">
                E-mail Address
              </label>
              <div className="">
                <input
                  type="email"
                  name="email"
                  id="loginFormEmail"
                  value={state.email}
                  error={errors.email}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="loginFormPassword" className="text-page">
                Password
              </label>
              <div className="">
                <input
                  type="password"
                  name="password"
                  id="loginFormPassword"
                  value={state.password}
                  error={errors.password}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>

            <div className="mb-5 mt-5">
              <button
                className="btn-login-signup btn-login-signup-responsive"
                type="submit"
              >
                Let me in!
              </button>
            </div>

            <div className="mb-5">
              <Link className="link-decoration" to="/signup">
                Don't have an account? Click here to sign up!
              </Link>
            </div>
          </form>
        </div>
        <div className="col-6 css-responsive">
          <img
            src={hands}
            className="image-dec image-dec-responsive"
            alt="hands ilustration"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
