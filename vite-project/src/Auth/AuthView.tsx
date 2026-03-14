import { useState } from "react";
import { Button, Col, Container, Form, Row, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

type LoginProps = {
    actualizaLogin: (login: boolean, loginData: any) => void;
};

function Login({ actualizaLogin }: LoginProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        axios
            .post(
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAum3KKBT-55JShHDdVT5qXq4j0xEFqrmU",
                authData
            )
            .then((response) => {
                console.log(response);
                actualizaLogin(true, response.data);
                navigate("/");
            })
            .catch((error) => {
                console.error(error);
            });
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
                                <Button type="submit" style={{ width: "100%" }}>
                                    LOGIN
                                </Button>
                            </Col>
                            <Col xs={12}>
                                <Link
                                    to="/register"
                                    style={{
                                        color: "#FCEDFC",
                                        fontWeight: 700,
                                        cursor: "pointer",
                                        textDecoration: "none"
                                    }}
                                >
                                    <Button type="submit" style={{ width: "100%" }}>
                                        REGISTRATE
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