// Exercício 1: Contador com StateProvider
// Objetivo: Implementar um contador usando StateProvider, separando a lógica do
// componente de interface.
//
//
// Enunciado: Crie um aplicativo Flutter simples com as seguintes características:
// 1. Um StateProvider<int> chamado contadorProvider que inicia em 0.
// 2. Um widget ExibidorContador que exibe o valor atual do contador usando
// ref .watch.
// 3. Um widget BotoesContador com três botões: “+” (incrementa), “-”
// (decrementa) e “Reset” (zera).
// 4. Uma página PaginaContador que organiza os dois widgets acima.
//
// Requisitos: - Usar ConsumerWidget para consumir o provider. - Atualizar o
// estado usando ref.read(counterProvider.notifier).state. - O código deve compilar e executar corretamente.

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'features/contador/pages/pagina_contador.dart';

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
      home: PaginaContador(),
    );
  }
}