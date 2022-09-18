import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { Box, ButtonBase } from "@mui/material";
import { CircleAvatar } from "../Components";

import configBtn from "../public/img/configBtn.png";
import css from "../styles/PatientLayout.module.scss";

export const PatientLayout = ({
  title = "Habla+",
  currentUser,
  configButton,
  children,
  url = "http://localhost:3000/img/fondo1.png",
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={css.contenedorPadre}>
        <Box component={"div"} className={css.currentUser}>
          {currentUser ? (
            <Link href="/paciente" passHref>
              <CircleAvatar src="http://localhost:3000/img/avatar1.png" />
            </Link>
          ) : (
            <ButtonBase href="#" className={css.btnConfig}>
              <Image src={configBtn} />
            </ButtonBase>
          )}
        </Box>
        <Link href="/paciente" passHref>
          <ButtonBase className={css.logoHeader}>
            <Box
              component={"img"}
              src="http://localhost:3000/img/logo-header.png"
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
            backgroundImage: `url(${url})`,
          }}
        ></footer>
      </div>
    </>
  );
};
