import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useVideos } from "./Hooks";

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
}) => {
  const { addVideo, updateVideo } = useVideos();
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
      setValue("id_video", initDataForm.id_video);
      setValue("description", initDataForm.description);
      setValue("link", initDataForm.link);
    }
  }, [initDataForm]);

  const handleSubmitWord = async (data) => {
    if (isEdit) {
      await updateVideo(data, handleCancel);
    } else {
      await addVideo(data);
    }
    handleCancel();
  };

  const handleCancel = () => {
    if (isEdit) {
      setIsEdit(false);
    }
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
