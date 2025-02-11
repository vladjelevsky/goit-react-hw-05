import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import toast, { Toaster } from 'react-hot-toast';

import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import { getSearchMovies } from '../../api/moviesApi';

import css from './MoviesPage.module.css';

const notify = () =>
  toast.error('Write a word to search for', {
    duration: 3000,
    position: 'top-right',
  });

const MoviesPage = () => {
  function initialMovies() {
    const moviesFromLocalStorage = localStorage.getItem('movies');
    return moviesFromLocalStorage ? JSON.parse(moviesFromLocalStorage) : null;
  }

  const [foundMovies, setFoundMovies] = useState(initialMovies());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ isError: false, errorMessage: '' });
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get('query');
  const location = useLocation();

  function onSubmitHandler(e) {
    e.preventDefault();
    if (e.target.elements.search.value.trim() === '') {
      notify();
      return;
    }
    const searchValue = e.target.elements.search.value;
    setSearchParams({ query: searchValue });
    e.target.reset();
  }

  useEffect(() => {
    if (!searchValue) return;
    const fetchSearchMovies = async () => {
      try {
        setError(false);
        setIsLoading(true);
        const response = await getSearchMovies(searchValue);
        const data = response.results;
        setFoundMovies(data);
        localStorage.setItem('movies', JSON.stringify(data));
      } catch (error) {
        setError((prevState) => {
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
    fetchSearchMovies();
  }, [searchValue]);

  return (
    <section className={css.section}>
      <div className={css.container}>
        <form className={css.searchForm} onSubmit={onSubmitHandler}>
          <input
            className={css.searchInput}
            type='text'
            name='search'
            autoComplete='off'
            autoFocus
            placeholder='Search movies'
          />
          <button className={css.searchBtn} type='submit'>
            🔍
          </button>
          <Toaster />
        </form>
        {error.isError ? (
          <ErrorMessage>{error.errorMessage}</ErrorMessage>
        ) : (
          <MovieList movies={foundMovies} state={location} />
        )}
        {isLoading && <Loader />}
      </div>
    </section>
  );
};

export default MoviesPage;
