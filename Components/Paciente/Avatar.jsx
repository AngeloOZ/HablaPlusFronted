import { Box } from "@mui/material";
import css from "../../styles/Components.module.scss";

export const Avatar = ({ src }) => {
  return (
    <div className={css.avatar}>
      <Box component="img" src={src} alt="Avatars de Habla+" className={css.avatarImage} />
    </div>
  );
};
