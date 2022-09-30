import { Box, ButtonBase } from "@mui/material";

import { useRouter } from "next/router";
import { useState } from "react";
import { LoginLayout } from "../Layouts";
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
    <LoginLayout>
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
            src={`${process.env.NEXT_PUBLIC_URL}img/botones/btn-start.png`}
          />
        </ButtonBase>
      </Box>
    </LoginLayout>
  );
}
