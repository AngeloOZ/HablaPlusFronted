import { mutate } from "swr";
import axios from "axios";
import { SweetAlert } from "../../../helpers";

export const useCategories = () => {

   const addCategory = async (category) => {
      const formData = new FormData();
      formData.append("file", category.iconFile[0]);
      const bodyData = {
         description: category.description,
         icon: undefined,
      };

      try {
         const { data } = await axios.post("/file/image/category", formData, {
            headers: {
               "Content-Type": "multipart/form-data",
            },
         });
         bodyData.icon = data.url;
      } catch (error) {
         console.error(error);
         SweetAlert.error({
            title: "Oops...",
            text: "Hubo un error al cargar la imagén, intentelo de nuevo"
         })
         throw error;
      }

      try {
         await axios.post("category", bodyData);
         mutate("/category");
         SweetAlert.success({
            title: "Registro exitoso",
            text: "La categoria se registro correctamente"
         })
      } catch (error) {
         console.error(error);
         SweetAlert.error({
            title: "Oops...",
            text: "Hubo un error al registrar la categoria, intentelo de nuevo"
         })
      }
   }

   const updateCategory = async (category, resetForm = () => { }) => {
      const bodyData = {
         id_category: category.id_category,
         description: category.description,
         icon: category.icon,
      };

      if (category.iconFile?.length > 0) {
         const formData = new FormData();
         formData.append("file", category.iconFile[0]);

         try {
            const { data } = await axios.post("/file/image/category", formData, {
               headers: {
                  "Content-Type": "multipart/form-data",
               },
            });
            bodyData.icon = data.url;
         } catch (error) {
            resetForm();
            console.error(data);
            SweetAlert.error({
               title: "Oops...",
               text: "Hubo un error al cargar la imagén, intentelo de nuevo"
            })
         }
      }

      try {
         await axios.put("category", bodyData);
         mutate("/category");
         SweetAlert.success({
            title: "Actualización exitosa",
            text: "La categoria se actualizó correctamente"
         })
      } catch (error) {
         resetForm();
         console.error(error);
         SweetAlert.error({
            title: "Oops...",
            text: "Hubo un error al actualizar la categoria, intentelo de nuevo"
         })
      }
   }

   const deleteCategories = async (id_category) => {
      try {
         await axios.delete(`category/${id_category}`);
         mutate("/category");
         SweetAlert.success({
            title: "Eliminación exitosa",
            text: "La categoria se elimino correctamente"
         })
      } catch (error) {
         resetForm();
         console.error(error);
         SweetAlert.error({
            title: "Oops...",
            text: "Hubo un error al eliminar la categoria, intentelo de nuevo"
         })
      }
   }

   return { addCategory, updateCategory, deleteCategories }
}
