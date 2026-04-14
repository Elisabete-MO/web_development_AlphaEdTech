import 'package:flutter/material.dart';
import 'base_screen.dart';

class AdminDashboardScreen extends StatelessWidget {
  const AdminDashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return BaseScreen(
      title: 'Admin Dashboard',
      child: Column(
        children: const [
          Text('Painel administrativo'),
        ],
      ),
    );
  }
}