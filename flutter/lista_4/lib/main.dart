// Exercício 8: AsyncNotifierProvider para Dados de Usuário
//
// Objetivo: Implementar busca e atualização de dados de usuário com AsyncNotifierProvider.
//
// Enunciado: Crie um sistema de perfil de usuário usando a API JSONPlaceholder.
//
// Requisitos:
//
// 1. Criar modelo Usuario com id, name, username e email.
// 2. Criar AsyncNotifierProvider com: - build(): carrega o usuário com ID 1 - método atualizarEmail(String novoEmail) que faz atualização simulada - método recarregar() que refresh os dados
// 3. UI que exibe dados do usuário e permite edição do email.
// 4. Tratamento de estados: loading, error, data

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'features/galeria/pages/pagina_galeria.dart';

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
      home: PaginaGaleria(),
    );
  }
}