import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../providers/contador_provider.dart';

class ExibidorContador extends ConsumerWidget {
  const ExibidorContador({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final contador = ref.watch(contadorProvider);

    return Text(
      '$contador',
      style: const TextStyle(fontSize: 40),
    );
  }
}