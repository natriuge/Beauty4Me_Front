import { Link } from "react-router-dom";
import "../navbar/navbar.css";
import React, { useState } from "react";
<<<<<<< HEAD:src/components/Navbar.js
// import { AuthContext } from "../contexts/authContext";
=======
import { useNavigate } from "react-router-dom";
import FormControlSearch from "../form-control-search-bar/FormControlSearch";
>>>>>>> bcc12029223b5f34861a4c5667f757e20bbc7c2c:src/components/navbar/Navbar.js

function Navbar() {
  const [state, setState] = useState("");
  const navigate = useNavigate();

  function handleDiscover(event) {
    setState(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

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
          <ul id="nav-list" className="navbar-nav m-auto">
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
          <form
            type="search"
            placeholder="Search"
            onSubmit={handleSubmit}
            autocomplete="off"
          >
            <FormControlSearch onChange={handleDiscover} value={state} />

            <button
              className="btn btn-search"
              type="submit"
              onClick={() => navigate(`/search/${state}`)}
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
