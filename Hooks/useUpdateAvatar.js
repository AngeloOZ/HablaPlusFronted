import axios from 'axios';
import { mutate } from 'swr';
import Cookies from "js-cookie";
import { SweetAlert } from '../helpers';

export const useUpdateAvatar = () => {

    const addAvatar = async (id_avatar) => {
        try {
            const { data: user } = await axios.post("sentences", id_avatar);
            mutate("/avatar/user");
            Cookies.set("SESSION_ID", user.token, { expires: 1 });
            return true;
        } catch (error) {
            console.error(error);
            await SweetAlert.error({
                title: "Oops...",
                text: "Hubo un error al guardar tu avatar, intentelo de nuevo"
            })
            return false;
        }
    }
    const updateAvatar = async (id_user_avatar) => {
        try {
            const { data: user } = await axios.put("avatar", { id_user_avatar });
            mutate("/avatar/user");
            Cookies.set("SESSION_ID", user.token, { expires: 1 });
            return true;
        } catch (error) {
            console.error(error);
            await SweetAlert.error({
                title: "Oops...",
                text: "Hubo un error al guardar tu avatar, intentelo de nuevo"
            })
            return false;
        }
    }

    return { updateAvatar }
}
