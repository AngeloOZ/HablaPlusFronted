import { mutate } from "swr";
import axios from "axios";
import { SweetAlert } from "../../../helpers";

export const useDeleteWord = async (word) => {
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
