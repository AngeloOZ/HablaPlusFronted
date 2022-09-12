import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  Grid,
} from "@mui/material";

export const ContainerVideos = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Card>
          <CardActionArea>
            <CardMedia
              component={"iframe"}
              height="240"
              image="https://www.youtube.com/embed/dIRi4AqntSc?controls=0"
              alt="green iguana"
              
            />
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};
