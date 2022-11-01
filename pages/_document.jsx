import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initalProps = await Document.getInitialProps(ctx);

    return initalProps;
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            href="https://cdn.jsdelivr.net/gh/AngeloOZ/HablaPlusFronted@main/public/css/font-gotham.css?token=GHSAT0AAAAAAB2VCRMGXDZXZBMIE3GQOVV6Y3BOQDQ"
            rel="stylesheet"
          />
//                 <link
//             href="http://fonts.cdnfonts.com/css/gotham?styles=17581,17583,17587,17588,17589,17591,17592,17595,17590,17594"
//             rel="stylesheet"
//           />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
