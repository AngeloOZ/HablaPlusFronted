import { mutate } from "swr";
import axios from "axios";
import { SweetAlert } from "../../../helpers";

export const useWords = () => {

   const getWordsByCategory = async (id_category) => {
      try {
         const { data: request } = await axios.get(`category/${id_category}/words`);
         return ["ok", request.data];
      } catch (error) {
         return ['error', []];
      }
   }

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
            text: "Hubo un error al cargar la imagén, inténtelo de nuevo"
         })
         throw error;
         return;
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
            text: "Hubo un error al cargar el audio, inténtelo de nuevo"
         })
         throw error;
         return;
      }

      try {
         await axios.post("word", bodyData);
         mutate(`/category/${word.id_category}/words`);
         SweetAlert.success({
            title: "Registro exitoso",
            text: "La palabra se registró correctamente"
         })
      } catch (error) {
         console.error(error);
         SweetAlert.error({
            title: "Oops...",
            text: "Hubo un error al registrar la palabra, inténtelo de nuevo"
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
            const { data } = await axios.post(`/file/image/word/${btoa(bodyData.icon)}`, formData, {
               headers: {
                  "Content-Type": "multipart/form-data",
               },
            });
            bodyData.icon = data.url;
         } catch (error) {
            resetForm();
            console.error(error);
            SweetAlert.error({
               title: "Oops...",
               text: "Hubo un error al cargar la imagén, inténtelo de nuevo"
            })
            return;
         }
      }

      if (word.audioFile) {
         try {
            const formData = new FormData();
            formData.append('file', word.audioFile);
            const { data } = await axios.post(`/file/audio/${btoa(bodyData.audio)}`, formData, {
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
               text: "Hubo un error al cargar el audio, inténtelo de nuevo"
            })
            return;
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
            text: "Hubo un error al actualizar la palabra, inténtelo de nuevo"
         })
      }
   }

   const deleteWord = async (word) => {
      try {
         await axios.delete(`word/${word.id_word}`);
         mutate(`/category/${word.id_category}/words`);
         SweetAlert.success({
            title: "Eliminación exitosa",
            text: "La palabra se eliminó correctamente"
         })
      } catch (error) {
         console.error(error);
         SweetAlert.error({
            title: "Oops...",
            text: "Hubo un error al eliminar la palabra, inténtelo de nuevo"
         })
      }
   }

   const registerWordLearned = async (listWords, bodyRequest) => {
      try {
         if (!listWords.includes(bodyRequest.id_word)) {
            await axios.post('word_learned', bodyRequest);
            return false;
         }
         return true;
      } catch (error) {
         throw { status: 500, message: "no hubo registro", data: error }
      }
   }

   return { getWordsByCategory, addWord, updateWord, deleteWord, registerWordLearned }
}
