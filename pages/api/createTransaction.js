import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl, Connection, PublicKey, Transaction } from "@solana/web3.js";
import { createTransferCheckedInstruction, getAssociatedTokenAddress, getMint } from "@solana/spl-token";
import BigNumber from "bignumber.js";
import products from "./products.json";

//const usdcAddress = new PublicKey("Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr");
const usdcAddress = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
const sellerAddress = "B1aLAAe4vW8nSQCetXnYqJfRxzTjnbooczwkUJAr7yMS";
const sellerPublicKey = new PublicKey(sellerAddress);

const createTransaction = async (req, res) => {
  try {
    const { buyer, orderID, itemID } = req.body;
    if (!buyer) {
      res.status(400).json({
        message: "Faltando o endereço do comprador",
      });
    }

    if (!orderID) {
      res.status(400).json({
        message: "Faltando a identificação do pedido",
      });
    }

    const itemPrice = products.find((item) => item.id === itemID).price;

    if (!itemPrice) {
      res.status(404).json({
        message: "Item não encontrado. Favor verificar a identificação do item",
      });
    }

    const bigAmount = BigNumber(itemPrice);
    const buyerPublicKey = new PublicKey(buyer);

    //const network = WalletAdapterNetwork.Devnet;
    const network = WalletAdapterNetwork.Mainnet;
    const endpoint = clusterApiUrl(network);
    const connection = new Connection(endpoint);

    const buyerUsdcAddress = await getAssociatedTokenAddress(usdcAddress, buyerPublicKey);
    const shopUsdcAddress = await getAssociatedTokenAddress(usdcAddress, sellerPublicKey);
    const { blockhash } = await connection.getLatestBlockhash("finalized");


    // Isto é novo, estamos recebendo o endereço da cunhagem do token que queremos transferir
    const usdcMint = await getMint(connection, usdcAddress);


    const tx = new Transaction({
      recentBlockhash: blockhash,
      feePayer: buyerPublicKey,
    });


    // Aqui estamos criando um tipo diferente de instrução de transferência
    const transferInstruction = createTransferCheckedInstruction(
      buyerUsdcAddress, 
      usdcAddress,     // Este é o endereço do token que queremos transferir
      shopUsdcAddress, 
      buyerPublicKey, 
      bigAmount.toNumber() * 10 ** (await usdcMint).decimals, 
      usdcMint.decimals // O token pode ter qualquer número de decimais
    );

    // O resto permanece o mesmo 😊 
    transferInstruction.keys.push({
      pubkey: new PublicKey(orderID),
      isSigner: false,
      isWritable: false,
    });

    tx.add(transferInstruction);

    const serializedTransaction = tx.serialize({
      requireAllSignatures: false,
    });

    const base64 = serializedTransaction.toString("base64");

    res.status(200).json({
      transaction: base64,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({ error: "error creating transaction" });
    return;
  }
};

export default function handler(req, res) {
  if (req.method === "POST") {
    createTransaction(req, res);
  } else {
    res.status(405).end();
  }
}