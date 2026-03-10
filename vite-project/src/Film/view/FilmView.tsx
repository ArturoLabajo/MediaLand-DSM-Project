import { useEffect, useState } from "react";
import type { Film } from "../domain/Film";
import FilmCard from "../domain/Film";
import LocalFilmRepository from "../infrastructure/LocalFilmRespository";


function Catalogo () {
    const [films,setFilms] = useState<Film[]>([]);
    useEffect(() => {const repository = new LocalFilmRepository();
        repository.getAll().then((data) => {
      setFilms(data);
    });}, []);

    return (
        <div style={{ paddingTop: "120px", paddingLeft: "20px", paddingRight: "20px" }}>
        <h2>CATÁLOGO DE PELÍCULAS</h2>

        <div className="films-grid">
            {films.map((film) => (
            <FilmCard key={film.id} film={film} />
            ))}
        </div>
        
        </div>
    );
};
export default Catalogo;