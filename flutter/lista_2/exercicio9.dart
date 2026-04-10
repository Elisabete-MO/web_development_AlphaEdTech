// Exercício 9 - Layout Responsivo com LayoutBuilder
//
// Objetivo: Investigar como criar layouts que se adaptam ao tamanho da tela.
//
// Tarefa:
//
// 1. Usando LayoutBuilder, crie uma tela que: o Em telas menores que 400px: exiba uma lista vertical simples o Entre 400px e 800px: exiba um grid de 2 colunas o Acima de 800px: exiba um grid de 4 colunas
// 2. Pesquisa: Além do LayoutBuilder, quais outras formas o Flutter oferece para detectar o tamanho da tela? Mencione pelo menos 2 alternativas e explique brevemente quando cada uma seria mais adequada.
//
// Entrega: Código completo da tela responsiva + breve texto comparando as alternativas de detecção de tamanho.

import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(home: ResponsivePage());
  }
}

class ResponsivePage extends StatelessWidget {
  const ResponsivePage({super.key});

  @override
  Widget build(BuildContext context) {
    final items = List.generate(20, (index) => 'Item $index');

    return Scaffold(
      appBar: AppBar(title: const Text('Layout Responsivo')),
      body: LayoutBuilder(
        builder: (context, constraints) {
          final width = constraints.maxWidth;

          // 📱 Mobile
          if (width < 400) {
            return ListView(
              children: items
                  .map((item) => ListTile(title: Text(item)))
                  .toList(),
            );
          }
          // 📱 Tablet
          else if (width < 800) {
            return GridView.count(
              crossAxisCount: 2,
              children: items.map((item) => _buildItem(item)).toList(),
            );
          }
          // 💻 Desktop
          else {
            return GridView.count(
              crossAxisCount: 4,
              children: items.map((item) => _buildItem(item)).toList(),
            );
          }
        },
      ),
    );
  }

  Widget _buildItem(String text) {
    return Card(
      margin: const EdgeInsets.all(8),
      child: Center(child: Text(text)),
    );
  }
}
