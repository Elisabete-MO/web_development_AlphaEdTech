import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../providers/cores_provider.dart';

class PaginaCores extends ConsumerWidget {
  const PaginaCores({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final cores = ref.watch(coresProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Lista de Cores')),
      body: ListView.builder(
        itemCount: cores.length,
        itemBuilder: (context, index) {
          final item = cores[index];

          return ListTile(
            leading: CircleAvatar(
              backgroundColor: item.cor,
            ),
            title: Text(item.nome),
          );
        },
      ),
    );
  }
}