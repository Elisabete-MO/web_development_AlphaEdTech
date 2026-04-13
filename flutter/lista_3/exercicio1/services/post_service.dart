import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/post.dart';

class PostService {
  final String baseUrl = 'https://jsonplaceholder.typicode.com/posts';

  Map<String, String> get headers => {
    'Content-Type': 'application/json',
  };

  // 1. GET ALL
  Future<List<Post>> getAllPosts() async {
    final response = await http.get(Uri.parse(baseUrl));

    _handleError(response);

    final List data = json.decode(response.body);
    return data.map((e) => Post.fromJson(e)).toList();
  }

  // 2. GET BY ID
  Future<Post> getPostById(int id) async {
    final response = await http.get(Uri.parse('$baseUrl/$id'));

    _handleError(response);

    final data = json.decode(response.body);
    return Post.fromJson(data);
  }

  // 3. CREATE
  Future<Post> createPost(String title, String body, int userId) async {
    final response = await http.post(
      Uri.parse(baseUrl),
      headers: headers,
      body: json.encode({
        'title': title,
        'body': body,
        'userId': userId,
      }),
    );

    _handleError(response);

    final data = json.decode(response.body);
    return Post.fromJson(data);
  }

  // 4. UPDATE
  Future<Post> updatePost(int id, String title, String body, int userId) async {
    final response = await http.put(
      Uri.parse('$baseUrl/$id'),
      headers: headers,
      body: json.encode({
        'id': id,
        'title': title,
        'body': body,
        'userId': userId,
      }),
    );

    _handleError(response);

    final data = json.decode(response.body);
    return Post.fromJson(data);
  }

  // 5. DELETE
  Future<void> deletePost(int id) async {
    final response = await http.delete(
      Uri.parse('$baseUrl/$id'),
      headers: headers,
    );

    _handleError(response);
  }

  // 🔥 Tratamento de erro centralizado
  void _handleError(http.Response response) {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      return;
    } else {
      throw Exception(
        'Erro na requisição: ${response.statusCode} - ${response.body}',
      );
    }
  }
}