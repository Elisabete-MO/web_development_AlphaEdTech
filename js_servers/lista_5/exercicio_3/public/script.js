// ======== PRODUTOS ========

// Listar produtos
document.getElementById("btnListProducts").addEventListener("click", async () => {
  const res = await fetch("/api/product");
  const data = await res.json();
  console.log(data);
  document.getElementById("productsResult").textContent =
    JSON.stringify(data, null, 2);
});

// Adicionar produto
document.getElementById("btnAddProduct").addEventListener("click", async () => {
  const id = Number(document.getElementById("prodId").value);
  const name = document.getElementById("prodName").value;
  const value = Number(document.getElementById("prodValue").value);

  const body = { id, name, value };

  const res = await fetch("/api/product", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const data = await res.json();

  document.getElementById("productsResult").textContent =
    JSON.stringify(data, null, 2);
});

// ======== PEDIDOS ========

// Listar pedidos
document.getElementById("btnListOrders").addEventListener("click", async () => {
  const res = await fetch("/api/order");
  const data = await res.json();
  document.getElementById("ordersResult").textContent =
    JSON.stringify(data, null, 2);
});

// Criar pedido
document.getElementById("btnAddOrder").addEventListener("click", async () => {
  const id = Number(document.getElementById("orderId").value);
  let items;

  try {
    items = JSON.parse(document.getElementById("orderItems").value);
  } catch (e) {
    document.getElementById("ordersResult").textContent =
      "Erro: items precisa ser um JSON válido.";
    return;
  }

  const body = { id, items };

  const res = await fetch("/api/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const data = await res.json();

  document.getElementById("ordersResult").textContent =
    JSON.stringify(data, null, 2);
});
