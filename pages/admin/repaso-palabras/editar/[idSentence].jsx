import { Box, Typography } from "@mui/material";
import axios from "axios";
import { ContenedorInputEdit } from "../../../../Components";
import { useGetCategories } from "../../../../Components/Categorias/Hooks";
import { useSentencesReview } from "../../../../Components/Oraciones/Hooks";
import { AdminLayouts } from "../../../../Layouts";

const PageAdminRepasoEditar = ({ sentence }) => {
  const { categories, isLoading } = useGetCategories();
  const { updateSentence } = useSentencesReview();

  const handleSubmitForm = (data) => {
    updateSentence(data);
  };

  return (
    <AdminLayouts
      titlePage={"Oraciones de repaso / Editar"}
      title="Admin - editar oración"
    >
      <Box component={"div"}>
        <Typography component={"h2"} variant="h1" textAlign={"center"} mt={1}>
          Editar oración
        </Typography>
        <Box component={"div"} width="100%" mt={1}>
          {!isLoading && (
            <ContenedorInputEdit
              categories={categories || []}
              handleSubmitEvent={handleSubmitForm}
              sentence={sentence}
            />
          )}
        </Box>
      </Box>
    </AdminLayouts>
  );
};

export default PageAdminRepasoEditar;

export const getServerSideProps = async ({ params }) => {
  try {
    const { idSentence } = params;
    const { data } = await axios.get(`/sentences/unique/${idSentence}`);
    const sentence = data.data;
    return {
      props: { sentence },
    };
  } catch (error) {
    console.error(error);
    return {
      redirect: { destination: "/admin/repaso-palabras", permanent: false },
    };
  }
};
