import { Button, Col, Container, Form, Row } from "react-bootstrap"

function Legal(){
    return(
        <>
            <Form className="mt-5">
                <Container>
                    <Row>
                        <Col>
                            <Form.Label> Email: </Form.Label>
                            <Form.Control type='email' />
                        </Col>

                        <Col>
                            <Form.Label> Password: </Form.Label>
                            <Form.Control type='password' />
                        </Col>
                        <Col>
                            <Button variant='primary'>LOGIN</Button>  
                        </Col>
                    </Row>
                </Container>
            </Form>
        </>
    );
}
export default Legal;