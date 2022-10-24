import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Box, Typography } from "@mui/material";

import { PatientLayout } from "../../../Layouts";
import css from "../../../styles/Comprension.module.scss";
import { ButtonPatient } from "../../../Components";

const PageIndexComprension = () => {
  const router = useRouter();
  const [sentence, setSentence] = useState(undefined);

  useEffect(() => {
    axios
      .get("word_learned/user/1")
      .then((response) => response.data)
      .then((response) => response.data)
      .then((sentences) => {
        console.log(sentences);
        const json = JSON.stringify(sentences);
        localStorage.setItem("listSentences", json);
      })
      .catch((error) => {
        console.log(error);
        router.push("/paciente");
      });
  }, []);

  const handleClickStart = () =>{
    alert("click")
  }

  return (
    <PatientLayout
      currentUser
      configButton
      title="Categorias de Aprendizaje - Habla+"
      urlBackground="fondo3.png"
    >
      <Box className={css.contenedorMain}>
        <Typography component={"h1"} className={css.titleMain}>
          Que empiece el repaso de ...
        </Typography>
        <ButtonPatient className={css.buttonMain} onClickC={handleClickStart}>Empezar repaso</ButtonPatient>
      </Box>
    </PatientLayout>
  );
};

export default PageIndexComprension;
