import { useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import { ModalContext } from "../../Context";
import { AdminLayouts } from "../../Layouts";
import { ContainerVideos, ModalVideos } from "../../Components";
import { useGetVideos } from "../../Components/Videos/Hooks";

/* TODO: Metodo para imprimir html con {} */
/* <Typography dangerouslySetInnerHTML={word}></Typography> */
const AdminPage = () => {
  const { toogleModalState, openModal, editModal, toogleIsEdit, currentData } =
    useContext(ModalContext);

  const { videos, isLoading } = useGetVideos();

  return (
    <AdminLayouts>
      <Box
        component={"div"}
        width="100%"
        display={"flex"}
        justifyContent={"flex-end"}
      >
        <Button onClick={() => toogleModalState(true)}>Agregar video</Button>
      </Box>
      <Box component={"div"} marginTop={3}>
        <ContainerVideos videos={videos} />
      </Box>
      {editModal ? (
        <ModalVideos
          open={openModal}
          setOpen={toogleModalState}
          initDataForm={currentData}
          setIsEdit={toogleIsEdit}
          isEdit={editModal}
        />
      ) : (
        <ModalVideos open={openModal} setOpen={toogleModalState} />
      )}
    </AdminLayouts>
  );
};

export default AdminPage;
