import { Box } from "@mui/material";
import { CambiarAvatar, FormEditarPerfil } from "../../Components";
import { useGetAvatars } from "../../Components";
import { PatientLayout } from "../../Layouts";

import css from "../../styles/Editar.perfil.module.scss";

const PageEditarPerfil = () => {
  const { avatars, isLoading } = useGetAvatars();
  return (
    <PatientLayout title="Editar perfil - Habla+" currentUser>
      <Box component="div" className={css.contenedorMain}>
        <div className={css.subContenedor}>
          <div className={css.avatarContainer}>
            {!isLoading && <CambiarAvatar avatars={avatars || []} />}
          </div>
          <div className={css.inputsContainer}>
            <FormEditarPerfil />
          </div>
        </div>
      </Box>
    </PatientLayout>
  );
};

export default PageEditarPerfil;
