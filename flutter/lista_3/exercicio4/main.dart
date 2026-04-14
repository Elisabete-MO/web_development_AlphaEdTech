// Exercício 4: Cancelamento de Requisições
//
// Objetivo: Implementar cancelamento de requisições para melhorar a experiência do usuário.
//
// Contexto: Você está construindo uma funcionalidade de busca em tempo real. Quando o usuário digita, uma nova requisição é feita. Porém, se o usuário continuar digitando, as requisições anteriores devem ser canceladas para evitar condições de corrida.
//
// Requisitos:
//
// 1. Implemente uma classe SearchService que:
//   o Permite buscar itens com debounce
//   o Cancela requisições anteriores quando uma nova busca é iniciada
//   o Retorna uma lista vazia quando a requisição é cancelada (não como erro)
// 2. A classe deve gerenciar múltiplos CancelToken corretamente.
//
// Pesquisa necessária:
// ● Como o CancelToken funciona no Dio?
// ● O que acontece quando uma requisição é cancelada? Qual tipo de exceção é lançada?
// ● Como diferenciar um cancelamento intencional de um erro de rede?
//
// Entregável: Upload de código (.dart), arquivos envolvidos (main.dart e arquivos criados que sao chamados)

import 'package:dio/dio.dart';
import 'services/search_service.dart';

void main() async {
  final dio = Dio(BaseOptions(
    baseUrl: 'https://jsonplaceholder.typicode.com',
  ));

  final service = SearchService(dio);

  // Simulando digitação rápida
  service.search('a');
  await Future.delayed(Duration(milliseconds: 200));
  print('Cancelado');

  service.search('ab');
  await Future.delayed(Duration(milliseconds: 200));
  print('Cancelado');

  final result = await service.search('abc');

  print('Resultado final: ${result.length}');
}