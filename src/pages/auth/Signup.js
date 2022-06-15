import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../apis/api";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/loginSignupStyle.css";
import hands from "../../assets/images/hands.jpg";
import Navbar from "../../components/Navbar";

function Signup(props) {
  const [state, setState] = useState({
    name: "",
    password: "",
    email: "",
    userSkinType: "",
  });
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    password: null,
    userSkinType: null,
  });

  const navigate = useNavigate();

  function handleChange(event) {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post("/signup", state);
      setErrors({ name: "", password: "", email: "", userSkinType: "" });
      navigate("/login");
      console.log(response.data);
    } catch (err) {
      if (err.response) {
        console.error(err.response);
        return setErrors({ ...err.response.data.errors });
      }

      console.error(err);
    }
  }

  return (
    <div className="container mt-5">
      <Navbar />
      <div className="row css-responsive">
        <div className="col-6">
          <form onSubmit={handleSubmit}>
            <h1 className="mb-5 h1-title">Signing Up!</h1>

            <div className="mb-4">
              <label htmlFor="signupFormName" className="text-page">
                Name
              </label>
              <div className="">
                <input
                  type="text"
                  name="name"
                  id="signupFormName"
                  value={state.name}
                  error={errors.name}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="signupFormEmail" className="text-page">
                E-mail Address
              </label>
              <div className="">
                <input
                  type="email"
                  name="email"
                  id="signupFormEmail"
                  value={state.email}
                  error={errors.email}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="signupFormPassword" className="text-page">
                Password
              </label>
              <div className="">
                <input
                  type="password"
                  name="password"
                  id="signupFormPassword"
                  value={state.password}
                  error={errors.password}
                  onChange={handleChange}
                  className="form-control"
                />
                <div className="mt-1 mb-4 text-paragraph">
                  <p>
                    Your password must include:
                    <li>at least 8 characters</li>
                    <li>an uppercase character</li>
                    <li>numbers</li>
                    <li>symbols (@#$%)</li>
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="signupFormSkinType" className="text-page">
                Your Skin Type
              </label>
              <div className="text-skinType border my-radio">
                <input
                  className="mb-2"
                  type="radio"
                  name="userSkinType"
                  onChange={handleChange}
                  value="Normal"
                />{" "}
                Normal <br />
                <input
                  className="mb-2"
                  type="radio"
                  name="userSkinType"
                  onChange={handleChange}
                  value="Dry"
                />{" "}
                Dry <br />
                <input
                  className="mb-2"
                  type="radio"
                  name="userSkinType"
                  onChange={handleChange}
                  value="Oily"
                />{" "}
                Oily <br />
                <input
                  className="mb-2"
                  type="radio"
                  name="userSkinType"
                  onChange={handleChange}
                  value="Combination"
                />{" "}
                Combination <br />
              </div>
            </div>

            <div className="mb-5 mt-5">
              <button
                className="btn-login-signup btn-login-signup-responsive"
                type="submit"
              >
                Create Account
              </button>
            </div>

            <div className="mb-5">
              <Link className="link-decoration" to="/login">
                Already have an account? Click here to login.
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

export default Signup;
