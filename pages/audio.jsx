import { Box, Button, TextField } from "@mui/material";
import { useEffect } from "react";

import { useSpeechRecognition } from "../Hooks/useSpeechRecognition";

const PageAudio = () => {
  const { startRecognition, recognizedText, confidense, errorMessage } =
    useSpeechRecognition();

  const handleMatchWord = () => {
    const currentWord = "corazón";
    if (currentWord.length === recognizedText.length) {
      if (currentWord === recognizedText) {
        if (confidense > 80) {
          alert("Coincide...");
        } else if (confidense <= 80 && confidense >= 70) {
          alert(`Coincidencia de ${confidense} puedes mejora la pronunciación`);
        } else {
          alert(`Coincidencia de ${confidense} debes mejorar la pronunciación`);
        }
      } else {
        alert("0% de coincidencia 1");
      }
    } else {
      alert("0% de coincidencia 2");
    }
  };

  useEffect(() => {
    if (recognizedText.length > 0) {
      handleMatchWord();
    }
  }, [recognizedText]);

  return (
    <div style={{ padding: 10 }}>
      <h1>Reconocimeinto de voz</h1>
      <Box
        component={"div"}
        width={280}
        display="flex"
        justifyContent={"space-between"}
      >
        <Button onClick={startRecognition}>Empezar a grabar</Button>
      </Box>
      <Box component={"div"} mt={2} maxWidth={300}>
        <p>{errorMessage}</p>
      </Box>
      <Box component={"div"} mt={2} maxWidth={300}>
        <p>{confidense}</p>
      </Box>
      <Box component={"div"} mt={2} maxWidth={300}>
        <TextField multiline minRows={4} fullWidth value={recognizedText} />
      </Box>
    </div>
  );
};

export default PageAudio;
