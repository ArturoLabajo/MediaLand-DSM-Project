import { useState } from "react";
import { Button, Col, Container, Form, Row, Card } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    // Estados del form de registro
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Imagen de perfil seleccionada por el user
    const [perfil, setPerfil] = useState("/user1.jpg");

    // Estado para mostrar errores
    const [errorMessage, setErrorMessage] = useState("");

    // Hook para redirección
    const navigate = useNavigate();

    // Lista de imagenes para los usuarios 
    const perfilesDisponibles = [
        "/user1.jpg",
        "/user2.jpg",
        "/user3.jpg",
        "/user4.jpg",
        "/user5.jpg",
        "/user6.jpg"
    ];

    // Envio del formulario de registro
    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage("");

        // Datos necesarios para registrar el user en Firebase
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        try {
            // Registro del usuario en Firebase
            const authResponse = await axios.post(
                "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAum3KKBT-55JShHDdVT5qXq4j0xEFqrmU",
                authData
            );

            // Token para poder escribire en la bbdd
            const token = authResponse.data.idToken;

            // Recogemos los usuarios existentes para calcular el id
            const usersResponse = await axios.get(
                `https://medialand-ra-default-rtdb.europe-west1.firebasedatabase.app/users.json?auth=${token}`
            );

            const users = usersResponse.data;

            // Si existen usuarios se coge el id mas alto +1
            // Si no existen usuarios se empiza por 0
            const newUserId = users
                ? Math.max(...Object.keys(users).map(Number)) + 1
                : 0;

            // Guardamos la info en la bbdd
            await axios.put(
                `https://medialand-ra-default-rtdb.europe-west1.firebasedatabase.app/users/${newUserId}.json?auth=${token}`,
                {
                    name: name,
                    email: email,
                    perfil: perfil
                }
            );

            // Redirigimos al login
            navigate("/login");
 
        } catch (error: any) {
            console.error("ERROR COMPLETO:", error);
            console.error("ERROR RESPONSE:", error.response);
            console.error("ERROR DATA:", error.response?.data);

            // Error de Firebase
            const firebaseError = error.response?.data?.error?.message;

            // Mensajes de error para el usuario
            if (firebaseError === "EMAIL_EXISTS") {
                setErrorMessage("Ese email ya está registrado");
            } else if (firebaseError === "WEAK_PASSWORD") {
                setErrorMessage("La contraseña debe tener al menos 6 caracteres");
            } else {
                setErrorMessage("No se pudo registrar el usuario");
            }
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
                        Registrarse
                    </h1>

                    <p
                        style={{
                            marginTop: "10px",
                            marginBottom: "0",
                            color: "rgba(252, 237, 252, 0.75)",
                            fontSize: "0.98rem"
                        }}
                    >
                        Crea tu cuenta para comentar, puntuar y guardar favoritos.
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
                                        Username
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                        placeholder="Introduce tu nombre"
                                        required
                                        style={{
                                            backgroundColor: "rgba(252, 237, 252, 0.08)",
                                            border: "1px solid rgba(252, 237, 252, 0.14)",
                                            color: "#FCEDFC",
                                            borderRadius: "14px",
                                            padding: "14px 16px",
                                            boxShadow: "none"
                                        }}
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
                                        Email
                                    </Form.Label>

                                    <Form.Control
                                        type="email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        placeholder="Introduce tu email"
                                        required
                                        style={{
                                            backgroundColor: "rgba(252, 237, 252, 0.08)",
                                            border: "1px solid rgba(252, 237, 252, 0.14)",
                                            color: "#FCEDFC",
                                            borderRadius: "14px",
                                            padding: "14px 16px",
                                            boxShadow: "none"
                                        }}
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
                                        type="password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        placeholder="Introduce tu contraseña"
                                        required
                                        style={{
                                            backgroundColor: "rgba(252, 237, 252, 0.08)",
                                            border: "1px solid rgba(252, 237, 252, 0.14)",
                                            color: "#FCEDFC",
                                            borderRadius: "14px",
                                            padding: "14px 16px",
                                            boxShadow: "none"
                                        }}
                                    />
                                </Form.Group>
                            </Col>

                            <Col xs={12}>
                                <Form.Group>
                                    <Form.Label
                                        style={{
                                            color: "#FCEDFC",
                                            fontWeight: 600,
                                            marginBottom: "12px"
                                        }}
                                    >
                                        Elige tu foto de perfil
                                    </Form.Label>

                                    <div
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns: "repeat(3, 1fr)",
                                            gap: "14px"
                                        }}
                                    >
                                        {perfilesDisponibles.map((foto) => {
                                            const seleccionada = perfil === foto;

                                            return (
                                                <button
                                                    key={foto}
                                                    type="button"
                                                    onClick={() => setPerfil(foto)}
                                                    style={{
                                                        background: "transparent",
                                                        border: seleccionada
                                                            ? "2px solid #FCEDFC"
                                                            : "2px solid rgba(252, 237, 252, 0.12)",
                                                        borderRadius: "18px",
                                                        padding: "8px",
                                                        cursor: "pointer",
                                                        transition: "all 0.2s ease",
                                                        boxShadow: seleccionada
                                                            ? "0 0 0 4px rgba(252, 237, 252, 0.10)"
                                                            : "none"
                                                    }}
                                                >
                                                    <img
                                                        src={foto}
                                                        alt={`Avatar ${foto}`}
                                                        style={{
                                                            width: "100%",
                                                            aspectRatio: "1 / 1",
                                                            objectFit: "cover",
                                                            borderRadius: "14px",
                                                            display: "block"
                                                        }}
                                                    />
                                                </button>
                                            );
                                        })}
                                    </div>
                                </Form.Group>
                            </Col>

                            {errorMessage && (
                                <Col xs={12}>
                                    <div
                                        style={{
                                            color: "#ffb3b3",
                                            textAlign: "center",
                                            fontWeight: 600
                                        }}
                                    >
                                        {errorMessage}
                                    </div>
                                </Col>
                            )}

                            <Col xs={12}>
                                <Button
                                    type="submit"
                                    style={{
                                        width: "100%",
                                        border: "none",
                                        borderRadius: "14px",
                                        padding: "14px 16px",
                                        backgroundColor: "#FCEDFC",
                                        color: "#1A0317",
                                        fontWeight: 800,
                                        fontSize: "1rem",
                                        letterSpacing: "0.4px"
                                    }}
                                >
                                    REGISTRARSE
                                </Button>
                            </Col>
                        </Row>
                    </Form>

                    <div
                        style={{
                            marginTop: "22px",
                            textAlign: "center",
                            color: "rgba(252, 237, 252, 0.72)",
                            fontSize: "0.95rem"
                        }}
                    >
                        ¿Ya tienes cuenta?{" "}
                        <Link
                            to="/login"
                            style={{
                                color: "#FCEDFC",
                                fontWeight: 700,
                                textDecoration: "none"
                            }}
                        >
                            Inicia sesión
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Register;