import { Box, ButtonBase } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { CircleAvatar } from "../Components";
import css from "../styles/PatientLayout.module.scss";
import configBtn from "../public/img/configBtn.png";
import Image from "next/image";

export const PatientLayout = ({ title = "Habla+", currentUser, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={css.contenedorPadre}>
        <Box component={"div"} className={css.currentUser}>
          {currentUser ? (
            <CircleAvatar src="http://localhost:3000/img/avatar1.png" />
          ) : (
            <ButtonBase href="#" className={css.btnConfig}>
              <Image src={configBtn} />
            </ButtonBase>
          )}
        </Box>
        <Box component={"div"} className={css.logoHeader}>
          <Link href="#" passHref>
            <Box
              component={"img"}
              src="http://localhost:3000/img/logo-header.png"
            />
          </Link>
        </Box>

        <main className={css.main}>{children}</main>

        <footer
          className={css.footer}
          style={{
            backgroundImage: `url(${"http://localhost:3000/img/fondo1.png"})`,
          }}
        ></footer>
      </div>
    </>
  );
};
