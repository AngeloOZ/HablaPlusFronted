import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Context";
import { ButtonPatient, InputPatient } from "../../Paciente";
import { useUsuarios } from "../../Usuarios";

import css from "../../../styles/Editar.perfil.module.scss";

export const FormEditarPerfil = () => {
  const { updateUserClient } = useUsuarios();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [readOnly, setReadOnly] = useState(true);
  const userAuth = useContext(AuthContext);

  const updateStateReadOnly = () => {
    setReadOnly(!readOnly);
  };
  const updateUser = async (data) => {
    data.id_user = userAuth.id_user;
    if (data.newPassword == "") delete data.newPassword;

    const response = await updateUserClient(data);
    if (response) await userAuth.verifyToken();
    setValue("newPassword", "");
    setReadOnly(true);
  };
  return (
    <form onSubmit={handleSubmit(updateUser)}>
      <InputPatient
        readOnly={true}
        label="Nombre de usuario"
        value={userAuth.username}
        register={{
          ...register("username", {
            required: "El nombre de usuario es requerido",
            pattern: {
              value: /^[A-Za-zñÑáéíóúÁÉÍÓÚ0-9 \s]+$/i,
              message: "Solo es permitido caracteres de la a-z y números",
            },
          }),
        }}
        errors={!!errors.username}
        helperText={errors.username?.message}
      />
      <InputPatient
        readOnly={readOnly}
        value={userAuth.names}
        label="Nombres"
        register={{
          ...register("names", {
            required: "Los nombres de usuario es requerido",
            pattern: {
              value: /^[A-Za-zñÑáéíóúÁÉÍÓÚ \s]+$/i,
              message: "Solo es permitido letras sin caracteres especiales",
            },
          }),
        }}
        errors={!!errors.names}
        helperText={errors.names?.message}
      />
      <InputPatient
        readOnly={readOnly}
        value={userAuth.surname}
        register={{
          ...register("surname", {
            required: "Los apellidos de usuario es requerido",
            pattern: {
              value: /^[[A-Za-zñÑáéíóúÁÉÍÓÚ \s]+$/i,
              message: "Solo es permitido letras sin caracteres especiales",
            },
          }),
        }}
        errors={!!errors.surname}
        helperText={errors.surname?.message}
      />
      <InputPatient
        readOnly={readOnly}
        value={userAuth.age}
        label="Edad"
        register={{
          ...register("age", {
            required: "La edad del usuario es requerido",
            pattern: {
              value: /^[0-9]+$/i,
              message: "Solo es permitido valores numéricos",
            },
          }),
        }}
        errors={!!errors.age}
        helperText={errors.age?.message}
      />
      <InputPatient
        readOnly={readOnly}
        label="Contraseña nueva"
        type="password"
        placeholder="Dejar vacío si no quiere cambiarla"
        register={{
          ...register("newPassword", {
            minLength: { value: 4, message: "Mínimo 4 caracteres" },
          }),
        }}
        errors={!!errors.newPassword}
        helperText={errors.newPassword?.message}
      />
      <Box
        component={"div"}
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <ButtonPatient
          type="submit"
          disabled={!readOnly}
          onClickC={updateStateReadOnly}
          className={css.buttonPerfil}
        >
          Editar
        </ButtonPatient>
        <ButtonPatient
          type="submit"
          disabled={readOnly}
          className={css.buttonPerfil}
        >
          Actualizar
        </ButtonPatient>
      </Box>
    </form>
  );
};
