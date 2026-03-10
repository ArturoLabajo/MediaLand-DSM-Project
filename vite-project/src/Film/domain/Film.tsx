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
}

interface FilmCardProps {
  film: Film;
}

function FilmCard({ film }: FilmCardProps) {
  return (
    <div className="film-card">
      <h3>{film.title}</h3>
      <p><strong>Director:</strong> {film.director}</p>
      <p><strong>Fecha:</strong> {film.releaseDate}</p>
      <p><strong>Categoría:</strong> {film.category}</p>
      <p><strong>Tipo:</strong> {film.type}</p>
      <p><strong>Rating:</strong> {film.ratingAverage}</p>
      <p>{film.synopsis}</p>
    </div>
  );
}

export default FilmCard;