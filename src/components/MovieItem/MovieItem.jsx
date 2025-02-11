import { Link } from 'react-router-dom';

import css from './MovieItem.module.css';

const MovieItem = ({ id, poster_path, title, release_date, state }) => {
  return (
    <li className={css.item}>
      <img className={css.img} src={`https://image.tmdb.org/t/p/w400/${poster_path}`} alt={title} loading='lezy' />
      <div className={css.descr}>
        <h2 className={css.title}>{title}</h2>
        <p className={css.date}>Release Date: {release_date}</p>
      </div>

      <Link className={css.link} to={`/movies/${id}`} state={state}></Link>
    </li>
  );
};

export default MovieItem;
