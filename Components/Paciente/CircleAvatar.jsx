import { Box } from "@mui/material";
import css from "../../styles/Components.module.scss";

/**
 *
 * @param {Object} arg
 * @param {String} arg.src
 * @param {String} [arg.size=small] tamaño del componente [small o large]
 * @returns
 */
export const CircleAvatar = ({ src, size = "small", className }) => {
  return (
    <div
      className={`${css.circleAvatar} ${
        size === "large" ? css.large : css.small
      } ${className}`}
    >
      <Box component={"img"} src={src} className={css.circleAvatarImagen} />
    </div>
  );
};
