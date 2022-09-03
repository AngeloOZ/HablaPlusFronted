import axios from "axios";
import { Box, Button } from "@mui/material";
import { AdminLayouts } from "../../Layouts";
import { AccordionWords } from "../../Components";
import { useContext } from "react";
import { ModalContext } from "../../Context";
import { ModalWords } from "../../Components/Word";

const PagePalabras = ({ categories }) => {
  const { toogleModalState, openModal } = useContext(ModalContext);
  return (
    <AdminLayouts titlePage={"Palabras"}>
      <Box
        component={"div"}
        width="100%"
        display={"flex"}
        justifyContent={"flex-end"}
      >
        <Button onClick={() => toogleModalState(true)}>Agregar Palabra</Button>
      </Box>
      <Box component={"div"} mt={2}>
        {categories.map((category) => (
          <AccordionWords key={category.id_category} category={category} />
        ))}
      </Box>
      <ModalWords open={openModal} setOpen={toogleModalState} />
    </AdminLayouts>
  );
};

export default PagePalabras;

export const getStaticProps = async (ctx) => {
  let categories = {};
  try {
    const { data } = await axios.get("/category");
    categories = data.data;
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      categories,
    },
    revalidate: 60,
  };
};
