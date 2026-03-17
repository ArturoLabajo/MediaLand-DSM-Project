import FirebaseFilmRepository from "../infrastructure/FirebaseFilmRepository";

const FilmService = {
  getAll: () => {
    return FirebaseFilmRepository.getAll();
  },

  getById: (id: string) => {
    return FirebaseFilmRepository.getById(id);
  },

  updateRatingAverage: (id: string, ratingAverage: number) => {
    return FirebaseFilmRepository.updateRatingAverage(id, ratingAverage);
  },
};

export default FilmService;