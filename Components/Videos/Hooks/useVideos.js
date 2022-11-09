import axios from "axios";
import { mutate } from "swr";
import { SweetAlert } from "../../../helpers";


export const useVideos = () => {
   const addVideo = async (video) => {
      try {
         await axios.post("video", video);
         mutate("/video");
         SweetAlert.success({
            title: "Registro exitoso",
            text: "El video se registró correctamente"
         })
      } catch (error) {
         console.error(error);
         SweetAlert.error({
            title: "Oops...",
            text: "Hubo un error al registrar el video, inténtelo de nuevo"
         })
      }
   }

   const updateVideo = async (video, reset = () => { }) => {
      try {
         await axios.put("video", video);
         mutate("/video");
         SweetAlert.success({
            title: "Actualización exitosa",
            text: "El video se actualizó correctamente"
         })
      } catch (error) {
         reset();
         console.error(error);
         SweetAlert.error({
            title: "Oops...",
            text: "Hubo un error al actualizar el video, inténtelo de nuevo"
         })
      }
   }

   const deleteVideo = async (id_video) => {
      try {
         await axios.delete(`video/${id_video}`);
         mutate("/video");
         SweetAlert.success({
            title: "Eliminación exitosa",
            text: "El video se eliminó correctamente"
         })
      } catch (error) {
         resetForm();
         console.error(error);
         SweetAlert.error({
            title: "Oops...",
            text: "Hubo un error al eliminar el video, inténtelo de nuevo"
         })
      }
   }

   return { addVideo, updateVideo, deleteVideo }
}
