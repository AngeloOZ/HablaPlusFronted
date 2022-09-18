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

const PageInicioPaciente = () => {

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
            src="http://localhost:3000/img/avatar1.png"
            size="large"
          />
        </Box>
        <Box component="div" className={css.contenedorButtons}>
          <ButtonMenu url="/paciente/videos" imagen={videoImageMenu} />
          <ButtonMenu url="/paciente/categorias" imagen={palabrasImageMenu} />
          <ButtonMenu url="#" imagen={practicaImageMenu} />
          <ButtonMenu url="#" imagen={oracionesImageMenu} />
        </Box>
      </Box>
    </PatientLayout>
  );
};

export default PageInicioPaciente;
