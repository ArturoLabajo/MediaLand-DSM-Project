import { useState, useEffect } from 'react'
import './App.css';
//import Film/ import FilmDetailView from "./Film/view/FilmDetailView";
//import ContactView from "./Static/ContactView";
//import LegalView from "./Static/LegalView";
//7import AuthView from "./Auth/AuthView";
import logo from "./img/logo_001.png";


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
    <>
      <h1> Hola </h1>
      <h1> Adios</h1>
    </>
  )
}

export default App
