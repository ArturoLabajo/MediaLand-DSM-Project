import type { FilmRepository } from "../domain/FilmRepository";

// servicio de peliculas
const filmService = (repository: FilmRepository) => {
  return {
    // obtenemos las pelis del catalogo
    getAll: () => repository.getAll(),

    // obtenemos una peli concreta
    getById: (id: string) => repository.getById(id),

    // actualiza la valoracion media de la peli
    updateRatingAverage: (
      id: string,
      ratingAverage: number,
      idToken: string
    ) => repository.updateRatingAverage(id, ratingAverage, idToken)
  };
};

export default filmService;