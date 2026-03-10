
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";
import logo from "../img/logo_001.png";
import SidebarButton from '../Components/SidebarButton.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

type HeaderProps = {
    session: boolean;
};

function Header({session}: HeaderProps) {
    if (!session){
        return(
            <Nav
            className="navbar navbar-light fixed-top"
            >
            <div className="container-fluid">

                <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasDarkNavbar"
                aria-controls="offcanvasDarkNavbar"
                style={{
                    width: "42px",
                    height: "42px",
                    backgroundColor: "#FCEDFC",
                    borderRadius: "20px",
                    padding: "0",
                    outline: "none",
                    boxShadow: "none",
                    backdropFilter: "blur(4px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
                >
                <span
                    className="navbar-toggler-icon"
                ></span>
                </button>

                <a className="navbar-brand" href="#">
                <img src={logo} alt="logo empresa" width="120" height="100" />
                </a>

                <div
                className="offcanvas offcanvas-start"
                tabIndex={-1}
                id="offcanvasDarkNavbar"
                style={{
                    backgroundColor: "#1A0317"
                }}
                >
                <div
                    className="offcanvas-header"
                    style={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                    }}
                >
                    <a className="navbar-brand" href="#">
                    <img src={logo} alt="logo empresa" width="120" height="100" />
                    </a>

                    <button
                    type="button"
                    data-bs-dismiss="offcanvas"
                    aria-label="Cerrar"
                    style={{
                        position: "absolute",
                        right: "0",
                        top: "50%",
                        transform: "translate(50%, -50%)",
                        backgroundColor: "#1A0317",
                        color: "#FCEDFC",
                        borderRadius: "20px",
                        width: "42px",
                        height: "42px",
                        fontSize: "22px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0",
                        outline: "none",
                        boxShadow: "none",
                        cursor: "pointer"
                    }}
                    >
                    ✕
                    </button>
                </div>

                <div 
                    className="offcanvas-body"
                    style={{
                    display: "flex",
                    flexDirection: "column"}}
                >
                
                    <Nav.Link as={Link} to="/" style={{ padding: 0, width: "100%" }}>
                        <SidebarButton
                        id="home"
                        label="Home"
                        />
                    </Nav.Link>

                    <Nav.Link as={Link} to="/catalogo" style={{ padding: 0, width: "100%" }}>
                        <SidebarButton
                        id="catalogo"
                        label="Catálogo"
                        />
                    </Nav.Link>

                    <SidebarButton
                    id="login"
                    label="Iniciar Sesión"
                    />

                    <div style={{marginTop: "auto"}} >
                        <Nav.Link as={Link} to="/legal" style={{ padding: 0, width: "100%" }}>
                            <SidebarButton
                            id="legal"
                            label="Aviso Legal"
                        />
                        </Nav.Link>

                        <Nav.Link as={Link} to="/contacto" style={{ padding: 0, width: "100%" }}>
                            <SidebarButton
                            id="contacto"
                            label="Contacto"
                            />
                        </Nav.Link>
                    </div>

                </div>
                </div>
            </div>
        </Nav>
        );
    }
}
export default Header