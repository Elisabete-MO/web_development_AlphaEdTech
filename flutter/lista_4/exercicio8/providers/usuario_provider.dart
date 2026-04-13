import 'dart:convert';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:http/http.dart' as http;
import '../models/usuario.dart';

class UsuarioNotifier extends AsyncNotifier<Usuario> {
  @override
  Future<Usuario> build() async {
    return _fetchUsuario();
  }

  Future<Usuario> _fetchUsuario() async {
    final response = await http.get(
      Uri.parse('https://jsonplaceholder.typicode.com/users/1'),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return Usuario.fromJson(data);
    } else {
      throw Exception('Erro ao carregar usuário');
    }
  }

  Future<void> atualizarEmail(String novoEmail) async {
    final usuarioAtual = state.value;

    if (usuarioAtual == null) return;

    // simula loading
    state = const AsyncLoading();

    await Future.delayed(const Duration(seconds: 1));

    // simula atualização
    final atualizado = usuarioAtual.copyWith(email: novoEmail);

    state = AsyncData(atualizado);
  }

  Future<void> recarregar() async {
    state = const AsyncLoading();
    state = AsyncData(await _fetchUsuario());
  }
}

final usuarioProvider =
AsyncNotifierProvider<UsuarioNotifier, Usuario>(
  UsuarioNotifier.new,
);