// Este ponto de extremidade enviará ao usuário um hash de arquivo do IPFS
import products from "./products.json"

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { itemID } = req.body;

    if (!itemID) {
      return res.status(400).send('itemID faltando');
    }

    const product = products.find((p) => p.id === itemID);


    if (product) {
      const { hash, filename } = product;
      return res.status(200).send({ hash, filename });
    } else {
      return res.status(404).send("Item não encontrado");
    }
  } else {
    return res.status(405).send(`Método ${req.method} não permitido`);
  }
}