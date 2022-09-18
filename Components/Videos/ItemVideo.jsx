import { useContext } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

import css from "../../styles/Admin.module.scss";
import { SweetAlert } from "../../helpers";
import { ModalContext } from "../../Context";
import { useVideos } from "./Hooks/useVideos";

export const ItemVideo = ({ video }) => {
  const { toogleModalState, toogleIsEdit, updateCurrentData } =
    useContext(ModalContext);

  const { deleteVideo } = useVideos();

  const handleClickEdit = (video) => {
    toogleIsEdit(true);
    toogleModalState(true);
    updateCurrentData(video);
  };

  const handleClickDelete = async (video) => {
    const result = await SweetAlert.deleteConfirm({
      title: `Está seguro de eliminar el video: '${video.description}'`,
      text: "Si realiza esta acción no podrá revertirse",
    });

    if (result.isConfirmed) {
      deleteVideo(video.id_video);
    }
  };

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card>
        <CardActionArea>
          <Box
            component={"div"}
            className={css.containerIframe}
            dangerouslySetInnerHTML={{ __html: video.link }}
          ></Box>
        </CardActionArea>
        <CardContent>
          <Typography component={"h3"} variant="subtitle2">
            {video.description}
          </Typography>
        </CardContent>
        <CardActions className={css.buttonAction}>
          <Button
            size="small"
            color="error"
            onClick={() => handleClickDelete(video)}
          >
            Eliminar
          </Button>
          <Button
            size="small"
            color="warning"
            onClick={() => handleClickEdit(video)}
          >
            Editar
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
