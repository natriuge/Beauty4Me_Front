import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import api from "../../apis/api";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/loginSignupStyle.css";
import hands from "../../assets/images/hands.jpg";

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
    //navbar
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <form onSubmit={handleSubmit}>
            <h1 className="mb-5 h1-title">Signup!</h1>

            <div className="row mb-5">
              <label
                htmlFor="signupFormName"
                className="col-sm-2 col-form-label text-page"
              >
                Name
              </label>
              <div className="col-sm-3">
                <input
                  type="text"
                  name="name"
                  id="signupFormName"
                  value={state.name}
                  error={errors.name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Complete Name"
                />
              </div>
            </div>

            <div className="row mb-3">
              <label
                htmlFor="signupFormEmail"
                className="col-sm-2 col-form-label text-page"
              >
                E-mail Address
              </label>
              <div className="col-sm-3">
                <input
                  type="email"
                  name="email"
                  id="signupFormEmail"
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
                htmlFor="signupFormPassword"
                className="col-sm-2 col-form-label text-page"
              >
                Password
              </label>
              <div className="col-sm-3">
                <input
                  type="password"
                  name="password"
                  id="signupFormPassword"
                  value={state.password}
                  error={errors.password}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="your password"
                />
                <div className="mt-1 text-paragraph">
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

            <div className="row mb-3">
              <label
                htmlFor="signupFormSkinType"
                className="col-sm-2 col-form-label text-page"
              >
                Your Skin Type
              </label>
              <div className="col-sm-3 text-skinType">
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
                className="btn-login-signup btn-lg border border-4 rounded-pill"
                type="submit"
              >
                Signup!
              </button>
            </div>

            <div className="mb-5">
              <Link className="link-decoration" to="/login">
                Already have an account? Click here to login.
              </Link>
            </div>
          </form>
        </div>

        <div className="col-12">
          <img src={hands} className="image-dec" alt="hands ilustration" />
        </div>
      </div>
    </div>
  );
}

export default Signup;
