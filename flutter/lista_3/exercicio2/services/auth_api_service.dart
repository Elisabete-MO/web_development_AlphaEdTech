import 'dart:convert';
import 'package:http/http.dart' as http;

class AuthApiService {
  final String baseUrl;

  AuthApiService(this.baseUrl);

  // 🔹 Headers padrão
  Map<String, String> get _defaultHeaders => {
    'Content-Type': 'application/json',
  };

  // =========================
  // 1. BASIC AUTH
  // =========================
  Future<http.Response> getWithBasicAuth(
      String endpoint, String username, String password) async {
    final credentials = base64Encode(utf8.encode('$username:$password'));

    final headers = {
      ..._defaultHeaders,
      'Authorization': 'Basic $credentials',
    };

    final response = await http.get(
      Uri.parse('$baseUrl/$endpoint'),
      headers: headers,
    );

    _handleError(response);
    return response;
  }

  // =========================
  // 2. BEARER TOKEN (JWT)
  // =========================
  Future<http.Response> getWithBearerToken(
      String endpoint, String token) async {
    final headers = {
      ..._defaultHeaders,
      'Authorization': 'Bearer $token',
    };

    final response = await http.get(
      Uri.parse('$baseUrl/$endpoint'),
      headers: headers,
    );

    _handleError(response);
    return response;
  }

  // =========================
  // 3. API KEY (QUERY PARAM)
  // =========================
  Future<http.Response> getWithApiKey(
      String endpoint, String apiKey) async {
    final uri = Uri.parse('$baseUrl/$endpoint')
        .replace(queryParameters: {'apiKey': apiKey});

    final response = await http.get(uri);

    _handleError(response);
    return response;
  }

  // =========================
  // 🔥 Tratamento de erro
  // =========================
  void _handleError(http.Response response) {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      return;
    } else {
      throw Exception(
        'Erro: ${response.statusCode} - ${response.body}',
      );
    }
  }
}