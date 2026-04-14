// Exercício 3: Sistema de Guards de Autenticação
//
// Implemente um sistema completo de autenticação utilizando os conceitos de redirect do GoRouter. O sistema deve conter: uma tela de SplashScreen que verifica o estado de autenticação; uma tela de Login que aceita qualquer email contendo ‘admin’ como administrador; rotas protegidas para áreas que requerem autenticação; redirecionamento automático para a página original após login bem-sucedido; logout que retorna para a tela de login.
//
// Requisitos mínimos: O redirect global deve avaliar todas as navegações; rotas públicas devem ser acessíveis sem autenticação; usuários não autenticados devem ser redirecionados para /login ao tentar acessar rotas protegidas.
//
// Desafio adicional: Implemente um sistema de roles onde apenas usuários com role ‘admin’ possam acessar a rota ‘/admin-dashboard’, e usuarios com role ‘user’ possam acessar ‘/profile’ mas não ‘/settings’.

import 'package:flutter/material.dart';
import 'router/app_router.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      routerConfig: router, // vem do app_router.dart
      title: 'Catálogo de Produtos',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
    );
  }
}