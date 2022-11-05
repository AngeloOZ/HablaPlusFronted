import { useRef, useState, useEffect, useContext } from "react";
import { Box, ButtonBase, Typography } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";

import { PatientLayout } from "../../../../Layouts";
import { useWords } from "../../../../Components/Word/Hooks";
import { ButtonPatient, Pictograma } from "../../../../Components";

import css from "../../../../styles/PalabrasPaciente.module.scss";
import { AuthContext } from "../../../../Context";

const PagePalabraDinamic = ({ words, listWordsLearned }) => {
  const authUser = useContext(AuthContext);
  const { current: currtentWord, next: nextWord } = words;
  const word = currtentWord.description.replaceAll("*", "");

  const router = useRouter();
  const [isPlayed, setIsPlayed] = useState(false);
  const { registerWordLearned } = useWords();
  const reproductoRef = useRef(null);

  useEffect(() => {
    reproductoRef.current?.addEventListener("ended", () => setIsPlayed(true));
  }, []);

  const handleClickPlay = () => {
    reproductoRef.current.play();
  };

  const handleClickNext = () => {
    const data = { id_user: authUser.id_user, id_word: currtentWord.id_word };
    registerWordLearned(listWordsLearned, data)
      .then((response) => {
        setIsPlayed(false);
        router.push(`/paciente/vocabulario/palabra/${nextWord.id_unique}`);
      })
      .catch((error) => {
        console.error(error.message);
        console.info(error.data);
      });
  };

  const handleClickFinish = () => {
    const data = { id_user: 1, id_word: currtentWord.id_word };
    registerWordLearned(listWordsLearned, data)
      .then((response) => {
        router.push(`/paciente/vocabulario`);
      })
      .catch((error) => {
        console.error(error.message);
        console.info(error.data);
      });
  };

  return (
    <PatientLayout
      currentUser
      configButton
      urlToProfile="/paciente/vocabulario/"
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
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_URL_API;
    const idWord = params.idPalabra;
    const { data } = await axios.get(`/word/unique/${idWord}`);
    const { data: listWordsLearned } = await axios.get(`/word_learned/user/1`);
    const words = data.data;
    return {
      props: {
        words,
        listWordsLearned,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/paciente/vocabulario",
        permanent: false,
      },
    };
  }
};
