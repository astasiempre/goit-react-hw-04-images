import css from './ImageGalleryItem.module.css'

export  const ImageGalleryItem = ({ url, user, onOpenModal, largeUrl  }) => {
    return (
      <li onClick={() => onOpenModal(largeUrl)} className={css.ImageGalleryItem}>
        
                    <img
                      src={url}
                      alt={user}
                      className={css.ImageGalleryItemImage}
                    />
      </li>
      
    );
}