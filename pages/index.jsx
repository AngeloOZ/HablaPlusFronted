import { Box, FormControl, InputBase, InputLabel } from "@mui/material";
import css from "../styles/Inicio.module.scss";

export default function Home() {
  return (
    <div >
      <Box
        component={"img"}
        src="http://localhost:3000/img/logo.png"
        className={css.animate}
      />
      <div className={css.footer}></div>
      {/* <FormControl variant="standard">
        <InputLabel shrink htmlFor="bootstrap-input">
          Bootstrap
        </InputLabel>
        <InputBase
          placeholder="Search Google Maps"
          inputProps={{ "aria-label": "search google maps" }}
          style={{
            border: "1px solid #9900CC",
            borderRadius: 20,
            marginTop: 20,
          }}
        />
      </FormControl> */}
    </div>
  );
}
