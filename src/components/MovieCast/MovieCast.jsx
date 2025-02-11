import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import { getMoviesCast } from '../../api/moviesApi';

import css from './MovieCast.module.css';

const MovieCast = () => {
  const [castMovies, setCastMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ isError: false, errorMessage: '' });

  const { movieId } = useParams();

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setError(false);
        setIsLoading(true);
        const response = await getMoviesCast(movieId);
        const data = response.cast;
        setCastMovies(data);
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
    fetchTrendingMovies();
  }, [movieId]);

  return (
    <>
      {error.isError ? (
        <ErrorMessage>{error.errorMessage}</ErrorMessage>
      ) : (
        <ul className={css.list}>
          {castMovies !== 0 &&
            castMovies.map((cast) => (
              <li className={css.item} key={cast.cast_id}>
                <img
                  className={css.img}
                  src={`https://image.tmdb.org/t/p/w200/${cast.profile_path}`}
                  alt={cast.original_name}
                  loading='lezy'
                />
                <div className={css.descr}>
                  <h3 className={css.title}>{cast.original_name}</h3>
                  <p className={css.text}>{cast.character}</p>
                </div>
              </li>
            ))}
        </ul>
      )}

      {isLoading && <Loader />}
    </>
  );
};

export default MovieCast;
