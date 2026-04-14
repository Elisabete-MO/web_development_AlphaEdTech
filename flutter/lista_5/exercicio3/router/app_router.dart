import 'package:go_router/go_router.dart';
import '../auth/auth_service.dart';
import '../screens/screens.dart';

final router = GoRouter(
  initialLocation: '/splash',
  refreshListenable: authService,

  redirect: (context, state) {
    final isLoggedIn = authService.isLoggedIn;
    final isGoingToLogin = state.uri.path == '/login';

    final protectedRoutes = [
      '/home',
      '/admin-dashboard',
      '/profile',
      '/settings',
    ];

    final isProtected =
    protectedRoutes.any((route) => state.uri.path.startsWith(route));

    // 🔐 usuário não logado tentando acessar rota protegida
    if (!isLoggedIn && isProtected) {
      return '/login?from=${state.uri.toString()}';
    }

    // 🔁 já logado tentando ir pro login
    if (isLoggedIn && isGoingToLogin) {
      return '/home';
    }

    // 🔒 controle de roles
    if (isLoggedIn) {
      final role = authService.role;

      if (state.uri.path == '/admin-dashboard' && role != 'admin') {
        return '/home';
      }

      if (state.uri.path == '/settings' && role != 'admin') {
        return '/home';
      }
    }

    return null;
  },

  routes: [
    GoRoute(
      path: '/splash',
      builder: (_, __) => SplashScreen(),
    ),
    GoRoute(
      path: '/login',
      builder: (context, state) {
        final from = state.uri.queryParameters['from'];
        return LoginScreen(from: from);
      },
    ),
    GoRoute(
      path: '/home',
      builder: (_, __) => HomeScreen(),
    ),
    GoRoute(
      path: '/admin-dashboard',
      builder: (_, __) => AdminDashboardScreen(),
    ),
    GoRoute(
      path: '/profile',
      builder: (_, __) => ProfileScreen(),
    ),
    GoRoute(
      path: '/settings',
      builder: (_, __) => SettingsScreen(),
    ),
  ],
);