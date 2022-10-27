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
          backgroundImage: `url(${process.env.NEXT_PUBLIC_URL}img/fondos/fondo1.png)`,
        }}
      ></footer>
    </div>
  );
};
