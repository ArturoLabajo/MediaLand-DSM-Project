import { useState, useEffect } from "react";
import "./App.css";
import Catalogo from "./Film/view/FilmView";
import Header from "./Components/Header";
import Legal from "./Static/LegalView";
import Contact from "./Static/ContactView";
import logo from "./img/logo_001.png";
import { Route, Routes } from "react-router-dom";

function Home() {
  return (
    <div style={{ paddingTop: "120px" }}>
      <h1>Home</h1>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

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
      <Header session={false} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/contacto" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;