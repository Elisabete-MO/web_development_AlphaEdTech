import 'package:flutter/material.dart';
import 'base_screen.dart';

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return BaseScreen(
      title: 'Settings',
      child: Column(
        children: const [
          Text('Configurações do sistema'),
        ],
      ),
    );
  }
}