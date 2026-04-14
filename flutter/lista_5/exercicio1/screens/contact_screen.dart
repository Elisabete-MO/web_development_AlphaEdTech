import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class ContactScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Contact'),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () => context.go('/'),
          child: Text('Voltar para Home'),
        ),
      ),
    );
  }
}