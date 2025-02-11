import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Navigation = lazy(() => import('./components/Navigation/Navigation'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage'));
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('./components/MovieReviews/MovieReviews'));

function App() {
  return (
    <>
      <Navigation />
      <Suspense>
        <main>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/movies' element={<MoviesPage />} />
            <Route path='/movies/:movieId' element={<MovieDetailsPage />}>
              <Route path='cast' element={<MovieCast />} />
              <Route path='reviews' element={<MovieReviews />} />
            </Route>
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </main>
      </Suspense>
    </>
  );
}

export default App;
