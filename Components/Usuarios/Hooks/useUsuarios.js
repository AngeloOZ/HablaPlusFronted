import axios from 'axios';
import { mutate } from 'swr';
import Cookies from "js-cookie";
import { SweetAlert } from '../../../helpers';


export const useUsuarios = () => {

    const updateUserClient = async (newUser) => {
        try {
            const { data: user } = await axios.put("user/client", newUser);
            Cookies.set("SESSION_ID", user.token, { expires: 1 });
            await SweetAlert.success({
                title: "Actualzación exitosa",
                text: "Los datos se actualizaron correctamente",
            })
            return true
        } catch (error) {
            console.error(error);
            SweetAlert.error({
                title: "Oops...",
                text: "Hubo un error al actualizar los datos, inténtelo de nuevo"
            })
            return false;
        }
    }
    return { updateUserClient }
}
