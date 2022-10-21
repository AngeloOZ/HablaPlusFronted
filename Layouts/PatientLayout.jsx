import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { Box, ButtonBase } from "@mui/material";
import { CircleAvatar } from "../Components";

import configBtn from "../public/img/botones/configBtn.png";
import css from "../styles/PatientLayout.module.scss";

export const PatientLayout = ({
  title = "Habla+",
  currentUser,
  configButton,
  children,
  disableUrlLogo = false,
  urlToProfile = "/paciente",
  urlBackground = "fondo1.png",
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={css.contenedorPadre}>
        <Box component={"div"} className={css.currentUser}>
          {currentUser ? (
            <CircleAvatar
              srcImage={`${location.origin}/img/avatar1.png`}
              hrefTo={urlToProfile}
            />
          ) : (
            <ButtonBase href="#" className={css.btnConfig}>
              <Image src={configBtn} />
            </ButtonBase>
          )}
        </Box>
        <Link href={disableUrlLogo ? "#" : "/paciente"} passHref>
          <ButtonBase className={css.logoHeader}>
            <Box
              component={"img"}
              src={`${location.origin}/img/logo-header.png`}
            />
          </ButtonBase>
        </Link>

        {currentUser && configButton && (
          <ButtonBase href="#" className={css.btnConfigButton}>
            <Image src={configBtn} />
          </ButtonBase>
        )}

        <main className={css.main}>{children}</main>

        <footer
          className={css.footer}
          style={{
            backgroundImage: `url(${location.origin}/img/fondos/${urlBackground})`,
          }}
        ></footer>
      </div>
    </>
  );
};
