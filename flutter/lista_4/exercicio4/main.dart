// Exercício 4: Lista de Tarefas com FutureProvider
//
// Objetivo: Implementar carregamento de dados de API usando FutureProvider.
//
// Enunciado: Crie um aplicativo que exiba uma lista de tarefas (todos) consumindo dados da API pública JSONPlaceholder (https://jsonplaceholder.typicode.com/todos).
//
// Requisitos:
//
// 1. Criar modelo Todo com campos id, title e completed.
// 2. Criar FutureProvider> que faz requisição HTTP.
// 3. Tratar os três estados: loading, error e data usando o método .when().
// 4. Adicionar um botão de refresh na AppBar. 5. Usar ListView.builder para
// renderizar a lista.
//
// Dica: Use o pacote http para fazer a requisição.

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'features/todo/pages/pagina_todo.dart';

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
      home: PaginaTodos(),
    );
  }
}