import { Link } from "react-router-dom";
import "../assets/styles/index.css";

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top">
        <div className="container-fluid d-flex justify-content-around">
          <Link className="navbar-brand" to="/">
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
                <Link className="nav-link active" to="/signup">
                  Sign up
                </Link>
              </li>
              <li className="nav-item ml-5">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </ul>
            <form className="d-flex ml-5" role="search">
              <input
                className="form-control me-2"
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
    // <div className="d-flex h-100 text-center text-white bg-dark">
    //   <div className="d-flex w-100 h-100 p-3 mx-auto flex-column">
    //     <header className="mb-auto">
    //       <img
    //         src={logo1}
    //         alt="icon-logo-Mono"
    //         width="30"
    //         height="30"
    //         className="img-fluid float-md-start text-center me-2"
    //       />
    //       <h3 className="float-md-start">MusicXpand</h3>
    //       <nav className="nav nav-masthead justify-content-center float-md-end">
    //         <Link className="nav-link" aria-current="page" to="/">
    //           Home
    //         </Link>
    //         <Link className="nav-link" to="/playlist">
    //           Playlists <span className="badge badge-pill">{contador}</span>
    //         </Link>
    //         <Link className="nav-link" to="/aboutus">
    //           About Us
    //         </Link>
    //       </nav>
    //     </header>
    //   </div>
    // </div>
  );
}
export default Navbar;
