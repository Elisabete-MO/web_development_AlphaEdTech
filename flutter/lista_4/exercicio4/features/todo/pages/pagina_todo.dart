import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../providers/todo_provider.dart';

class PaginaTodos extends ConsumerWidget {
  const PaginaTodos({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final todosAsync = ref.watch(todosProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Tarefas'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () {
              ref.refresh(todosProvider);
            },
          ),
        ],
      ),
      body: todosAsync.when(
        loading: () => const Center(child: CircularProgressIndicator()),

        error: (err, stack) => Center(
          child: Text('Erro: $err'),
        ),

        data: (todos) => ListView.builder(
          itemCount: todos.length,
          itemBuilder: (context, index) {
            final todo = todos[index];

            return ListTile(
              leading: Icon(
                todo.completed
                    ? Icons.check_circle
                    : Icons.radio_button_unchecked,
                color: todo.completed ? Colors.green : Colors.grey,
              ),
              title: Text(todo.title),
            );
          },
        ),
      ),
    );
  }
}