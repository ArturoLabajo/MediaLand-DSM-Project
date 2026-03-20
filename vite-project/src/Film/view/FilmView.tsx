import { useEffect, useMemo, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FilmCard from "./components/FilmCard";
import type { Film } from "../domain/Film";
import FilmService from "../service/FilmService";

const typeOptions = [
  { value: "Todos", label: "Todos" },
  { value: "MOVIE", label: "Movie" },
  { value: "SERIES", label: "Serie" }
];

const categoryOptions = [
  { value: "Todas", label: "Todas" },
  { value: "Romance", label: "Romance" },
  { value: "Sci-Fi", label: "Sci-Fi" },
  { value: "Thriller", label: "Thriller" },
  { value: "Action", label: "Action" },
  { value: "Drama", label: "Drama" },
  { value: "Comedy", label: "Comedy" },
  { value: "Family", label: "Family" },
  { value: "Terror", label: "Terror" },
  { value: "Documentary", label: "Documentary" }
];

type CustomSelectProps = {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
};

function CustomSelect({ label, value, options, onChange }: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <Form.Group>
      <Form.Label style={{ color: "#FCEDFC", fontWeight: 600 }}>
        {label}
      </Form.Label>

      <div ref={wrapperRef} style={{ position: "relative" }}>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          style={{
            width: "100%",
            backgroundColor: "rgba(252, 237, 252, 0.08)",
            border: "1px solid rgba(252, 237, 252, 0.14)",
            color: "#FCEDFC",
            borderRadius: "14px",
            boxShadow: "none",
            padding: "12px 16px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            backdropFilter: "blur(6px)"
          }}
        >
          <span>{selectedOption?.label ?? value}</span>
          <span
            style={{
              fontSize: "0.9rem",
              opacity: 0.75,
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease"
            }}
          >
            ▼
          </span>
        </button>

        {open && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              left: 0,
              width: "100%",
              background: "linear-gradient(180deg, #241122 0%, #140812 100%)",
              border: "1px solid rgba(252,237,252,0.12)",
              borderRadius: "16px",
              overflow: "hidden",
              zIndex: 1000,
              boxShadow: "0 10px 30px rgba(0,0,0,0.35)"
            }}
          >
            {options.map((option) => {
              const isSelected = value === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "12px 16px",
                    cursor: "pointer",
                    color: isSelected ? "#1A0317" : "rgba(252,237,252,0.88)",
                    backgroundColor: isSelected ? "#FCEDFC" : "transparent",
                    border: "none",
                    fontWeight: isSelected ? 700 : 500,
                    transition: "background-color 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor =
                        "rgba(252,237,252,0.08)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </Form.Group>
  );
}

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
          <CustomSelect
            label="Filtrar por tipo"
            value={selectedType}
            options={typeOptions}
            onChange={setSelectedType}
          />
        </Col>

        <Col xs={12} md={6}>
          <CustomSelect
            label="Filtrar por categoría"
            value={selectedCategory}
            options={categoryOptions}
            onChange={setSelectedCategory}
          />
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