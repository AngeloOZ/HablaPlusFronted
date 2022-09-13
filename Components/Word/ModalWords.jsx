import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useAddWord, useUpdateWord } from "./Hooks";
import { ContainerInputRecorder } from "./";

const style = {
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const ModalWords = ({
  open,
  initDataForm,
  setOpen,
  isEdit = false,
  setIsEdit,
  categories,
}) => {
  const title = isEdit ? "Editar palabra" : "Agregar palabra";
  const [editFile, setEditFile] = useState(false);
  const [editAudio, setEditAudio] = useState(false);
  const [choseCategory, setChoseCategory] = useState("");
  const [selectError, setSelectError] = useState(false);
  const [selectErrorMessage, setSelectErrorMessage] = useState("");
  const [audioWordFile, setAudioWordFile] = useState(undefined);
  const [errorAudioFile, setErrorAudioFile] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset();
    if (initDataForm) {
      setValue("id_word", initDataForm.id_word);
      setChoseCategory(initDataForm.id_category);
      setValue("description", initDataForm.description);
      setValue("icon", initDataForm.icon);
      setValue("audio", initDataForm.audio);
    }
  }, [initDataForm]);

  const handleSubmitWord = (data) => {
    if (choseCategory.length == 0) {
      setSelectError(true);
      setSelectErrorMessage("Debe seleccionar la categoria");
      return;
    }
    data.id_category = choseCategory;

    if (isEdit) {
      if (editAudio && !audioWordFile) {
        setErrorAudioFile(true);
        return;
      } else if (editAudio && audioWordFile) {
        data.audioFile = audioWordFile;
      }
      useUpdateWord(data, handleCancel);
    } else {
      if (!audioWordFile) {
        setErrorAudioFile(true);
        return;
      }
      data.audioFile = audioWordFile;
      useAddWord(data);
    }
    handleCancel();
  };

  const handleCancel = () => {
    if (isEdit) {
      setIsEdit(false);
      setEditFile(false);
      setEditAudio(false);
    }
    setAudioWordFile(undefined);
    setErrorAudioFile(false);
    setSelectError(false);
    setChoseCategory("");
    setOpen(false);
    reset();
  };

  const handleChangeSelect = (event) => {
    setChoseCategory(event.target.value);
    setSelectError(false);
    setSelectErrorMessage("");
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleCancel}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography variant="h2" textAlign={"center"} mb={3}>
            {title}
          </Typography>
          <form onSubmit={handleSubmit(handleSubmitWord)} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label="Nombre de la palabra"
                  fullWidth
                  required
                  {...register("description", {
                    required: "El nombre de la palabra es requerido",
                    pattern: {
                      value: /^[A-Za-zñ ,.;áéíóú \ *]+$/i,
                      message: "No se permiten número o caracteres especiales ",
                    },
                  })}
                  error={!!errors.description}
                  helperText={
                    !!errors.description
                      ? errors.description?.message
                      : "Los acentos debe estar entre asteriscos(*) Ej: pa*pá*"
                  }
                />
              </Grid>
              {isEdit ? (
                <>
                  <Box component={"div"}>
                    <FormControlLabel
                      sx={{ marginTop: 1 }}
                      control={<Switch color="primary" checked={editAudio} />}
                      label="Grabar nuevo audio"
                      labelPlacement="start"
                      onChange={() => {
                        setEditAudio(!editAudio);
                      }}
                    />
                  </Box>
                  {editAudio ? (
                    <ContainerInputRecorder
                      isError={errorAudioFile}
                      setIsError={setErrorAudioFile}
                      setFile={setAudioWordFile}
                    />
                  ) : (
                    <Grid item xs={12}>
                      <TextField
                        label="Url del audio"
                        variant="outlined"
                        required
                        fullWidth
                        {...register("audio", {
                          required: "La url del audio es necesario",
                        })}
                        error={!!errors.icon}
                        helperText={errors.icon?.message}
                      />
                    </Grid>
                  )}
                </>
              ) : (
                <ContainerInputRecorder
                  isError={errorAudioFile}
                  setIsError={setErrorAudioFile}
                  setFile={setAudioWordFile}
                />
              )}
              {isEdit ? (
                <>
                  <Box component={"div"}>
                    <FormControlLabel
                      sx={{ marginTop: 1 }}
                      control={<Switch color="primary" />}
                      label="Subir nueva foto"
                      labelPlacement="start"
                      onChange={() => {
                        setEditFile(!editFile);
                      }}
                    />
                  </Box>

                  {editFile ? (
                    <Grid item xs={12}>
                      <InputLabel margin="dense">Subir imagén</InputLabel>
                      <TextField
                        type={"file"}
                        variant="standard"
                        margin="dense"
                        required
                        {...register("iconFile", {
                          required: "La imagén de la palabra es necesaria",
                        })}
                        error={!!errors.iconFile}
                        helperText={errors.iconFile?.message}
                      />
                    </Grid>
                  ) : (
                    <Grid item xs={12}>
                      <TextField
                        label="Url de la imagén"
                        variant="outlined"
                        required
                        fullWidth
                        {...register("icon", {
                          required: "La url de la imagén es necesaria",
                        })}
                        error={!!errors.icon}
                        helperText={errors.icon?.message}
                      />
                    </Grid>
                  )}
                </>
              ) : (
                <Grid item xs={12}>
                  <InputLabel margin="dense">Subir imagén</InputLabel>
                  <TextField
                    type={"file"}
                    variant="standard"
                    margin="dense"
                    required
                    {...register("iconFile", {
                      required: "La imagén de la palabra es necesaria",
                    })}
                    error={!!errors.iconFile}
                    helperText={errors.iconFile?.message}
                  />
                </Grid>
              )}
              <Grid item xs={12} mt={1}>
                <FormControl fullWidth required error={selectError}>
                  <InputLabel id="demo-simple-select-label">
                    Categoria
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Categoria"
                    value={choseCategory}
                    onChange={handleChangeSelect}
                  >
                    {categories.map((category) => (
                      <MenuItem
                        value={category.id_category}
                        key={category.id_category}
                      >
                        {category.description}
                      </MenuItem>
                    ))}
                  </Select>
                  {selectError && (
                    <FormHelperText>{selectErrorMessage}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} mt={1}>
                <Button type="submit" size="medium" fullWidth>
                  Guardar
                </Button>
                <Button
                  size="medium"
                  color="error"
                  fullWidth
                  sx={{ marginTop: 1 }}
                  onClick={handleCancel}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};
