/**
 * Funcion para paginar un array
 * @param {Array} array Array de que se desea paginar
 * @param {Number} current_number Número de página que se desea obtener
 * @param {Number} page_size Número de elementos que se desea en la página
 * @returns Array
 */
export function paginateArray(array, current_number, page_size = 6) {
   --current_number;
   return array.slice(current_number * page_size, (current_number + 1) * page_size);
}


export function getUrlVideo(iframe) {
   const urlVideo = iframe.substring(
      iframe.indexOf("https"),
      iframe.indexOf('" title')
   );
   return urlVideo;
}

export function getIdVideo(iframe) {
   const urlVideo = iframe.substring(
      iframe.indexOf("https"),
      iframe.indexOf('" title')
   );
   const idVideo = urlVideo.substring(urlVideo.indexOf("embed") + 6);
   return idVideo;
}

