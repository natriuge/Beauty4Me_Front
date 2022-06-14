import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../apis/api";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/loginSignupStyle.css";

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
      setErrors({ name: "", password: "", email: "" });
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
      <form onSubmit={handleSubmit}>
        <h1 className="mb-5">Signup!</h1>

        <div className="row mb-5">
          <label htmlFor="signupFormName" className="col-sm-2 col-form-label">
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
          <label htmlFor="signupFormEmail" className="col-sm-2 col-form-label">
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
            className="col-sm-2 col-form-label"
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
            <div className="mt-1">
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
            className="col-sm-2 col-form-label"
          >
            Your Skin Type
          </label>
          <div className="col-sm-3">
            <input
              className="mb-2"
              type="radio"
              name="userSkinType"
              value="Normal"
            />{" "}
            Normal <br />
            <input
              className="mb-2"
              type="radio"
              name="userSkinType"
              value="Dry"
            />{" "}
            Dry <br />
            <input
              className="mb-2"
              type="radio"
              name="userSkinType"
              value="Oily"
            />{" "}
            Oily <br />
            <input
              className="mb-2"
              type="radio"
              name="userSkinType"
              value="Combination"
            />{" "}
            Combination <br />
          </div>
        </div>

        <div className="mb-5 mt-5">
          <button className="btn-lg border border-4 rounded-pill" type="submit">
            Signup!
          </button>
        </div>

        <div className="mb-5">
          <Link className="" to="/login">
            Already have an account? Click here to login.
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
