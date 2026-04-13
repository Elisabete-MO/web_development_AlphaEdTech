class ItemCarrinho {
  final String nome;
  final double preco;
  final int quantidade;

  ItemCarrinho({
    required this.nome,
    required this.preco,
    required this.quantidade,
  });

  ItemCarrinho copyWith({
    String? nome,
    double? preco,
    int? quantidade,
  }) {
    return ItemCarrinho(
      nome: nome ?? this.nome,
      preco: preco ?? this.preco,
      quantidade: quantidade ?? this.quantidade,
    );
  }
}