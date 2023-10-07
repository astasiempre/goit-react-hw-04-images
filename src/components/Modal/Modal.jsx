import { useEffect } from 'react';
import css from './Modal.module.css';

export const CustomModal = ({ data, onClose }) => {
  useEffect(() => {
    const onKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);
  const onOverlayClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };
  return (
    <div>
      <div className={css.Overlay} onClick={onOverlayClick}>
        <div className={css.Modal}>
          <img src={data} alt="img" />
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
