import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'providers/theme_provider.dart';

class HomePage extends ConsumerWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final themeMode = ref.watch(themeProvider);
    final notifier = ref.read(themeProvider.notifier);

    String modoTexto;

    switch (themeMode) {
      case ThemeMode.light:
        modoTexto = 'Claro';
        break;
      case ThemeMode.dark:
        modoTexto = 'Escuro';
        break;
      default:
        modoTexto = 'Sistema';
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text('Tema'),
        actions: [
          IconButton(
            icon: const Icon(Icons.brightness_6),
            onPressed: notifier.alternarTema,
          ),
        ],
      ),
      body: Center(
        child: Text(
          'Modo atual: $modoTexto',
          style: const TextStyle(fontSize: 20),
        ),
      ),
    );
  }
}