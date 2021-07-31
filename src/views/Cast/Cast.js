import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../../services/apiService';
import Status from '../../services/status';
import LoaderComponent from '../../components/Loader';
import ErrorComponent from '../../components/Error';
import noImageFound from '../../img/no_image.jpeg';
import styles from './Cast.module.css';

function Cast() {
  const { movieId } = useParams();
  const [actors, setActors] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    apiService
      .getCastInfo(movieId)
      .then(cast => {
        setActors(cast);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        console.log(error);
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [movieId, error]);

  return (
    <>
      {status === Status.PENDING && <LoaderComponent />}

      {status === Status.REJECTED && <ErrorComponent />}

      {status === Status.RESOLVED && (
        <ul className={styles.cast}>
          {actors.map(actor => (
            <li key={actor.id} className={styles.item}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                    : noImageFound
                }
                alt={actor.original_name}
                className={styles.photo}
              />
              <h4 className={styles.name}>{actor.original_name}</h4>
              <p className={styles.character}>{actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Cast;
