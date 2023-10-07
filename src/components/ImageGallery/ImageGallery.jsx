import { useEffect, useState } from 'react';
import { ImageGalleryItem } from './ImageGalleryItem';
import css from './ImageGallery.module.css';
import { fetchSerchImages } from 'services/api';

import { CustomModal } from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

export const ImageGallery = ({ searchName }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(1);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [per_page] = useState(12);
  const [modal, setModal] = useState({
    isOpen: false,
    data: null,
  });


  useEffect(() => {
    if (searchName !== '') {
      setPage(1);
      setImages([]);
      setError(null);
    }
  }, [searchName]);

  useEffect(() => {
    if (searchName) {
      const fetchImageByQuery = async () => {
    try {
      setLoading(true);
      const requestImages = await fetchSerchImages(searchName, page, per_page);
      setImages((prevData) => [...prevData, ...requestImages.hits]);
      setTotalHits(requestImages.totalHits);

      if (requestImages.total === 0) {
        throw new Error('No images matching your request');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
    };
    fetchImageByQuery()}
   
    }, [searchName, page, per_page]);

  
  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const onOpenModal = (modalData) => {
    setModal({
      isOpen: true,
      data: modalData,
    });
  };

  const onCloseModal = () => {
    setModal({
      isOpen: false,
      data: null,
    });
  };

  return (
    <>
      {error && <h1>{error}</h1>}

      {loading && <Loader />}
      {images && (
        <>
          <ul className={css.ImageGallery}>
            {images.map(({ id, webformatURL, largeImageURL, user }) => (
              <ImageGalleryItem
                onOpenModal={onOpenModal}
                key={id}
                url={webformatURL}
                largeUrl={largeImageURL}
                user={user}
              />
            ))}
          </ul>
          {images.length > 0 && page < Math.ceil(totalHits / 12) && (
            <Button onClick={loadMoreImages} />
          )}
          {modal.isOpen && (
            <CustomModal data={modal.data} onClose={onCloseModal} />
          )}
        </>
      )}
    </>
  );
};

