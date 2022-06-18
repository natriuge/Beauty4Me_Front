import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../apis/api";
import hands from "../../assets/images/hands.jpg";
import FormLoginSignUp from "../../components/form-control-login-signup/FormLoginSignUp";
import BtnLoginSignUp from "../../components/form-control-login-signup/BtnLoginSignUp";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../components/form-control-login-signup/loginSignupStyle.css";

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
      console.log("RESPONSA DATA", response.data);
    } catch (err) {
      if (err.response) {
        console.error("ERRO", err.response);
        return setErrors({ ...err.response.data });
      }
      console.log("SET ERRORS", err.response);
      console.error(err);
    }
  }

  return (
    <div className="container mt-5">
      <div className="row css-responsive">
        <div className="col-6">
          <form onSubmit={handleSubmit}>
            <h1 className="mb-5 h1-title">Signing Up!</h1>

            <FormLoginSignUp
              label="Name"
              type="text"
              name="name"
              id="signupFormName"
              value={state.name}
              error={errors.name}
              onChange={handleChange}
            />

            <FormLoginSignUp
              label="E-mail Address"
              type="email"
              name="email"
              id="signupFormEmail"
              value={state.email}
              error={errors.email}
              onChange={handleChange}
            />
            <div>
              <FormLoginSignUp
                label="Password"
                type="password"
                name="password"
                id="signupFormPassword"
                value={state.password}
                error={errors.password}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="signupFormSkinType" className="text-page">
                Your Skin Type
              </label>
              <div className="text-skinType my-radio">
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
                {errors.userSkinType ? (
                  <div className="msg-err-css">{errors.userSkinType}</div>
                ) : null}
              </div>
            </div>

            <BtnLoginSignUp>Create Account</BtnLoginSignUp>

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
