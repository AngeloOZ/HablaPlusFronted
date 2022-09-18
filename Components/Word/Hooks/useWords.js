import { mutate } from "swr";
import axios from "axios";
import { SweetAlert } from "../../../helpers";

export const useWords = () => {

   const addWord = async (word) => {
      const bodyData = {
         id_category: word.id_category,
         description: word.description,
         icon: undefined,
         audio: undefined
      };

      try {
         const formData = new FormData();
         formData.append("file", word.iconFile[0]);
         const { data } = await axios.post("/file/image/word", formData, {
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
         const formData = new FormData();
         formData.append('file', word.audioFile);
         const { data } = await axios.post('/file/audio', formData, {
            headers: {
               "Content-Type": "multipart/form-data",
            }
         });
         bodyData.audio = data.url;
      } catch (error) {
         console.error(error);
         SweetAlert.error({
            title: "Oops...",
            text: "Hubo un error al cargar el audio, intentelo de nuevo"
         })
         throw error;
      }

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

   const updateWord = async (word, resetForm = () => { }) => {
      const bodyData = {
         id_word: word.id_word,
         id_category: word.id_category,
         description: word.description,
         icon: word.icon,
         audio: word.audio
      };

      if (word.iconFile?.length > 0) {
         const formData = new FormData();
         formData.append("file", word.iconFile[0]);

         try {
            const { data } = await axios.post("/file/image/word", formData, {
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

      if (word.audioFile) {
         try {
            const formData = new FormData();
            formData.append('file', word.audioFile);
            const { data } = await axios.post('/file/audio', formData, {
               headers: {
                  "Content-Type": "multipart/form-data",
               }
            });
            bodyData.audio = data.url;
         } catch (error) {
            resetForm();
            console.error(error);
            SweetAlert.error({
               title: "Oops...",
               text: "Hubo un error al cargar el audio, intentelo de nuevo"
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

   const deleteWord = async (word) => {
      try {
         await axios.delete(`word/${word.id_word}`);
         mutate(`/category/${word.id_category}/words`);
         SweetAlert.success({
            title: "Eliminación exitosa",
            text: "La palabra se elimino correctamente"
         })
      } catch (error) {
         console.error(error);
         SweetAlert.error({
            title: "Oops...",
            text: "Hubo un error al eliminar la palabra, intentelo de nuevo"
         })
      }
   }

   return { addWord, updateWord, deleteWord }
}
