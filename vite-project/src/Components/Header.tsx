import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import logo from "../img/logo_001.png";
import SidebarButton from "../Components/SidebarButton.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// props del componente Header
type HeaderProps = {
    session: boolean;
    onLogout: () => void;
    userName?: string | null;
    perfil?: string | null;
};

function Header({ session, onLogout, userName, perfil }: HeaderProps) {
    //Estilo general de la barra superior fija
    const navbarStyle = {
        position: "fixed" as const,
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1050,
        background: "transparent",
        boxShadow: "none",
        padding: "16px 24px"
    };

    // Contenedor principal de la cabecera
    const containerStyle = {
        position: "relative" as const,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%"
    };

    // Estilo del boton que abre el menu lateral
    const toggleStyle = {
        width: "42px",
        height: "42px",
        backgroundColor: "rgba(252, 237, 252, 0.85)",
        borderRadius: "20px",
        padding: "0",
        outline: "none",
        boxShadow: "none",
        border: "1px solid rgba(26, 3, 23, 0.08)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    };

    // Mostrar el perfil si se cumplen que hay sesion, existe nombre e imagen
    const centerProfile = session && userName && perfil;

    console.log({ session, userName, perfil });
    return (
        <Nav className="navbar navbar-light fixed-top" style={navbarStyle}>
            <div className="container-fluid" style={containerStyle}>
                
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasDarkNavbar"
                    aria-controls="offcanvasDarkNavbar"
                    style={toggleStyle}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {centerProfile && (
                    <div
                        style={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            background: "rgba(26, 3, 23, 0.45)",
                            padding: "8px 14px",
                            borderRadius: "999px",
                            border: "1px solid rgba(252, 237, 252, 0.18)",
                            backdropFilter: "blur(8px)"
                        }}
                    >
                        <img
                            src={perfil}
                            alt="Perfil"
                            style={{
                                width: "38px",
                                height: "38px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                border: "2px solid #FCEDFC",
                                display: "block"
                            }}
                        />

                        <span
                            style={{
                                color: "#FCEDFC",
                                fontWeight: 700,
                                fontSize: "0.95rem",
                                lineHeight: 1
                            }}
                        >
                            {userName}
                        </span>
                    </div>
                )}

                <Link to="/" className="navbar-brand" style={{ margin: 0 }}>
                    <img src={logo} alt="logo empresa" width="120" height="100" />
                </Link>

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
                        <Link to="/" className="navbar-brand">
                            <img src={logo} alt="logo empresa" width="120" height="100" />
                        </Link>

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
                                cursor: "pointer",
                                border: "none"
                            }}
                        >
                            ✕
                        </button>
                    </div>

                    <div
                        className="offcanvas-body"
                        style={{
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >
                        <Nav.Link as={Link} to="/" style={{ padding: 0, width: "100%" }}>
                            <SidebarButton id="home" label="Home" />
                        </Nav.Link>

                        <Nav.Link as={Link} to="/catalogo" style={{ padding: 0, width: "100%" }}>
                            <SidebarButton id="catalogo" label="Catálogo" />
                        </Nav.Link>

                        {!session ? (
                            <Nav.Link as={Link} to="/login" style={{ padding: 0, width: "100%" }}>
                                <SidebarButton id="login" label="Iniciar Sesión" />
                            </Nav.Link>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/favorites" style={{ padding: 0, width: "100%" }}>
                                    <SidebarButton id="favorite" label="Favoritos" />
                                </Nav.Link>

                                <div
                                    onClick={onLogout}
                                    style={{ width: "100%", cursor: "pointer" }}
                                >
                                    <SidebarButton id="logout" label="Cerrar sesión" />
                                </div>
                            </>
                        )}

                        <div style={{ marginTop: "auto" }}>
                            <Nav.Link as={Link} to="/legal" style={{ padding: 0, width: "100%" }}>
                                <SidebarButton id="legal" label="Aviso Legal" />
                            </Nav.Link>

                            <Nav.Link as={Link} to="/contacto" style={{ padding: 0, width: "100%" }}>
                                <SidebarButton id="contacto" label="Contacto" />
                            </Nav.Link>
                        </div>
                    </div>
                </div>
            </div>
        </Nav>
    );
}

export default Header;