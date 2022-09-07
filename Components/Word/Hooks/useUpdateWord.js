import { mutate } from "swr";
import axios from "axios";
import { SweetAlert } from "../../../helpers";

export const useUpdateWord = async (word, resetForm = () => { }) => {
   const bodyData = {
      id_word: word.id_word,
      id_category: word.id_category,
      description: word.description,
      icon: word.icon,
   };

   if (word.iconFile?.length > 0) {
      const formData = new FormData();
      formData.append("file", word.iconFile[0]);

      try {
         const { data: url } = await axios.post("/file/image/word", formData, {
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
      await axios.put("word", bodyData);
      mutate(`/category/${word.id_category}/words`);
      SweetAlert.success({
         title: "Actualización exitosa",
         text: "La palabra se actualizó correctamente"
      })
   } catch (error) {
      resetForm();
      console.error(error);
      SweetAlert.error({
         title: "Oops...",
         text: "Hubo un error al actualizar la palabra, intentelo de nuevo"
      })
   }
}
