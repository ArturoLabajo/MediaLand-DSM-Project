import { useState, useEffect } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FilmCard from "./Film/domain/Film";
import LocalFilmRepository from "./Film/infrastructure/LocalFilmRespository";
import Catalogo from "./Film/view/FilmView";
import Header from "./Components/Header";
import Legal from "./Static/LegalView";
import Contact from "./Static/ContactView";
import type { Film } from "./Film/domain/Film";
import logo from "./img/logo_001.png";
import { Route, Routes } from "react-router-dom";
import Detalles from "./Film/view/FilmDetailView";
import Login from "./Auth/AuthView";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Register from "./Auth/RegisterView";

type HomeProps = {
  session: boolean;
};

function Home({ session }: HomeProps) {
  const [films, setFilms] = useState<Film[]>([]);
  const [showSections, setShowSections] = useState(false);

  useEffect(() => {
    new LocalFilmRepository().getAll().then(setFilms);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setShowSections(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const topRated = [...films]
    .sort((a, b) => b.ratingAverage - a.ratingAverage)
    .slice(0, 10);

  const randomRecommendations = [...films]
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  return (
    <div
      style={{
        backgroundColor: "#0F0610",
        minHeight: "200vh",
        paddingTop: "120px",
        paddingLeft: "24px",
        paddingRight: "24px"
      }}
    >
      <div className="mt-5" />

      <Container style={{ marginBottom: "60px" }}>
        <h1
          style={{
            color: "#FCEDFC",
            fontWeight: 800,
            fontSize: "3rem"
          }}
        >
          {session ? "Bienvenido de nuevo" : "Descubre MediaLand"}
        </h1>
        {session ? (
          <p
            style={{
              color: "rgba(252,237,252,0.8)",
              maxWidth: "600px",
              fontSize: "1.2rem"
            }}
          >
            Continúa explorando tus películas favoritas y descubre nuevas recomendaciones.
          </p>
        ) : (
          <div style={{ marginTop: "20px" }}>
            <Link to="/login">
              <Button
                style={{
                  backgroundColor: "#FCEDFC",
                  color: "#1A0317",
                  border: "none",
                  fontWeight: 700,
                  padding: "14px 24px",
                  borderRadius: "14px",
                  fontSize: "1.1rem",
                }}
              >
                Inicia sesión para guardar favoritos
              </Button>
            </Link>
            <p
              style={{
                color: "rgba(252,237,252,0.8)",
                maxWidth: "600px",
                fontSize: "1.2rem"
              }}
            >
              Explora películas y series seleccionadas. Desliza hacia abajo para ver
              las mejores valoradas y nuestras recomendaciones.
            </p>
          </div>
        )}
      </Container>

      {showSections && (
        <>
          <Container style={{ marginBottom: "60px" }}>
            <h2
              style={{
                color: "#FCEDFC",
                fontWeight: 700,
                marginBottom: "24px"
              }}
            >
              Top 10 mejor valoradas
            </h2>

            <Carousel indicators={false}>
              {chunkArray(topRated, 4).map((group, index) => (
                <Carousel.Item key={index}>
                  <Row className="g-4">
                    {group.map((film) => (
                      <Col key={film.id} md={3}>
                        <FilmCard film={film} />
                      </Col>
                    ))}
                  </Row>
                </Carousel.Item>
              ))}
            </Carousel>
          </Container>

          <Container>
            <h2
              style={{
                color: "#FCEDFC",
                fontWeight: 700,
                marginBottom: "24px"
              }}
            >
              Recomendaciones para ti
            </h2>

            <Carousel indicators={false}>
              <Carousel.Item>
                <Row className="g-4">
                  {randomRecommendations.map((film) => (
                    <Col key={film.id} md={3}>
                      <FilmCard film={film} />
                    </Col>
                  ))}
                </Row>
              </Carousel.Item>
            </Carousel>
          </Container>
        </>
      )}
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState(false);
  const [loginData, setLoginData] = useState<any>({});
  const [language, setLanguage] = useState("en-EN");
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    setLogin(false);
    setLoginData({});
  };

  const actualizaLogin = (loginState: boolean, data: any) => {
    setLogin(loginState);
    setLoginData(data);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="splash">
        <img src={logo} className="logo" alt="logo empresa" />
      </div>
    );
  }

  return (
    <div style={{ background: "#FCEDFC", minHeight: "100vh", minWidth: "100vw" }}>
      <Header session={login} onLogout={cerrarSesion} />

      <Routes>
        <Route path="/" element={<Home session={login} />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/catalogo/:id" element={<Detalles />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/contacto" element={<Contact />} />
        <Route
          path="/login"
          element={<Login actualizaLogin={actualizaLogin} />}
        />
        <Route path="/register" element={<Register />} />
      </Routes>
      
    </div>
  );
}

export default App;

function chunkArray(array: any[], size: number) {
  const result = [];

  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }

  return result;
}