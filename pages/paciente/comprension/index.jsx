import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { PatientLayout } from "../../../Layouts";

const PageIndexComprension = () => {
  const router = useRouter();
  
  useEffect(() => {
    axios
      .get("word_learned/user/1")
      .then((response) => response.data)
      .then((response) => response.data)
      .then((sentences) => {
        const json = JSON.stringify(sentences);
        localStorage.setItem("listSentences", json);
      })
      .catch((error) => {
        console.log(error);
        router.push("/paciente");
      });
  }, []);

  return (
    <PatientLayout
      currentUser
      configButton
      title="Categorias de Aprendizaje - Habla+"
      urlBackground="fondo3.png"
    ></PatientLayout>
  );
};

export default PageIndexComprension;
