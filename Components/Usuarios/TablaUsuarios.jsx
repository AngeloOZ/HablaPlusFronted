import { Edit, Delete } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { ModalContext } from "../../Context";
import { SweetAlert } from "../../helpers";
import { LoaderPatient } from "../LoaderPatient";
import { useUsuarios } from "./Hooks";

export const TablaUsuarios = ({ usuarios, isLoading }) => {
  const { updateCurrentData, toogleModalState, toogleIsEdit } =
    useContext(ModalContext);

  const { deleteUserAdmin } = useUsuarios();


  const handleEditUser = (user) => {
    toogleIsEdit(true);
    toogleModalState(true);
    updateCurrentData(user);
  };

  const handleDeleteUser = async (user) => {
    const result = await SweetAlert.deleteConfirm({
      title: `Está seguro de eliminar el usuario: ${user.names}`,
      text: "Una vez realizado Ud. no podrá revertir está acción",
    });

    if (result.isConfirmed) {
        deleteUserAdmin(user);
    }
  };

  if (isLoading) {
    return <LoaderPatient />;
  }
  if (usuarios?.length == 0) {
    return (
      <Box component={"div"}>
        <Typography>No hay usuarios</Typography>
      </Box>
    );
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }}>
        <TableHead>
          <TableRow>
            <TableCell>Nombre de usuario</TableCell>
            <TableCell>Nombres</TableCell>
            <TableCell>Apellidos</TableCell>
            <TableCell>Edad</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usuarios.map((user) => (
            <TableRow
              key={user.id_user}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{user.username}</TableCell>
              <TableCell>
                <Typography textTransform={"capitalize"}>
                  {user.names}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography textTransform={"capitalize"}>
                  {user.surname}
                </Typography>
              </TableCell>
              <TableCell>{user.age}</TableCell>
              <TableCell>
                <Box component="div" display={"flex"}>
                  <IconButton size="large" onClick={() => handleEditUser(user)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    size="large"
                    onClick={() => handleDeleteUser(user)}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
