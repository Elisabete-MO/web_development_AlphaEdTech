// Exercício 1: Configuração Básica de Rotas
//
// Implemente uma aplicação Flutter simples com as seguintes características: três telas denominadas HomeScreen, AboutScreen e ContactScreen; navegação entre elas utilizando GoRouter; rota inicial definida como ‘/’; e utilização do MaterialApp.router para configuração.
//
// Requisitos mínimos: O código deve compilar sem erros, permitir navegação bidirecional entre as três telas e exibir na AppBar o nome da tela atual.
//
// Dica: Utilize o exemplo de configuração básica apresentado na seção 1.2 do material como referência

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'screens/home_screen.dart';
import 'screens/contact_screen.dart';
import 'screens/about_screen.dart';

void main() {
  runApp(MyApp());
}

final GoRouter _router = GoRouter(
  initialLocation: '/',
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => HomeScreen(),
    ),
    GoRoute(
      path: '/about',
      builder: (context, state) => AboutScreen(),
    ),
    GoRoute(
      path: '/contact',
      builder: (context, state) => ContactScreen(),
    ),
  ],
);

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      routerConfig: _router,
      title: 'GoRouter Demo',
      theme: ThemeData(primarySwatch: Colors.blue),
    );
  }
}