import { useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { AdminLayouts } from "../../Layouts";
import { useGetCategories } from "../../Components/Categorias/Hooks/";
import { GridTableCategories } from "../../Components/Categorias";

const AdminCategories = () => {
  const { categories, isLoading } = useGetCategories();
  const [openModal, setOpenModal] = useState(false);

  return (
    <AdminLayouts titlePage={"Categorias"}>
      <Box
        component={"div"}
        width="100%"
        display={"flex"}
        justifyContent={"flex-end"}
      >
        <Button onClick={() => setOpenModal(!openModal)}>
          Agregar categoria
        </Button>
      </Box>
      <Box component={"div"} marginTop={3}>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <GridTableCategories
            categories={categories || []}
            setOpen={setOpenModal}
            open={openModal}
          />
        )}
      </Box>
    </AdminLayouts>
  );
};

export default AdminCategories;
