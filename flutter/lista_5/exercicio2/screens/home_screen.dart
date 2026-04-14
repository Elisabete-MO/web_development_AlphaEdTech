import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class HomeScreen extends StatelessWidget {
  final List<Map<String, String>> products = [
    {'id': '1', 'name': 'Produto A'},
    {'id': '2', 'name': 'Produto B'},
    {'id': '3', 'name': 'Produto C'},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Produtos')),
      body: ListView.builder(
        itemCount: products.length,
        itemBuilder: (context, index) {
          final product = products[index];

          return ListTile(
            title: Text(product['name']!),
            onTap: () {
              context.go('/product/${product['id']}');
            },
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          context.go('/search?query=teste&page=1');
        },
        child: const Icon(Icons.search),
      ),
    );
  }
}