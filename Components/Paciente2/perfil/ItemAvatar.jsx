import { Box } from "@mui/material";
import css from "../../../styles/Editar.perfil.module.scss";

export const ItemAvatar = ({ avatar, onClick }) => {
  const handeClick = () => {
    onClick(avatar);
  };
  return (
    <div
      className={`${css.itemAvatar} ${avatar?.reclaimed ? css.reclaimed : ""}`}
      onClick={handeClick}
    >
      <Box component={"img"} src={avatar.url} className={css.imgItem} />
    </div>
  );
};
