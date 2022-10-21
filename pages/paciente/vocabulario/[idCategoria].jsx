import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";
import axios from "axios";

import { ButtonPatient } from "../../../Components";
import { PatientLayout } from "../../../Layouts";
import css from "../../../styles/PalabrasPaciente.module.scss";
import { SweetAlert } from "../../../helpers";

const PageCategoriaDinamic = ({ category, word }) => {
  const router = useRouter();
  const handleClick = () => {
    if (word.id_unique) {
      router.push(`/paciente/vocabulario/palabra/${word.id_unique}`)
    } else {
      SweetAlert.error({
        title: "Oops...",
        text: "No hay palabras registradas en esta categoria",
        onClose: () => {
          router.push("/paciente/vocabulario");
        },
      });
    }
  };
  return (
    <PatientLayout
      currentUser
      configButton
      urlToProfile="/paciente/vocabulario"
      title={`Categorias de ${category.description} - Habla+`}
      urlBackground="fondo5.png"
    >
      <Box component={"div"} className={css.contenedorPalabraCat}>
        <Typography component={"h1"} variant="h1" className={css.titleStart}>
          Vamos a aprender sobre <span>{category.description}</span>
        </Typography>
        <ButtonPatient className={css.botonStart} onClickC={handleClick}>
          Empezar sección
        </ButtonPatient>
      </Box>
    </PatientLayout>
  );
};

export default PageCategoriaDinamic;

export const getServerSideProps = async ({ params }) => {
  try {
    const { idCategoria } = params;
    const base64Category = atob(idCategoria);
    const category = JSON.parse(base64Category);
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_URL_API;
    const { data } = await axios.get(
      `/category/${category.id_category}/words?limit=1`
    );
    let word = {};
    if (data.data.length !== 0) {
      word = data.data[0];
    }

    return {
      props: {
        word,
        category,
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
