// Exercício 6 - Temas Light/Dark
//
// Objetivo: Implementar alternância entre temas claro e escuro.
//
// Tarefa: Crie um app que:
// ● Define um tema claro (sua escolha de cores)
// ● Define um tema escuro (sua escolha de cores)
// ● Tem um botão ou switch na tela inicial para alternar entre os modos
// ● O tema deve persistir durante a navegação entre telas
//
// Dica: Use ChangeNotifierProvider ou ValueNotifier para gerenciar o estado do tema.
//
// Entrega: Código completo com navegação e alternância de tema funcionando

import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

// 🔥 Estado global do tema
final ValueNotifier<ThemeMode> themeNotifier = ValueNotifier(ThemeMode.light);

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder(
      valueListenable: themeNotifier,
      builder: (context, ThemeMode currentMode, _) {
        return MaterialApp(
          title: 'Tema Light/Dark',

          theme: ThemeData(
            colorScheme: ColorScheme.fromSeed(
              seedColor: Colors.blue,
              brightness: Brightness.light,
            ),
          ),

          darkTheme: ThemeData(
            colorScheme: ColorScheme.fromSeed(
              seedColor: Colors.deepPurple,
              brightness: Brightness.dark,
            ),
          ),

          themeMode: currentMode,

          home: const HomePage(),
        );
      },
    );
  }
}

// 🏠 Tela inicial
class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = themeNotifier.value == ThemeMode.dark;

    return Scaffold(
      appBar: AppBar(title: const Text('Home')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text('Alternar tema'),

            Switch(
              value: isDark,
              onChanged: (value) {
                themeNotifier.value = value ? ThemeMode.dark : ThemeMode.light;
              },
            ),

            const SizedBox(height: 20),

            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (_) => const SegundaTela()),
                );
              },
              child: const Text('Ir para outra tela'),
            ),
          ],
        ),
      ),
    );
  }
}

// 📱 Segunda tela
class SegundaTela extends StatelessWidget {
  const SegundaTela({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = themeNotifier.value == ThemeMode.dark;

    return Scaffold(
      appBar: AppBar(title: const Text('Segunda Tela')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text('Tema ainda aplicado aqui'),

            Switch(
              value: isDark,
              onChanged: (value) {
                themeNotifier.value = value ? ThemeMode.dark : ThemeMode.light;
              },
            ),
          ],
        ),
      ),
    );
  }
}
