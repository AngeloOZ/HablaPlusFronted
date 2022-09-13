import { useRef, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Typography,
} from "@mui/material";
import { RadioButtonChecked, PlayArrow, Stop, Mic } from "@mui/icons-material";
import { useRecorder } from "../../Hooks/useRecorder";

export const ContainerInputRecorder = ({ isError, setIsError, setFile }) => {
  const { isRecording, startRecording, stopRecording, audioURL, archivoBLOB } =
    useRecorder();
  const audioPlay = useRef(null);

  useEffect(() => {
    setFile(archivoBLOB);
  }, [archivoBLOB]);

  const handleClickRecord = () => {
    startRecording();
    setIsError(false);
  };
  const handleClickPlay = async () => {
    try {
      if (audioPlay.current.paused) {
        await audioPlay.current.play();
      } else {
        audioPlay.current.pause();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid item xs={12}>
      <FormControl error={isError}>
        <InputLabel shrink sx={{ fontSize: 22, marginLeft: -2 }}>
          Grabar audio*
        </InputLabel>
        <Box
          component={"div"}
          display="flex"
          alignItems={"center"}
          marginTop={2.5}
        >
          <Button
            variant="contained"
            endIcon={<PlayArrow />}
            color="success"
            onClick={handleClickPlay}
            disabled={audioURL ? false : true}
            sx={{ marginRight: 1 }}
          >
            Escuchar
          </Button>
          {!isRecording ? (
            <Button
              variant="contained"
              endIcon={<RadioButtonChecked />}
              color="warning"
              onClick={handleClickRecord}
            >
              Grabar
            </Button>
          ) : (
            <Button
              variant="contained"
              endIcon={<Stop />}
              color="error"
              onClick={stopRecording}
            >
              Detener
            </Button>
          )}
          {isRecording && (
            <Mic
              color="success"
              className="animation-recorder"
              sx={{ marginLeft: 0.5 }}
            />
          )}
          <audio
            src={audioURL}
            style={{ display: "none" }}
            ref={audioPlay}
          ></audio>
        </Box>
        {isError && (
          <FormHelperText sx={{ marginTop: 1 }}>
            Es necesario grabar el audio de la palabra
          </FormHelperText>
        )}
      </FormControl>
    </Grid>
  );
};
