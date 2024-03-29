import { mutate } from "swr";
import axios from "axios";
import { SweetAlert } from "../../../helpers";

export const useCategories = () => {

   const addCategory = async (category) => {
      const bodyData = {
         description: category.description,
         icon: undefined,
         icon2: undefined,
      };

      try {
         const formData = new FormData();
         formData.append("file", category.iconFile[0]);
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
            text: "Hubo un error al cargar la imagén, inténtelo de nuevo"
         })
         throw error;
      }

      if (category.iconFile2?.length > 0) {
         try {
            const formData = new FormData();
            formData.append("file", category.iconFile2[0]);
            const { data } = await axios.post("/file/image/category", formData, {
               headers: {
                  "Content-Type": "multipart/form-data",
               },
            });
            bodyData.icon2 = data.url;
         } catch (error) {
            resetForm();
            console.error(data);
            SweetAlert.error({
               title: "Oops...",
               text: "Hubo un error al cargar la imagén, inténtelo de nuevo"
            })
         }
      }

      try {
         await axios.post("category", bodyData);
         mutate("/category");
         SweetAlert.success({
            title: "Registro exitoso",
            text: "La categoría se registró correctamente"
         })
      } catch (error) {
         console.error(error);
         SweetAlert.error({
            title: "Oops...",
            text: "Hubo un error al registrar la categoría, inténtelo de nuevo"
         })
      }
   }

   const updateCategory = async (category, resetForm = () => { }) => {
      const bodyData = {
         id_category: category.id_category,
         description: category.description,
         icon: category.icon,
         icon2: category.icon2,
      };

      if (category.iconFile?.length > 0) {
         try {
            const formData = new FormData();
            formData.append("file", category.iconFile[0]);
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
               text: "Hubo un error al cargar la imagén, inténtelo de nuevo"
            })
         }
      }

      if (category.iconFile2?.length > 0) {
         try {
            const formData = new FormData();
            formData.append("file", category.iconFile2[0]);
            const { data } = await axios.post("/file/image/category", formData, {
               headers: {
                  "Content-Type": "multipart/form-data",
               },
            });
            bodyData.icon2 = data.url;
         } catch (error) {
            resetForm();
            console.error(data);
            SweetAlert.error({
               title: "Oops...",
               text: "Hubo un error al cargar la imagén, inténtelo de nuevo"
            })
         }
      }

      try {
         await axios.put("category", bodyData);
         mutate("/category");
         SweetAlert.success({
            title: "Actualización exitosa",
            text: "La categoría se actualizó correctamente"
         })
      } catch (error) {
         resetForm();
         console.error(error);
         SweetAlert.error({
            title: "Oops...",
            text: "Hubo un error al actualizar la categoría, inténtelo de nuevo"
         })
      }
   }

   const deleteCategories = async (id_category) => {
      try {
         await axios.delete(`category/${id_category}`);
         mutate("/category");
         SweetAlert.success({
            title: "Eliminación exitosa",
            text: "La categoría se eliminó correctamente"
         })
      } catch (error) {
         resetForm();
         console.error(error);
         SweetAlert.error({
            title: "Oops...",
            text: "Hubo un error al eliminar la categoría, inténtelo de nuevo"
         })
      }
   }

   return { addCategory, updateCategory, deleteCategories }
}
