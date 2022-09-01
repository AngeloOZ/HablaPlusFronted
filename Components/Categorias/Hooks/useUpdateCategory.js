import { mutate } from "swr";
import axios from "axios";
import { SweetAlert } from "../../../helpers";

export const useUpdateCategory = async (category, resetForm = () => { }) => {
   const bodyData = {
      id_category: category.id_category,
      description: category.description,
      icon: category.icon,
   };

   if (category.iconFile?.length > 0) {
      const formData = new FormData();
      formData.append("file", category.iconFile[0]);

      try {
         const { data: url } = await axios.post("/file/image/category", formData, {
            headers: {
               "Content-Type": "multipart/form-data",
            },
         });
         bodyData.icon = url;
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
