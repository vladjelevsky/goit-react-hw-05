import { useState, useEffect } from 'react';

import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import { getTrendingMovies } from '../../api/moviesApi';

import css from './HomePage.module.css';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, seterror] = useState({ isError: false, errorMessage: '' });

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        seterror({ ...error, isError: false });
        setIsLoading(true);
        const response = await getTrendingMovies();
        const data = response.results;
        setTrendingMovies(data);
      } catch (error) {
        seterror((prevState) => {
          return {
            ...prevState,
            errorMessage: error.response.data.status_message,
            isError: true,
          };
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrendingMovies();
  }, []);

  return (
    <section className={css.section}>
      <div className={css.container}>
        {error.isError ? <ErrorMessage>{error.errorMessage}</ErrorMessage> : <MovieList movies={trendingMovies} />}
        {isLoading && <Loader />}
      </div>
    </section>
  );
};

export default HomePage;
