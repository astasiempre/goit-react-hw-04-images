import React, { Component } from 'react';
import { ImageGalleryItem } from './ImageGalleryItem';
import css from './ImageGallery.module.css';
import { fetchSerchImages } from 'services/api';

import CustomModal from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

export default class ImageGallery extends Component {
  state = {
    images: [],
    loading: false,
    totalHits: 1,
    error: null,
    page: 1,
    per_page: 12,
    modal: {
      isOpen: false,
      data: null,
    },
    
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchName !== this.props.searchName) {
      this.setState({ page: 1, images: [], error: null });
    }
    if (
      prevProps.searchName !== this.props.searchName ||
      this.state.page !== prevState.page
    ) {
      this.fetchImageByQuery();
    }
  }

  fetchImageByQuery = async () => {
    try {
      this.setState({ loading: true });
      const { searchName } = this.props;
      const { page, per_page,  } = this.state;
      const requestImages = await fetchSerchImages(searchName, page, per_page);
console.log(requestImages.totalHits)
      this.setState(({ images: prevData, totalHits}) => ({
        images: [...prevData, ...requestImages.hits],
        totalHits: requestImages.totalHits
      }));
     
      console.log(this.state.totalHits)
      if (requestImages.total === 0) {
        throw new Error('No images matching your request');
      }
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };
 
  loadMoreImages = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onOpenModal = modalData => {
    this.setState({
      modal: {
        isOpen: true,
        data: modalData,
      },
    });
  };

  onCloseModal = () => {
    this.setState({
      modal: {
        isOpen: false,
        data: null,
      },
    });
  };

  render() {
    return (
      <>
        {this.state.error && <h1>{this.state.error}</h1>}

        {this.state.loading && <Loader />}
        {this.state.images && (
          <>
            <ul className={css.ImageGallery}>
              {this.state.images.map(
                ({ id, webformatURL, largeImageURL, user }) => (
                  <ImageGalleryItem
                    onOpenModal={this.onOpenModal}
                    key={id}
                    url={webformatURL}
                    largeUrl={largeImageURL}
                    user={user}
                  />
                )
              )}
            </ul>
            {this.state.images.length > 0 &&
              this.state.page < Math.ceil(this.state.totalHits / 12) && (
                <Button onClick={this.loadMoreImages} />
              )}
            {this.state.modal.isOpen && (
              <CustomModal
                data={this.state.modal.data}
                onClose={this.onCloseModal}
              />
            )}
          </>
        )}
      </>
    );
  }
}
