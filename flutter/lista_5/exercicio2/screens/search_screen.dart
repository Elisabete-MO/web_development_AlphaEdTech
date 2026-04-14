import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class SearchScreen extends StatelessWidget {
  final String query;
  final int page;

  const SearchScreen({
    super.key,
    required this.query,
    required this.page,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Busca')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Busca: $query'),
            Text('Página: $page'),
            ElevatedButton(
              onPressed: () => context.go('/'),
              child: const Text('Voltar'),
            ),
          ],
        ),
      ),
    );
  }
}