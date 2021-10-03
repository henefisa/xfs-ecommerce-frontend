import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <div id="modal-root" />
          <div id="select-root" />
          <div id="menu-root"></div>
          <div id="drawer-root" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
