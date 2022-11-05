import { Box } from "@mui/material";
import css from "../../styles/Components.module.scss";

export const Pictograma = ({
  src,
  color = "primary",
  className,
  onClick = () => {},
}) => {
  return (
    <div
      className={`${css.pictograma} ${
        color === "primary" ? css.primary : css.secondary
      } ${className}`}
      onClick={onClick}
    >
      <Box component="img" src={src} className={css.pictogramaImage} />
    </div>
  );
};
