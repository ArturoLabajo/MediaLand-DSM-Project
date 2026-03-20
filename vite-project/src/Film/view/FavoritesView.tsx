import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import type { Film } from "../domain/Film";
import FilmCard from "./components/FilmCard";
import { favoriteServiceInstance, filmServiceInstance } from "../infrastructure/Repository";

type SesProps = {
  session: boolean;
  userId: string | null;
  idToken: string | null;
};

function Favorites({ session, userId, idToken }: SesProps) {
  const [favoriteFilms, setFavoriteFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavoriteFilms = async () => {
      try {
        if (!session || !userId || !idToken) {
          setFavoriteFilms([]);
          setLoading(false);
          return;
        }

        const favorites = await favoriteServiceInstance.getFavoritesByUser(userId, idToken);

        const films = await Promise.all(
          favorites.map((favorite) => filmServiceInstance.getById(favorite.filmId))
        );

        const validFilms = films.filter((film): film is Film => film !== null);

        setFavoriteFilms(validFilms);
      } catch (error) {
        console.error("Error cargando favoritos:", error);
        setFavoriteFilms([]);
      } finally {
        setLoading(false);
      }
    };

    loadFavoriteFilms();
  }, [session, userId, idToken]);

  if (loading) {
    return (
      <Container
        fluid
        style={{
          minHeight: "100vh",
          backgroundColor: "#0F0610",
          paddingTop: "120px",
          paddingLeft: "24px",
          paddingRight: "24px",
          paddingBottom: "32px",
          color: "#FCEDFC"
        }}
      >
        <h2>Cargando favoritos...</h2>
      </Container>
    );
  }

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
        MIS FAVORITOS
      </h2>

      {!session && (
        <p style={{ color: "#FCEDFC" }}>
          Inicia sesión para ver tus favoritos.
        </p>
      )}

      {session && favoriteFilms.length === 0 && (
        <p style={{ color: "#FCEDFC" }}>
          Todavía no tienes películas favoritas.
        </p>
      )}

      <Row className="g-4">
        {favoriteFilms.map((film) => (
          <Col key={film.id} xs={12} sm={6} md={4} lg={3} xl={3}>
            <FilmCard film={film} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Favorites;