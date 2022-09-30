import Head from "next/head";
import css from "../styles/Home.module.scss";

export const LoginLayout = ({ title = "Inicio - Habla+", children }) => {
  return (
    <div className={css.contenedorPadre}>
      <Head>
        <title>{title}</title>
      </Head>
      <main className={css.main}>{children}</main>
      <footer
        className={css.footer}
        style={{
          backgroundImage: `url(${"http://localhost:3000/img/fondos/fondo1.png"})`,
        }}
      ></footer>
    </div>
  );
};
