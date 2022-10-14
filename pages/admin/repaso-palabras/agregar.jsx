import { Box, Typography } from "@mui/material";
import { ContenedorInputs } from "../../../Components";
import { useGetCategories } from "../../../Components/Categorias/Hooks";
import { useSentencesReview } from "../../../Components/Oraciones/Hooks";
import { AdminLayouts } from "../../../Layouts";

const PageAdminRepasoAgregar = () => {
  const { categories, isLoading } = useGetCategories();
  const { addSentence } = useSentencesReview();

  const handleSubmitForm = (data) => {
    addSentence(data);
  };

  return (
    <AdminLayouts titlePage={"Oraciones de repaso / Agregar"}>
      <Box component={"div"}>
        <Typography component={"h2"} variant="h1" textAlign={"center"} mt={1}>
          Registrar oración
        </Typography>
        <Box component={"div"} width="100%" mt={1}>
          {!isLoading && (
            <ContenedorInputs
              categories={categories || []}
              handleSubmitEvent={handleSubmitForm}
            />
          )}
        </Box>
      </Box>
    </AdminLayouts>
  );
};

export default PageAdminRepasoAgregar;
