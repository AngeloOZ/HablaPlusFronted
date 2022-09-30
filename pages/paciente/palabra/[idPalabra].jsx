import { useRef, useState, useEffect } from "react";
import { Box, ButtonBase, Typography } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";

import { ButtonPatient, Pictograma } from "../../../Components";
import { PatientLayout } from "../../../Layouts";

import css from "../../../styles/PalabrasPaciente.module.scss";

const PagePalabraDinamic = ({ words }) => {
  const { current: currtentWord, next: nextWord } = words;
  const word = currtentWord.description.replaceAll("*", "");

  const router = useRouter();
  const [isPlayed, setIsPlayed] = useState(false);
  const reproductoRef = useRef(null);

  useEffect(() => {
    reproductoRef.current?.addEventListener("ended", () => setIsPlayed(true));
  }, []);

  const handleClickPlay = () => {
    reproductoRef.current.play();
  };

  const handleClickNext = () => {
    setIsPlayed(false);
    router.push(`/paciente/palabra/${nextWord.id_unique}`);
  };

  const handleClickFinish = () => {
    router.push(`/paciente/categorias`);
  };

  return (
    <PatientLayout
      currentUser
      configButton
      urlToProfile="/paciente/categorias/"
      title={`Palabra: ${word} - Habla+`}
      urlBackground="fondo5.png"
      disableUrlLogo={true}
    >
      <audio
        src={currtentWord.audio}
        ref={reproductoRef}
        style={{ display: "none" }}
      ></audio>
      <Box component={"div"} className={css.containerCurrentWord}>
        <Box component={"div"} className={css.subContenedorWord}>
          <Pictograma src={currtentWord.icon} />
          <Box component={"div"} className={css.contenedorText}>
            <Typography component="h1" className={css.textWord}>
              {word}
            </Typography>
            <ButtonBase className={css.buttonPlay} onClick={handleClickPlay}>
              <Box
                component={"img"}
                alt="Habla+ boton azul"
                src={`${process.env.NEXT_PUBLIC_URL}img/botones/btn-play-blue.png`}
              />
            </ButtonBase>
          </Box>
        </Box>

        <Box className={css.containerButton}>
          {isPlayed && nextWord && (
            <ButtonPatient
              className={css.buttonNext}
              onClickC={handleClickNext}
            >
              Sigueinte palabra
            </ButtonPatient>
          )}
          {isPlayed && !nextWord && (
            <ButtonPatient
              className={css.buttonNext}
              onClickC={handleClickFinish}
            >
              Finalizar seccion
            </ButtonPatient>
          )}
        </Box>
      </Box>
    </PatientLayout>
  );
};

export default PagePalabraDinamic;

export const getServerSideProps = async ({ params }) => {
  try {
    const idWord = params.idPalabra;
    const { data } = await axios.get(`/word/unique/${idWord}`);
    const words = data.data;
    return {
      props: {
        words,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/paciente/categorias",
        permanent: false,
      },
    };
  }
};
