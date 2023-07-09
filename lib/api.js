export const addOrder = async (order) => {
    console.log("adicionando pedido", order, "para o banco de dados");
    await fetch("../api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
  };

  // Retorna verdadeiro se uma determinada chave pública tiver adquirido um item anteriormente
export const hasPurchased = async (publicKey, itemID) => {
    // Enviar um pedido GET com a chave pública como parâmetro
    const response = await fetch(`../api/orders?buyer=${publicKey.toString()}`);
    // Se o código-resposta é 200
    if (response.status === 200) {
      const json = await response.json();
      console.log("Os pedidos atuais de carteira são:", json);
      // Se os pedidos não estiverem vazios
      if (json.length > 0) {
        // Verifique se há algum registro com este comprador e identificação do item
        const order = json.find((order) => order.buyer === publicKey.toString() && order.itemID === itemID);
        if (order) {
          return true;
        }
      }
    }
    return false;
  };

  export const fetchItem = async (itemID) => {
    const response = await fetch("../api/fetchItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemID }),
    });
    const item = await response.json();
    return item;
  }