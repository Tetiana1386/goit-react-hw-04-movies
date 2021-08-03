import { useState, useEffect, Suspense, lazy } from 'react';
import {
  NavLink,
  useParams,
  useRouteMatch,
  Switch,
  Route,
  useHistory,
  useLocation,
} from 'react-router-dom';
import apiService from '../../services/apiService';
import Status from '../../services/status';
import LoaderComponent from '../../components/Loader';
import ErrorComponent from '../../components/Error';
import noImageFound from '../../img/no_image.jpeg';
import styles from './MovieDetailsPage.module.css';

const Cast = lazy(() => import('../Cast' /* webpackChunkName: "cast"*/));
const Reviews = lazy(() =>
  import('../Reviews' /* webpackChunkName: "reviews"*/),
);

function MovieDetailsPage() {
  const history = useHistory();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    setStatus(Status.PENDING);
    apiService
      .getMovieById(movieId)
      .then(({ poster_path, original_title, popularity, overview, genres }) => {
        setMovie({
          src: poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : `${noImageFound}`,
          title: original_title,
          score: popularity.toFixed(1),
          overview,
          genres,
        });
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        console.log(error);
        setError('Something went wrong. Try again.');
        setStatus(Status.REJECTED);
      });
  }, [movieId, error]);

  const goBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <main className={styles.container}>
      <button onClick={goBack} type="button" className={styles.btn}>
        &#171; back
      </button>

      {status === Status.PENDING && <LoaderComponent />}

      {status === Status.REJECTED && <ErrorComponent />}

      {status === Status.RESOLVED && (
        <>
          <div className={styles.wrapper}>
            <img className={styles.image} src={movie.src} alt={movie.title} />
            <div className={styles.description}>
              <h2 className={styles.movieTitle}>{movie.title}</h2>
              <h3 className={styles.title}>Score</h3>
              <p className={styles.info}>{movie.score}</p>
              <h3 className={styles.title}>About</h3>
              <p className={styles.info}>{movie.overview}</p>
              <h3 className={styles.title}>Genres</h3>
              <ul className={styles.genre}>
                {movie.genres.map(genre => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <ul className={styles.submenu}>
            <li>
              <NavLink
                to={{
                  pathname: `${url}/cast`,
                  state: {
                    from: location.state ? location.state.from : '/',
                  },
                }}
                className={styles.submenuItem}
                activeClassName={styles.activeSubmenuItem}
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: `${url}/reviews`,
                  state: { from: location.state ? location.state.from : '/' },
                }}
                className={styles.submenuItem}
                activeClassName={styles.activeSubmenuItem}
              >
                Reviews
              </NavLink>
            </li>
          </ul>

          <Suspense fallback={<LoaderComponent />}>
            <Switch>
              <Route path={`${path}/cast`}>
                {status === Status.RESOLVED && <Cast />}
              </Route>

              <Route path={`${path}/reviews`}>
                {status === Status.RESOLVED && <Reviews />}
              </Route>
            </Switch>
          </Suspense>
        </>
      )}
    </main>
  );
}

export default MovieDetailsPage;
