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
import Link from "next/link";
import { useForm } from "react-hook-form";

export const ContenedorInputEdit = ({
  categories,
  handleSubmitEvent,
  sentence,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const url = `${process.env.NEXT_PUBLIC_URL}img/placeholder-image.jpg`;
  const { getWordsByCategory } = useWords();
  const [chosenCategory, setChosenCategory] = useState(
    sentence.pictograma_one.id_category
  );
  const [chosenWord, setChosenWord] = useState(sentence.pictograma_one.id_word);
  const [listWords, setListWords] = useState([]);
  const [listWordsFilter, setListWordsFilter] = useState([]);
  const [positionListFilter, setPositionListFilter] = useState(-1);
  const [currentWord, setCurrentWord] = useState({ icon: url });
  const [pictography2, setPictography2] = useState({ icon: url });
  const [messageWords, setMessageWords] = useState("");

  useEffect(() => {
    if (sentence) {
      setPictography2({ icon: sentence.pictograma_two.url });
      setValue("id_sentence", sentence.id_sentence);
      setValue("pictograma_one", sentence.pictograma_one.id_word);
      setValue("pictograma_two", sentence.pictograma_two.id_word);
      setValue("sentence", sentence.sentence);
    }
  }, []);

  useEffect(async () => {
    const [message, words] = await getWordsByCategory(chosenCategory);
    if (message == "ok" && words.length !== 0) {
      setListWords(words);
      setListWordsFilter([]);
    } else if (message == "ok" && words.length === 0) {
      setMessageWords("No hay palabras registradas en esta categoría");
      setListWords([]);
      setListWordsFilter([]);
    } else {
      setMessageWords("Seleccione una categoria");
      setListWords([]);
      setListWordsFilter([]);
    }
  }, [chosenCategory]);

  useEffect(() => {
    if (listWords.length != 0 && chosenWord != "") {
      const [word] = listWords.filter((word) => word.id_word == chosenWord);
      const list = listWords.filter((word) => word.id_word != chosenWord);
      setListWordsFilter(list);
      for (const key in list) {
        if (list[key].id_word == sentence.pictograma_two.id_word) {
          setPositionListFilter(key);
          break;
        }
      }
      if (word?.id_word) {
        setCurrentWord(word);
        setValue("pictograma_one", word.id_word);
      }
    }
  }, [chosenWord, listWords]);

  useEffect(() => {
    if (listWordsFilter.length != 0) {
      if (positionListFilter >= listWordsFilter.length) {
        setPositionListFilter(0);
      }
      const word = listWordsFilter[positionListFilter];
      if (word?.icon) {
        setValue("pictograma_two", word.id_word);
        setPictography2(word);
      } else {
        setPictography2({ icon: url });
        setValue("pictograma_two", undefined);
      }
    } else {
      setValue("pictograma_two", undefined);
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
    <form onSubmit={handleSubmit(handleSubmitEvent)}>
      <Grid container spacing={1} mt={1}>
        <Grid item xs={6}>
          <FormControl fullWidth required>
            <InputLabel id="label-categoria">Categorias</InputLabel>
            <Select
              labelId="label-categoria"
              label="Categorias"
              variant="outlined"
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
            <FormHelperText>{errors.icon?.message}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth required>
            <InputLabel id="label-words">Palabras</InputLabel>
            <Select
              labelId="label-words"
              label="Palabras"
              variant="outlined"
              onChange={handleChangeWord}
              value={chosenWord}
            >
              {listWords.length == 0 ? (
                <MenuItem value="" disabled>
                  <em>{messageWords}</em>
                </MenuItem>
              ) : (
                listWords.map((word) => (
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
            variant="outlined"
            fullWidth
            required
            {...register("sentence", {
              required: "La oración debe ser necesaria",
            })}
            error={!!errors.sentence}
            helperText={errors.sentence?.message}
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
                maxHeight: 220,
                bgcolor: "#ccc",
                aspectRatio: 1,
                marginTop: 2,
              }}
            >
              <Box
                component={"img"}
                src={currentWord?.icon}
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          </FormControl>
        </Grid>
        <Grid item xs={6} mt={1.2}>
          <FormControl
            margin="dense"
            {...register("pictograma_two", {
              required: "El pictograma es necesario",
            })}
            error={!!errors.pictograma_two}
          >
            <InputLabel shrink>Pictograma incorrecto</InputLabel>
            <Box sx={{ display: "flex" }}>
              <Box
                component={"div"}
                sx={{
                  width: 220,
                  minHeight: 130,
                  maxHeight: 220,
                  bgcolor: "#ccc",
                  aspectRatio: 1,
                  marginTop: 2,
                }}
              >
                <Box
                  component={"img"}
                  src={pictography2?.icon}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
              <Button
                style={{
                  alignSelf: "start",
                  width: 150,
                  margin: "15px 0 0 30px",
                }}
                color="secondary"
                onClick={handleClickCangeImage}
              >
                Cambiar
              </Button>
            </Box>
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "center" }} mt={2}>
          <Link href={"/admin/repaso-palabras"}>
            <Button
              color="error"
              sx={{ width: 200, marginRight: 2 }}
              type="cancel"
            >
              Cancelar
            </Button>
          </Link>
          <Button color="success" sx={{ width: 200 }} type="submit">
            Guardar oración
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
