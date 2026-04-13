// Exercício 2: Provider Simples para Dados Estáticos
//
// Objetivo: Compreender o uso de Provider para valores imutáveis.
//
// Enunciado: Crie um Provider que forneça uma lista de nomes de cores (em português) e um widget que exiba esses nomes em um ListView.
//
// Requisitos: - O provider deve ser um Provider>. - Os dados devem ser: ['Vermelho', 'Azul', 'Verde', 'Amarelo', 'Roxo', 'Laranja']. - O widget deve usar ref.watch para consumir e exibir os dados.
//
// Desafio extra: Adicione um segundo provider que fornece as cores correspondentes (objetos Color) e use ambos para criar uma lista visual com círculos coloridos.

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'features/cores/pages/pagina_cores.dart';

void main() {
  runApp(
    const ProviderScope(
      child: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: PaginaCores(),
    );
  }
}