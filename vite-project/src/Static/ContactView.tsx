import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

function Contact() {
  return (
    <Container
      fluid
      style={{
        minHeight: "100vh",
        backgroundColor: "#0F0610",
        paddingTop: "120px",
        paddingLeft: "24px",
        paddingRight: "24px",
        paddingBottom: "40px",
        color: "#FCEDFC"
      }}
    >
      <Row className="justify-content-center">
        <Col lg={8} xl={7}>
          <Card
            style={{
              background: "linear-gradient(180deg, #241122 0%, #140812 100%)",
              border: "1px solid rgba(252, 237, 252, 0.12)",
              borderRadius: "24px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
              overflow: "hidden"
            }}
          >
            <Card.Body style={{ padding: "32px"}}>
              <h1
                style={{
                  fontWeight: 800,
                  marginBottom: "10px",
                  color: "#FCEDFC"
                }}
              >
                Contacto
              </h1>

              <p
                style={{
                  color: "rgba(252,237,252,0.8)",
                  marginBottom: "28px"
                }}
              >
                ¿Tienes algún problema, sugerencia o simplemente quieres hablar
                sobre cine? Escríbenos y nuestro equipo te responderá lo antes
                posible.
              </p>

              <Form>
                <Row className="g-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label style={{color: "#FCEDFC"}}>Nombre</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Tu nombre"
                        style={{
                          backgroundColor: "rgba(252,237,252,0.08)",
                          border: "1px solid rgba(252,237,252,0.15)",
                          color: "#FCEDFC",
                          borderRadius: "12px",
                          padding: "12px"
                        }}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label style={{color: "#FCEDFC"}}>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="tu@email.com"
                        style={{
                          backgroundColor: "rgba(252,237,252,0.08)",
                          border: "1px solid rgba(252,237,252,0.15)",
                          color: "#FCEDFC",
                          borderRadius: "12px",
                          padding: "12px"
                        }}
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={12}>
                    <Form.Group>
                      <Form.Label style={{color: "#FCEDFC"}}>Mensaje</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Escribe tu mensaje..."
                        style={{
                          backgroundColor: "rgba(252,237,252,0.08)",
                          border: "1px solid rgba(252,237,252,0.15)",
                          color: "#FCEDFC",
                          borderRadius: "12px",
                          padding: "12px"
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
                        padding: "12px",
                        backgroundColor: "#FCEDFC",
                        color: "#1A0317",
                        fontWeight: 700
                      }}
                    >
                      Enviar mensaje
                    </Button>
                  </Col>
                </Row>
              </Form>

              <div
                style={{
                  marginTop: "32px",
                  paddingTop: "24px",
                  borderTop: "1px solid rgba(252,237,252,0.1)"
                }}
              >
                <h5 style={{ marginBottom: "12px", color: "#FCEDFC" }}>Soporte</h5>

                <p style={{ margin: 0, color: "rgba(252,237,252,0.8)" }}>
                  📧 soporte@streamland.com
                </p>

                <p style={{ margin: 0, color: "rgba(252,237,252,0.8)" }}>
                  ☎ +34 900 123 456
                </p>

                <p style={{ marginTop: "8px", color: "rgba(252,237,252,0.6)" }}>
                  Nuestro equipo responde normalmente en menos de 24 horas.
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;