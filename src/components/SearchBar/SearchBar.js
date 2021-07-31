import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './SearchBar.module.css';

function Searchbar({ onHandleSubmit }) {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!query.trim()) {
      return toast.info('Please enter a value for search images!');
    }
    onHandleSubmit(query);
    setQuery('');
  };

  const handleChangeQuery = ({ target }) => {
    setQuery(target.value);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <button type="submit" className={styles.button}>
        <span className={styles.label}>Search</span>
      </button>

      <input
        className={styles.input}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        value={query}
        onChange={handleChangeQuery}
      />
    </form>
  );
}

Searchbar.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
