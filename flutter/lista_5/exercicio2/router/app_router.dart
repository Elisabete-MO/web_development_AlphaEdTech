import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../screens/home_screen.dart';
import '../screens/product_detail_screen.dart';
import '../screens/search_screen.dart';
import '../screens/error_screen.dart';

final GoRouter router = GoRouter(
  initialLocation: '/',
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => HomeScreen(),
    ),
    GoRoute(
      path: '/product',
      builder: (context, state) =>
          ErrorScreen(message: 'ID do produto não informado'),
    ),
    GoRoute(
      path: '/product/:id',
      builder: (context, state) {
        final id = state.pathParameters['id'];

        // 🔥 validação obrigatória
        if (id == null || id.isEmpty || int.tryParse(id) == null) {
          return ErrorScreen(message: 'ID do produto não informado');
        }

        return ProductDetailScreen(productId: id);
      },
    ),
    GoRoute(
      path: '/search',
      builder: (context, state) {
        final query = state.uri.queryParameters['query'];
        final page = state.uri.queryParameters['page'];

        // 🔥 validação
        if (query == null || query.isEmpty) {
          return ErrorScreen(message: 'Termo de busca obrigatório');
        }

        return SearchScreen(
          query: query,
          page: int.tryParse(page ?? '1') ?? 1,
        );
      },
    ),
  ],
);