import { Button, Col, Container, Form, Row } from "react-bootstrap";

function Login() {
    return (
        <Container
            fluid
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "90px", // para que no choque con el header fijo
                backgroundColor: "#FCEDFC"
            }}
        >
            <Form
                style={{
                    width: "100%",
                    maxWidth: "700px"
                }}
            >
                <Row className="g-3 align-items-end justify-content-center">
                    <Col md={5}>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" />
                    </Col>

                    <Col md={5}>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" />
                    </Col>

                    <Col md="auto">
                        <Button variant="primary">LOGIN</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default Login;