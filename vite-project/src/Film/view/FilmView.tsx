import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FilmCard from "../domain/Film";
import type { Film } from "../domain/Film";
import LocalFilmRepository from "../infrastructure/LocalFilmRespository";

function Catalogo() {
  const [films, setFilms] = useState<Film[]>([]);

  useEffect(() => {
    new LocalFilmRepository().getAll().then(setFilms);
  }, []);

  return (
    <Container
      fluid
      style={{
        minHeight: "100vh",
        backgroundColor: "#0F0610",
        paddingTop: "120px",
        paddingLeft: "24px",
        paddingRight: "24px",
        paddingBottom: "32px"
      }}
    >
      <h2
        style={{
          color: "#FCEDFC",
          fontSize: "2rem",
          fontWeight: 800,
          marginBottom: "24px"
        }}
      >
        CATÁLOGO DE PELÍCULAS
      </h2>

      <Row className="g-4">
        {films.map((film) => (
          <Col key={film.id} xs={12} sm={6} md={4} lg={3} xl={3}>
            <FilmCard film={film} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Catalogo;