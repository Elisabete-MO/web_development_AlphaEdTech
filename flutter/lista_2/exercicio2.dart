// Exercício 2 - StatelessWidget vs StatefulWidget
// Objetivo: Demonstrar a diferença entre widget stateless e stateful.
//
// Tarefa: Crie dois widgets em um mesmo arquivo:
// 1. StatelessWidget chamado DisplayTexto: recebe um texto como parâmetro e exibe em um Container estilizado com borda e cor de fundo.
// 2. StatefulWidget chamado Contador: possui um botão que incrementa um número e exibe o valor atual. O número deve começar em 0.
//
// Entrega: Código completo com ambos os widgets e um Scaffold que exibe os dois simultaneamente.

import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '2º Exercício',
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
        title: const Text('Stateless vs Stateful'),
        backgroundColor: Theme.of(context).colorScheme.primary,
      ),
      body: const Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            DisplayTexto(texto: 'Olá, Flutter!'),
            SizedBox(height: 20),
            Contador(),
          ],
        ),
      ),
    );
  }
}

// 👇 1. StatelessWidget
class DisplayTexto extends StatelessWidget {
  final String texto;

  const DisplayTexto({super.key, required this.texto});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.deepPurple.shade100,
        border: Border.all(color: Colors.deepPurple),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Text(texto, style: const TextStyle(fontSize: 18)),
    );
  }
}

// 👇 2. StatefulWidget
class Contador extends StatefulWidget {
  const Contador({super.key});

  @override
  State<Contador> createState() => _ContadorState();
}

class _ContadorState extends State<Contador> {
  int _contador = 0;

  void _incrementar() {
    setState(() {
      _contador++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Valor: $_contador', style: const TextStyle(fontSize: 20)),
        const SizedBox(height: 10),
        ElevatedButton(
          onPressed: _incrementar,
          child: const Text('Incrementar'),
        ),
      ],
    );
  }
}
