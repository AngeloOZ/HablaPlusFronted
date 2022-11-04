import {
  Box,
  FormControl,
  FormHelperText,
  InputBase,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import css from "../../styles/Components.module.scss";

export const InputPatient = ({
  label,
  type = "text",
  value = "",
  placeholder = "",
  helperText,
  register,
  errors = false,
  className,
  large = false,
  readOnly = false,
}) => {
  return (
    <Box
      component={"div"}
      className={`${css.input} ${className} ${large ? css.large : ""}`}
    >
      <FormControl error={errors} fullWidth className={css.formControl}>
        <InputLabel shrink className={`${!errors ? css.colorViolet : ""}`}>
          {label}
        </InputLabel>
        <InputBase
          placeholder={placeholder}
          type={type}
          readOnly={readOnly}
          className={`${css.inputBase} ${errors ? css.error : ""}`}
          {...register}
          defaultValue={value}
        />
        {(helperText || errors) && (
          <FormHelperText className={`${!errors ? css.colorViolet : ""}`}>
            {helperText || "Ingrese texto"}
          </FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};
