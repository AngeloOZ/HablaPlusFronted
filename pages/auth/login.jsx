import { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Context";
import { ButtonPatient, InputPatient } from "../../Components";
import { LoginLayout } from "../../Layouts";
import css from "../../styles/Auth.patient.module.scss";
import logo from "../../public/img/logo.png";
import { SweetAlert } from "../../helpers";

const LoginPage = () => {
  const [sendRequest, setsendRequest] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { loginUser } = useContext(AuthContext);

  const handleLoginUser = async (user) => {
    setsendRequest(true);
    const login = await loginUser(user);
    if (login.hasError) {
      setsendRequest(false);
      console.error(login);
      reset();
      return SweetAlert.error({
        title: "Oops...",
        text: "El usuario o la contraseña son incorrectos",
      });
    }
    if (login.id_type == 1) {
      return router.push("/admin");
    } else {
      return router.push("/paciente");
    }
  };

  return (
    <LoginLayout title="Iniciar sesión - Habla+">
      <Box className={css.contenedorMain}>
        <Box className={css.logoLogin}>
          <Image src={logo} />
        </Box>
        <Box component={"div"} className={css.contenedorLogin}>
          <form onSubmit={handleSubmit(handleLoginUser)}>
            <InputPatient
              label="Nombre de usuario"
              className={css.inputLogin}
              large
              register={{
                ...register("username", {
                  required: "El nombre de usuario es requerido",
                  pattern: {
                    value: /^[A-Za-z0-9ñ]+$/i,
                    message: "Solo es permitido caracteres alfanuméricos",
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
              large
              register={{
                ...register("password", {
                  required: "La contraseña es requerida",
                  minLength: { value: 4, message: "Mínimo 4 caracteres" },
                }),
              }}
              errors={!!errors.password}
              helperText={errors.password?.message}
            />
            <ButtonPatient
              className={css.buttonLogin}
              type="submit"
              disabled={sendRequest}
            >
              Iniciar sesión
            </ButtonPatient>
          </form>
        </Box>
        <Link href="/auth/register">
          <a className={css.linkAlter}>¿No tienes cuenta? regístrate</a>
        </Link>
      </Box>
    </LoginLayout>
  );
};

export default LoginPage;
