import { useContext, useRef, useEffect } from "react";
import Image from "next/image";
import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import { ModalContext } from "../../../Context";
import { ButtonPatient } from "../../Paciente/ButtonPatient";

import css from "../../../styles/Modals.repaso.module.scss";
import gif from "./star-happy.gif";

export const ModalSuccess = ({ textButton, handleClickNext = () => {} }) => {
  const reproductor = useRef(null);
  const { openModal, toogleModalState } = useContext(ModalContext);

  useEffect(() => {
    if (openModal) {
      setTimeout(() => {
        reproductor.current.volume = 0.7;
        reproductor.current.play();
      }, 350);
    }
  }, [openModal]);

  const handleClickButton = () => {
    toogleModalState();
    handleClickNext();
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openModal}
      onClose={handleClickNext}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModal}>
        <Box className={css.contenedorModal}>
          <Box className={css.modalSucess}>
            <audio
              src={`${process.env.NEXT_PUBLIC_URL}sounds/efecto-yee.mp3`}
              style={{ display: "none" }}
              ref={reproductor}
            ></audio>
            <Typography component="h2" className={css.titleModal}>
              ¡Felicidades!
            </Typography>
            <Box component={"div"} className={css.contenedorImage}>
              <Image src={gif} alt="img" />
            </Box>
            <Box className={css.contenedorButton}>
              <ButtonPatient
                onClickC={handleClickButton}
                className={css.buttonNext}
              >
                {textButton}
              </ButtonPatient>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
