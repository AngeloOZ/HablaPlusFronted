import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Context";
import { LoginLayout } from "../../Layouts";
import { SweetAlert } from "../../helpers";
import { ButtonPatient, InputPatient } from "../../Components";

import css from "../../styles/Auth.patient.module.scss";
import logo from "../../public/img/logo.png";

const RegisterPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { registerUser } = useContext(AuthContext);

  const handleRegisterUser = async (user) => {
    const register = await registerUser(user);
    if (register.hasError) {
      console.error(register);
      reset();
      return SweetAlert.error({
        title: "Oops...",
        text: "Hubo un error al registrar el usuario",
      });
    }
    return router.push("/paciente/elegir-avatar");
  };

  return (
    <LoginLayout title="Crear cuenta - Habla+">
      <Box className={css.contenedorMain}>
        <Box className={css.logoLogin}>
          <Image src={logo} />
        </Box>
        <Box component={"div"} className={css.contenedorLogin}>
          <form onSubmit={handleSubmit(handleRegisterUser)}>
            <InputPatient
              label="Nombres"
              className={css.inputLogin}
              register={{
                ...register("names", {
                  required: "Los nombres de usuario es requerido",
                  pattern: {
                    value: /^[A-Za-zñÑáéíóúÁÉÍÓÚ \s]+$/i,
                    message:
                      "Solo es permitido letras sin carácteres especiales",
                  },
                }),
              }}
              errors={!!errors.names}
              helperText={errors.names?.message}
            />
            <InputPatient
              label="Apellidos"
              className={css.inputLogin}
              register={{
                ...register("surname", {
                  required: "Los apellidos de usuario es requerido",
                  pattern: {
                    value: /^[[A-Za-zñÑáéíóúÁÉÍÓÚ \s]+$/i,
                    message:
                      "Solo es permitido letras sin carácteres especiales",
                  },
                }),
              }}
              errors={!!errors.surname}
              helperText={errors.surname?.message}
            />
            <InputPatient
              label="Edad"
              className={css.inputLogin}
              register={{
                ...register("age", {
                  required: "La edad del usuario es requerido",
                  pattern: {
                    value: /^[0-9]+$/i,
                    message: "Solo es permitido valores númericos",
                  },
                }),
              }}
              errors={!!errors.age}
              helperText={errors.age?.message}
            />
            <InputPatient
              label="Nombre de usuario"
              className={css.inputLogin}
              register={{
                ...register("username", {
                  required: "Los apellidos de usuario es requerido",
                  pattern: {
                    value: /^[A-Za-z0-9]+$/i,
                    message: "Solo es permitido caracteres de la a-z y números",
                  },
                }),
              }}
              errors={!!errors.username}
              helperText={errors.username?.message}
            />
            <InputPatient
              label="Contraseña"
              type="password"
              className={css.inputLogin}
              register={{
                ...register("password", {
                  required: "La contraseña es requerida",
                  minLength: { value: 4, message: "Mínimo 4 caracteres" },
                }),
              }}
              errors={!!errors.password}
              helperText={errors.password?.message}
            />
            <ButtonPatient className={css.buttonLogin} type="submit">
              Crear cuenta
            </ButtonPatient>
          </form>
        </Box>
        <Link href="/auth/login">
          <a className={css.linkAlter}>¿Ya tienes cuenta? inicia sesión</a>
        </Link>
      </Box>
    </LoginLayout>
  );
};

export default RegisterPage;
