import { useState } from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  InputBase,
  InputLabel,
} from "@mui/material";
import css from "../../styles/Components.module.scss";

export const InputPatient = ({ label, helperText }) => {
  const [error, seterror] = useState(false);
  return (
    <Box component={"div"} className={css.input}>
      <FormControl error={error}>
        <InputLabel shrink className={`${!error ? css.colorViolet : ""}`}>
          {label}
        </InputLabel>
        <InputBase
          placeholder=""
          className={`${css.inputBase} ${error ? css.error : ""}`}
        />
        {(helperText || error) && (
          <FormHelperText className={`${!error ? css.colorViolet : ""}`}>
            {helperText || "Ingrese texto"}
          </FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};
