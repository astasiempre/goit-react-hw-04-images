import css from './Button.module.css';


export const Button = ({ onClick }) => {
  return (
    <button type="button" className={css.buttonLoad} onClick={onClick}>
      Load more
    </button>
  );
};