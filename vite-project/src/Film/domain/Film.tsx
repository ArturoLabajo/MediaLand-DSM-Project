import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export type FilmType = "MOVIE" | "SERIE";

export interface Film {
  id: string;
  title: string;
  releaseDate: string;
  director: string;
  synopsis: string;
  ratingAverage: number;
  type: FilmType;
  category: string;
  image: string;
}

interface FilmCardProps {
  film: Film;
}

function FilmCard({ film }: FilmCardProps) {
  const navigate = useNavigate();
  return (
    <Card
      style={{
        background: "linear-gradient(180deg, #241122 0%, #140812 100%)",
        border: "1px solid rgba(252, 237, 252, 0.12)",
        borderRadius: "18px",
        overflow: "hidden",
        boxShadow: "0 10px 24px rgba(0, 0, 0, 0.28)",
        color: "#FCEDFC",
        height: "100%"
      }}
    >
      <div
        style={{
          height: "240px",
          backgroundImage: `
            linear-gradient(to top, rgba(20, 8, 18, 0.95), rgba(20, 8, 18, 0.2)),
            url(${film.image})
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",padding: "16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        <div>
          <Badge
            bg=""
            pill
            style={{
              backgroundColor: "#FCEDFC",
              color: "#1A0317",
              border: "1px solid rgba(26, 3, 23, 0.25)",
              padding: "8px 12px",
              fontSize: "0.75rem",
              fontWeight: 600
            }}
          >
            {film.type === "MOVIE" ? "🎬 Película" : "📺 Serie"}
          </Badge>
        </div>

        <div>
          <h3
            style={{
              margin: 0,
              fontSize: "1.4rem",
              fontWeight: 700,
              lineHeight: 1.2
            }}
          >
            {film.title}
          </h3>

          <p
            style={{
              margin: "8px 0 0 0",
              color: "rgba(252, 237, 252, 0.82)",
              fontSize: "0.95rem"
            }}
          >
            {film.category} · {film.releaseDate}
          </p>
        </div>
      </div>

      <Card.Body style={{ padding: "16px", display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            marginBottom: "12px"
          }}
        >
          <span
            style={{
              backgroundColor: "rgba(252, 237, 252, 0.08)",
              color: "#F8DFF8",
              borderRadius: "999px",
              padding: "6px 10px",
              fontSize: "0.82rem"
            }}
          >
            {film.category}
          </span>

          <span
            style={{
              color: "#FFD166",
              fontWeight: 700,
              fontSize: "0.95rem"
            }}
          >
            ★ {film.ratingAverage.toFixed(1)}
          </span>
        </div>

        <p
          style={{
            margin: "0 0 10px 0",
            fontSize: "0.92rem",
            color: "rgba(252, 237, 252, 0.9)"
          }}
        >
          <strong>Director:</strong> {film.director}
        </p>

        <p
          style={{
            margin: "0 0 16px 0",
            color: "rgba(252, 237, 252, 0.78)",
            fontSize: "0.92rem",
            lineHeight: 1.5,
            flexGrow: 1
          }}
        >
          {film.synopsis}
        </p>

        <Button
          onClick={() => navigate(`/catalogo/${film.id}`)}
          style={{
            width: "100%",
            border: "none",
            borderRadius: "12px",
            padding: "10px 14px",
            background: "#FCEDFC",
            color: "#1A0317",
            fontWeight: 700
          }}
        >
          Ver detalles
        </Button>
      </Card.Body>
    </Card>
  );
}

export default FilmCard;