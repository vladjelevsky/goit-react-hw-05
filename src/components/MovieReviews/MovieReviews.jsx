import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getMoviesReviews } from '../../api/moviesApi';

import css from './MovieReviews.module.css';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const MovieReviews = () => {
  const [reviewsMovies, setReviewsMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ isError: false, errorMessage: '' });

  const { movieId } = useParams();

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setError(false);
        setIsLoading(true);
        const response = await getMoviesReviews(movieId);
        const data = response.results;
        setReviewsMovies(data);
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
      {reviewsMovies.length > 0 &&
        reviewsMovies.map((review) => (
          <div className={css.wrapper} key={review.id}>
            <h3 className={css.title}>{review.author}</h3>
            <p className={css.text}>{review.content}</p>
          </div>
        ))}
      {isLoading && <Loader />}
      {error.isError ? <ErrorMessage>{error.errorMessage}</ErrorMessage> : <p>No comments</p>}
    </>
  );
};

export default MovieReviews;
