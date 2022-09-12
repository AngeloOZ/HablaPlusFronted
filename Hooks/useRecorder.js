import { useEffect, useState } from "react";

export const useRecorder = () => {
   const [audioURL, setAudioURL] = useState("");
   const [isRecording, setIsRecording] = useState(false);
   const [recorder, setRecorder] = useState(null);
   const [streamMedia, setStreamMedia] = useState(null);
   const [archivoBLOB, setArchivoBLOB] = useState(null);
   const [messagesRecorder, setMessagesRecorder] = useState(undefined);

   let fragmentosAudio = [];

   useEffect(async () => {
      if (recorder === null) {
         if (isRecording) {
            try {
               const media = await requestRecorder(setStreamMedia);
               setRecorder(media);
            } catch (error) {
               alert(error?.message);
               setMessagesRecorder(error?.messages);
               console.error(error);
            }
         }
         return;
      }

      // Manage recorder state.
      if (isRecording && recorder !== null) {
         recorder.start();
         setMessagesRecorder("Grabando...");
      } else {
         recorder.stop();
         setMessagesRecorder("Se dejo de grabar");
      }

      // Obtain the audio when ready.
      const handleData = e => {
         fragmentosAudio.push(e.data);
         setAudioURL(URL.createObjectURL(e.data));
      };

      const handleStopRecorder = () => {
         streamMedia.getTracks().forEach(track => track.stop());
         const blobAudio = new Blob(fragmentosAudio);
         setArchivoBLOB(blobAudio);
         setRecorder(null);
         fragmentosAudio = [];
      }

      recorder.addEventListener('stop', handleStopRecorder);
      recorder.addEventListener("dataavailable", handleData);

      return () => {
         recorder.removeEventListener('stop', handleStopRecorder);
         recorder.removeEventListener("dataavailable", handleData)
      };

   }, [recorder, isRecording]);

   const startRecording = () => {
      setIsRecording(true);
      fragmentosAudio = [];
   };

   const stopRecording = () => {
      if (!recorder) {
         return setMessagesRecorder('No se esta grabando')
      }
      setIsRecording(false);
   };

   return { audioURL, isRecording, startRecording, stopRecording, archivoBLOB, messagesRecorder };
};

async function requestRecorder(setStreamMedia) {
   const tieneSoporteUserMedia = () =>
      !!(navigator.mediaDevices.getUserMedia);

   const listDevices = await (await navigator.mediaDevices.enumerateDevices()).filter(div => div.kind === "audioinput");

   if (typeof MediaRecorder === "undefined" || !tieneSoporteUserMedia()) {
      throw new Error('Tu navegador web no cumple los requisitos; por favor, actualiza el navegador Firefox o Google Chrome');
   }

   const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
   setStreamMedia(stream);
   return new MediaRecorder(stream);
}

