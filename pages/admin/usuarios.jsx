import { useContext } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { AdminLayouts } from "../../Layouts";
import { ModalContext } from "../../Context";
import { ModaUsuarios, TablaUsuarios, useGetUser } from "../../Components";

const PageAdminUsuarios = () => {
  const { toogleModalState, openModal, editModal, toogleIsEdit, currentData } =
    useContext(ModalContext);
  const { isLoading: isLoading1, users: users1 } = useGetUser(1);
  const { isLoading: isLoading2, users: users2 } = useGetUser(2);
  return (
    <AdminLayouts titlePage={"Usuarios"}>
      <Box
        component={"div"}
        width="100%"
        display={"flex"}
        justifyContent={"flex-end"}
        my={3}
      >
        <Button onClick={() => toogleModalState(true)}>Agregar Palabra</Button>
      </Box>
      {/* Acordion admin */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
        >
          <Typography textTransform={"capitalize"}>Administrativos</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TablaUsuarios isLoading={isLoading1} usuarios={users1} />
        </AccordionDetails>
      </Accordion>
      {/* Acordion pacientes */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
        >
          <Typography textTransform={"capitalize"}>Pacientes</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TablaUsuarios isLoading={isLoading2} usuarios={users2} />
        </AccordionDetails>
      </Accordion>

      {editModal ? (
        <ModaUsuarios
          open={openModal}
          setOpen={toogleModalState}
          isEdit={editModal}
          setIsEdit={toogleIsEdit}
          initDataForm={currentData}
        />
      ) : (
        <ModaUsuarios
          open={openModal}
          setOpen={toogleModalState}
        />
      )}
    </AdminLayouts>
  );
};

export default PageAdminUsuarios;
