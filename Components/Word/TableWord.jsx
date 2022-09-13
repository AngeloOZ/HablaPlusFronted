import { useContext, useState } from "react";
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
import { ModalContext } from "../../Context";
import { useDeleteWord } from "./Hooks/useDeleteWord";
import { SweetAlert } from "../../helpers";
import { useRef } from "react";
import { useEffect } from "react";
import ButtonsPlayAudio from "./ButtonsPlayAudio";

export const TableWord = ({ category }) => {
  const { updateCurrentData, toogleModalState, toogleIsEdit } =
    useContext(ModalContext);
  const { words, isLoading } = useGetWords(category.id_category);

  const [currentUrlAudio, setCurrentUrlAudio] = useState("");
  const reproductor = useRef(null);

  const handleEditWord = (word) => {
    toogleIsEdit(true);
    toogleModalState(true);
    updateCurrentData(word);
  };

  const handleDeleteWord = async (word) => {
    const result = await SweetAlert.deleteConfirm({
      title: `Está seguro de eliminar la palabra: ${word.description}`,
      text: "Una vez realizada Ud. no podrá revertir está acción",
    });

    if (result.isConfirmed) {
      useDeleteWord(word);
    }
  };

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
      <audio
        ref={reproductor}
        src={currentUrlAudio}
        style={{ display: "none" }}
      ></audio>
      <Table sx={{ minWidth: 400 }}>
        <TableHead>
          <TableRow>
            <TableCell>Palabra</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>Imagén</TableCell>
            <TableCell>Audio</TableCell>
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
                  {word.description.replaceAll("*", "")}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography textTransform={"capitalize"}>
                  {category.description}
                </Typography>
              </TableCell>
              <TableCell>
                <Box
                  component={"img"}
                  src={word.icon}
                  alt={word.description}
                  width={120}
                />
              </TableCell>
              <TableCell>
                <ButtonsPlayAudio
                  ref={reproductor}
                  url={word.audio}
                  setUrl={setCurrentUrlAudio}
                />
              </TableCell>
              <TableCell>
                <Box component="div" display={"flex"}>
                  <IconButton size="large" onClick={() => handleEditWord(word)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    size="large"
                    onClick={() => handleDeleteWord(word)}
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
