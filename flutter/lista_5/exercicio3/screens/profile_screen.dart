import 'package:flutter/material.dart';
import 'base_screen.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return BaseScreen(
      title: 'Profile',
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: const [
          Text('Nome: Admin User'),
          SizedBox(height: 8),
          Text('Email: admin@email.com'),
        ],
      ),
    );
  }
}