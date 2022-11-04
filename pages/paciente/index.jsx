import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";

import { Box, ButtonBase } from "@mui/material";
import { CircleAvatar } from "../../Components";
import { PatientLayout } from "../../Layouts";
import css from "../../styles/Inicio.module.scss";

import videoImageMenu from "../../public/img/menu/video.png";
import palabrasImageMenu from "../../public/img/menu/palabras.png";
import practicaImageMenu from "../../public/img/menu/practica.png";
import oracionesImageMenu from "../../public/img/menu/oraciones.png";
import { AuthContext } from "../../Context";

const PageInicioPaciente = () => {
  const { avatar } = useContext(AuthContext);

  function ButtonMenu({ url = "#", imagen }) {
    return (
      <Link href={url} passHref>
        <ButtonBase className={css.buttonMenu}>
          <Image src={imagen} alt="Habla+ menu" />
        </ButtonBase>
      </Link>
    );
  }

  return (
    <PatientLayout title="Inicio - Habla+">
      <Box component="div" className={css.contenedorMenu}>
        <Box component={"div"} className={css.contenedorAvatar}>
          <CircleAvatar
            srcImage={avatar}
            size="large"
          />
        </Box>
        <Box component="div" className={css.contenedorButtons}>
          <ButtonMenu url="/paciente/videos" imagen={videoImageMenu} />
          <ButtonMenu url="/paciente/vocabulario" imagen={palabrasImageMenu} />
          <ButtonMenu
            url="/paciente/pronunciacion"
            imagen={practicaImageMenu}
          />
          <ButtonMenu url="/paciente/comprension" imagen={oracionesImageMenu} />
        </Box>
      </Box>
    </PatientLayout>
  );
};

export default PageInicioPaciente;
