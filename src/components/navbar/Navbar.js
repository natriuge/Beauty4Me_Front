import { Link } from "react-router-dom";
import "../navbar/navbar.css";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import FormControlSearch from "../form-control-search-bar/FormControlSearch";
import { AuthContext } from "../../contexts/authContext";
import logo from "../../assets/images/BEAUTY4ME_logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
function Navbar() {
  const [state, setState] = useState("");
  const navigate = useNavigate();
  function handleDiscover(event) {
    setState(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    setState("");
  }
  const { loggedInUser } = useContext(AuthContext);
  const [isActive, setActive] = useState(false);
  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <div>
      <div className="topbar">
        <p className="mb-0 topbar-text">
          <strong>signup and create your personal skincare wishlist!</strong>
        </p>
      </div>
      <nav className="navbar navbar-expand-lg navbar-light text-center">
        <Link className="navbar-brand" to="/">
          <img className="nav-logo" src={logo} alt="logo" />
        </Link>
        <button
          onClick={handleToggle}
          className="navbar-toggler"
          type="button"
          aria-label="Toggle navigation"
        >
          <div className="navbar-toggler-span">
            <span className="navbar-toggler-icon"></span>
          </div>
        </button>
        <div
          className={isActive ? "navbar-collapse" : "collapse navbar-collapse"}
        >
          <ul id="nav-list" className="navbar-nav m-auto d-flex">
            <div id="nav-list" className="navbar-nav m-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/ranking">
                  <strong>Ranking</strong>
                </Link>
              </li>
              {!loggedInUser.user._id && (
                <div id="nav-list" className="navbar-nav m-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                      <strong>Signup</strong>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      <strong>Login</strong>
                    </Link>
                  </li>
                </div>
              )}
              {loggedInUser.user._id && (
                <div>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      <strong>Profile</strong>
                    </Link>
                  </li>
                </div>
              )}
            </div>
          </ul>
          <div className="navbar-search text-center mt-2">
            <form
              type="search"
              placeholder="Search"
              onSubmit={handleSubmit}
              autocomplete="off"
              onChange={(event) => setState(event.target.value)}
              value={state}
            >
              <FormControlSearch onChange={handleDiscover} value={state} />
              <button
                className="btn btn-search"
                type="submit"
                onClick={() => navigate(`/search/${state}`)}
              >
                <i className="bi bi-search"></i>
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
