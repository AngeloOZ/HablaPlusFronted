import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

export const ItemCategory = ({ category, handleEdit }) => {
  return (
    <Grid item xs={12} md={6} lg={3}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={category.icon}
        />
        <CardContent>
          <Typography
            variant="h5"
            padding={0}
            component="span"
            textTransform={"capitalize"}
          >
            {category.description}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button size="small" color="error">
            Eliminar
          </Button>
          <Button
            size="small"
            color="warning"
            onClick={() => handleEdit(category)}
          >
            Editar
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
