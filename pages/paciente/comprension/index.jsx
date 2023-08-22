import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Box, Typography } from "@mui/material";

import { AuthContext } from "../../../Context";
import { PatientLayout } from "../../../Layouts";
import { ButtonPatient, LoaderPatient } from "../../../Components";
import css from "../../../styles/Comprension.module.scss";
import { SweetAlert } from "../../../helpers";

const PageIndexComprension = () => {
  const authUser = useContext(AuthContext);
  const router = useRouter();
  const [sentence, setSentence] = useState(undefined);
  const [listSentences, setListSentences] = useState(undefined);

  useEffect(() => {
    axios
      .get(`word_learned/user/sentences`)
      .then((response) => response.data)
      .then((response) => response.data)
      .then((sentences) => {
        if (sentences.length != 0) {
          const json = JSON.stringify(sentences);
          setSentence(sentences[0]);
          localStorage.setItem("listSentences", json);
          setListSentences(sentences);
        } else {
          SweetAlert.error({
            title: "Oops...!",
            text: "Parece que aún no has revisado las secciones anteriores",
            onClose: redirectHome,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        router.push("/paciente");
      });
      // eslint-disable-next-line
  }, []);

  const redirectHome = () => {
    router.push("/paciente");
  };

  const handleClickStart = () => {
    if (sentence?.id_unique) {
      router.push(`/paciente/comprension/${sentence.id_unique}`);
    }
  };

  return (
    <PatientLayout
      currentUser
      configButton
      title="Categorias de Aprendizaje - Habla+"
      urlBackground="fondo3.png"
    >
      <Box className={css.contenedorMain}>
        {listSentences && listSentences.length != 0 ? (
          <>
            <Typography component={"h1"} className={css.titleMain}>
              ¿Estás listo para poner a prueba tu conocimiento?
            </Typography>
            <ButtonPatient
              className={css.buttonMain}
              onClickC={handleClickStart}
            >
              Empezar repaso
            </ButtonPatient>
          </>
        ) : (
          <LoaderPatient />
        )}
      </Box>
    </PatientLayout>
  );
};

export default PageIndexComprension;
