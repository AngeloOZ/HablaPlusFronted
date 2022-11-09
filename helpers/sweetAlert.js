import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const confiSwal = {
   title: "title",
   text: "text",
   icon: "",
   confirmButtonText: "OK",
   showCloseButton: true,
   showCancelButton: false,
   cancelButtonText: "Cancelar",
   confirmButtonColor: "#EC4D20",
   cancelButtonColor: "#d33",
   timer: 0,
   onClose: () => { }
}

export function success(config = confiSwal) {
   confiSwal.icon = "success";
   const defultConfigAlert = { ...confiSwal, ...config }
   return MySwal.fire({
      title: defultConfigAlert.title,
      text: defultConfigAlert.text,
      icon: defultConfigAlert.icon,
      timer: defultConfigAlert.timer,
      showCloseButton: defultConfigAlert.showCloseButton,
      confirmButtonColor: defultConfigAlert.confirmButtonColor,
      confirmButtonText: defultConfigAlert.confirmButtonText,
      didClose: () => {
         defultConfigAlert.onClose();
      }
   })
}

export function error(config = confiSwal) {
   const defultConfigAlert = { ...confiSwal, ...config }
   return MySwal.fire({
      title: defultConfigAlert.title,
      text: defultConfigAlert.text,
      icon: "error",
      timer: defultConfigAlert.timer,
      showCloseButton: defultConfigAlert.showCloseButton,
      confirmButtonText: defultConfigAlert.confirmButtonText,
      didClose: () => {
         defultConfigAlert.onClose();
      }
   })
}

export function deleteConfirm(config = confiSwal) {
   const defultConfigAlert = { ...confiSwal, ...config }
   return MySwal.fire({
      title: defultConfigAlert.title,
      text: defultConfigAlert.text,
      icon: "warning",
      timer: defultConfigAlert.timer,
      confirmButtonText: defultConfigAlert.confirmButtonText,
      confirmButtonColor: '#3085d6',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: defultConfigAlert.cancelButtonText,
      didClose: () => {
         defultConfigAlert.onClose();
      }
   })
}

export function successConfirm(config = confiSwal) {
   confiSwal.icon = "info"
   confiSwal.showCancelButton = true;
   const defultConfigAlert = { ...confiSwal, ...config }
   return MySwal.fire({
      title: defultConfigAlert.title,
      text: defultConfigAlert.text,
      icon: defultConfigAlert.icon,
      timer: defultConfigAlert.timer,
      confirmButtonText: defultConfigAlert.confirmButtonText,
      confirmButtonColor: "#28a745",
      showCancelButton: defultConfigAlert.showCancelButton,
      cancelButtonColor: defultConfigAlert.cancelButtonColor,
      cancelButtonText: defultConfigAlert.cancelButtonText,
      didClose: () => {
         defultConfigAlert.onClose();
      }
   })
}

export function alertAvatar() {
   return MySwal.fire({
      title: "Felicidades...!",
      text: "Desbloqueaste un nuevo avatar",
      html: "<h2>Hola mundo!</h2>",
      timer: confiSwal.timer,
      confirmButtonText: confiSwal.confirmButtonText,
      confirmButtonColor: confiSwal.confirmButtonColor,
   })
}