import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => (
  <nav className={styles.navigation}>
    <NavLink
      exact
      to="/"
      className={styles.navLink}
      activeClassName={styles.activeLink}
    >
      Home
    </NavLink>
    <NavLink
      exact
      to="/movies"
      className={styles.navLink}
      activeClassName={styles.activeLink}
    >
      Movies
    </NavLink>
  </nav>
);

export default Navigation;
