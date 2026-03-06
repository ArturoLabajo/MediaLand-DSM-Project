import { Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from "../img/logo_001.png";

function Sidebar() {
  return (
    <Nav
      className="navbar navbar-light fixed-top"
      style={{ backgroundColor: "#2E092E" }}
    >
      <div className="container-fluid">

        <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
            style={{
                backgroundColor: "rgba(252, 237, 252, 0.3)",
                border: "2px solid #2E092E",
                borderRadius: "12px",
                padding: "10px",
                outline: "none",
                boxShadow: "none"
            }}
            >
            <span className="navbar-toggler-icon"></span>
        </button>

        <a className="navbar-brand" href="#">
          <img src={logo} alt="logo empresa" width="50" height="40" />
        </a>

        <div
          className="offcanvas offcanvas-start text-bg-dark"
          tabIndex={-1}
          id="offcanvasDarkNavbar"
        >
          <div className="offcanvas-header">
            <a className="navbar-brand" href="#">
              <img src={logo} alt="logo empresa" width="50" height="40" />
            </a>

            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>

          <div className="offcanvas-body">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Películas</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Favoritos</a>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </Nav>
  );
}

export default Sidebar;