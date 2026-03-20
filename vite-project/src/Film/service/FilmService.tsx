import type { FilmRepository } from "../domain/FilmRepository";

const filmService = (repository: FilmRepository) => {
  return {
    getAll: () => repository.getAll(),

    getById: (id: string) => repository.getById(id),

    updateRatingAverage: (
      id: string,
      ratingAverage: number,
      idToken: string
    ) => repository.updateRatingAverage(id, ratingAverage, idToken)
  };
};

export default filmService;