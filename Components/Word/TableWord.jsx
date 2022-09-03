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
import { Edit, Delete } from "@mui/icons-material";
import { useGetWords } from "./Hooks/useGetWords";

export const TableWord = ({ category }) => {
  const { words, isLoading } = useGetWords(category.id_category);
  if (isLoading) {
    return (
      <Box component={"div"}>
        <Typography>Cargando...</Typography>
      </Box>
    );
  }
  if (words.length == 0) {
    return (
      <Box component={"div"}>
        <Typography>No hay palabras registradas </Typography>
      </Box>
    );
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }}>
        <TableHead>
          <TableRow>
            <TableCell>Palabra</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>Imagén</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {words.map((word) => (
            <TableRow
              key={word.id_word}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <Typography textTransform={"capitalize"}>
                    {word.description}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography textTransform={"capitalize"}>
                  {category.description}
                </Typography>
              </TableCell>
              <TableCell>
                <Box component={"img"} src={word.icon} alt={word.description} width={120}  />
              </TableCell>
              <TableCell>
                <Box component="div" display={"flex"}>
                  <IconButton aria-label="edit" size="large">
                    <Edit />
                  </IconButton>
                  <IconButton aria-label="delete" size="large">
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
