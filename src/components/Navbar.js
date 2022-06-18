import { Link } from "react-router-dom";
import "../assets/styles/index.css";

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar fixed-top d-block p-0 navbar-dark">
        <div className="topbar">
          <p className="mb-0 topbar-text">
            <strong>signup and create your personal skincare calendar!</strong>
          </p>
        </div>
        <div className="container-fluid d-flex justify-content-around">
          <Link className="navbar-brand nav-font text-dark" to="/">
            Beauty4Me
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0 ml-5">
              <li className="nav-item ml-5">
                <Link className="nav-link active text-dark" to="/signup">
                  Sign up
                </Link>
              </li>
              <li className="nav-item ml-5">
                <Link className="nav-link text-dark" to="/login">
                  Login
                </Link>
              </li>
            </ul>
            <form className="d-flex ml-5 mt-2" role="search">
              <input
                className="form-control me-2 search-input"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-search" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
