import { useContext, useRef, useEffect } from "react";
import Image from "next/image";
import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import { ModalContext } from "../../../Context";
import { ButtonPatient } from "../../Paciente/ButtonPatient";

import css from "../../../styles/Modals.repaso.module.scss";
import gif from "./star-sad.gif";

export const ModalFailed = ({
  title = "Oops...",
  onClick = () => {},
  textBody = "Lo siento no has acertado",
  textButton = "Volver a intentarlo",
}) => {
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

  const handleCloseModal = () => {
    toogleModalState(false);
    onClick();
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openModal}
      onClose={handleCloseModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModal}>
        <Box className={css.contenedorModal}>
          <Box className={css.modalFailed}>
            <audio
              src={`${process.env.NEXT_PUBLIC_URL}sounds/efecto-aww.mp3`}
              style={{ display: "none" }}
              ref={reproductor}
            ></audio>
            <Typography component="h2" className={css.titleModal}>
              {title}
            </Typography>
            <Typography component="p" className={css.subTitle}>
              {textBody}
            </Typography>
            <Box component={"div"} className={css.contenedorImage}>
              <Image src={gif} alt="img" />
            </Box>
            <Box className={css.contenedorButton}>
              <ButtonPatient
                onClickC={handleCloseModal}
                className={css.buttonTryAgain}
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
