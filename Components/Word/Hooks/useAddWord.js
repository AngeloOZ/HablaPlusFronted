import { mutate } from "swr";
import axios from "axios";
import { SweetAlert } from "../../../helpers";


export const useAddWord = async (word) => {
   const formData = new FormData();
   formData.append("file", word.iconFile[0]);
   const bodyData = {
      id_category: word.id_category,
      description: word.description,
      icon: undefined,
   };

   try {
      const { data: url } = await axios.post("/file/image/word", formData, {
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

   // try {
   //    const formData = new FormData();
   //    formData.append('file', blobAudio);
   //    axios.post('/file/audio', formData, {
   //       headers: {
   //          "Content-Type": "multipart/form-data",
   //       }
   //    }).then(res => console.log(res?.data)).catch(console.error);
   // } catch (error) {
      
   // }

   try {
      await axios.post("word", bodyData);
      mutate(`/category/${word.id_category}/words`);
      SweetAlert.success({
         title: "Registro exitoso",
         text: "La palabra se registro correctamente"
      })
   } catch (error) {
      console.error(error);
      SweetAlert.error({
         title: "Oops...",
         text: "Hubo un error al registrar la palabra, intentelo de nuevo"
      })
      throw error;
   }
}
