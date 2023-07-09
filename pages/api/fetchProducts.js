import products from "./products.json"

export default function handler(req, res) {
  // Se for solicitado
  if (req.method === "GET") {
    // Criar uma cópia dos produtos sem os hashes e nomes de arquivo
    const productsNoHashes = products.map((product) => {

      const { hash, filename, ...rest } = product;
      return rest;
    });

    res.status(200).json(productsNoHashes);  
  }
  else {
    res.status(405).send(`Method ${req.method} not allowed`);
  }
}