import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { useNavigate, useParams } from "react-router-dom";
import type { Film } from "../domain/Film";
import RatingService from "../service/RatingService";
import { ratingRepository } from "../infrastructure/Repository";
import Comments from "../../Components/Comments";
import { favoriteServiceInstance } from "../infrastructure/Repository";
import { filmServiceInstance } from "../infrastructure/Repository";

type SesProps = {
  session: boolean;
  userId: string | null;
  idToken: string | null;
  userName: string | null;
  perfil:string | null;
};

function Detalles({ session, userId, idToken, userName, perfil }: SesProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const ratingService = RatingService(ratingRepository);

  const [hoverFav, setHoverFav] = useState(false);
  const [film, setFilm] = useState<Film | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [ratingSaving, setRatingSaving] = useState(false);

  useEffect(() => {
    if (!id) return;

    filmServiceInstance.getById(id).then((data) => {
      setFilm(data);
    });
  }, [id]);

  useEffect(() => {
    const loadRatingsData = async () => {
      if (!id) return;

      try {
        const average = await ratingService.getAverageByFilmId(id);
        setAverageRating(average);

        if (userId) {
          const existingRating = await ratingService.getUserRating(id, userId);
          setUserRating(existingRating ? existingRating.value : null);
        } else {
          setUserRating(null);
        }
      } catch (error) {
        console.error("Error cargando ratings:", error);
      }
    };

    loadRatingsData();
  }, [id, userId]);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        if (!id || !userId || !idToken) {
          setIsFavorite(false);
          return;
        }

        const favorite = await favoriteServiceInstance.isFavorite(id, userId, idToken);
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
        await favoriteServiceInstance.removeFavorite(userId, id, idToken);
        setIsFavorite(false);
        alert("Película eliminada de favoritos");
      } else {
        await favoriteServiceInstance.addFavorite(userId, id, idToken);
        setIsFavorite(true);
        alert("Película añadida a favoritos");
      }
    } catch (error) {
      console.error(error);
      alert("No se pudo actualizar favoritos");
    }
  };

  const handleRateFilm = async (value: number) => {
    if (!id || !userId || !idToken) {
      alert("Debes iniciar sesión para puntuar");
      return;
    }

    try {
      setRatingSaving(true);

      const existingRating = await ratingService.getUserRating(id, userId);

      if (existingRating) {
        await ratingService.update(
          existingRating.ratingId,
          {
            ...existingRating,
            value,
          },
          idToken
        );
      } else {
        await ratingService.save(
          {
            ratingId: "",
            filmId: id,
            userId,
            value,
          },
          idToken
        );
      }

      const newAverage = await ratingService.getAverageByFilmId(id);
      await filmServiceInstance.updateRatingAverage(id, newAverage, idToken);

      setAverageRating(newAverage);
      setUserRating(value);

      setFilm((prev) =>
        prev ? { ...prev, ratingAverage: newAverage } : prev
      );
    } catch (error) {
      console.error("Error guardando rating:", error);
      alert("No se pudo guardar la valoración");
    } finally {
      setRatingSaving(false);
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
                color: "#FCEDFC",
                fontSize: "0.95rem"
              }}
            >
              ⭐ {averageRating.toFixed(1)} / 5
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

          <h1
            style={{
              fontSize: "3rem",
              fontWeight: 800,
              marginBottom: "12px"
            }}
          >
            {film.title}
          </h1>

          <p
            style={{
              fontSize: "1rem",
              color: "rgba(252,237,252,0.85)",
              marginBottom: "12px"
            }}
          >
            {film.category} · {film.releaseDate} · Dirigida por {film.director}
          </p>

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

        <div style={{ marginTop: "24px", marginBottom: "24px" }}>
          <h4 style={{ marginBottom: "14px" }}>Valoraciones</h4>

          <p style={{ marginBottom: "14px" }}>
            <strong>Nota media:</strong> {averageRating.toFixed(1)} / 5
          </p>

          {session && userId ? (
            <>
              <p style={{ marginBottom: "12px" }}>
                <strong>Tu valoración:</strong>{" "}
                {userRating !== null ? userRating : "Aún no has votado"}
              </p>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {[0, 1, 2, 3, 4, 5].map((value) => (
                  <Button
                    key={value}
                    onClick={() => handleRateFilm(value)}
                    disabled={ratingSaving}
                    style={{
                      backgroundColor: userRating === value ? "#FCEDFC" : "transparent",
                      color: userRating === value ? "#1A0317" : "#FCEDFC",
                      border: "1px solid rgba(252,237,252,0.35)",
                      borderRadius: "999px",
                      fontWeight: 700,
                    }}
                  >
                    {value}
                  </Button>
                ))}
              </div>
            </>
          ) : (
            <p>Inicia sesión para puntuar esta película.</p>
          )}
        </div>

        <Comments
          filmId={film.id}
          session={session}
          userId={userId}
          userName={userName}
          idToken={idToken}
          perfil={perfil}
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