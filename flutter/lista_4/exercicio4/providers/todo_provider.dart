import 'dart:convert';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:http/http.dart' as http;
import '../models/todo.dart';

final todosProvider = FutureProvider<List<Todo>>((ref) async {
  final response = await http.get(
    Uri.parse('https://jsonplaceholder.typicode.com/todos'),
  );

  if (response.statusCode == 200) {
    final List data = jsonDecode(response.body);
    return data.map((e) => Todo.fromJson(e)).toList();
  } else {
    throw Exception('Erro ao carregar tarefas');
  }
});