import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'base_screen.dart';
import '../auth/auth_service.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Home')),
      body: ElevatedButton(
        onPressed: () {
          authService.logout();
          context.go('/login');
        },
        child: const Text('Logout'),
      ),
    );
  }
}