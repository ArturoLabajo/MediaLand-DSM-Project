import { Container, Row, Col, Card } from "react-bootstrap";

function Legal() {
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
        <Col lg={9} xl={8}>
          <Card
            style={{
              background: "linear-gradient(180deg, #241122 0%, #140812 100%)",
              border: "1px solid rgba(252, 237, 252, 0.12)",
              borderRadius: "24px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
              overflow: "hidden"
            }}
          >
            <Card.Body style={{ padding: "32px" }}>
              <h1
                style={{
                  fontWeight: 800,
                  marginBottom: "10px",
                  color: "#FCEDFC"
                }}
              >
                Información legal
              </h1>

              <p
                style={{
                  color: "rgba(252,237,252,0.8)",
                  marginBottom: "28px",
                  lineHeight: 1.7
                }}
              >
                En esta sección se recoge la información general relativa al uso
                de la plataforma, así como los derechos y obligaciones de las
                personas usuarias que acceden a sus contenidos y servicios.
              </p>

              <div style={{ marginBottom: "28px" }}>
                <h4 style={{ color: "#FCEDFC", marginBottom: "12px", fontWeight: 700 }}>
                  1. Titularidad del sitio web
                </h4>
                <p style={{ color: "rgba(252,237,252,0.8)", lineHeight: 1.7, marginBottom: 0 }}>
                  Esta plataforma es gestionada por <strong>Streamland Entertainment S.L.</strong>,
                  con domicilio social ficticio en Calle del Cine 25, 28000 Madrid, España,
                  y correo electrónico de contacto <strong>legal@streamland.com</strong>.
                </p>
              </div>

              <div style={{ marginBottom: "28px" }}>
                <h4 style={{ color: "#FCEDFC", marginBottom: "12px", fontWeight: 700 }}>
                  2. Condiciones de uso
                </h4>
                <p style={{ color: "rgba(252,237,252,0.8)", lineHeight: 1.7, marginBottom: 0 }}>
                  El acceso y navegación por esta web implica la aceptación de las presentes
                  condiciones de uso. La persona usuaria se compromete a utilizar el sitio
                  de forma lícita, respetando la legislación vigente, la buena fe y el orden público.
                </p>
              </div>

              <div style={{ marginBottom: "28px" }}>
                <h4 style={{ color: "#FCEDFC", marginBottom: "12px", fontWeight: 700 }}>
                  3. Propiedad intelectual
                </h4>
                <p style={{ color: "rgba(252,237,252,0.8)", lineHeight: 1.7, marginBottom: 0 }}>
                  Todos los contenidos, diseños, textos, imágenes, logotipos, interfaces y demás
                  elementos de la plataforma pertenecen a sus respectivos titulares y están protegidos
                  por la normativa de propiedad intelectual e industrial. Queda prohibida su reproducción,
                  distribución o transformación sin autorización expresa.
                </p>
              </div>

              <div style={{ marginBottom: "28px" }}>
                <h4 style={{ color: "#FCEDFC", marginBottom: "12px", fontWeight: 700 }}>
                  4. Responsabilidad
                </h4>
                <p style={{ color: "rgba(252,237,252,0.8)", lineHeight: 1.7, marginBottom: 0 }}>
                  Streamland no garantiza la disponibilidad continua del servicio ni la ausencia
                  de errores en los contenidos, aunque se compromete a realizar todos los esfuerzos
                  razonables para mantener la plataforma actualizada y en correcto funcionamiento.
                </p>
              </div>

              <div style={{ marginBottom: "28px" }}>
                <h4 style={{ color: "#FCEDFC", marginBottom: "12px", fontWeight: 700 }}>
                  5. Protección de datos
                </h4>
                <p style={{ color: "rgba(252,237,252,0.8)", lineHeight: 1.7, marginBottom: 0 }}>
                  Los datos personales facilitados por las personas usuarias serán tratados de forma
                  confidencial y utilizados exclusivamente para la gestión de la cuenta, la atención
                  de consultas y la mejora de la experiencia en la plataforma, conforme a la normativa
                  aplicable en materia de protección de datos.
                </p>
              </div>

              <div style={{ marginBottom: "28px" }}>
                <h4 style={{ color: "#FCEDFC", marginBottom: "12px", fontWeight: 700 }}>
                  6. Cookies
                </h4>
                <p style={{ color: "rgba(252,237,252,0.8)", lineHeight: 1.7, marginBottom: 0 }}>
                  Esta web puede utilizar cookies técnicas y analíticas con la finalidad de mejorar
                  el rendimiento, recordar preferencias de navegación y ofrecer una experiencia más
                  personalizada. La persona usuaria puede configurar su navegador para aceptar o rechazar
                  dichas cookies.
                </p>
              </div>

              <div
                style={{
                  marginTop: "32px",
                  paddingTop: "24px",
                  borderTop: "1px solid rgba(252,237,252,0.1)"
                }}
              >
                <h5 style={{ marginBottom: "12px", color: "#FCEDFC" }}>
                  Información de contacto legal
                </h5>

                <p style={{ margin: 0, color: "rgba(252,237,252,0.8)" }}>
                  📧 legal@streamland.com
                </p>

                <p style={{ margin: 0, color: "rgba(252,237,252,0.8)" }}>
                  📍 Calle del Cine 25, Madrid, España
                </p>

                <p style={{ marginTop: "8px", color: "rgba(252,237,252,0.6)" }}>
                  Última actualización: septiembre de 2025.
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Legal;