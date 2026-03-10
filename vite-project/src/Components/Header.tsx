import { Nav } from "react-bootstrap";
import logo from "../img/logo_001.png";
import SidebarButton from '../Components/SidebarButton.js'

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

                    <SidebarButton
                    id="home"
                    label="Home"
                    />

                    <SidebarButton
                    id="catalogo"
                    label="Catálogo"
                    />

                    <SidebarButton
                    id="login"
                    label="Iniciar Sesión"
                    />

                    <div style={{marginTop: "auto"}}>
                        <SidebarButton
                        id="legal"
                        label="Aviso Legal"
                        />

                        <SidebarButton
                        id="contacto"
                        label="Contacto"
                        />
                    </div>

                </div>
                </div>
            </div>
        </Nav>
        );
    }else{
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

            <div className="offcanvas-body">

                <SidebarButton
                id="home"
                label="Home"
                />

                <SidebarButton
                id="catalogo"
                label="Catálogo"
                />

                <SidebarButton
                id="favoritos"
                label="Favoritos"
                />

                <SidebarButton
                id="logout"
                label="Cerrar Sesión"
                />
                <div style={{marginTop: "auto"}}>
                    <SidebarButton
                    id="legal"
                    label="Aviso Legal"
                    />

                    <SidebarButton
                    id="contacto"
                    label="Contacto"
                    />
                </div>
                

            </div>
            </div>
        </div>
        </Nav>
        );
    }
}
export default Header