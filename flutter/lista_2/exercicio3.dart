// Exercício 3 - BuildContext e Theme
//
// Objetivo: Investigar como o BuildContext acessar informações de tema.
//
// Tarefa:
//
// 1. Em um widget qualquer, utilize Theme.of(context) para:
//   o Obter a cor primária do tema atual
//   o Obter o estilo de texto headlineMedium
//   o Aplicar essas informações a um widget personalizado
// 2. Responda: O que acontece se você chamar Theme.of(context) antes do widget ser adicionado à árvore? Como você lidaria com esse problema na prática?
//
// Entrega: Código do widget e uma explicação breve (2-3 frases) sobre o comportamento observado

import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '3º Exercício',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: const HomePage(),
    );
  }
}

// 👇 Scaffold que exibe os dois widgets
class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('BuildContext e Theme'),
        backgroundColor: Theme.of(context).colorScheme.primary,
      ),
      body: const Center(child: MeuWidgetTema()),
    );
  }
}

class MeuWidgetTema extends StatelessWidget {
  const MeuWidgetTema({super.key});

  @override
  Widget build(BuildContext context) {
    final corPrimaria = Theme.of(context).colorScheme.primary;
    final estiloTexto = Theme.of(context).textTheme.headlineMedium;

    return Container(
      padding: const EdgeInsets.all(16),
      color: corPrimaria.withOpacity(0.1),
      child: Text(
        'Exemplo com Theme',
        style: estiloTexto?.copyWith(color: corPrimaria),
      ),
    );
  }
}
