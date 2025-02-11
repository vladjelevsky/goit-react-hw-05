import axios from 'axios';

const token =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDhmM2FjMTExOTI2NDQ1ZDNlMzMwOTliYmY5NDI2NCIsIm5iZiI6MTcyOTc2NTkxMi44MTgyMTcsInN1YiI6IjY3MWExZjczMzRjMGZhYmQ2ODFjNThhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0IRZjbicA29MlXQ5wNqfn4AHx0cu21T6dWq5w4dFHTc';

const movieInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${token}`,
  },
  params: {
    include_adult: false,
    language: 'en-US',
  },
});

export const getTrendingMovies = async () => {
  const { data } = await movieInstance.get('trending/movie/day');
  return data;
};

export const getSearchMovies = async (query) => {
  const options = {
    params: {
      query,
    },
  };
  const { data } = await movieInstance.get('search/movie', options);
  return data;
};

export const getMoviesById = async (id) => {
  const { data } = await movieInstance.get(`movie/${id}`);
  return data;
};

export const getMoviesReviews = async (id) => {
  const { data } = await movieInstance.get(`movie/${id}/reviews`);
  return data;
};

export const getMoviesCast = async (id) => {
  const { data } = await movieInstance.get(`movie/${id}/credits`);
  return data;
};
