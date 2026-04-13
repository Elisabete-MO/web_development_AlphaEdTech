import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../providers/contador_provider.dart';

class BotoesContador extends ConsumerWidget {
  const BotoesContador({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        ElevatedButton(
          onPressed: () {
            ref.read(contadorProvider.notifier).state++;
          },
          child: const Text('+'),
        ),
        const SizedBox(width: 10),
        ElevatedButton(
          onPressed: () {
            ref.read(contadorProvider.notifier).state--;
          },
          child: const Text('-'),
        ),
        const SizedBox(width: 10),
        ElevatedButton(
          onPressed: () {
            ref.read(contadorProvider.notifier).state = 0;
          },
          child: const Text('Reset'),
        ),
      ],
    );
  }
}