import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class CorItem {
  final String nome;
  final Color cor;

  CorItem(this.nome, this.cor);
}

final coresProvider = Provider<List<CorItem>>((ref) {
  return [
    CorItem('Vermelho', Colors.red),
    CorItem('Azul', Colors.blue),
    CorItem('Verde', Colors.green),
    CorItem('Amarelo', Colors.yellow),
    CorItem('Roxo', Colors.purple),
    CorItem('Laranja', Colors.orange),
  ];
});