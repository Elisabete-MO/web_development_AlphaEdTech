import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../providers/usuario_provider.dart';

class PaginaUsuario extends ConsumerWidget {
  const PaginaUsuario({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final usuarioAsync = ref.watch(usuarioProvider);
    final notifier = ref.read(usuarioProvider.notifier);

    final emailController = TextEditingController();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Perfil'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () => notifier.recarregar(),
          )
        ],
      ),
      body: usuarioAsync.when(
        loading: () => const Center(child: CircularProgressIndicator()),

        error: (err, stack) => Center(
          child: Text('Erro: $err'),
        ),

        data: (usuario) {
          emailController.text = usuario.email;

          return Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Nome: ${usuario.name}'),
                Text('Username: ${usuario.username}'),
                const SizedBox(height: 20),

                TextField(
                  controller: emailController,
                  decoration: const InputDecoration(
                    labelText: 'Email',
                  ),
                ),

                const SizedBox(height: 20),

                ElevatedButton(
                  onPressed: () {
                    notifier.atualizarEmail(emailController.text);
                  },
                  child: const Text('Atualizar Email'),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}