// Exercício 7 - Navegação com Parâmetros
//
// Objetivo: Passar dados entre telas usando navegação nomeada.
//
// Tarefa: Crie um app com 3 telas:
//
// 1. TelaInicial: Lista de produtos (pode ser uma List estática). Cada item deve ser clicável.
// 2. TelaDetalhes: Exibe o nome do produto e uma descrição.
// 3. TelaFormulario: Permite editar o nome do produto (simples, só muda o texto local).
//
// Ao clicar em um produto na TelaInicial, navegue para TelaDetalhes passando o produto como argumento. Da TelaDetalhes, possa navegar para a TelaFormulario.
// Entrega: Código das 3 telas completo, com rotas configuradas no MaterialApp.

import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

// 🔹 Modelo simples
class Produto {
  final String nome;
  final String descricao;

  const Produto({required this.nome, required this.descricao});
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Navegação com Parâmetros',

      initialRoute: '/',

      routes: {'/': (context) => const TelaInicial()},

      onGenerateRoute: (settings) {
        if (settings.name == '/detalhes') {
          final produto = settings.arguments as Produto;
          return MaterialPageRoute(
            builder: (_) => TelaDetalhes(produto: produto),
          );
        }

        if (settings.name == '/formulario') {
          final produto = settings.arguments as Produto;
          return MaterialPageRoute(
            builder: (_) => TelaFormulario(produto: produto),
          );
        }

        return null;
      },
    );
  }
}

//////////////////////////////////////////////////////
// 🏠 1. Tela Inicial
//////////////////////////////////////////////////////

class TelaInicial extends StatelessWidget {
  const TelaInicial({super.key});

  final List<Produto> produtos = const [
    Produto(nome: 'Notebook', descricao: 'Notebook potente'),
    Produto(nome: 'Celular', descricao: 'Smartphone moderno'),
    Produto(nome: 'Fone', descricao: 'Fone com cancelamento de ruído'),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Produtos')),
      body: ListView.builder(
        itemCount: produtos.length,
        itemBuilder: (context, index) {
          final produto = produtos[index];

          return ListTile(
            title: Text(produto.nome),
            onTap: () {
              Navigator.pushNamed(context, '/detalhes', arguments: produto);
            },
          );
        },
      ),
    );
  }
}

//////////////////////////////////////////////////////
// 📄 2. Tela Detalhes
//////////////////////////////////////////////////////

class TelaDetalhes extends StatelessWidget {
  final Produto produto;

  const TelaDetalhes({super.key, required this.produto});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(produto.nome)),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Text(
              produto.descricao,
              style: Theme.of(context).textTheme.bodyLarge,
            ),

            const SizedBox(height: 20),

            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/formulario', arguments: produto);
              },
              child: const Text('Editar Produto'),
            ),
          ],
        ),
      ),
    );
  }
}

//////////////////////////////////////////////////////
// ✏️ 3. Tela Formulário
//////////////////////////////////////////////////////

class TelaFormulario extends StatefulWidget {
  final Produto produto;

  const TelaFormulario({super.key, required this.produto});

  @override
  State<TelaFormulario> createState() => _TelaFormularioState();
}

class _TelaFormularioState extends State<TelaFormulario> {
  late TextEditingController controller;

  @override
  void initState() {
    super.initState();
    controller = TextEditingController(text: widget.produto.nome);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Editar Produto')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(
              controller: controller,
              decoration: const InputDecoration(labelText: 'Nome do produto'),
            ),

            const SizedBox(height: 20),

            Text('Novo nome: ${controller.text}'),

            ElevatedButton(
              onPressed: () {
                setState(() {}); // só atualiza local
              },
              child: const Text('Atualizar'),
            ),
          ],
        ),
      ),
    );
  }
}
