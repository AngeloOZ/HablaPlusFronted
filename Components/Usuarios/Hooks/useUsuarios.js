import axios from 'axios';
import { mutate } from 'swr';
import Cookies from "js-cookie";
import { SweetAlert } from '../../../helpers';


export const useUsuarios = () => {

    const addUserAdmin = async (newUser) => {
        try {
            await axios.post("user", newUser);
            mutate(`/rol/${newUser.id_type}/users`);
            SweetAlert.success({
                title: "Usuario registrado",
                text: "El usuario se registró correctamente",
            })
        } catch (error) {
            console.error(error);
            SweetAlert.error({
                title: "Oops...",
                text: "Hubo un error al registrar el usuario, inténtelo de nuevo"
            })
        }
    }
    const updateUserAdmin = async (newUser) => {
        try {
            if (newUser.newPassword == "") {
                delete newUser.newPassword;
            }
            await axios.put("user", newUser);
            mutate(`/rol/${newUser.id_type}/users`);
            SweetAlert.success({
                title: "Usuario actualizado",
                text: "Los datos se actualizaron correctamente",
            })
        } catch (error) {
            console.error(error);
            SweetAlert.error({
                title: "Oops...",
                text: "Hubo un error al actualizar los datos, inténtelo de nuevo"
            })
        }
    }

    const deleteUserAdmin = async (user) => {
        try {
            await axios.delete(`user/${user.id_user}`);
            mutate(`/rol/${user.id_type}/users`);
            SweetAlert.success({
                title: "Se elimino correctamente",
                text: "El usuario se eliminó correctamente"
            })
        } catch (error) {
            console.error(error);
            SweetAlert.error({
                title: "Oops...",
                text: "Hubo un error al eliminar el usuario, inténtelo de nuevo"
            })
        }
    }

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
    return { addUserAdmin, updateUserAdmin, deleteUserAdmin, updateUserClient }
}
