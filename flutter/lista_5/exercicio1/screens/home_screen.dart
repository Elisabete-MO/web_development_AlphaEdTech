import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Home'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              onPressed: () => context.go('/about'),
              child: Text('Ir para About'),
            ),
            ElevatedButton(
              onPressed: () => context.go('/contact'),
              child: Text('Ir para Contact'),
            ),
          ],
        ),
      ),
    );
  }
}