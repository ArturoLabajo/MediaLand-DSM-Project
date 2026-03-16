import { useEffect, useMemo, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FilmCard from "../domain/Film";
import type { Film } from "../domain/Film";
import FilmService from "../service/FilmService";

function Catalogo() {
  const [films, setFilms] = useState<Film[]>([]);
  const [selectedType, setSelectedType] = useState("Todos");
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  useEffect(() => {
    FilmService.getAll().then(setFilms);
  }, []);
  

  const filteredFilms = useMemo(() => {
    return films.filter((film) => {
      const matchesType =
        selectedType === "Todos" || film.type === selectedType;

      const matchesCategory =
        selectedCategory === "Todas" || film.category === selectedCategory;

      return matchesType && matchesCategory;
    });
  }, [films, selectedType, selectedCategory]);

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
        CATÁLOGO DISPONIBLE
      </h2>

      <Row className="g-3" style={{ marginBottom: "24px" }}>
        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label style={{ color: "#FCEDFC", fontWeight: 600 }}>
              Filtrar por tipo
            </Form.Label>
            <Form.Select
              value={selectedType}
              onChange={(event) => setSelectedType(event.target.value)}
              style={{
                backgroundColor: "rgba(252, 237, 252, 0.08)",
                border: "1px solid rgba(252, 237, 252, 0.14)",
                color: "#FCEDFC",
                borderRadius: "12px",
                boxShadow: "none"
              }}
            >
              <option value="Todos">Todos</option>
              <option value="MOVIE">Movie</option>
              <option value="SERIES">Serie</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label style={{ color: "#FCEDFC", fontWeight: 600 }}>
              Filtrar por categoría
            </Form.Label>
            <Form.Select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              style={{
                backgroundColor: "rgba(252, 237, 252, 0.08)",
                border: "1px solid rgba(252, 237, 252, 0.14)",
                color: "#FCEDFC",
                borderRadius: "12px",
                boxShadow: "none"
              }}
            >
              <option value="Todas">Todas</option>
              <option value="Romance">Romance</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Thriller">Thriller</option>
              <option value="Action">Action</option>
              <option value="Drama">Drama</option>
              <option value="Comedy">Comedy</option>
              <option value="Family">Family</option>
              <option value="Terror">Terror</option>
              <option value="Documentary">Documentary</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row className="g-4">
        {filteredFilms.map((film) => (
          <Col key={film.id} xs={12} sm={6} md={4} lg={3} xl={3}>
            <FilmCard film={film} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Catalogo;