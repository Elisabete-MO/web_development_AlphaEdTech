// Exercício 4 - Layouts Básicos
// Objetivo: Praticar os principais widgets de layout.
// Tarefa: Crie uma tela que reproduza este layout:
// ┌─────────────────────────────────┐
// │ CABEÇALHO │
// ├─────────────────────────────────┤
// │ [Card 1] [Card 2] [Card] │
// │ (Azul) (Verde) (Verm) │
// ├─────────────────────────────────┤
// │ │ Icone │ Texto descritivo │
// │ │ │ com detalhes │
// ├─────────────────────────────────┤
// │ [Botão de Ação] │
// └─────────────────────────────────┘
// Use: Column, Row, Expanded, Container e SizedBox para espaçamento.
// Entrega: Código completo da tela.

import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(title: '4º Exercício', home: const LayoutPage());
  }
}

class LayoutPage extends StatelessWidget {
  const LayoutPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            // CABEÇALHO
            Container(
              height: 50,
              alignment: Alignment.bottomCenter,
              padding: const EdgeInsets.symmetric(horizontal: 8),
              child: const Text('CABEÇALHO'),
            ),

            const SizedBox(height: 16),

            // CARDS
            Row(
              children: [
                Expanded(child: _buildCard('Card 1', 'Azul', Colors.blue)),
                const SizedBox(width: 8),
                Expanded(child: _buildCard('Card 2', 'Verde', Colors.green)),
                const SizedBox(width: 8),
                Expanded(child: _buildCard('Card 3', 'Verm', Colors.red)),
              ],
            ),

            const SizedBox(height: 16),

            // LINHA ÍCONE + TEXTO
            Container(
              padding: const EdgeInsets.all(12),
              child: Row(
                children: [
                  const Icon(Icons.star, size: 40),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Text(
                      'Texto descritivo com detalhes',
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 16),

            // BOTÃO
            Container(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () {},
                child: const Text('Botão de Ação'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCard(String titulo, String subtitulo, Color cor) {
    return Container(
      padding: const EdgeInsets.all(8),
      decoration: BoxDecoration(color: cor.withOpacity(0.2)),
      child: Column(children: [Text(titulo), Text('($subtitulo)')]),
    );
  }
}
