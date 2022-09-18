import { Grid } from "@mui/material";
import { ItemVideo } from "./ItemVideo";

export const ContainerVideos = ({ videos }) => {
  return (
    <Grid container spacing={2}>
      {videos?.map((video) => (
        <ItemVideo key={video.id_unique} video={video} />
      ))}
    </Grid>
  );
};
