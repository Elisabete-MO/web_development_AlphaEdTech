// Exercício 2: Parâmetros de Rota e Query Strings
//
// Crie uma aplicação de catálogo de produtos com as seguintes funcionalidades: uma tela principal listando produtos em um ListView; ao clicar em um produto, navegue para a tela de detalhes passando o ID do produto como parâmetro de rota; implemente também uma tela de busca que receba parâmetros de consulta (query parameters) para o termo de busca e número da página; utilize o path ‘/product/:id’ para detalhes e ‘/search?query=termo&page=numero’ para busca.
//
// Requisitos mínimos: Os parâmetros devem ser extraídos corretamente utilizando state.pathParameters e state.uri.queryParameters; a navegação deve funcionar em ambas as direções.
//
// Desafio adicional: Adicione validação para o caso de parâmetros obrigatórios estarem ausentes, exibindo uma mensagem apropriada ao usuário.

import 'package:flutter/material.dart';
import 'router/app_router.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      routerConfig: router, // vem do app_router.dart
      title: 'Catálogo de Produtos',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
    );
  }
}