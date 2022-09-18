import { Box, ButtonBase, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import css from "../styles/Home.module.scss";

export default function Home() {
  const [startHome, setStartHome] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setStartHome(true);
    setTimeout(() => {
      router.push("/paciente");
    }, 2500);
  };

  return (
    <div className={css.contenedorPadre}>
      <Head>
        <title>Home - Habla+</title>
      </Head>

      <main className={css.main}>
        <Box
          component={"img"}
          src={`${process.env.NEXT_PUBLIC_URL}img/logo.png`}
          className={`${css.logoCenter} ${
            startHome ? css.startAnimation : css.init
          }`}
        />
        <Box component={"div"}>
          <ButtonBase
            className={`${css.btnStart} ${startHome ? css.hidden : ""}`}
            onClick={handleClick}
          >
            <Box
              component={"img"}
              src={`${process.env.NEXT_PUBLIC_URL}img/btn-start.png`}
            />
          </ButtonBase>
        </Box>
      </main>

      <footer
        className={css.footer}
        style={{
          backgroundImage: `url(${"http://localhost:3000/img/fondo1.png"})`,
        }}
      ></footer>
    </div>
  );
}
