import { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

import { ModalCategories } from "./ModalCategories";
import { SweetAlert } from "../../helpers";
import { useDeleteCategory } from "./Hooks";

export const GridTableCategories = ({ categories, setOpen, open }) => {
  const [isEditCategory, setIsEditCategory] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({});

  const handleInitEdit = (category) => {
    setCurrentCategory(category);
    setIsEditCategory(true);
    setOpen(true);
  };

  const handleDeleteCategory = async (category) => {
    const result = await SweetAlert.deleteConfirm({
      title: `Está seguro de eliminar la cetegoria: ${category.description}`,
      text: "Si elimina la categoria se eliminaran todas las palabras asociadas a esta categoría",
    });

    if (result.isConfirmed) {
      useDeleteCategory(category.id_category);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        {categories.map((category) => (
          <Grid item xs={12} md={6} lg={3} key={category.id_category}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="150"
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
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDeleteCategory(category)}
                >
                  Eliminar
                </Button>
                <Button
                  size="small"
                  color="warning"
                  onClick={() => handleInitEdit(category)}
                >
                  Editar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {isEditCategory ? (
        <ModalCategories
          open={open}
          setOpen={setOpen}
          setIsEdit={setIsEditCategory}
          isEdit={isEditCategory}
          initDataForm={currentCategory}
        />
      ) : (
        <ModalCategories
          open={open}
          setOpen={setOpen}
          setIsEdit={setIsEditCategory}
        />
      )}
    </>
  );
};
