import { Box } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Context";
import { Avatar } from "../../Paciente/Avatar";
import { ItemAvatar } from "./ItemAvatar";
import css from "../../../styles/Editar.perfil.module.scss";
import { useUpdateAvatar } from "../../../Hooks";

export const CambiarAvatar = ({ avatars }) => {
  const { updateAvatar } = useUpdateAvatar(false);
  const { avatar } = useContext(AuthContext);
  const [currentAvatar, setcurrentAvatar] = useState({ url: avatar });
  const [activeButton, setActiveButton] = useState(false);

  const handleClickAvatar = (avatar) => {
    setActiveButton(true);
    setcurrentAvatar(avatar);
  };

  const handleClickButtonAvatar = async () => {
    const result = await updateAvatar(currentAvatar.id_user_avatar);
  };

  return (
    <>
      <Avatar src={currentAvatar.url} />
      <Box component={"div"} className={css.contenedorAvatars}>
        {avatars.map((avatar) => (
          <ItemAvatar
            key={avatar.id_user_avatar}
            avatar={avatar}
            onClick={handleClickAvatar}
          />
        ))}
      </Box>
      {activeButton && (
        <button className={css.buttonAvatar} onClick={handleClickButtonAvatar}>
          Cambiar avatar
        </button>
      )}
    </>
  );
};
