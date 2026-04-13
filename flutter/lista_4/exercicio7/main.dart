// Exercício 7: Carrinho de Compras com NotifierProvider
//
// Objetivo: Implementar estado complexo usando NotifierProvider.
//
// Enunciado: Crie um sistema simples de carrinho de compras com as seguintes funcionalidades:
//
// Requisitos:
//
// 1. Criar modelo ItemCarrinho com nome, preco e quantidade.
// 2. Criar um NotifierProvider chamado carrinhoProvider com métodos: - adicionarItem(ItemCarrinho item) - removerItem(int indice) - limparCarrinho()
// 3. Criar UI com: - Lista de itens no carrinho (com opção de remover) - Total calculado dinamicamente - Botão para adicionar itens de exemplo
//
// Desafio: Implementar método que agrupa itens duplicados (mesmo nome) somando as quantidades.

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'features/carrinho/pages/pagina_carrinho.dart';

void main() {
  runApp(
    const ProviderScope(
      child: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: PaginaCarrinho(),
    );
  }
}