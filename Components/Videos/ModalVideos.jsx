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
// import { useAddWord, useUpdateWord } from "./Hooks";

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

export const ModalVideos = ({
  open,
  initDataForm,
  setOpen,
  isEdit = false,
  setIsEdit,
  categories,
}) => {
  const title = isEdit ? "Editar video" : "Agregar video";

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
      setValue("description", initDataForm.description);
      setValue("icon", initDataForm.icon);
    }
  }, [initDataForm]);

  const handleSubmitWord = (data) => {
    console.log(data);
    if (isEdit) {
      // useUpdateWord(data, handleCancel);
    } else {
      // useAddWord(data);
    }
    //  handleCancel();
  };

  const handleCancel = () => {
    setOpen(false);
    reset();
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
                  label="Descripción del video"
                  fullWidth
                  multiline
                  rows={2}
                  required
                  {...register("description", {
                    required: "La descripción del video es requerido",
                    pattern: {
                      value: /^[A-Za-zñÑ ,.;áéíóú \ ]+$/i,
                      message: "No se permiten número o caracteres especiales ",
                    },
                  })}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label="iframe del video"
                  fullWidth
                  multiline
                  rows={6}
                  required
                  {...register("link", {
                    required: "El iframe del video es requerido",
                  })}
                  error={!!errors.link}
                  helperText={errors.link?.message}
                />
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
