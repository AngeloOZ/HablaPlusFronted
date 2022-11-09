import { useContext, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { Box, ButtonBase, Menu, MenuItem } from "@mui/material";
import { CircleAvatar } from "../Components";
import { AuthContext } from "../Context";

import configBtn from "../public/img/botones/configBtn.png";
import css from "../styles/PatientLayout.module.scss";
import { useRouter } from "next/router";
import { SweetAlert } from "../helpers";

export const PatientLayout = ({
  title = "Habla+",
  currentUser,
  configButton,
  children,
  disableUrlLogo = false,
  urlToProfile = "/paciente",
  urlBackground = "fondo1.png",
}) => {
  const router = useRouter();
  const { logoutUser, avatar } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickLogout = async () => {
    handleClose();
    const result = await SweetAlert.successConfirm({
      title: "Cerrar sesión",
      text: "¿Estás seguro de cerrar la sesión?",
    });
    if (result.isConfirmed) logoutUser();
  };

  const handleClickProfile = () => {
    handleClose();
    router.push("/paciente/editar-perfil");
  };
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={css.contenedorPadre}>
        <Box component={"div"} className={css.currentUser}>
          {currentUser ? (
            <CircleAvatar srcImage={avatar} hrefTo={urlToProfile} />
          ) : (
            <>
              <ButtonBase
                className={css.btnConfig}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <Image src={configBtn} alt="Habla+" />
              </ButtonBase>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleClickProfile}>Perfil</MenuItem>
                <MenuItem onClick={handleClickLogout}>Cerrar sesión</MenuItem>
              </Menu>
            </>
          )}
        </Box>
        <Link href={disableUrlLogo ? "#" : "/paciente"} passHref>
          <ButtonBase className={css.logoHeader}>
            <Box
              component={"img"}
              src={`${process.env.NEXT_PUBLIC_URL}img/logo-header.png`}
            />
          </ButtonBase>
        </Link>

        {currentUser && configButton && (
          <>
            <ButtonBase
              className={css.btnConfigButton}
              id="basic-button2"
              aria-controls={open ? "basic-menu2" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <Image src={configBtn} />
            </ButtonBase>
            <Menu
              id="basic-menu2"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button2",
              }}
            >
              <MenuItem onClick={handleClickProfile}>Perfil</MenuItem>
              <MenuItem onClick={handleClickLogout}>Cerrar sesión</MenuItem>
            </Menu>
          </>
        )}

        <main className={css.main}>{children}</main>

        <footer
          className={css.footer}
          style={{
            backgroundImage: `url(${process.env.NEXT_PUBLIC_URL}img/fondos/${urlBackground})`,
          }}
        ></footer>
      </div>
    </>
  );
};
