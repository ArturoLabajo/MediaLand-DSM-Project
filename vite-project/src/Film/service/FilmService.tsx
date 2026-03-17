import FirebaseFilmRepository from "../infrastructure/FirebaseFilmRepository";

const FilmService = {
  getAll: () => {
    return FirebaseFilmRepository.getAll();
  },

  getById: (id: string) => {
    return FirebaseFilmRepository.getById(id);
  },

  updateRatingAverage: (id: string, ratingAverage: number, idToken?: string) => {
    return FirebaseFilmRepository.updateRatingAverage(id, ratingAverage, idToken);
  }
};

export default FilmService;