import Head from "next/head";
import {
  Avatar,
  ButtonPatient,
  CircleAvatar,
  InputPatient,
  Pictograma,
} from "../Components";

const PageComponentes = () => {
  return (
    <div
      style={{
        background: "#fff",
        width: "100%",
        height: "100vh",
        padding: 20,
      }}
    >
      <Head>
        <title>Componentes</title>
      </Head>
      {/* <CircleAvatar src="http://localhost:3000/img/avatar1.png" size='large' /> */}
      {/* <CircleAvatar src="http://localhost:3000/img/avatar1.png" size='small' /> */}
      {/* <Avatar src="http://localhost:3000/img/avatar2.1.png" /> */}
      {/* <Avatar src="http://localhost:3000/img/avatar1.png" /> */}
      {/* <ButtonPatient>
        aceptar
      </ButtonPatient> */}
      {/* <Pictograma src="http://localhost:3000/img/pictograma1.png" /> */}
      {/* <Pictograma
        src="http://localhost:3000/img/pictograma1.png"
        color="secondary"
      /> */}
      <InputPatient label={"Ingresa tu nombre"} />
    </div>
  );
};

export default PageComponentes;
