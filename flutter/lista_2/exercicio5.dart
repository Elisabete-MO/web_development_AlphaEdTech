// Exercício 5 - Expanded e Flexible
//
// Objetivo: Entender a diferença entre Expanded e Flexible.
//
// Tarefa:
//
// 1. Crie um Row com 3 Containers usando Expanded com valores flex diferentes (1, 2, 3).
// 2. Modifique o exemplo para usar Flexible em vez de Expanded e observe o comportamento.
// 3. Pesquisa: Descubra em qual situação específica você preferiria usar Flexible em vez de Expanded. Dica: Pesquise sobre a propriedade fit do Flexible
//
// Entrega: Código de ambas as versões e uma explicação de quando usar cada um.

import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(home: ExemploFlex());
  }
}

class ExemploFlex extends StatelessWidget {
  const ExemploFlex({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Expanded vs Flexible')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Usando Expanded', style: TextStyle(fontSize: 18)),

            const SizedBox(height: 8),

            Row(
              children: [
                Expanded(
                  flex: 1,
                  child: Container(height: 50, color: Colors.red),
                ),
                Expanded(
                  flex: 2,
                  child: Container(height: 50, color: Colors.green),
                ),
                Expanded(
                  flex: 3,
                  child: Container(height: 50, color: Colors.blue),
                ),
              ],
            ),

            const SizedBox(height: 32),

            const Text('Usando Flexible', style: TextStyle(fontSize: 18)),

            const SizedBox(height: 8),

            Row(
              children: [
                Flexible(
                  flex: 1,
                  fit: FlexFit.loose,
                  child: Container(width: 50, height: 50, color: Colors.red),
                ),
                Flexible(
                  flex: 2,
                  fit: FlexFit.loose,
                  child: Container(width: 50, height: 50, color: Colors.green),
                ),
                Flexible(
                  flex: 3,
                  fit: FlexFit.loose,
                  child: Container(width: 50, height: 50, color: Colors.blue),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
