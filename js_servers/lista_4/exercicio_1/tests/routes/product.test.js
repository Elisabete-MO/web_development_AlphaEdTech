import { jest } from "@jest/globals";
import request from "supertest";

jest.unstable_mockModule("../../src/services/productService.js", async () => {
  return await import("../__mocks__/productService.js");
});

const { getAllProducts, findProductById, addProduct, updateProduct, deleteProduct } = await import("../../src/services/productService.js");

const { default: app } = await import("../../src/app.js");

const mockProducts = [
  { id: 1, name: "Notebook", value: 3000 },
  { id: 2, name: "Mouse", value: 150 }
];

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => { });
});

afterAll(() => {
  console.error.mockRestore();
});

beforeEach(() => {
  jest.clearAllMocks(); // limpa chamadas entre testes
});

describe("GET /api/product", () => {
  it("deve retornar 200 e uma lista de produtos", async () => {
    getAllProducts.mockReturnValue(mockProducts);

    // Act
    const res = await request(app).get("/api/product");

    // Assert
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toEqual(mockProducts);

    expect(res.body[0]).toHaveProperty("id");
    expect(res.body[0]).toHaveProperty("name");
    expect(res.body[0]).toHaveProperty("value");

    expect(getAllProducts).toHaveBeenCalledTimes(1);
  });
});

describe("GET /api/product/:id", () => {
  it("deve retornar 200 e o produto quando o id existe", async () => {
    const mockProduct = mockProducts[0];
    findProductById.mockReturnValue(mockProduct);

    const res = await request(app).get("/api/product/1");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockProduct);
    expect(findProductById).toHaveBeenCalledWith(1);
  });

  it("deve retornar 400 para id inválido", async () => {
    const res = await request(app).get("/api/product/abc");
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ message: '"id" must be a number' });
  });

  it("deve retornar 404 para id não encontrado", async () => {
    findProductById.mockReturnValue(null);

    const res = await request(app).get("/api/product/999");

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: "Produto não encontrado" });
  });


});

describe("POST /api/product/", () => {
  it("deve retornar 201 e o produto criado", async () => {
    const mockProduct = mockProducts[0];
    addProduct.mockReturnValue(mockProduct);

    const res = await request(app).
      post("/api/product").
      send(mockProduct);

    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      "message": "Produto criado com sucesso",
      "product": mockProduct
    });
    expect(addProduct).toHaveBeenCalledTimes(1);
    expect(addProduct).toHaveBeenCalledWith(mockProduct);
  });

  it("deve retornar 400 quando faltar algum campo", async () => {
    const invalidProduct = { name: "", value: 250 };

    const res = await request(app)
      .post("/api/product")
      .send(invalidProduct);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
  });

  it("deve retornar 400 quando um campo for inválido", async () => {
    const invalidProduct = { name: "Teclado", value: "duzentos e cinquenta" };

    const res = await request(app)
      .post("/api/product")
      .send(invalidProduct);

    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      "message": "\"id\" is required, \"value\" must be a number"
    });
  });
});

describe("PUT /api/product/:id", () => {
  it("deve retornar 200 e o produto atualizado", async () => {
    const mockProduct = mockProducts[0];
    updateProduct.mockReturnValue(mockProduct);

    const res = await request(app)
      .put("/api/product/1")
      .send(mockProduct);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      "message": "Atualização concluída com sucesso",
      "product": mockProduct
    });
    expect(updateProduct).toHaveBeenCalledTimes(1);
  });

  it("deve retornar 404 e uma mensagem de erro se nao for encontrado o ID", async () => {
    updateProduct.mockReturnValue(null);
    const res = await request(app)
      .put("/api/product/1")
      .send(null);

    expect(res.status).toBe(404);
    expect(res.body).toEqual({
      "message": "Produto não encontrado"
    });
    expect(updateProduct).toHaveBeenCalledTimes(1);
  });
});

describe("DELETE /api/product/:id", () => {
  it("deve retornar 200 e o produto deletado", async () => {
    const mockProduct = mockProducts[0];
    deleteProduct.mockReturnValue(mockProduct);

    const res = await request(app).delete("/api/product/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: "Produto removido",
      product: mockProduct
    });
    expect(deleteProduct).toHaveBeenCalledWith(1);
    expect(deleteProduct).toHaveBeenCalledTimes(1);
  });

  it("deve retornar 404 e uma mensagem de erro se nao for encontrado o ID", async () => {
    deleteProduct.mockReturnValue(null);
    const res = await request(app).delete("/api/product/1");

    expect(res.status).toBe(404);
    expect(res.body).toEqual({
      "message": "Produto não encontrado"
    });
    expect(deleteProduct).toHaveBeenCalledTimes(1);
  });
});
