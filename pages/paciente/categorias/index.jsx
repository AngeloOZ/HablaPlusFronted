import Link from "next/link";
import { Box, ButtonBase } from "@mui/material";
import axios from "axios";
import { PatientLayout } from "../../../Layouts";
import css from "../../../styles/PalabrasPaciente.module.scss";

const PagePacienteCategoria = ({ categories }) => {
  function ButtonsCategorias({ url = "#", image }) {
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
    <PatientLayout currentUser configButton title="Categorias de Aprendizaje - Habla+">
      <Box component="div" className={css.contenedorCategoriasPalabras}>
        <Box component={"div"} className={css.contenedorCategorias}>
          {categories.map((cat) => (
            <ButtonsCategorias key={cat.id_category} image={cat.icon} />
          ))}
        </Box>
      </Box>
    </PatientLayout>
  );
};

export default PagePacienteCategoria;

export const getStaticProps = async (ctx) => {
  let categories = [];
  try {
    const { data } = await axios.get("/category");
    categories = data.data;
    return {
      props: {
        categories,
      },
      revalidate: 60,
    };
  } catch (err) {
    // console.log(err);
    return {
      props: {
        categories: [],
      },
    };
  }
};
