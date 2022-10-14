import { useState, forwardRef, useEffect } from "react";
import { Pause, PlayArrow } from "@mui/icons-material";
import { IconButton } from "@mui/material";

/**
 * Este componente esta usando referencia de un  elemento padre
 * a un hijo, por ello se utiliza forwardRef de REACT
 * no se debe exportar el componete de forma tradicional sino 
 * mediante una exportacion por defecto de forwardRef
 */


const ButtonsPlayAudio = ({ url, setUrl }, reproductorRef) => {
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    reproductorRef.current?.addEventListener("ended", () => {
      setPaused(true);
    });
    () => {
      reproductorRef.current?.removeEventListener("ended", () => {
        setPaused(true);
      });
    };
  }, []);

  const handleClickPlay = () => {
    setUrl(url);
    setPaused(false);
    setTimeout(() => {
      reproductorRef.current.play();
    }, 250);
  };

  const handleClickPause = () => {
    setPaused(true);
    reproductorRef.current.pause();
  };

  return (
    <>
      {paused ? (
        <IconButton color="success" onClick={handleClickPlay} size="large">
          <PlayArrow />
        </IconButton>
      ) : (
        <IconButton color="error" size="large" onClick={handleClickPause}>
          <Pause />
        </IconButton>
      )}
    </>
  );
};

export default forwardRef(ButtonsPlayAudio);
