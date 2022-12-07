import React from "react";
import Head from "next/head";

export default function HeadComponent() {
  return (
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="theme-color" content="#000000" />

      <title>Solana Pay Store</title>
      <meta name="title" content="Solana Pay Store" />
      <meta name="description" content="Compre itens na minha loja usando Solana Pay!" />

      {/* Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://bootcamp.web3dev.com.br/" />
      <meta property="og:title" content="Solana Pay Store" />
      <meta property="og:description" content="Compre itens na minha loja usando Solana Pay!" />
      <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/web3dev-bootcamp.appspot.com/o/courses_cover%2FSolana_Pay_Store_256.jpeg?alt=media&token=c1e28101-d7e2-4512-9f5b-b199e6df10e4" />

      {/* Twitter */}
      <meta property="twitter:url" content="https://bootcamp.web3dev.com.br/" />
      <meta property="twitter:title" content="Solana Pay Store" />
      <meta property="twitter:description" content="Compre itens na minha loja usando Solana Pay!" />
      <meta property="twitter:image" content="https://firebasestorage.googleapis.com/v0/b/web3dev-bootcamp.appspot.com/o/courses_cover%2FSolana_Pay_Store_256.jpeg?alt=media&token=c1e28101-d7e2-4512-9f5b-b199e6df10e4" />
    </Head>
  );
}
