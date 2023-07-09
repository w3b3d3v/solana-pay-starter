// Este ponto de extremidade da API permitirá que os usuários usem POST e publiquem dados para adicionar registros e GET para recuperar registros
import orders from "./orders.json";
import { writeFile } from "fs/promises";

function get(req, res) {
  const { buyer } = req.query;

  // Verifique se este endereço tem algum pedido
  const buyerOrders = orders.filter((order) => order.buyer === buyer);
  if (buyerOrders.length === 0) {
    // 204 = processou a solicitação com sucesso, não retornando nenhum conteúdo
    res.status(204).send();
  } else {
    res.status(200).json(buyerOrders);
  }
}

async function post(req, res) {
  console.log("Pedido de adição de pedido recebido", req.body);
  // Adicionar novo pedido a orders.json
  try {
    const newOrder = req.body;

    // Se este endereço não tiver comprado este item, adicione pedido a orders.json
    if (!orders.find((order) => order.buyer === newOrder.buyer.toString() && order.itemID === newOrder.itemID)) {
      orders.push(newOrder);
      await writeFile("./pages/api/orders.json", JSON.stringify(orders, null, 2));
      res.status(200).json(orders);
    } else {
      res.status(400).send("O pedido já existe");
    }
  } catch (err) {
    res.status(400).send(err);
  }
}

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      get(req, res);
      break;
    case "POST":
      await post(req, res);
      break;
    default:
      res.status(405).send(`Método ${req.method} não permitido`);
  }
}