// Exercício 3: Configurando Dio com Interceptors
//
// Objetivo: Criar uma configuração robusta de Dio com interceptors personalizados.
//
// Contexto: Você precisa configurar o Dio para uma aplicação Flutter profissional com os seguintes requisitos:
//
// Requisitos:
//
// 1. Configure um Dio com:
//   o Base URL da API
//   o Timeouts de conexão, envio e recebimento (30 segundos)
//   o Headers padrão (Content-Type e Accept)
// 2. Implemente um AuthInterceptor que:
//   o Adiciona automaticamente o token de autenticação em todas as requisições
//   o Trata erros 401 (token expirado)
// 3. Implemente um LoggingInterceptor que:
//   o Loga a URL e método de cada requisição
//   o Loga o código de status e tempo de resposta
//   o Loga erros de forma destacada
// 4. Configure retry automático para erros de conexão (máximo 3 tentativas com exponential backoff)
//
// Avaliação: O código deve demonstrar compreensão de como interceptors funcionam no Dio e como encadeá-los corretamente.
//
// Entregável: Upload de código (.dart), arquivos envolvidos (main.dart e arquivos criados que sao chamados)

import 'core/dio_client.dart';

void main() async {
  final client = DioClient('https://jsonplaceholder.typicode.com');

  try {
    final response = await client.dio.get('/posts');
    print('Dados recebidos: ${response.data}');
  } catch (e) {
    print('Erro geral: $e');
  }
}