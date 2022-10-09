import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useWords } from "../Word/Hooks/useWords";

export const ContenedorInputs = ({ categories }) => {
  const url = `${process.env.NEXT_PUBLIC_URL}img/placeholder-image.jpg`;
  const { getWordsByCategory } = useWords();
  const [chosenCategory, setChosenCategory] = useState("");
  const [chosenWord, setChosenWord] = useState("");
  const [currentListWords, setCurrentListWords] = useState([]);
  const [listWordsFilter, setListWordsFilter] = useState([]);
  const [positionListFilter, setPositionListFilter] = useState(-1);
  const [pictography2, setPictography2] = useState(url);
  const [currentWord, setCurrentWord] = useState({ icon: url });
  const [messageWords, setMessageWords] = useState("");

  useEffect(async () => {
    const [message, words] = await getWordsByCategory(chosenCategory);
    if (message == "ok" && words.length !== 0) {
      setCurrentListWords(words);
      setListWordsFilter([]);
    } else if (message == "ok" && words.length === 0) {
      setMessageWords("No hay palabras registradas en esta categoría");
      setCurrentListWords([]);
      setListWordsFilter([]);
    } else {
      setMessageWords("Seleccione una categoria");
      setCurrentListWords([]);
      setListWordsFilter([]);
    }
  }, [chosenCategory]);

  useEffect(() => {
    if (chosenWord != "") {
      const word = currentListWords.filter(
        (word) => word.id_word == chosenWord
      );
      const list = currentListWords.filter(
        (word) => word.id_word != chosenWord
      );
      setCurrentWord(word[0]);
      setListWordsFilter(list);
      console.log(currentWord);
    }
  }, [chosenWord]);

  useEffect(() => {
    if (positionListFilter == listWordsFilter.length) {
      setPositionListFilter(0);
    }
    const aux = listWordsFilter[positionListFilter];
    if (aux?.icon) {
      setPictography2(aux.icon);
    } else {
      setPictography2(url);
    }
  }, [positionListFilter]);

  const handleChangeCategory = (event) => {
    setChosenCategory(event.target.value);
  };

  const handleChangeWord = (event) => {
    setChosenWord(event.target.value);
  };

  const handleClickCangeImage = () => {
    setPositionListFilter(positionListFilter + 1);
  };

  return (
    <Grid container spacing={1} mt={1}>
      <Grid item xs={6}>
        <FormControl fullWidth required>
          <InputLabel id="label-categoria">Categorias</InputLabel>
          <Select
            labelId="label-categoria"
            label="Categorias"
            variant="filled"
            value={chosenCategory}
            onChange={handleChangeCategory}
          >
            <MenuItem value="" selected disabled>
              Escoja una categoria
            </MenuItem>
            {categories.map((cat) => (
              <MenuItem value={cat.id_category} key={cat.id_category}>
                {cat.description}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>With label + helper text</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth required>
          <InputLabel id="label-words">Palabras</InputLabel>
          <Select
            labelId="label-words"
            label="Palabras"
            variant="filled"
            onChange={handleChangeWord}
            value={chosenWord}
          >
            {currentListWords.length == 0 ? (
              <MenuItem value="" disabled>
                <em>{messageWords}</em>
              </MenuItem>
            ) : (
              currentListWords.map((word) => (
                <MenuItem value={word.id_word} key={word.id_word}>
                  {word.description.replaceAll("*", "")}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="outlined-basic"
          label="Oración"
          variant="filled"
          required
          fullWidth
        />
      </Grid>
      <Grid item xs={6} mt={1.2}>
        <FormControl margin="dense">
          <InputLabel shrink>Pictograma correcto</InputLabel>
          <Box
            component={"div"}
            sx={{
              width: 220,
              minHeight: 130,
              bgcolor: "#ccc",
              aspectRatio: 1,
              marginTop: 2,
            }}
          >
            <Box
              component={"img"}
              src={currentWord.icon}
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        </FormControl>
      </Grid>
      <Grid item xs={6} mt={1.2}>
        <FormControl margin="dense">
          <InputLabel shrink>Pictograma incorrecto</InputLabel>
          <Box
            component={"div"}
            sx={{
              width: 220,
              minHeight: 130,
              bgcolor: "#ccc",
              aspectRatio: 1,
              marginTop: 2,
            }}
          >
            <Box
              component={"img"}
              src={pictography2}
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
          <Button onClick={handleClickCangeImage}>Cambiar</Button>
        </FormControl>
      </Grid>
    </Grid>
  );
};
