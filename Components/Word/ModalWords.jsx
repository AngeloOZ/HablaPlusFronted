import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  FormControlLabel,
  Grid,
  InputLabel,
  Modal,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "35%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 430,
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
}) => {
  const title = isEdit ? "Editar palabra" : "Agregar palabra";
  const [editFile, setEditFile] = useState(false);

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
      setValue("description", initDataForm.description);
      setValue("icon", initDataForm.icon);
      setValue("id_category", initDataForm.id_category);
    }
  }, [initDataForm]);

  const handleSubmitCategory = (data) => {
    if (isEdit) {
      useUpdateCategory(data, handleCancel);
      setEditFile(false);
      setIsEdit(false);
    } else {
      useAddCategory(data);
    }
    reset();
    setOpen(false);
  };

  const handleCancel = () =>{
    setOpen(false);
  }

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
          <form onSubmit={handleSubmit(handleSubmitCategory)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label="Nombre de la categoria"
                  fullWidth
                  required
                  {...register("description", {
                    required: "El nombre de la categoria es requerido",
                    pattern: {
                      value: /^[A-Za-zñ ,.;áéíóú]+$/i,
                      message: "No se permiten número o caracteres especiales ",
                    },
                  })}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </Grid>
              {isEdit ? (
                <>
                  <Box component={"div"}>
                    <FormControlLabel
                      sx={{ marginTop: 1 }}
                      control={<Switch color="primary" />}
                      label="Subir archivo"
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
                          required: "La imagén de la categoria es necesaria",
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
                      required: "La imagén de la categoria es necesaria",
                    })}
                    error={!!errors.iconFile}
                    helperText={errors.iconFile?.message}
                  />
                </Grid>
              )}
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
