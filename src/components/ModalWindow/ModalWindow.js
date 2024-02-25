import css from './ModalWindow.module.css';

export const ModalWindow = ({ children }) => {
  return (
    <div className={css.backdrop}>
      <div className={css.form_modal}>{children}</div>
    </div>
  );
};
