import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../providers/carrinho_provider.dart';
import '../../../models/item_carrinho.dart';

class PaginaCarrinho extends ConsumerWidget {
  const PaginaCarrinho({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final carrinho = ref.watch(carrinhoProvider);
    final notifier = ref.read(carrinhoProvider.notifier);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Carrinho'),
        actions: [
          IconButton(
            icon: const Icon(Icons.delete),
            onPressed: notifier.limparCarrinho,
          )
        ],
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              itemCount: carrinho.length,
              itemBuilder: (context, index) {
                final item = carrinho[index];

                return ListTile(
                  title: Text(item.nome),
                  subtitle: Text(
                      'Qtd: ${item.quantidade} | R\$ ${item.preco.toStringAsFixed(2)}'),
                  trailing: IconButton(
                    icon: const Icon(Icons.remove_circle),
                    onPressed: () => notifier.removerItem(index),
                  ),
                );
              },
            ),
          ),

          // 💰 TOTAL
          Padding(
            padding: const EdgeInsets.all(16),
            child: Text(
              'Total: R\$ ${notifier.total.toStringAsFixed(2)}',
              style: const TextStyle(fontSize: 20),
            ),
          ),

          // ➕ ADICIONAR ITEM
          ElevatedButton(
            onPressed: () {
              notifier.adicionarItem(
                ItemCarrinho(
                  nome: 'Produto A',
                  preco: 10.0,
                  quantidade: 1,
                ),
              );
            },
            child: const Text('Adicionar Produto A'),
          ),

          const SizedBox(height: 10),
        ],
      ),
    );
  }
}