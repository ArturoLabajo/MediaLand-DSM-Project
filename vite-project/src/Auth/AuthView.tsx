import { Button, Col, Container, Form, Row, Card } from "react-bootstrap";

function Login() {
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
          <Form>
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
                    type="email"
                    placeholder="Introduce tu email"
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
                    placeholder="Introduce tu contraseña"
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
                <Button
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
                  LOGIN
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
            ¿Aún no tienes cuenta?{" "}
            <span
              style={{
                color: "#FCEDFC",
                fontWeight: 700,
                cursor: "pointer"
              }}
            >
              Regístrate
            </span>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;