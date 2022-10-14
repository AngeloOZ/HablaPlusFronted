import { useRouter } from 'next/router';
import axios from 'axios';
import { mutate } from 'swr';
import { SweetAlert } from '../../../helpers';

export const useSentencesReview = () => {
   const router = useRouter();
   const redirectToHome = () => {
      return router.push('/admin/repaso-palabras');
   }

   const addSentence = async (newSentece) => {
      try {
         await axios.post("sentences", newSentece);
         mutate("/sentences");
         SweetAlert.success({
            title: "Registro exitoso",
            text: "La oración se registro correctamente",
            onClose: redirectToHome
         })
      } catch (error) {
         console.error(error);
         SweetAlert.error({
            title: "Oops...",
            text: "Hubo un error al registrar la oración, intentelo de nuevo"
         })
      }
   }

   const updateSentence = async (newSentece) => {
      try {
         await axios.put("sentences", newSentece);
         mutate("/sentences");
         SweetAlert.success({
            title: "Actualización exitoso",
            text: "La oración se actualizó correctamente",
            onClose: redirectToHome
         })
      } catch (error) {
         console.error(error);
         SweetAlert.error({
            title: "Oops...",
            text: "Hubo un error al actualizar la oración, intentelo de nuevo"
         })
      }
   }

   const deleteSentence = async (id_sentence) => {
      try {
         await axios.delete(`sentences/${id_sentence}`);
         mutate("/sentences");
         SweetAlert.success({
            title: "Eliminación exitosa",
            text: "La oración se elimino correctamente"
         })
      } catch (error) {
         resetForm();
         console.error(error);
         SweetAlert.error({
            title: "Oops...",
            text: "Hubo un error al eliminar la oración, intentelo de nuevo"
         })
      }
   }

   return { addSentence, updateSentence, deleteSentence }
}