import { Link } from "react-router-dom";
import "../assets/styles/navbar.css";
import React, { useState } from "react";

function Navbar() {
  const [isActive, setActive] = useState(false);
  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <div>
      <div className="topbar">
        <p className="mb-0 topbar-text">
          <strong>signup and create your personal skincare calendar!</strong>
        </p>
      </div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link className="navbar-brand" to="/">
          Beauty4Me
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
          <ul className="navbar-nav m-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ranking">
                Ranking
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-primary my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
