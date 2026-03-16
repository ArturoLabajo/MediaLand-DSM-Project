import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { useNavigate, useParams } from "react-router-dom";
import type { Film } from "../domain/Film";
import FilmService from "../service/FilmService";
import FavoriteService from "../service/FavoriteService";
import Comments from "../../Components/Comments";

type SesProps = {
  session: boolean;
  userId: string | null;
  idToken: string | null;
  userName: string | null;
};

function Detalles({ session, userId, idToken, userName }: SesProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hoverFav, setHoverFav] = useState(false);
  const [film, setFilm] = useState<Film | null>(null);
  
  const [isFavorite, setIsFavorite] = useState(false);
  

  useEffect(() => {
  if (!id) return;

  FilmService.getById(id).then((data) => {
    setFilm(data);
  });
}, [id]);


  useEffect(() => {

  const checkFavoriteStatus = async () => {

    try {

      if (!id || !userId || !idToken) {
        setIsFavorite(false);
        return;
      }

      const favorite =
        await FavoriteService.isFavorite(id, userId, idToken);

      setIsFavorite(favorite);

    } catch (error) {

      console.error("Error comprobando favorito:", error);
      setIsFavorite(false);
    }
  };

  checkFavoriteStatus();

}, [id, userId, idToken]);

  const handleAddFavorite = async () => {

  try {

    if (!id || !userId || !idToken) return;

    if (isFavorite) {

      await FavoriteService.removeFavorite(userId, id, idToken);

      setIsFavorite(false);

      alert("Película eliminada de favoritos");

    } else {

      await FavoriteService.addFavorite(userId, id, idToken);

      setIsFavorite(true);

      alert("Película añadida a favoritos");
    }

  } catch (error) {

    console.error(error);
    alert("No se pudo actualizar favoritos");
  }
};

  
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
                color: "linear-gradient(to top, rgba(15, 6, 16, 0.98), rgba(15, 6, 16, 0.35))",
                fontSize: "0.95rem"
                }}
            >
                ⭐ {film.ratingAverage.toFixed(1)}
            </span>

            {session && (
                <Button
                    onClick={handleAddFavorite}
                    onMouseEnter={() => setHoverFav(true)}
                    onMouseLeave={() => setHoverFav(false)}
                    style={{
                        backgroundColor: hoverFav ? "#FCEDFC" : "rgba(252,237,252,0.15)",
                        backdropFilter: "blur(6px)",
                        borderRadius: "999px",
                        padding: "6px 12px",
                        fontWeight: 700,
                        color: hoverFav ? "#1A0317" : "#FCEDFC",
                        fontSize: "0.95rem",
                        border: "1px solid rgba(252,237,252,0.25)",
                        transition: "all 0.25s ease",
                    }}
                >
                    {isFavorite ? "💔 Quitar de favoritos" : "❤️ Añadir a favoritos"}
                </Button>
            )}

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
        <Comments
          filmId={film.id}
          session={session}
          userId={userId}
          userName={userName}
          idToken={idToken}
        />
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