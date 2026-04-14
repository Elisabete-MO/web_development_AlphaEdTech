// Exercício 5: Criando Modelo com Relacionamentos
//
// Objetivo: Implementar parsing manual de JSON com objetos aninhados e listas.
//
// Contexto: A API JSONPlaceholder retorna posts com estrutura simples, mas APIs reais retornam dados mais complexos. Considere a seguinte estrutura de dados de uma API de ecommerce:
//
// Requisitos:
// 1. Crie classes modelo para: Order, Customer, Address, OrderItem, Product
// 2. Implemente factory constructors fromJson para cada classe
// 3. Implemente métodos toJson para serialização inversa
// 4. Trate campos opcionais (como address pode ser null)
// 5. Crie um método que calcula o total automaticamente a partir dos itens
//
// Avaliação: Verifique se o parsing lida corretamente com objetos aninhados e listas de objetos
//
// Entregável: Upload de código (.dart), arquivos envolvidos (main.dart e arquivos criados que sao chamados

import 'models/order.dart';

void main() {
  final json = {
    "id": 1,
    "customer": {
      "id": 10,
      "name": "Maria",
      "address": {
        "street": "Rua A",
        "city": "São Paulo",
        "zipCode": "12345-000"
      }
    },
    "items": [
      {
        "quantity": 2,
        "product": {"id": 1, "name": "Notebook", "price": 3000}
      },
      {
        "quantity": 1,
        "product": {"id": 2, "name": "Mouse", "price": 100}
      }
    ]
  };

  final order = Order.fromJson(json);

  print('Cliente: ${order.customer.name}');
  print('Total: ${order.total}');

  final backToJson = order.toJson();
  print(backToJson);
}