import { mutate } from "swr";
import axios from "axios";
import { SweetAlert } from "../../../helpers";


export const useAddCategory = async (category) => {
   const formData = new FormData();
   formData.append("file", category.iconFile[0]);
   const bodyData = {
      description: category.description,
      icon: undefined,
   };

   try {
      const { data: url } = await axios.post("/file/image/category", formData, {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      });
      bodyData.icon = url;
   } catch (error) {
      console.error(data);
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
      throw error;
   }
}
