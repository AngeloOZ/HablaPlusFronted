import { useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Box, Typography } from "@mui/material";

import { AuthContext } from "../../Context";
import { Avatar, ButtonPatient } from "../../Components";
import { PatientLayout } from "../../Layouts";
import { useUpdateAvatar } from "../../Hooks";

import css from "../../styles/ElegirAvatar.module.scss";

const ElegitAvatarPage = ({ avatars }) => {
  const router = useRouter()
  const { verifyToken } = useContext(AuthContext);
  const [avatar1, avatar2] = avatars;
  const [selectAvatar, setSelectAvatar] = useState(undefined);
  const { updateAvatar } = useUpdateAvatar();

  const handleClickAvatar = (avatar) => {
    setSelectAvatar(avatar);
  };

  const handleClickAceptar = async () => {
    const result = await updateAvatar(selectAvatar.id_user_avatar);
    if(result){
      await verifyToken();
      router.push('/paciente');
    }
  };

  return (
    <PatientLayout title="Elegir Avatar - Habla+">
      <div className={css.contenedorMain}>
        <Typography className={css.title}>Elege tu avatar</Typography>
        <Box component={"div"} className={css.contenedorAvatar}>
          <Avatar
            src={avatar1.url}
            className={`${css.customAvatar} ${
              selectAvatar?.id_avatar == 1 ? css.currentSelect : ""
            }`}
            onClick={() => handleClickAvatar(avatar1)}
          />
          <Avatar
            src={avatar2.url}
            className={`${css.customAvatar} ${
              selectAvatar?.id_avatar == 2 ? css.currentSelect : ""
            }`}
            onClick={() => handleClickAvatar(avatar2)}
          />
        </Box>
        <ButtonPatient
          className={css.button}
          disabled={selectAvatar === undefined ? true : false}
          onClickC={handleClickAceptar}
        >
          aceptar
        </ButtonPatient>
      </div>
      <div></div>
    </PatientLayout>
  );
};

export default ElegitAvatarPage;

export const getServerSideProps = async (ctx) => {
  const { SESSION_ID } = ctx.req.cookies;
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_URL_API;
  axios.defaults.headers.common["Authorization"] = `Bearer ${SESSION_ID}`;

  const {
    data: { data: avatars },
  } = await axios.get("/avatar/user");

  const avatarsUser = avatars.filter((avatar) => {
    if (
      (avatar.id_avatar == 1 && avatar.reclaimed) ||
      (avatar.id_avatar == 2 && avatar.reclaimed)
    ) {
      return avatar;
    }
  });

  return {
    props: {
      avatars: avatarsUser,
    },
  };
};
