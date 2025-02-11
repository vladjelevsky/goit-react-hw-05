import { NavLink } from 'react-router-dom';

import clsx from 'clsx';

import css from './Navigation.module.css';

const Navigation = () => {
  const navLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <nav className={css.nav}>
          <NavLink to='/' className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to='/movies' className={navLinkClass}>
            Movies
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
