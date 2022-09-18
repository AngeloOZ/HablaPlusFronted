import { Box } from "@mui/material";
import css from "../../styles/Components.module.scss";

export const Avatar = ({ src, className, onClick = () => {} }) => {
  return (
    <div className={`${css.avatar} ${className}`}>
      <Box
        component="img"
        src={src}
        alt="Avatars de Habla+"
        className={css.avatarImage}
        onClick={onClick}
      />
    </div>
  );
};
