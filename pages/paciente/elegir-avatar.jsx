import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { Avatar, ButtonPatient } from "../../Components";
import { PatientLayout } from "../../Layouts";
import css from "../../styles/ElegirAvatar.module.scss";

const ElegitAvatarPage = () => {
  const [selectAvatar, setSelectAvatar] = useState(undefined);

  const handleClickAvatar = (avatar) => {
    setSelectAvatar(avatar);
  };

  const handleClickAceptar = () =>{
    alert(selectAvatar);
  }

  return (
    <PatientLayout title="Elegir Avatar - Habla+">
      <div className={css.contenedorMain}>
        <Typography className={css.title}>Elege tu avatar</Typography>
        <Box component={"div"} className={css.contenedorAvatar}>
          <Avatar
            src="http://localhost:3000/img/avatar2.1.png"
            className={`${css.customAvatar} ${
              selectAvatar == 1 ? css.currentSelect : ""
            }`}
            onClick={() => handleClickAvatar(1)}
          />
          <Avatar
            src="http://localhost:3000/img/avatar1.png"
            className={`${css.customAvatar} ${
              selectAvatar == 2 ? css.currentSelect : ""
            }`}
            onClick={() => handleClickAvatar(2)}
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
