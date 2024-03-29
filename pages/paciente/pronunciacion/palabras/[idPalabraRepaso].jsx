import { useRef, useState, useEffect, useContext } from "react";
import { Box, ButtonBase, Typography } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";

import { Pictograma, ModalSuccess, ModalFailed } from "../../../../Components";
import { PatientLayout } from "../../../../Layouts";
import { ModalContext } from "../../../../Context";

import css from "../../../../styles/PalabrasPaciente.module.scss";
import { useSpeechRecognition } from "../../../../Hooks/useSpeechRecognition";
import { useUpdateAvatar } from "../../../../Hooks";

const PagePalabraDinamic = ({ words }) => {
  const router = useRouter();
  const { addAvatar } = useUpdateAvatar();
  const { toogleModalState } = useContext(ModalContext);
  const { current: currentWord, next: nextWord } = words;
  const word = currentWord.description.replaceAll("*", "");

  const { startRecognition, recognizedText, confidense, isEndRecognition } =
    useSpeechRecognition();
  const [animatedInit, setAnimatedInit] = useState(false);
  const [messageFailed, setMessageFailed] = useState(
    `Tu pronunciación no coincide con la palabra ${word}, vuelve a intentarlo`
  );
  const [modalState, setModalState] = useState({
    success: false,
    failed: false,
  });
  const [textNextButton, setTextNextButton] = useState("");
  const reproductoRef = useRef(null);
  

  useEffect(() => {
    if (isEndRecognition) {
      setAnimatedInit(false);
    }
  }, [isEndRecognition]);

  useEffect(() => {
    if (recognizedText.length > 0) {
      verifyRecordWord();
    }
  }, [recognizedText, confidense]);

  const verifyRecordWord = () => {
    const currentWordB = word;
    console.log("currentWordB: "+currentWordB);
    console.log("recognizedText: "+recognizedText);

    if (currentWordB.length === recognizedText.length) {
      if (currentWordB === recognizedText) {
        if (confidense > 80) {
          if (nextWord) {
            setTextNextButton("Siguiente palabra");
          } else {
            setTextNextButton("Siguiente sección");
          }
          setModalState({ success: true, failed: false });
        } else if (confidense <= 80 && confidense >= 70) {
          setMessageFailed(
            "Woow casi lo logras, solo un poco más, vamos inténtalo de nuevo "
          );
          setModalState({ success: false, failed: true });
        } else {
          setMessageFailed(
            "Owm aún te falta práctica, puedes hacerlo mejor, vuelve a intentarlo"
          );
          setModalState({ success: false, failed: true });
        }
      } else {
        setMessageFailed(
          `Tu pronunciación no coincide con la palabra ${word}, vuelve a intentarlo`
        );
        setModalState({ success: false, failed: true });
      }
    } else {
      setMessageFailed(
        `Tu pronunciación no coincide con la palabra ${word}, vuelve a intentarlo`
      );
      setModalState({ success: false, failed: true });
    }
    toogleModalState(true);
  };

  const handleClickPlay = () => {
    try {
      reproductoRef.current.play();
    } catch (error) {
      console.log(error)
    }
  };

  const handleClickRecord = () => {
    startRecognition();
    setAnimatedInit(!animatedInit);
  };

  async function updateSetting() {
    const settingText = localStorage.getItem("settingPronunciacion");
    if (settingText) {
      try {
        const setting = JSON.parse(settingText);
        setting.repasado = setting.repasado + 1;
        localStorage.setItem("settingPronunciacion", JSON.stringify(setting));

        if (setting.repasado == setting.total) {
          await addAvatar(5);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleClickNextWordModal = async () => {
    toogleModalState(false);
    if (nextWord) {
      setModalState({ success: false, failed: false });
      router.push(`/paciente/pronunciacion/palabras/${nextWord.id_unique}`);
    } else {
      await updateSetting()
      router.push(`/paciente/pronunciacion`);
    }
  };

  return (
    <PatientLayout
      currentUser
      configButton
      urlToProfile="/paciente/pronunciacion"
      title={`Palabra: ${word} - Habla+`}
      urlBackground="fondo4.png"
      disableUrlLogo={true}
    >
      <audio
        id="reproductorID"
        src={currentWord.audio}
        ref={reproductoRef}
        style={{ display: "none" }}
      ></audio>
      <Box component={"div"} className={css.containerCurrentWord}>
        <Box component={"div"} className={css.subContenedorWord}>
          <Pictograma src={currentWord.icon} color="secondary" />
          <Box component={"div"} className={css.contenedorText}>
            <Typography
              component="h1"
              className={css.textWordRed}
              fontSize={word.length > 7 ? 45 : 60}
              dangerouslySetInnerHTML={{ __html: currentWord.pronunciation }}
            ></Typography>
            <ButtonBase className={css.buttonPlay} onClick={handleClickPlay}>
              <Box
                component={"img"}
                alt="Habla+ boton play rojo"
                src={`${process.env.NEXT_PUBLIC_URL}img/botones/btn-play-red.png`}
              />
            </ButtonBase>
            <ButtonBase
              className={css.buttonRecord}
              onClick={handleClickRecord}
            >
              <Box
                component={"img"}
                alt="Habla+ boton record rojo"
                src={`${process.env.NEXT_PUBLIC_URL}img/botones/btn-record-red.png`}
                className={`${animatedInit ? css.animationStart : ""}`}
              />
            </ButtonBase>
          </Box>
        </Box>
      </Box>
      {modalState.success && (
        <ModalSuccess
          textButton={textNextButton}
          handleClickNext={handleClickNextWordModal}
        />
      )}
      {modalState.failed && <ModalFailed textBody={messageFailed} />}
    </PatientLayout>
  );
};

export default PagePalabraDinamic;

export const getServerSideProps = async ({ req, params }) => {
  try {
    const { SESSION_ID } = req.cookies;
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_URL_API;
    axios.defaults.headers.common["Authorization"] = `Bearer ${SESSION_ID}`;
    
    const idWord = params.idPalabraRepaso;
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
        destination: "/paciente/pronunciacion",
        permanent: false,
      },
    };
  }
};
