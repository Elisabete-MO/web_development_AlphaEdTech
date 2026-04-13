// Exercício 10: Tema Escuro com Toggle e Persistência
//
// Objetivo: Implementar sistema de tema completo com toggle e persistência.
//
// Enunciado: Crie um aplicativo com sistema de tema claro/escuro persistente.
//
// Requisitos:
//
// 1. Criar ThemeNotifier que estende StateNotifier.
// 2. Implementar três modos: system, light, dark.
// 3. Criar toggle na AppBar que alterna entre os três modos.
// 4. Exibir indicador visual do modo atual.
// 5. Pesquisa necessária: Investigar como usar SharedPreferences para persistir a escolha do tema entre sessões.
// 6. O tema deve ser aplicado globalmente via themeMode no MaterialApp.
//
// Entregável: Código completo + breve explicação (100 palavras) de como a persistência funciona.
//
// Dica de pesquisa: Busque “SharedPreferences Flutter setString getString” e “ThemeMode enum Flutter”.

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'providers/theme_provider.dart';
import 'home_page.dart';

void main() {
  runApp(
    const ProviderScope(
      child: MyApp(),
    ),
  );
}

class MyApp extends ConsumerWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final themeMode = ref.watch(themeProvider);

    return MaterialApp(
      debugShowCheckedModeBanner: false,
      themeMode: themeMode,
      theme: ThemeData.light(),
      darkTheme: ThemeData.dark(),
      home: const HomePage(),
    );
  }
}