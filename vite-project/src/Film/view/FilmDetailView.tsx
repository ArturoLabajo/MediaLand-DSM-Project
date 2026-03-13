import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { useNavigate, useParams } from "react-router-dom";
import type { Film } from "../domain/Film";
import LocalFilmRepository from "../infrastructure/LocalFilmRespository";

function Detalles () {
  const { id } = useParams();
  const navigate = useNavigate();
  const [film, setFilm] = useState<Film | null>(null);
  console.log(film?.title, film?.image);
  useEffect(() => {
    if (!id) return;

    new LocalFilmRepository().getById(id).then((data) => {
      setFilm(data);
    });
  }, [id]);
  
  if (!film) {
    return (
      <Container
        fluid
        style={{
          minHeight: "100vh",
          backgroundColor: "#0F0610",
          color: "#FCEDFC",
          paddingTop: "120px",
          paddingLeft: "24px",
          paddingRight: "24px"
        }}
      >
        <h2>Película no encontrada</h2>
        <Button
          onClick={() => navigate("/catalogo")}
          style={{
            marginTop: "16px",
            backgroundColor: "#FCEDFC",
            color: "#1A0317",
            border: "none"
          }}
        >
          Volver al catálogo
        </Button>
      </Container>
    );
  }

  return (
    <Container
      fluid
      style={{
        minHeight: "100vh",
        backgroundColor: "#0F0610",
        color: "#FCEDFC",
        paddingTop: "120px",
        paddingLeft: "24px",
        paddingRight: "24px",
        paddingBottom: "40px"
      }}
    >
      <div
        style={{
            minHeight: "420px",
            borderRadius: "24px",
            overflow: "hidden",
            display: "flex",
            alignItems: "flex-end",
            padding: "32px",
            backgroundImage: `
            linear-gradient(to top, rgba(15, 6, 16, 0.98), rgba(15, 6, 16, 0.35)),
            url(${film.image})
            `,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            marginBottom: "32px"
        }}
        >
        <div style={{ maxWidth: "700px" }}>

            {/* Tipo + género + rating */}
            <div
            style={{
                display: "flex",
                gap: "12px",
                marginBottom: "16px",
                alignItems: "center",
                flexWrap: "wrap"
            }}
            >
            <Badge
                bg=""
                pill
                style={{
                backgroundColor: "#FCEDFC",
                color: "#1A0317",
                border: "1px solid rgba(26,3,23,0.25)",
                padding: "8px 12px",
                fontSize: "0.8rem",
                fontWeight: 600
                }}
            >
                {film.type === "MOVIE" ? "🎬 Película" : "📺 Serie"}
            </Badge>

            <span
                style={{
                backgroundColor: "rgba(252,237,252,0.15)",
                backdropFilter: "blur(6px)",
                borderRadius: "999px",
                padding: "6px 12px",
                fontWeight: 600,
                color: "#FCEDFC",
                fontSize: "0.9rem",
                border: "1px solid rgba(252,237,252,0.16)"
                }}
            >
                {film.category}
            </span>

            <span
                style={{
                backgroundColor: "rgba(252,237,252,0.15)",
                backdropFilter: "blur(6px)",
                borderRadius: "999px",
                padding: "6px 12px",
                fontWeight: 700,
                color: "#FFD166",
                fontSize: "0.95rem"
                }}
            >
                ⭐ {film.ratingAverage.toFixed(1)}
            </span>
            </div>

            {/* título */}
            <h1
            style={{
                fontSize: "3rem",
                fontWeight: 800,
                marginBottom: "12px"
            }}
            >
            {film.title}
            </h1>

            {/* meta */}
            <p
            style={{
                fontSize: "1rem",
                color: "rgba(252,237,252,0.85)",
                marginBottom: "12px"
            }}
            >
            {film.category} · {film.releaseDate} · Dirigida por {film.director}
            </p>

            {/* sinopsis */}
            <p
            style={{
                fontSize: "1.05rem",
                lineHeight: 1.7,
                color: "rgba(252,237,252,0.9)"
            }}
            >
            {film.synopsis}
            </p>

        </div>
        </div>

      <div
        style={{
          background: "linear-gradient(180deg, #241122 0%, #140812 100%)",
          border: "1px solid rgba(252, 237, 252, 0.12)",
          borderRadius: "20px",
          padding: "24px"
        }}
      >
        <h3 style={{ marginBottom: "20px" }}>Información</h3>

        <p><strong>Título:</strong> {film.title}</p>
        <p><strong>Director:</strong> {film.director}</p>
        <p><strong>Fecha de estreno:</strong> {film.releaseDate}</p>
        <p><strong>Categoría:</strong> {film.category}</p>

        <Button
          onClick={() => navigate("/catalogo")}
          style={{
            marginTop: "16px",
            backgroundColor: "#FCEDFC",
            color: "#1A0317",
            border: "none",
            fontWeight: 700
          }}
        >
          Volver al catálogo
        </Button>
      </div>
    </Container>
  );
}

export default Detalles;