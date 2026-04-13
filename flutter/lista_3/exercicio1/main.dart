// Exercício 1: Implementando Serviço de API com Pacote HTTP
//
// Objetivo: Implementar um serviço completo de API utilizando o pacote http do Dart.
//
// Contexto: Utilizando o pacote http e a API pública JSONPlaceholder (https://jsonplaceholder.typicode.com), implemente uma classe PostService que realize as seguintes operações:
//
// Requisitos:
//
// 1. getAllPosts() — Retorna todos os posts
// 2. getPostById(int id) — Retorna um post específico
// 3. createPost(String title, String body, int userId) — Cria um novo post
// 4. updatePost(int id, String title, String body, int userId) — Atualiza um post existente
// 5. deletePost(int id) — Exclui um post.
//
// Restrições:
//
// ● Trate adequadamente os códigos de status (lançando exceções para códigos de erro)
// ● Utilize json.encode() e json.decode() para converter dados
// ● Configure os headers corretamente (Content-Type: application/json)
//
// Dica: JSONPlaceholder oferece endpoints RESTful completos em /posts, /posts/{id}, etc.
//
// Entregável: Upload de código (.dart), arquivos envolvidos (main.dart e arquivos criados que sao chamados)

import 'services/post_service.dart';

void main() async {
  final service = PostService();

  try {
    // GET ALL
    final posts = await service.getAllPosts();
    print('Total de posts: ${posts.length}');

    // GET BY ID
    final post = await service.getPostById(1);
    print('Post 1: ${post.title}');

    // CREATE
    final newPost = await service.createPost(
      'Novo título',
      'Conteúdo do post',
      1,
    );
    print('Criado: ${newPost.id}');

    // UPDATE
    final updated = await service.updatePost(
      1,
      'Título atualizado',
      'Conteúdo atualizado',
      1,
    );
    print('Atualizado: ${updated.title}');

    // DELETE
    await service.deletePost(1);
    print('Post deletado');

  } catch (e) {
    print('Erro: $e');
  }
}