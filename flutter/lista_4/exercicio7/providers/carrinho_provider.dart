import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/item_carrinho.dart';

class CarrinhoNotifier extends Notifier<List<ItemCarrinho>> {
  @override
  List<ItemCarrinho> build() {
    return [];
  }

  void adicionarItem(ItemCarrinho novoItem) {
    final index = state.indexWhere((i) => i.nome == novoItem.nome);

    if (index != -1) {
      // 🔥 desafio: agrupar itens duplicados
      final itemExistente = state[index];

      final atualizado = itemExistente.copyWith(
        quantidade: itemExistente.quantidade + novoItem.quantidade,
      );

      state = [
        ...state..removeAt(index),
        atualizado,
      ];
    } else {
      state = [...state, novoItem];
    }
  }

  void removerItem(int index) {
    final novaLista = [...state];
    novaLista.removeAt(index);
    state = novaLista;
  }

  void limparCarrinho() {
    state = [];
  }

  double get total {
    return state.fold(
      0,
          (sum, item) => sum + (item.preco * item.quantidade),
    );
  }
}

final carrinhoProvider =
NotifierProvider<CarrinhoNotifier, List<ItemCarrinho>>(
  CarrinhoNotifier.new,
);