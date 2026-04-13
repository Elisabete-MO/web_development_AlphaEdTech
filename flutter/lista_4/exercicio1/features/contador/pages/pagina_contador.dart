import 'package:flutter/material.dart';
import '../widgets/exibidor_contador.dart';
import '../widgets/botoes_contador.dart';

class PaginaContador extends StatelessWidget {
  const PaginaContador({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Contador')),
      body: const Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ExibidorContador(),
            SizedBox(height: 20),
            BotoesContador(),
          ],
        ),
      ),
    );
  }
}