import { useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';

import css from './App.module.css';
import { ImageGallery } from './ImageGallery/ImageGallery';

export const App = (queryName) => {
 

  const [searchName, setSearchName] = useState('')

 const handleSerchbarFormSubmit = queryName => {
    setSearchName( queryName );
  };
 
    return (
      <div className={css.App}>
        <Searchbar onSubmit={handleSerchbarFormSubmit} />
        <ImageGallery searchName={searchName} />
      </div>
    );
  }

