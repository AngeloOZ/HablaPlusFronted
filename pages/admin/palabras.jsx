import { useContext } from "react";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import { AdminLayouts } from "../../Layouts";
import { AccordionWords, ModalWords } from "../../Components";
import { ModalContext } from "../../Context";

const PagePalabras = ({ categories }) => {
  const { toogleModalState, openModal, editModal, toogleIsEdit, currentData } =
    useContext(ModalContext);
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
      {categories.length == 0 ? (
        <Box component={"div"} mt={3}>
          <Typography variant="h1" textAlign={"center"}>
            No hay categorias registradas
          </Typography>
        </Box>
      ) : (
        <Box component={"div"} mt={2}>
          {categories.map((category) => (
            <AccordionWords key={category.id_category} category={category} />
          ))}
        </Box>
      )}
      {editModal ? (
        <ModalWords
          open={openModal}
          setOpen={toogleModalState}
          categories={categories}
          isEdit={editModal}
          setIsEdit={toogleIsEdit}
          initDataForm={currentData}
        />
      ) : (
        <ModalWords
          open={openModal}
          setOpen={toogleModalState}
          categories={categories}
        />
      )}
    </AdminLayouts>
  );
};

export default PagePalabras;

export const getServerSideProps = async ({req}) => {
  let categories = [];
  try {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_URL_API;
    const { SESSION_ID } = req.cookies;
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_URL_API;
    axios.defaults.headers.common["Authorization"] = `Bearer ${SESSION_ID}`;
    const { data } = await axios.get("/category");
    categories = data.data;
    return {
      props: {
        categories,
      }
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        categories: [],
      },
    };
  }
};
