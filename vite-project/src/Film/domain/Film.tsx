// Tipo de conteniod
export type FilmType = "MOVIE" | "SERIE";

export interface Film {
  id: string; //id del contenido
  title: string; // titulo del contenido
  releaseDate: string; // fecha de estreno
  director: string; // nombre del director 
  synopsis: string; // sinopsis del conteniod
  ratingAverage: number; // valoracion media calculada
  type: FilmType; // tipo de contenido
  category: string; // genero del conteniod
  image: string; // ruta a la imagen representativa
}