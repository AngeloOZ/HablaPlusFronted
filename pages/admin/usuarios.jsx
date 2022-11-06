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

const PageAdminUsuarios = () => {
  const { toogleModalState } = useContext(ModalContext);
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
          {/* <TableWord category={category} /> */}
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
          {/* <TableWord category={category} /> */}
        </AccordionDetails>
      </Accordion>
    </AdminLayouts>
  );
};

export default PageAdminUsuarios;
