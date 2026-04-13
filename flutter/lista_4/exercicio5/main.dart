// Exercício 5: StreamProvider para Timer Regressivo
//
// Objetivo: Implementar um timer regressivo usando StreamProvider.
//
// Enunciado: Crie um widget que exiba um timer regressivo de 60 segundos até zero.
//
// Requisitos:
//
// 1. Criar um StreamProvider que emite valores de 60 a 0 a cada segundo.
// 2. Exibir o tempo restante em um widget texto grande.
// 3. Quando o timer atingir zero, exibir uma mensagem “Tempo esgotado!”.
// 4. Adicionar botão “Iniciar” para reiniciar o timer.
//
// Desafio extra: Adicionar um StateProvider para pausar e continuar o timer

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'features/todo/pages/pagina_timer.dart';

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
      home: PaginaTimer(),
    );
  }
}