import { useContext } from 'react';
import { useRouter } from 'next/router';
import Cookies from "js-cookie";
import { mutate } from 'swr';
import axios from 'axios';

import { SweetAlert } from '../helpers';
import { AuthContext } from '../Context';

export const useUpdateAvatar = (redirect = true ) => {
    const router = useRouter();
    const { verifyToken } = useContext(AuthContext);

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
            await verifyToken();
            if (redirect) {
                router.push('/paciente');
            }
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
