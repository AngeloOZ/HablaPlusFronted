import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import {
  ButtonPatient,
  ModalFailed,
  ModalSuccess,
  Pictograma,
} from "../../../Components";
import { PatientLayout } from "../../../Layouts";
import { ModalContext } from "../../../Context";
import { useUpdateAvatar } from "../../../Hooks";

import css from "../../../styles/Comprension.module.scss";

const PageIdSentence = () => {
  const router = useRouter();
  const { addAvatar } = useUpdateAvatar();
  const { toogleModalState } = useContext(ModalContext);
  const [idSentence, setIdSentence] = useState(router.query.idSentence);
  const [currentSentence, setCurrentSentence] = useState({});
  const [listSentences, setListSentences] = useState([]);
  const [selectedCorrect, setSelectedCorrect] = useState(false);
  const [textButtonNext, settextButtonNext] = useState("Siguiente oración");
  const [isFinish, setIsFinish] = useState(false);
  const [selected, setSelected] = useState(0);
  const [number, setNumber] = useState(0);

  const [modalState, setModalState] = useState({
    success: false,
    failed: false,
  });

  useEffect(() => {
    console.log(idSentence);
    const list = getSentences();
    const sentence = list.shift();
    setListSentences(list);
    setNumber(getRandomInt(6));
    setCurrentSentence(sentence);
  }, [idSentence]);

  useEffect(() => {
    if (listSentences.length == 0) {
      settextButtonNext("Terminar sección");
      setIsFinish(true);
    } else {
      settextButtonNext("Siguiente oración");
      setIsFinish(false);
    }
  }, [currentSentence]);

  const redirectTo = (id) => {
    setSelected(0);
    setSelectedCorrect(false);
    setModalState({ success: false, failed: false });
    setIdSentence(id);
    router.push({
      pathname: "/paciente/comprension/[idSentence]",
      query: { idSentence: id },
    });
  };

  function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
  }

  const saveSentences = (sentences) => {
    try {
      const json = JSON.stringify(sentences);
      localStorage.setItem("listSentences", json);
    } catch (error) {
      console.log(error);
    }
  };

  const getSentences = () => {
    try {
      const stringJson = localStorage.getItem("listSentences");
      if (stringJson) {
        const sentences = JSON.parse(stringJson);
        return sentences;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickPicture1 = (is_correct) => {
    setSelected(1);
    setSelectedCorrect(is_correct);
  };

  const handleClickPicture2 = (is_correct) => {
    setSelected(2);
    setSelectedCorrect(is_correct);
  };

  const handleClickComrprobar = () => {
    toogleModalState(true);
    if (selectedCorrect) {
      setModalState({ success: true, failed: false });
    } else {
      setModalState({ success: false, failed: true });
    }
  };

  const handleClickNext = () => {
    if (!isFinish) {
      let nextSentence = undefined;
      if (selectedCorrect) {
        saveSentences(listSentences);
        nextSentence = listSentences[0];
      } else {
        const sentences = [...listSentences, currentSentence];
        saveSentences(sentences);
        setListSentences(sentences);
        nextSentence = sentences[0];
      }
      redirectTo(nextSentence.id_unique);
    } else {
      handleClickFinish();
    }
  };
  const handleClickFinish = async () => {
    await addAvatar(6);
  };

  return (
    <PatientLayout
      currentUser
      configButton
      title="Comprensión - Habla+"
      urlBackground="fondo3.png"
      urlToProfile="/paciente/comprension"
    >
      <Box component={"div"} className={css.contenedorComprension}>
        <Box component={"div"} className={css.subContenedor}>
          <Typography component={"h1"} className={css.sentence}>
            {currentSentence.sentence}
          </Typography>
          <div
            className={`${css.contenedorPictogramas} ${
              number <= 3 ? css.reverse : ""
            }`}
          >
            <Pictograma
              src={currentSentence?.pictograma_one?.url}
              className={`${css.pictogramaCustom} ${
                selected == 1 ? css.selected : ""
              }`}
              onClick={() => {
                handleClickPicture1(
                  currentSentence?.pictograma_one?.is_correct
                );
              }}
            />
            <Pictograma
              src={currentSentence?.pictograma_two?.url}
              className={`${css.pictogramaCustom} ${
                selected === 2 ? css.selected : ""
              }`}
              onClick={() => {
                handleClickPicture2(
                  currentSentence?.pictograma_two?.is_correct
                );
              }}
            />
          </div>
          {selected !== 0 && (
            <div className={css.contenedorBoton}>
              <ButtonPatient
                className={css.button}
                onClickC={handleClickComrprobar}
              >
                Comprobar
              </ButtonPatient>
            </div>
          )}
        </Box>
      </Box>
      {modalState.success && (
        <ModalSuccess
          textButton={textButtonNext}
          handleClickNext={handleClickNext}
        />
      )}
      {modalState.failed && (
        <ModalFailed
          textBody={"Lo siento, te has equivocado"}
          textButton="Siguiente"
          onClick={handleClickNext}
        />
      )}
    </PatientLayout>
  );
};

export default PageIdSentence;

export const getServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};
