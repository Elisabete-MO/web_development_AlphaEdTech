import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../notifications/notification_screen.dart';

final GoRouter appRouter = GoRouter(
  initialLocation: '/',
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => const MainHomeScreen(),
    ),
    GoRoute(
      path: '/settings',
      builder: (context, state) => const NotificationScreen(),
    ),
    GoRoute(
      path: '/promotions',
      builder: (context, state) => const DummyScreen(title: 'Promoções (Payload: /promotions)'),
    ),
    GoRoute(
      path: '/news',
      builder: (context, state) => const DummyScreen(title: 'Novidades (Payload: /news)'),
    ),
    GoRoute(
      path: '/updates',
      builder: (context, state) => const DummyScreen(title: 'Atualizações (Payload: /updates)'),
    ),
  ],
);

class MainHomeScreen extends StatelessWidget {
  const MainHomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Home: Firebase Cloud Messaging')),
      body: Center(
        child: ElevatedButton(
          onPressed: () => context.push('/settings'),
          child: const Text('Ir para Configurações de Notificações'),
        ),
      ),
    );
  }
}

class DummyScreen extends StatelessWidget {
  final String title;
  const DummyScreen({super.key, required this.title});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(title)),
      body: Center(child: Text('Vindo do payload Push\nBem-vindo à tela de $title!', textAlign: TextAlign.center,)),
    );
  }
}
