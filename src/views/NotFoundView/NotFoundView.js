import errorImage from '../../img/no_result.jpeg';
import styles from './NotFoundView.module.css';

function NotFoundView() {
  return (
    <div className={styles.wrapper}>
      <img src={errorImage} width="320" alt="error"></img>
    </div>
  );
}

export default NotFoundView;
