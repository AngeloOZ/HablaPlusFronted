import Link from "next/link";
import { Box, ButtonBase } from "@mui/material";
import axios from "axios";
import { PatientLayout } from "../../../Layouts";
import css from "../../../styles/PalabrasPaciente.module.scss";

const PagePacienteCategoria = ({ categories }) => {
  function ButtonsCategorias({ category = undefined, image }) {
    let url = "#";
    if (category) {
      delete category.icon;
      const base64Category = btoa(JSON.stringify(category));
      url = `/paciente/vocabulario/${base64Category}`;
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
      urlBackground="fondo5.png"
    >
      <Box component="div" className={css.contenedorCategoriasPalabras}>
        <Box component={"div"} className={css.contenedorCategorias}>
          {categories.map((cat) => (
            <ButtonsCategorias
              key={cat.id_category}
              category={cat}
              image={cat.icon}
            />
          ))}
        </Box>
      </Box>
    </PatientLayout>
  );
};

export default PagePacienteCategoria;

export const getServerSideProps = async (ctx) => {
  let categories = [];
  try {
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
