import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useUsuarios } from "./Hooks";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const ModaUsuarios = ({
  open,
  initDataForm,
  setOpen,
  isEdit = false,
  setIsEdit,
}) => {
  const { addUserAdmin, updateUserAdmin } = useUsuarios();
  const title = isEdit ? "Editar usuario" : "Agregar usuarios";
  const [choseRol, setChoseRol] = useState("");
  const [selectError, setSelectError] = useState(false);
  const [selectErrorMessage, setSelectErrorMessage] = useState("");

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
      setValue("id_user", initDataForm.id_user);
      setChoseRol(initDataForm.id_type);
      setValue("names", initDataForm.names);
      setValue("surname", initDataForm.surname);
      setValue("username", initDataForm.username);
      setValue("age", initDataForm.age);
    }
  }, [initDataForm]);

  const handleSubmitUser = (user) => {
    if(choseRol == ""){
      setSelectError(true);
      setSelectErrorMessage("No ha seleccionado un rol");
      return;
    }
    user.id_type = choseRol;
    if(isEdit){
      updateUserAdmin(user)
    }else{
      addUserAdmin(user);
    }
    handleCancel();
  };

  const handleCancel = () => {
    if (isEdit) {
      setIsEdit(false);
    }
    setChoseRol("");
    setSelectError(false);
    setOpen(false);
    reset();
  };

  const handleChangeSelect = (event) => {
    setChoseRol(event.target.value);
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
          <form onSubmit={handleSubmit(handleSubmitUser)} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label="Nombre de usuario"
                  InputProps={{
                    readOnly: isEdit,
                  }}
                  fullWidth
                  {...register("username", {
                    required: "El nombre de usuario es requerido",
                    pattern: {
                      value: /^[A-Za-z0-9ñ ,.;áéíóú \ *]+$/i,
                      message:
                        "No se permiten números o caracteres especiales ",
                    },
                  })}
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label="Nombres"
                  fullWidth
                  {...register("names", {
                    required: "Los nombres son requeridos",
                    pattern: {
                      value: /^[A-Za-zñ ,.;áéíóú \ *]+$/i,
                      message:
                        "No se permiten números o caracteres especiales ",
                    },
                  })}
                  error={!!errors.names}
                  helperText={errors.names?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label="Apellidos"
                  fullWidth
                  {...register("surname", {
                    required: "Los apellidos son requeridos",
                    pattern: {
                      value: /^[A-Za-zñ ,.;áéíóú \ *]+$/i,
                      message:
                        "No se permiten números o caracteres especiales ",
                    },
                  })}
                  error={!!errors.surname}
                  helperText={errors.surname?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label="Edad"
                  fullWidth
                  {...register("age", {
                    required: "La edad es requerida",
                    pattern: {
                      value: /^[0-9]+$/i,
                      message: "Solo se permite caracteres numéricos",
                    },
                  })}
                  error={!!errors.age}
                  helperText={errors.age?.message}
                />
              </Grid>
              {isEdit ? (
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    label="Nueva contraseña"
                    placeholder="Dejar en blanco para no actualizar"
                    fullWidth
                    type={"password"}
                    {...register("newPassword", {
                      minLength: { value: 4, message: "Mínimo 4 caracteres" },
                    })}
                    error={!!errors.newPassword}
                    helperText={errors.newPassword?.message}
                  />
                </Grid>
              ) : (
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    label="Contraseña"
                    fullWidth
                    type={"password"}
                    {...register("password", {
                      required: "La contraseña es requerida",
                      minLength: { value: 4, message: "Mínimo 4 caracteres" },
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                </Grid>
              )}

              <Grid item xs={12}>
                <FormControl fullWidth required error={selectError}>
                  <InputLabel id="demo-simple-select-label">
                    Rol de usuario
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Rol de usuario"
                    value={choseRol}
                    onChange={handleChangeSelect}
                  >
                    <MenuItem value="1">Administrador</MenuItem>
                    <MenuItem value="2">Paciente</MenuItem>
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
