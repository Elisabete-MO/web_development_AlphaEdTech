// Exercício 2: Implementando Autenticação com Headers
//
// Objetivo: Implementar diferentes métodos de autenticação HTTP.
//
// Contexto: Many APIs require authentication. Implemente uma classe AuthApiService que demonstre diferentes tipos de autenticação:
//
// Requisitos:
//
// 1. Basic Auth: Implemente um método que codifica usuário e senha em Base64 e os envia no header Authorization.
// 2. Bearer Token (JWT): Implemente um método que utiliza um token JWT previamente obtido no header Authorization.
// 3. API Key como Query Parameter: Implemente um método que envia uma API key como parâmetro de consulta.
//
// Código inicial para referência:
//
// Entregável: Upload de código (.dart), arquivos envolvidos (main.dart e arquivos criados que sao chamados)

import 'services/auth_api_service.dart';

void main() async {
  final service =
  AuthApiService('https://jsonplaceholder.typicode.com');

  try {
    // 🔹 BASIC AUTH
    final basicResponse = await service.getWithBasicAuth(
      'posts',
      'user',
      'password',
    );
    print('Basic Auth OK: ${basicResponse.statusCode}');

    // 🔹 BEARER TOKEN
    final bearerResponse = await service.getWithBearerToken(
      'posts',
      'seu_token_jwt_aqui',
    );
    print('Bearer Token OK: ${bearerResponse.statusCode}');

    // 🔹 API KEY
    final apiKeyResponse = await service.getWithApiKey(
      'posts',
      'sua_api_key_aqui',
    );
    print('API Key OK: ${apiKeyResponse.statusCode}');

  } catch (e) {
    print('Erro: $e');
  }
}