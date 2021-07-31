import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ErrorComponent from '../../components/Error';
import apiService from '../../services/apiService';
import LoaderComponent from '../../components/Loader';
import Status from '../../services/status';
import ShowMore from 'react-simple-show-more';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Reviews.module.css';

function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiService
      .getMovieReviews(movieId)
      .then(results => {
        if (results.length === 0) {
          toast.error("We don't have any reviews for this movie.");
          setStatus(Status.IDLE);
          return;
        }
        setReviews(results);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [movieId, error]);

  return (
    <>
      {status === Status.PENDING && <LoaderComponent />}

      {status === Status.REJECTED && <ErrorComponent message={error} />}

      {status === Status.RESOLVED && (
        <ul className={styles.review}>
          {reviews.map(review => (
            <li key={review.id} className={styles.item}>
              <h2 className={styles.name}>{review.author}</h2>
              <p className={styles.character}>
                <ShowMore
                  text={review.content}
                  length={700}
                  showMoreLabel=" Show more >>"
                  showLessLabel=" Show less <<"
                  style={{
                    cursor: 'pointer',
                    color: '#fa7584',
                    fontWeight: 'bold',
                  }}
                />
              </p>
            </li>
          ))}
        </ul>
      )}

      {status === Status.REJECTED && <p>{error.message}</p>}
    </>
  );
}

export default Reviews;
