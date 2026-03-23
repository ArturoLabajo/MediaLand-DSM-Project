import { useState } from "react";
import { Button, Col, Container, Form, Row, Card, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

// Props del componente de login
// actualizaLogin: funcion que actualiza el estado de sesion 
type LoginProps = {
    actualizaLogin: (login: boolean, loginData: any) => void;
};

function Login({ actualizaLogin }: LoginProps) {
    // Estados del formulario
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Estado para mostrar errores
    const [errorMsg, setErrorMsg] = useState("");

    // Hook para navegar entre rutas
    const navigate = useNavigate();

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMsg("");

        const authData = {
            email,
            password,
            returnSecureToken: true
        };

        try {

            // Peticion login a Firebase
            const response = await axios.post(
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAum3KKBT-55JShHDdVT5qXq4j0xEFqrmU",
                authData
            );

            // Petición a la base de datos para recuperar datos del usuario
            const usersResponse = await axios.get(
                "https://medialand-ra-default-rtdb.europe-west1.firebasedatabase.app/users.json"
            );

            // Valores por defecto
            let userName = response.data.email.split("@")[0];
            let perfil = "/user1.jpg";

            // Si existe el ususario en la bbdd buscamos la coincidencia con el email
            if (usersResponse.data) {
                for (const key in usersResponse.data) {
                    const user = usersResponse.data[key];

                    if (user?.email === response.data.email) {
                        userName = user.name;
                        perfil = user.perfil;
                        break;
                    }
                }
            }

            // Objeto de sesion
            const loginData = {
                ...response.data,
                userName,
                perfil
            };

            // Actualizamos el estado de login
            actualizaLogin(true, loginData);

            //Redirigimos al home
            navigate("/");

        } catch (error: any) {
            // Mensaje de error del Firebase
            const firebaseError = error?.response?.data?.error?.message;

            // Mostramos el mensaje de forma entendible
            if (firebaseError === "INVALID_LOGIN_CREDENTIALS") {
                setErrorMsg("Email o contraseña incorrectos.");
            } else if (firebaseError === "EMAIL_NOT_FOUND") {
                setErrorMsg("Ese email no existe.");
            } else if (firebaseError === "INVALID_PASSWORD") {
                setErrorMsg("La contraseña es incorrecta.");
            } else {
                setErrorMsg("Ha ocurrido un error al iniciar sesión.");
            }

            console.error(error);
        }
    };

    return (
        <Container
            fluid
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "90px",
                paddingLeft: "24px",
                paddingRight: "24px",
                background:
                    "radial-gradient(circle at top, rgba(74, 31, 69, 0.35) 0%, rgba(15, 6, 16, 1) 45%, rgba(15, 6, 16, 1) 100%)"
            }}
        >
            <Card
                style={{
                    width: "100%",
                    maxWidth: "520px",
                    background: "linear-gradient(180deg, #241122 0%, #140812 100%)",
                    border: "1px solid rgba(252, 237, 252, 0.12)",
                    borderRadius: "24px",
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.35)",
                    overflow: "hidden",
                    color: "#FCEDFC"
                }}
            >
                <div
                    style={{
                        padding: "32px 32px 12px 32px",
                        textAlign: "center"
                    }}
                >
                    <h1
                        style={{
                            margin: 0,
                            fontSize: "2rem",
                            fontWeight: 800,
                            color: "#FCEDFC"
                        }}
                    >
                        Iniciar sesión
                    </h1>

                    <p
                        style={{
                            marginTop: "10px",
                            marginBottom: "0",
                            color: "rgba(252, 237, 252, 0.75)",
                            fontSize: "0.98rem"
                        }}
                    >
                        Accede a tu cuenta para guardar favoritos y continuar viendo contenido.
                    </p>
                </div>

                <Card.Body style={{ padding: "24px 32px 32px 32px" }}>
                    <Form onSubmit={submitHandler}>
                        <Row className="g-4">
                            <Col xs={12}>
                                {errorMsg && (
                                    <Alert variant="danger">
                                        {errorMsg}
                                    </Alert>
                                )}
                            </Col>

                            <Col xs={12}>
                                <Form.Group>
                                    <Form.Label
                                        style={{
                                            color: "#FCEDFC",
                                            fontWeight: 600,
                                            marginBottom: "8px"
                                        }}
                                    >
                                        Email
                                    </Form.Label>

                                    <Form.Control
                                        onChange={(event) => setEmail(event.target.value)}
                                        type="email"
                                        value={email}
                                        placeholder="Introduce tu email"
                                    />
                                </Form.Group>
                            </Col>

                            <Col xs={12}>
                                <Form.Group>
                                    <Form.Label
                                        style={{
                                            color: "#FCEDFC",
                                            fontWeight: 600,
                                            marginBottom: "8px"
                                        }}
                                    >
                                        Contraseña
                                    </Form.Label>

                                    <Form.Control
                                        onChange={(event) => setPassword(event.target.value)}
                                        type="password"
                                        value={password}
                                        placeholder="Introduce tu contraseña"
                                    />
                                </Form.Group>
                            </Col>

                            <Col xs={12}>
                                <Button
                                    type="submit"
                                    style={{
                                        width: "100%",
                                        border: "none",
                                        borderRadius: "14px",
                                        padding: "14px",
                                        backgroundColor: "#FCEDFC",
                                        color: "#1A0317",
                                        fontWeight: 800,
                                        fontSize: "1rem",
                                        letterSpacing: "0.5px",
                                        boxShadow: "0 6px 18px rgba(252,237,252,0.2)"
                                    }}
                                >
                                    Iniciar sesión
                                </Button>
                            </Col>

                            <Col xs={12}>
                                <Link to="/register" style={{ textDecoration: "none" }}>
                                    <Button
                                        style={{
                                            width: "100%",
                                            borderRadius: "14px",
                                            padding: "14px",
                                            backgroundColor: "transparent",
                                            border: "1px solid rgba(252,237,252,0.35)",
                                            color: "#FCEDFC",
                                            fontWeight: 700,
                                            fontSize: "0.95rem"
                                        }}
                                    >
                                        Crear cuenta
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Login;