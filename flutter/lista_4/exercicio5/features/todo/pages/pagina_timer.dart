import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../providers/timer_provider.dart';

class PaginaTimer extends ConsumerWidget {
  const PaginaTimer({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final tempoAsync = ref.watch(timerProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Timer Regressivo')),
      body: Center(
        child: tempoAsync.when(
          loading: () => const CircularProgressIndicator(),

          error: (err, stack) => Text('Erro: $err'),

          data: (tempo) {
            if (tempo == 0) {
              return const Text(
                'Tempo esgotado!',
                style: TextStyle(fontSize: 32),
              );
            }

            return Text(
              '$tempo',
              style: const TextStyle(fontSize: 48),
            );
          },
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          ref.read(iniciarProvider.notifier).state++;
        },
        child: const Icon(Icons.play_arrow),
      ),
    );
  }
}