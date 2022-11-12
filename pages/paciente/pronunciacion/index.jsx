import { useEffect } from "react";
import Link from "next/link";
import { Box, ButtonBase } from "@mui/material";
import axios from "axios";
import { PatientLayout } from "../../../Layouts";
import css from "../../../styles/PalabrasPaciente.module.scss";

const PagePacienteCategoria = ({ categories }) => {
  useEffect(() => {
    saveInfoSettingPronun(categories);
  }, []);

  function saveInfoSettingPronun(array) {
    if (array.length != 0) {
      const settingText = localStorage.getItem("settingPronunciacion");
      if (settingText) {
        try {
          const setting = JSON.parse(settingText);
          setting.total = array.length;
        } catch (error) {
          localStorage.removeItem("settingPronunciacion");
          saveInfoSettingPronun(array);
        }
      } else {
        const setting = {
          total: array.length,
          repasado: 0,
        };
        localStorage.setItem("settingPronunciacion", JSON.stringify(setting));
      }
    }
  }

  function ButtonsCategorias({ category = undefined, image }) {
    let url = "#";
    if (category) {
      delete category.icon;
      const base64Category = btoa(JSON.stringify(category));
      url = `/paciente/pronunciacion/${base64Category}`;
    }

    return (
      <Link href={url}>
        <ButtonBase className={css.buttonCategorias}>
          <Box
            component={"img"}
            src={image}
            className={css.buttonCategoriasImage}
          />
        </ButtonBase>
      </Link>
    );
  }

  return (
    <PatientLayout
      currentUser
      configButton
      title="Categorias de Aprendizaje - Habla+"
      urlBackground="fondo4.png"
    >
      <Box component="div" className={css.contenedorCategoriasPalabras}>
        <Box component={"div"} className={css.contenedorCategorias}>
          {categories.map((cat) => (
            <ButtonsCategorias
              key={cat.id_category}
              category={cat}
              image={cat.icon2}
            />
          ))}
        </Box>
      </Box>
    </PatientLayout>
  );
};

export default PagePacienteCategoria;

export const getServerSideProps = async ({ req }) => {
  let categories = [];
  try {
    const { SESSION_ID } = req.cookies;
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_URL_API;
    axios.defaults.headers.common["Authorization"] = `Bearer ${SESSION_ID}`;

    const { data } = await axios.get("/category");
    categories = data.data;
    return {
      props: {
        categories,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/paciente",
        permanent: false,
      },
    };
  }
};
