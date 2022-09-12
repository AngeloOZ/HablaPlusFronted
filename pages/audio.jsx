import { Box, Button } from "@mui/material";
import React from "react";
import { useRecorder } from "../Hooks/useRecorder";

const PageAudio = () => {
  const { audioURL, startRecording, stopRecording, archivoBLOB, messages } =
    useRecorder();
  return (
    <div style={{ padding: 10 }}>
      <h1>Grabadora de audio</h1>
      {console.log(archivoBLOB)}
      <Box
        component={"div"}
        width={150}
        display="flex"
        justifyContent={"space-between"}
      >
        <Button onClick={startRecording}>Grabar</Button>
        <Button onClick={stopRecording}>Detener</Button>
      </Box>
      <h2>{messages}</h2>
      <Box component={"div"}>
        <audio src={audioURL} controls></audio>
        <p>{audioURL}</p>
      </Box>
    </div>
  );
};

export default PageAudio;
