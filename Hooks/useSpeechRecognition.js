import { useState, useEffect } from 'react';

export const useSpeechRecognition = () => {

   const [isRecognition, setIsRecognition] = useState(false);
   const [recognition, setRecognition] = useState(null);
   const [isEndRecognition, setIsEndRecognition] = useState(true);
   const [recognizedText, setRecognizedText] = useState("");
   const [errorMessage, setErrorMessage] = useState(null);
   const [confidense, setConfidence] = useState(0);


   useEffect(() => {
      try {
         if (!window.webkitSpeechRecognition) {
            alert("tu navegador no es compatible con reconocimineto de voz, te recomendamos usar Chrome");
            return;
         }
         const SpeechRecognition = window.webkitSpeechRecognition;
         setRecognition(new SpeechRecognition());

         recognition.lang = 'es-ES';
         recognition.continuous = false;
         recognition.interimResults = true;
      } catch (error) {
         // setErrorMessage(error.message);
      }
   }, []);

   useEffect(() => {
      if (recognition) {
         setConfidence(0);
         setRecognizedText("");

         recognition.onstart = () => {
            setIsEndRecognition(false);
         }

         recognition.onresult = (event) => {
            const results = event.results;
            const frase = results[results.length - 1][0].transcript.toLowerCase();
            const confidence = (results[results.length - 1][0].confidence.toFixed(2)) * 100;
            setConfidence(confidence);
            setRecognizedText(recognizedText + frase);
         }

         recognition.onend = () => {
            setIsEndRecognition(true);
            stopRecognition();
         }

         recognition.onerror = (event) => {
            setErrorMessage(event.error);
         }
      }
   }, [recognition])

   useEffect(() => {
      if (recognition) {
         (isRecognition) ?
            recognition.start() :
            recognition.abort();
      }
   }, [isRecognition]);

   const startRecognition = () => {
      setIsRecognition(true);
   }

   const stopRecognition = () => {
      setIsRecognition(false);
   }

   return { startRecognition, confidense, recognizedText, errorMessage, isEndRecognition }
}
