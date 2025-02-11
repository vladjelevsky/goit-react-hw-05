import css from './ErrorMessage.module.css';

const ErrorMessage = ({ children }) => {
  return <p className={css.text}>{children}</p>;
};

export default ErrorMessage;
