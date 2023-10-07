import { useState } from 'react';
import css from './Searchbar.module.css';
import { ImSearch } from 'react-icons/im';

export const Searchbar = ({ onSubmit }) => {
  const [searchName, setSearchName] = useState('');

  const handleNameChange = event => {
    setSearchName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchName.trim() === '') {
      alert('Введите название');
      return;
    }
    onSubmit(searchName);
    setSearchName('');
  };

  return (
    <header className={css.Searchbar}>
      <form onSubmit={handleSubmit} className={css.SearchForm}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>
            <ImSearch className={css.icon} />
          </span>
        </button>

        <input
          className={css.SearchFormInput}
          name="catName"
          type="text"
          value={searchName}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
};
