import { Box, CircularProgress } from "@mui/material";

export const LoaderPatient = ({ fullScreen }) => {
  const styleC = {
    height: "100%",
    alignItems: "center",
  };
  return (
    <Box
      component={"div"}
      sx={{ display: "flex", justifyContent: "center", width: "100%" }}
      style={fullScreen ? styleC : {}}
    >
      <CircularProgress size={50} />
    </Box>
  );
};
