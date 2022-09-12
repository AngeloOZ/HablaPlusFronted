import css from "../../styles/Components.module.scss";

export const ButtonPatient = ({ fullwidth, children, onClickC = () => {} }) => {
  return (
    <button
      className={`${css.button} ${fullwidth ? css.fullwidth : ""}`}
      onClick={onClickC}
    >
      {children}
    </button>
  );
};
