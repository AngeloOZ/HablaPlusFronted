import { ButtonBase } from "@mui/material";
import css from "../../styles/Components.module.scss";

export const ButtonPatient = ({
  fullwidth,
  children,
  className,
  disabled = false,
  type="button",
  onClickC = () => {},
}) => {
  return (
    <ButtonBase
      className={`${css.button} ${
        fullwidth ? css.fullwidth : ""
      } ${className} ${disabled ? css.disabled : ""}`}
      disabled={disabled}
      onClick={onClickC}
      type={type}
    >
      {children}
    </ButtonBase>
  );
};
