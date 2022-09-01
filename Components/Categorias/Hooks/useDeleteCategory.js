import { mutate } from "swr";
import axios from "axios";
import { SweetAlert } from "../../../helpers";

export const useDeleteCategory = async (id_category) => {
   try {
      await axios.delete(`category/${id_category}`);
      mutate("/category");
      SweetAlert.success({
         title: "Eliminación exitosa",
         text: "La categoria se elimino correctamente"
      })
   } catch (error) {
      resetForm();
      console.error(error);
      SweetAlert.error({
         title: "Oops...",
         text: "Hubo un error al eliminar la categoria, intentelo de nuevo"
      })
   }
}
