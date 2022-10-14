import { useRouter } from "next/router";
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

import { useSentencesReview, useGetSentences } from "./Hooks";
import { SweetAlert } from "../../helpers";

export const TableSentences = () => {
  const router = useRouter();
  const { sentences, isLoading } = useGetSentences();
  const { deleteSentence } = useSentencesReview();

  const handleClickEdit = (idUnique) => {
    return router.push(`/admin/repaso-palabras/editar/${idUnique}`);
  };

  const handleClickDelete = async (sentence) => {
    const result = await SweetAlert.deleteConfirm({
      title: "¿Está seguro de eliminar esta oración?",
      text: "Una vez realizada Ud. no podrá revertir está acción",
    });

    if (result.isConfirmed) {
      deleteSentence(sentence.id_sentence);
    }
  };

  if (isLoading) {
    return (
      <Box component={"div"}>
        <Typography>Cargando...</Typography>
      </Box>
    );
  }

  if (sentences?.length == 0) {
    return (
      <Box component={"div"}>
        <Typography>No hay palabras registradas</Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table sx={{ minWidth: 400 }}>
        <TableHead>
          <TableRow>
            <TableCell>Oración</TableCell>
            <TableCell>
              Palabra <br /> asociada
            </TableCell>
            <TableCell>Pictograma Uno</TableCell>
            <TableCell>Pictograna dos</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sentences.map((sentence) => (
            <TableRow
              key={sentence.id_unique}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell sx={{ padding: "5px", paddingX: 2.5, maxWidth: 500 }}>
                <Typography>{sentence.sentence}</Typography>
              </TableCell>
              <TableCell
                sx={{
                  padding: "5px",
                  textTransform: "capitalize",
                  textAlign: "center",
                }}
              >
                <Typography>{sentence.word_name}</Typography>
              </TableCell>
              <TableCell sx={{ padding: "5px", textAlign: "center" }}>
                <Box
                  component={"img"}
                  src={sentence.pictograma_one.url}
                  alt={sentence.pictograma_one.id_word}
                  sx={{ width: 80, userSelect: "none" }}
                />
              </TableCell>
              <TableCell sx={{ padding: "5px", textAlign: "center" }}>
                <Box
                  component={"img"}
                  src={sentence.pictograma_two.url}
                  alt={sentence.pictograma_two.id_word}
                  sx={{ width: 80, userSelect: "none" }}
                />
              </TableCell>
              <TableCell sx={{ padding: "5px" }}>
                <Box component="div" display={"flex"}>
                  <IconButton
                    size="large"
                    onClick={() => handleClickEdit(sentence.id_unique)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    size="large"
                    onClick={() => handleClickDelete(sentence)}
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
